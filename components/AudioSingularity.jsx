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

  const eventHorizonShader = useMemo(() => ({
    uniforms: {
      color1: { value: new THREE.Color("#f00c6f") }, // Magenta
      color2: { value: new THREE.Color("#12abff") } // Cyan
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

        // Gradient on the RIGHT half of the sphere
        float gradientFactor = vNormal.x * 0.5 + 0.5;  // 0.0 to 1.0 across sphere
        float rightSideMask = smoothstep(0.0, 0.5, gradientFactor); // Only right half
        
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
      
      // Increased base size slightly to account for smooth anti-aliased edges
      sizes[i] = Math.random() * 3.0 + 1.0; 
    }
    return [positions, colors, sizes];
  }, [count]);

  // Custom Shader Material for round particles and depth-based coloring
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      varying vec3 vColor;
      varying float vDepth;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // vDepth is the distance from the camera in view space
        vDepth = -mvPosition.z; 
        
        gl_Position = projectionMatrix * mvPosition;
        // Size attenuation based on depth to keep them grounded in 3D space
        gl_PointSize = size * (40.0 / -mvPosition.z); 
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vDepth;
      
      void main() {
        // 1. Create perfectly round particles with soft, anti-aliased edges
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float alpha = 1.0 - smoothstep(0.4, 0.5, distanceToCenter);
        
        if (alpha < 0.01) discard;

        // 2. Depth Coloring: White in foreground, original color in background
        // Camera is at z=12. Depth mix adjusts where the fade to white happens.
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
      <shaderMaterial args={[shaderArgs]} />
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
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        <fog attach="fog" args={["#050505", 5, 25]} />
        
        {/* Wrapping the elements in a group to easily shift the composition center */}
        <group position={[8.0, 1.5, 0]}>
          <SingularityCore />
          <Particles count={2000} />
          <Waveforms />
        </group>

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