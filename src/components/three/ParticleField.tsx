'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  colors?: number[];
  speed?: number;
  mouseInfluence?: boolean;
}

export function ParticleField({
  count = 5000,
  radius = 50,
  colors = [0x00ff41, 0x00d4ff, 0x8b5cf6], // Matrix green, electric blue, neon purple
  speed = 0.001,
  mouseInfluence = true,
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generate particle positions and colors
  const [positions, colorsArray] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    
    const colorObjects = colors.map(color => new THREE.Color(color));
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere
      const spherical = new THREE.Spherical(
        Math.random() * radius,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );
      const vector = new THREE.Vector3().setFromSpherical(spherical);
      
      positions[i * 3] = vector.x;
      positions[i * 3 + 1] = vector.y;
      positions[i * 3 + 2] = vector.z;
      
      // Assign random colors from the cyberpunk palette
      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)];
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }
    
    return [positions, colorsArray];
  }, [count, radius, colors]);

  // Mouse tracking for interaction
  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    // Update mouse position
    mouse.current.x = (state.mouse.x * state.viewport.width) / 2;
    mouse.current.y = (state.mouse.y * state.viewport.height) / 2;
    
    // Animate particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Original position for wave calculations
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];
      const originalZ = positions[i3 + 2];
      
      // Wave motion
      positions[i3] = originalX + Math.sin(time * speed * 1000 + originalY * 0.1) * 0.5;
      positions[i3 + 1] = originalY + Math.cos(time * speed * 1000 + originalX * 0.1) * 0.5;
      positions[i3 + 2] = originalZ + Math.sin(time * speed * 1000 + originalX + originalY) * 0.3;
      
      // Mouse influence effect
      if (mouseInfluence) {
        const distance = Math.sqrt(
          Math.pow(positions[i3] - mouse.current.x * 0.1, 2) +
          Math.pow(positions[i3 + 1] - mouse.current.y * 0.1, 2)
        );
        
        if (distance < 5) {
          const force = (5 - distance) * 0.1;
          positions[i3] += (positions[i3] - mouse.current.x * 0.1) * force;
          positions[i3 + 1] += (positions[i3 + 1] - mouse.current.y * 0.1) * force;
        }
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire system slowly
    ref.current.rotation.x = time * speed * 10;
    ref.current.rotation.y = time * speed * 15;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorsArray, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        size={2}
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}