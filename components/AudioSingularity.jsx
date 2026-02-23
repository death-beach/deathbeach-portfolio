"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SingularityCore() {
  const coreRef = useRef(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      coreRef.current.rotation.x += 0.005;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

function Particles({ count = 4000 }) {
  const pointsRef = useRef(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const color1 = new THREE.Color("#f00c6f"); // Magenta
    const color2 = new THREE.Color("#12abff"); // Cyan

    for (let i = 0; i < count; i++) {
      // Distribution favoring the center
      const radius = Math.pow(Math.random(), 2) * 15 + 1.6; 
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.set([x, y, z], i * 3);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
      
      sizes[i] = Math.random() * 2.0;
    }
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
      
      // Parallax effect
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, (state.pointer.x * 2), 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, (state.pointer.y * 2), 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Waveforms() {
  const groupRef = useRef(null);
  
  const rings = useMemo(() => {
    const arr = [];
    const color1 = new THREE.Color("#f00c6f");
    const color2 = new THREE.Color("#12abff");
    
    for (let i = 0; i < 15; i++) {
      const radius = 2 + Math.random() * 8;
      const tube = 0.01 + Math.random() * 0.02;
      arr.push({
        radius,
        tube,
        color: Math.random() > 0.5 ? color1 : color2,
        speed: (Math.random() - 0.5) * 0.05,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        )
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.03;
      
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z += rings[i].speed;
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
        child.scale.set(scale, scale, scale);
      });
    }
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

export default function AudioSingularity() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#050505", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 25]} />
        <SingularityCore />
        <Particles count={5000} />
        <Waveforms />
      </Canvas>
      {/* Gradient overlay to blend with the rest of the page */}
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