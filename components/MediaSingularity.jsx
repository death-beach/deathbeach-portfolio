"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── FREQUENCY MAP (fftSize=4096, 2048 bins, ~10.77Hz/bin at 44100Hz) ─────────
// Bins scaled 4x from Lumina's fftSize=512 (~43Hz/bin) to match our 10.77Hz/bin
// Bass / kick  (0–258Hz)    → bins 0–24    [Lumina 0–6]
// Mids / vocals(258–3.5kHz) → bins 24–324  [Lumina 6–81]
// Highs/cymbals(3.5k–5kHz)  → bins 324–464 [Lumina 81–116]

// ── HELPERS ──────────────────────────────────────────────────────────────────
function weightedBandEnergy(data, ranges, noiseFloor) {
  if (!data) return 0;
  let totalEnergy = 0;
  let totalWeight = 0;
  for (const [start, end, weight] of ranges) {
    const actualEnd = Math.min(end, data.length - 1);
    for (let i = start; i <= actualEnd; i++) {
      totalEnergy += (data[i] / 255) * weight;
      totalWeight += weight;
    }
  }
  const avgEnergy = totalEnergy / totalWeight;
  return avgEnergy > noiseFloor ? avgEnergy : 0;
}

// ── CORE ─────────────────────────────────────────────────────────────────────
function Core({ audioDataRef }) {
  const meshRef = useRef(null);
  const scale = useRef(1.0);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.x += 0.004;

    const data = audioDataRef?.current ?? null;

    if (data) {
      // Bass reaction: bins 0–24 (0–258Hz) with crossover rolloff and noise gate
      // Full weight 0-12, reduced weight 13-24 (rolloff from mids)
      const bassEnergy = weightedBandEnergy(data, [
        [0,  12, 1.0], // Full bass range
        [13, 24, 0.2], // Rolloff zone
      ], 0.88);
      const targetScale = 1.0 + bassEnergy * 0.4;
      // From Lumina: shrink fast (0.85), grow slower (0.4) — snappy pump
      const lerpSpeed = targetScale < scale.current ? 0.85 : 0.4;
      scale.current = THREE.MathUtils.lerp(scale.current, targetScale, lerpSpeed);
    } else {
      const idle = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      scale.current = THREE.MathUtils.lerp(scale.current, idle, 0.04);
    }

    meshRef.current.scale.setScalar(scale.current);
  });

  const shader = useMemo(() => ({
    uniforms: {
      color1: { value: new THREE.Color("#f00c6f") }, // pink
      color2: { value: new THREE.Color("#12abff") }, // blue
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
        float grad = vNormal.x * 0.5 + 0.5;
        float mask = smoothstep(0.0, 0.5, grad);
        vec3 rim = mix(color1, color2, grad) * mask;
        gl_FragColor = vec4(rim * intensity * 1.5, 1.0);
      }
    `,
  }), []);

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 16]} />
      <shaderMaterial
        attach="material"
        args={[shader]}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── RINGS ─────────────────────────────────────────────────────────────────────
function Rings({ audioDataRef }) {
  const groupRef = useRef(null);
  const opacities = useRef(new Array(14).fill(0.5));

  const rings = useMemo(() => {
    const c1 = new THREE.Color("#f00c6f"); // pink
    const c2 = new THREE.Color("#12abff"); // blue
    const c3 = new THREE.Color("#9b30ff"); // purple
    const c4 = new THREE.Color("#00ff88"); // green
    const palette = [c1,c1,c1,c1, c2,c2,c2,c2, c3,c3,c3,c3, c4,c4];

    // Seeded random for consistent results
    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const arr = [];
    for (let i = 0; i < 14; i++) {
      // Spread across mid range: bins 28–324 (258Hz–3.5kHz) — Lumina 7–81 * 4
      const bin = 28 + Math.floor((i / 14) * 296);
      arr.push({
        radius: 2.2 + seededRandom() * 7,
        tube:   0.012 + seededRandom() * 0.018,
        color:  palette[i],
        speedX: (seededRandom() - 0.5) * 0.03,
        speedY: (seededRandom() - 0.5) * 0.025,
        speed:  (seededRandom() - 0.5) * 0.04,
        rot: new THREE.Euler(
          seededRandom() * Math.PI,
          seededRandom() * Math.PI,
          seededRandom() * Math.PI
        ),
        bin,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.07;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.025;

    const data = audioDataRef?.current ?? null;

    // Weighted mid energy: bins 28-304 full, 28-44 rolloff, 304-324 rolloff
    const midsEnergy = data
      ? weightedBandEnergy(data, [
          [28,  44,  0.3], // rolloff from bass
          [45,  304, 1.0], // full mids
          [305, 324, 0.3], // rolloff to highs
        ], 0.10)
      : 0;

    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += rings[i].speedX;
      child.rotation.y += rings[i].speedY;
      child.rotation.z += rings[i].speed;
      child.scale.setScalar(1.0);

      if (!data) {
        const idle = 0.05 + Math.sin(state.clock.elapsedTime * 1.8 + i * 0.4) * 0.03;
        opacities.current[i] = THREE.MathUtils.lerp(opacities.current[i], idle, 0.04);
      } else {
        const target = 0.05 + midsEnergy * 0.95;
        const lerpSpeed = target > opacities.current[i] ? 0.8 : 0.3;
        opacities.current[i] = THREE.MathUtils.lerp(opacities.current[i], target, lerpSpeed);
      }

      child.material.opacity = opacities.current[i];
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={r.rot}>
          <torusGeometry args={[r.radius, r.tube, 16, 100]} />
          <meshBasicMaterial
            color={r.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── PARTICLES ─────────────────────────────────────────────────────────────────
function Particles({ count = 2000, audioDataRef }) {
  const pointsRef = useRef(null);
  const rotSpeed = useRef(0.015);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz  = new Float32Array(count);
    const c1  = new THREE.Color("#f00c6f");
    const c2  = new THREE.Color("#12abff");

    // Seeded random for consistent results
    let seed = 54321;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      const r     = Math.pow(seededRandom(), 2) * 15 + 1.6;
      const theta = seededRandom() * 2 * Math.PI;
      const phi   = Math.acos(seededRandom() * 2 - 1);
      pos.set([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ], i * 3);
      const mc = c1.clone().lerp(c2, seededRandom());
      col.set([mc.r, mc.g, mc.b], i * 3);
      sz[i] = seededRandom() * 3.0 + 1.0;
    }
    return [pos, col, sz];
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
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = size * (40.0 / -mv.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vDepth;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float a = 1.0 - smoothstep(0.4, 0.5, d);
        if (a < 0.01) discard;
        float df = smoothstep(8.0, 16.0, vDepth);
        gl_FragColor = vec4(mix(vec3(1.0), vColor, df), a * 0.8);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const data = audioDataRef?.current ?? null;

    if (data) {
      // Highs: bins 324–464 (3.5kHz–5kHz) — Lumina 81–116 * 4
      // Rolloff from mids at 324–336, full highs 337–464
      const highsEnergy = weightedBandEnergy(data, [
        [324, 336, 0.3], // rolloff from mids
        [337, 464, 1.0], // full highs range
      ], 0.12);
      const target = 0.015 + highsEnergy * 1.2;
      rotSpeed.current = THREE.MathUtils.lerp(rotSpeed.current, target, 0.4);
    } else {
      rotSpeed.current = THREE.MathUtils.lerp(rotSpeed.current, 0.015, 0.05);
    }

    pointsRef.current.rotation.y += rotSpeed.current * delta;
    pointsRef.current.rotation.z += 0.008 * delta;

    // Subtle mouse follow
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.pointer.x * 2, 0.04);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.pointer.y * 2, 0.04);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={colors.length / 3}    array={colors}    itemSize={3} />
        <bufferAttribute attach="attributes-size"     count={sizes.length}          array={sizes}     itemSize={1} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  );
}

// ── SCENE ─────────────────────────────────────────────────────────────────────
function Scene({ audioDataRef, position }) {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isLowPower = isMobile && (prefersReducedMotion || size.width < 480);
  const particleCount = isLowPower ? 0 : isMobile ? 500 : 2000;

  const pos = isMobile ? [3, 2.5, -4.0] : (position || [8.0, 1.5, 0]);

  return (
    <group position={pos}>
      <Core audioDataRef={audioDataRef} />
      <Rings audioDataRef={audioDataRef} />
      {particleCount > 0 && <Particles count={particleCount} audioDataRef={audioDataRef} />}
    </group>
  );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────
export default function MediaSingularity({ audioDataRef = null, position = null, style = {} }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#050505", overflow: "hidden", ...style }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 25]} />
        <Scene audioDataRef={audioDataRef} position={position} />
      </Canvas>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 40%, #0f0f0f 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
