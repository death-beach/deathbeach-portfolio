"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── FREQUENCY BIN HELPERS ────────────────────────────────────────────────────
// fftSize=2048 → frequencyBinCount=1024 bins
// At 44100Hz sample rate: bin width = 44100/2048 ≈ 21.5Hz per bin
//
// Bass  (0–80Hz)      → bins 0–3    → CORE pumps on each low note
// Mids  (200–900Hz)   → bins 9–41   → RINGS scale per frequency slice
// Highs (1.5kHz–20kHz)→ bins 70–465 → PARTICLES spin faster with more highs
//
// We read bins directly by index — no fraction math, no guessing.

// Get the peak value from a range of bins (0–255 scale → 0.0–1.0)
function getBinPeak(audioData, startBin, endBin) {
  if (!audioData || audioData.length === 0) return 0;
  let peak = 0;
  const end = Math.min(endBin, audioData.length - 1);
  for (let i = startBin; i <= end; i++) {
    if (audioData[i] > peak) peak = audioData[i];
  }
  return peak / 255;
}

// Get the average value from a range of bins (0–255 scale → 0.0–1.0)
function getBinAverage(audioData, startBin, endBin) {
  if (!audioData || audioData.length === 0) return 0;
  const end = Math.min(endBin, audioData.length - 1);
  let sum = 0;
  for (let i = startBin; i <= end; i++) sum += audioData[i];
  return sum / (end - startBin + 1) / 255;
}

// ── CORE: reacts to BASS (20–200Hz = bins 1–9) ──────────────────────────────
// Behavior: instant attack on note onset, slow decay between notes.
// Uses delta (rate of change) to detect individual note attacks even in legato.
function SingularityCore({ audioDataRef }) {
  const coreRef = useRef(null);
  const smoothedScale = useRef(1.0);
  const prevBass = useRef(0);

  useFrame((state) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += 0.01;
    coreRef.current.rotation.x += 0.005;

    const audioData = audioDataRef?.current ?? null;

    if (!audioData) {
      // Idle: gentle sine pulse when no audio
      const idlePulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, idlePulse, 0.05);
    } else {
      // Bass peak across bins 0–3 (0–80Hz only)
      const bass = getBinPeak(audioData, 0, 3);

      // Noise floor threshold: only react to genuine bass hits above 0.3 (76/255)
      // This prevents the core from firing on low-level bleed and room tone
      if (bass < 0.3) {
        // No real bass — decay back to rest
        smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, 1.0, 0.06);
        prevBass.current = prevBass.current * 0.85;
      } else {
        // Genuine bass content — onset detection
        const delta = Math.max(0, bass - prevBass.current);
        prevBass.current = prevBass.current * 0.85;
        if (bass > prevBass.current) prevBass.current = bass;

        const targetScale = 1.0 + bass * 0.2 + delta * 5.0;

        // Instant attack, slow release
        if (targetScale > smoothedScale.current) {
          smoothedScale.current = targetScale;
        } else {
          smoothedScale.current = THREE.MathUtils.lerp(smoothedScale.current, 1.0, 0.06);
        }
      }
    }

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

// ── PARTICLES: reacts to HIGHS (2kHz–10kHz = bins 94–465) ───────────────────
// Behavior: more high-frequency energy → faster rotation speed.
// Less highs → slows back down to baseline.
function Particles({ count = 2000, audioDataRef }) {
  const pointsRef = useRef(null);
  const smoothedRotSpeed = useRef(0.02);

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

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const audioData = audioDataRef?.current ?? null;

    // Highs: average of bins 70–465 (1.5kHz–20kHz)
    // More highs = faster spin. No highs = slow baseline spin.
    const highs = audioData ? getBinAverage(audioData, 70, 465) : 0;
    const targetRotSpeed = 0.02 + highs * 0.5;
    smoothedRotSpeed.current = THREE.MathUtils.lerp(smoothedRotSpeed.current, targetRotSpeed, 0.12);

    pointsRef.current.rotation.y += smoothedRotSpeed.current * delta;
    pointsRef.current.rotation.z += 0.01 * delta;
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

// ── WAVEFORMS (RINGS): reacts to MIDS (200Hz–2kHz = bins 10–93) ─────────────
// Behavior: each ring maps to a specific mid-band bin.
// When that frequency has energy, the ring scales up.
function Waveforms({ audioDataRef }) {
  const groupRef = useRef(null);
  const smoothedScales = useRef([]);

  const rings = useMemo(() => {
    const arr = [];
    const color1 = new THREE.Color("#f00c6f");
    const color2 = new THREE.Color("#12abff");
    for (let i = 0; i < 15; i++) {
      // Spread rings evenly across mid bins 9–41 (200–900Hz)
      const binIndex = 9 + Math.floor((i / 14) * 32);
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
        binIndex,  // specific bin this ring listens to
      });
    }
    smoothedScales.current = new Array(arr.length).fill(1.0);
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.03;

    const audioData = audioDataRef?.current ?? null;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += rings[i].speed;

      if (!audioData) {
        // Idle: gentle sine per ring
        const idleScale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
        smoothedScales.current[i] = THREE.MathUtils.lerp(smoothedScales.current[i], idleScale, 0.05);
      } else {
        // Read the specific bin this ring is assigned to
        const binVal = (audioData[rings[i].binIndex] || 0) / 255;
        const targetScale = 1.0 + binVal * 0.7;
        smoothedScales.current[i] = THREE.MathUtils.lerp(smoothedScales.current[i], targetScale, 0.18);
      }

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

// ── SCENE ────────────────────────────────────────────────────────────────────
function ResponsiveScene({ audioDataRef, position }) {
  const { size } = useThree();
  const isMobile = size.width < 768;
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
