"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── FREQUENCY BAND HELPERS ──────────────────────────────────────────────────
// FFT has 2048 bins (fftSize=4096), each bin = 22050/2048 ≈ 10.77Hz wide.
// Convert Hz to bin fraction: Hz / 22050
// Bass  ≤80Hz   → bins 0–7    → fraction 0.000–0.0036
// Mids  200–900 → bins 18–83  → fraction 0.009–0.041
// Highs 1.5k–20k→ bins 139–1857 → fraction 0.068–0.907

function getBandAverage(audioData, startFraction, endFraction) {
  if (!audioData || audioData.length === 0) return 0;
  const start = Math.floor(audioData.length * startFraction);
  const end = Math.max(start + 1, Math.floor(audioData.length * endFraction));
  let sum = 0;
  for (let i = start; i < end; i++) sum += audioData[i];
  return sum / (end - start) / 255;
}

// BASS: sub-bass + bass (20–80Hz)
// With fftSize=4096 → 2048 bins at ~10.77Hz each → bins 0-7 cover 0-86Hz
function getBassPeak(audioData) {
  if (!audioData || audioData.length === 0) return 0;
  // Take the max across bins 0-7 (0-86Hz) for punchy kick detection
  let peak = 0;
  for (let i = 0; i <= 7; i++) {
    if ((audioData[i] || 0) > peak) peak = audioData[i];
  }
  return peak / 255;
}

// ── CORE: reacts to BASS (≤80Hz) ────────────────────────────────────────────
function SingularityCore({ audioDataRef }) {
  const coreRef = useRef(null);
  const smoothedScale = useRef(1.0);

  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += 0.01;
    coreRef.current.rotation.x += 0.005;

    // Read live audio data from the ref (no re-renders)
    const audioData = audioDataRef ? audioDataRef.current : null;

    // Use peak detection on bins 0-1 (covers 0-172Hz, targeting ≤80Hz kicks)
    const bass = getBassPeak(audioData);
    // Idle: gentle sine pulse. Active: bass drives scale up to 50% bigger.
    const idlePulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    const targetScale = audioData ? 1 + bass * 0.5 : idlePulse;

    // EMA smoothing for hypnotic effect (0.15 = smooth but responsive)
    smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, targetScale, 0.15);
    coreRef.current.scale.set(smoothedScale.current, smoothedScale.current, smoothedScale.current);
  });

  const eventHorizonShader = useMemo(() => ({
    uniforms: {
      color1: { value: new THREE.Color("#f00c6f") },
      color2: { value: new THREE.Color("#12abff") }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec3 vNormal;
      void main() {
        float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
        float intensity = pow(1.0 - fresnel, 3.0);
        float gradientFactor = vNormal.x * 0.5 + 0.5;
        float rightSideMask = smoothstep(0.0, 0.5, gradientFactor);
        vec3 rimColor = mix(color1, color2, gradientFactor) * rightSideMask;
        gl_FragColor = vec4(rimColor * intensity * 1.5, 1.0);
      }
    `
  }), []);

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <shaderMaterial args={[eventHorizonShader]} />
    </mesh>
  );
}

// ── PARTICLES: reacts to HIGHS (50–100%) ────────────────────────────────────
function Particles({ count = 2000, audioDataRef }) {
  const pointsRef = useRef(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const color1 = new THREE.Color("#f00c6f");
    const color2 = new THREE.Color("#12abff");

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(Math.random(), 2) * 15 + 1.6;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions.set([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ], i * 3);
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
      sizes[i] = Math.random() * 3.0 + 1.0;
    }
    return [positions, colors, sizes];
  }, [count]);

  const shaderArgs = useMemo(() => ({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      varying vec3 vColor;
      varying float vDepth;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * (40.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vDepth;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.4, 0.5, d);
        if (alpha < 0.01) discard;
        float depthFactor = smoothstep(8.0, 16.0, vDepth);
        vec3 finalColor = mix(vec3(1.0), vColor, depthFactor);
        gl_FragColor = vec4(finalColor, alpha * 0.8);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Read live audio data from the ref (no re-renders)
    const audioData = audioDataRef ? audioDataRef.current : null;

    // Highs (50-100%) drive rotation speed
    const highs = getBandAverage(audioData, 0.068, 0.907);
    const rotSpeed = 0.05 + highs * 0.2;

    pointsRef.current.rotation.y = state.clock.elapsedTime * rotSpeed;
    pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.pointer.x * 2, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.pointer.y * 2, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  );
}

// ── WAVEFORMS: reacts to MIDS (10–50%) ──────────────────────────────────────
function Waveforms({ audioDataRef }) {
  const groupRef = useRef(null);
  const smoothedScales = useRef([]);

  const rings = useMemo(() => {
    const arr = [];
    const color1 = new THREE.Color("#f00c6f");
    const color2 = new THREE.Color("#12abff");
    for (let i = 0; i < 15; i++) {
      arr.push({
        radius: 2 + Math.random() * 8,
        tube: 0.01 + Math.random() * 0.02,
        color: Math.random() > 0.5 ? color1 : color2,
        speed: (Math.random() - 0.5) * 0.05,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        // Each ring maps to a specific sub-band within mids
        bandOffset: Math.random(), // 0-1, used to pick a specific mid bin
      });
    }
    // Initialize smoothed scales array
    smoothedScales.current = new Array(arr.length).fill(1.0);
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.03;

    // Read live audio data from the ref (no re-renders)
    const audioData = audioDataRef ? audioDataRef.current : null;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += rings[i].speed;

      // Each ring responds to its own slice of the mid-range (200–900Hz = 0.009–0.041)
      // bandOffset spreads rings across that window
      const ringBandStart = 0.009 + rings[i].bandOffset * 0.028;
      const ringBandEnd = ringBandStart + 0.004;
      const midEnergy = getBandAverage(audioData, ringBandStart, ringBandEnd);

      // Idle: gentle sine. Active: mid energy drives scale.
      const idleScale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
      const targetScale = audioData ? 1 + midEnergy * 0.5 : idleScale;

      // EMA smoothing for hypnotic effect (0.15 = smooth but responsive)
      smoothedScales.current[i] = THREE.MathUtils.lerp(smoothedScales.current[i], targetScale, 0.15);
      child.scale.set(smoothedScales.current[i], smoothedScales.current[i], smoothedScales.current[i]);
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── SCENE: position controls where the core sits on screen ──────────────────
function ResponsiveScene({ audioDataRef, position }) {
  const { size } = useThree();
  const isMobile = size.width < 768;
  // Default: original homepage positioning (right side, slightly up)
  const groupPosition = position || (isMobile ? [3, 2.5, -4.0] : [8.0, 1.5, 0]);

  return (
    <group position={groupPosition}>
      <SingularityCore audioDataRef={audioDataRef} />
      <Particles count={2000} audioDataRef={audioDataRef} />
      <Waveforms audioDataRef={audioDataRef} />
    </group>
  );
}

// ── EXPORT ───────────────────────────────────────────────────────────────────
// audioDataRef: a React ref whose .current is a Uint8Array (or null when idle).
//               Using a ref instead of state avoids 60fps re-renders.
// position:     [x, y, z] to override where the 3D group sits (optional)
// style:        extra CSS for the container div (optional)
export default function AudioSingularity({ audioDataRef = null, position = null, style = {} }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#050505", overflow: "hidden", ...style }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 25]} />
        <ResponsiveScene audioDataRef={audioDataRef} position={position} />
      </Canvas>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, #0f0f0f 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
