'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MatrixRainProps {
  columns?: number;
  rows?: number;
  speed?: number;
  density?: number;
}

export function MatrixRain({ 
  columns = 30, 
  rows = 50, 
  speed = 0.02,
  density = 0.8 
}: MatrixRainProps) {
  const ref = useRef<THREE.Points>(null);
  const dropsRef = useRef<number[]>([]);

  // Initialize rain drops
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(columns * rows * 3);
    const colors = new Float32Array(columns * rows * 3);
    const sizes = new Float32Array(columns * rows);
    
    const matrixGreen = new THREE.Color(0x00ff41);
    const darkGreen = new THREE.Color(0x003d10);
    const brightGreen = new THREE.Color(0x66ff66);
    
    // Initialize drops array
    dropsRef.current = Array.from({ length: columns }, () => Math.random() * rows);
    
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        const index = col * rows + row;
        const i3 = index * 3;
        
        // Position
        positions[i3] = (col - columns / 2) * 1.5;
        positions[i3 + 1] = (rows / 2 - row) * 1.5;
        positions[i3 + 2] = Math.random() * 10 - 5;
        
        // Color based on position in column (fade effect)
        const distanceFromDrop = Math.abs(row - dropsRef.current[col]);
        const intensity = Math.max(0, 1 - distanceFromDrop / 8);
        
        let color: THREE.Color;
        if (distanceFromDrop < 2) {
          color = brightGreen; // Bright head of the rain
        } else if (intensity > 0.5) {
          color = matrixGreen.clone().lerp(brightGreen, intensity);
        } else {
          color = darkGreen.clone().lerp(matrixGreen, intensity);
        }
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Size based on intensity
        sizes[index] = Math.max(0.5, intensity * 3);
      }
    }
    
    return [positions, colors, sizes];
  }, [columns, rows]);

  // Animate the rain
  useFrame((state) => {
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const colors = ref.current.geometry.attributes.color.array as Float32Array;
    const sizes = ref.current.geometry.attributes.size.array as Float32Array;
    
    const matrixGreen = new THREE.Color(0x00ff41);
    const darkGreen = new THREE.Color(0x003d10);
    const brightGreen = new THREE.Color(0x66ff66);
    
    // Update each column
    for (let col = 0; col < columns; col++) {
      // Move drop down
      dropsRef.current[col] += speed * 60 * state.clock.getDelta();
      
      // Reset drop if it reaches the bottom
      if (dropsRef.current[col] > rows) {
        dropsRef.current[col] = 0;
      }
      
      // Update colors for this column
      for (let row = 0; row < rows; row++) {
        const index = col * rows + row;
        const i3 = index * 3;
        
        // Calculate distance from drop head
        const distanceFromDrop = Math.abs(row - dropsRef.current[col]);
        const intensity = Math.max(0, 1 - distanceFromDrop / 8);
        
        let color: THREE.Color;
        if (distanceFromDrop < 1) {
          color = brightGreen; // Bright white head
        } else if (distanceFromDrop < 3) {
          color = matrixGreen; // Matrix green body
        } else if (intensity > 0) {
          color = darkGreen.clone().lerp(matrixGreen, intensity * 2);
        } else {
          color = new THREE.Color(0x000000); // Transparent/black
        }
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Update size
        sizes[index] = Math.max(0, intensity * 3);
        
        // Add some randomness to Z position for depth
        if (Math.random() < 0.01) {
          positions[i3 + 2] = Math.random() * 10 - 5;
        }
      }
    }
    
    ref.current.geometry.attributes.color.needsUpdate = true;
    ref.current.geometry.attributes.size.needsUpdate = true;
    ref.current.geometry.attributes.position.needsUpdate = true;
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
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <PointMaterial
        size={2}
        transparent
        opacity={0.9}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}