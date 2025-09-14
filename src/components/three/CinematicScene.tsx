'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Sphere, Box, Torus, Effects } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

// Advanced particle system with cinematic movement
function CinematicParticles({ count = 8000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { camera, viewport } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const colorPalette = [
      new THREE.Color(0x00ff41), // Matrix green
      new THREE.Color(0x00d4ff), // Electric blue
      new THREE.Color(0x8b5cf6), // Neon purple
      new THREE.Color(0xff0040), // Red alert
      new THREE.Color(0xffffff), // Bright white
    ];
    
    for (let i = 0; i < count; i++) {
      // Create layered depth with multiple particle clouds
      const layer = Math.floor(i / (count / 5));
      const radius = 30 + layer * 20;
      
      // Spherical distribution with bias toward center
      const spherical = new THREE.Spherical(
        radius * (0.5 + Math.random() * 0.5),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );
      
      const vector = new THREE.Vector3().setFromSpherical(spherical);
      
      positions[i * 3] = vector.x;
      positions[i * 3 + 1] = vector.y;
      positions[i * 3 + 2] = vector.z;
      
      // Color based on distance from center for depth perception
      const distance = vector.length();
      const colorIndex = Math.floor((distance / 100) * colorPalette.length);
      const color = colorPalette[Math.min(colorIndex, colorPalette.length - 1)];
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Size variation for cinematic depth
      sizes[i] = Math.random() * 3 + 0.5;
    }
    
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const colors = ref.current.geometry.attributes.color.array as Float32Array;
    
    // Cinematic camera-relative movement
    const cameraPos = camera.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Original positions for wave calculations
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];
      const originalZ = positions[i3 + 2];
      
      // Cinematic wave motion with depth
      const waveIntensity = 1 - Math.abs(originalZ) / 100;
      positions[i3] = originalX + Math.sin(time * 0.5 + originalY * 0.05) * waveIntensity;
      positions[i3 + 1] = originalY + Math.cos(time * 0.3 + originalX * 0.05) * waveIntensity;
      positions[i3 + 2] = originalZ + Math.sin(time * 0.4 + (originalX + originalY) * 0.03) * 0.5;
      
      // Cinematic color pulsing based on distance from camera
      const distance = Math.sqrt(
        Math.pow(positions[i3] - cameraPos.x, 2) +
        Math.pow(positions[i3 + 1] - cameraPos.y, 2) +
        Math.pow(positions[i3 + 2] - cameraPos.z, 2)
      );
      
      const pulse = Math.sin(time * 2 + distance * 0.1) * 0.3 + 0.7;
      colors[i3] *= pulse;
      colors[i3 + 1] *= pulse;
      colors[i3 + 2] *= pulse;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;
    
    // Cinematic rotation
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.z = Math.cos(time * 0.15) * 0.1;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
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

// Cinematic floating holograms
function FloatingHolograms({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const holograms = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 2 + 0.5,
      type: ['box', 'sphere', 'torus'][Math.floor(Math.random() * 3)] as 'box' | 'sphere' | 'torus',
      color: [0x00ff41, 0x00d4ff, 0x8b5cf6, 0xff0040][Math.floor(Math.random() * 4)],
      speed: Math.random() * 0.02 + 0.01,
      orbitRadius: Math.random() * 5 + 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      const hologram = holograms[i];
      
      // Cinematic floating motion
      child.position.y = hologram.position[1] + Math.sin(time * hologram.speed * 10) * 3;
      
      // Orbital movement
      const orbitX = hologram.position[0] + Math.cos(time * hologram.speed * 5) * hologram.orbitRadius;
      const orbitZ = hologram.position[2] + Math.sin(time * hologram.speed * 5) * hologram.orbitRadius;
      
      child.position.x = orbitX;
      child.position.z = orbitZ;
      
      // Cinematic rotation
      child.rotation.x += hologram.speed * 2;
      child.rotation.y += hologram.speed * 1.5;
      child.rotation.z += hologram.speed * 0.5;
      
      // Pulsing scale
      const scaleMultiplier = 1 + Math.sin(time * 3 + i) * 0.2;
      child.scale.setScalar(hologram.scale * scaleMultiplier);
    });
    
    // Rotate entire group
    groupRef.current.rotation.y = time * 0.02;
  });

  const createHologramMaterial = (color: number) => {
    return new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      shininess: 100,
      specular: new THREE.Color(0xffffff),
      emissive: new THREE.Color(color).multiplyScalar(0.3),
      wireframe: Math.random() > 0.5,
    });
  };

  return (
    <group ref={groupRef}>
      {holograms.map((hologram, i) => {
        const material = createHologramMaterial(hologram.color);
        
        switch (hologram.type) {
          case 'sphere':
            return (
              <Sphere key={i} position={hologram.position} scale={hologram.scale} args={[1, 32, 32]}>
                <primitive object={material} attach="material" />
              </Sphere>
            );
          case 'torus':
            return (
              <Torus key={i} position={hologram.position} scale={hologram.scale} args={[1, 0.3, 16, 32]}>
                <primitive object={material} attach="material" />
              </Torus>
            );
          default:
            return (
              <Box key={i} position={hologram.position} scale={hologram.scale} args={[2, 2, 2]}>
                <primitive object={material} attach="material" />
              </Box>
            );
        }
      })}
    </group>
  );
}

// Advanced Matrix Rain with cinematic depth
function CinematicMatrix({ columns = 40, rows = 60 }: { columns?: number; rows?: number }) {
  const ref = useRef<THREE.Points>(null);
  const dropsRef = useRef<number[]>([]);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(columns * rows * 3);
    const colors = new Float32Array(columns * rows * 3);
    const sizes = new Float32Array(columns * rows);
    
    const matrixColors = [
      new THREE.Color(0x66ff66), // Bright green
      new THREE.Color(0x00ff41), // Matrix green
      new THREE.Color(0x003d10), // Dark green
      new THREE.Color(0x001a0a), // Very dark green
    ];
    
    dropsRef.current = Array.from({ length: columns }, () => Math.random() * rows);
    
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        const index = col * rows + row;
        const i3 = index * 3;
        
        // Position with depth variation
        positions[i3] = (col - columns / 2) * 2 + (Math.random() - 0.5);
        positions[i3 + 1] = (rows / 2 - row) * 2;
        positions[i3 + 2] = (Math.random() - 0.5) * 20; // Depth variation
        
        // Initial colors
        const distanceFromDrop = Math.abs(row - dropsRef.current[col]);
        const intensity = Math.max(0, 1 - distanceFromDrop / 10);
        const colorIndex = Math.min(Math.floor(intensity * matrixColors.length), matrixColors.length - 1);
        const color = matrixColors[colorIndex];
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        sizes[index] = Math.max(0.5, intensity * 4);
      }
    }
    
    return [positions, colors, sizes];
  }, [columns, rows]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const colors = ref.current.geometry.attributes.color.array as Float32Array;
    const sizes = ref.current.geometry.attributes.size.array as Float32Array;
    
    const matrixColors = [
      new THREE.Color(0x66ff66),
      new THREE.Color(0x00ff41),
      new THREE.Color(0x003d10),
      new THREE.Color(0x001a0a),
    ];
    
    // Update drops
    for (let col = 0; col < columns; col++) {
      dropsRef.current[col] += 0.03 + Math.random() * 0.02;
      if (dropsRef.current[col] > rows) {
        dropsRef.current[col] = -Math.random() * 10;
      }
      
      // Update colors and sizes for this column
      for (let row = 0; row < rows; row++) {
        const index = col * rows + row;
        const i3 = index * 3;
        
        const distanceFromDrop = Math.abs(row - dropsRef.current[col]);
        const intensity = Math.max(0, 1 - distanceFromDrop / 8);
        
        let colorIndex;
        if (distanceFromDrop < 1) {
          colorIndex = 0; // Bright head
        } else if (distanceFromDrop < 3) {
          colorIndex = 1; // Medium green
        } else if (distanceFromDrop < 6) {
          colorIndex = 2; // Dark green
        } else {
          colorIndex = 3; // Very dark
        }
        
        const color = matrixColors[colorIndex];
        const finalIntensity = intensity * (0.5 + Math.sin(time * 2 + index * 0.1) * 0.5);
        
        colors[i3] = color.r * finalIntensity;
        colors[i3 + 1] = color.g * finalIntensity;
        colors[i3 + 2] = color.b * finalIntensity;
        
        sizes[index] = Math.max(0, finalIntensity * 5);
        
        // Add depth movement
        positions[i3 + 2] += Math.sin(time * 0.5 + index * 0.05) * 0.1;
      }
    }
    
    ref.current.geometry.attributes.color.needsUpdate = true;
    ref.current.geometry.attributes.size.needsUpdate = true;
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <PointMaterial
        size={3}
        transparent
        opacity={1}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// Cinematic camera controller
function CinematicCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Cinematic camera movement
    camera.position.x = Math.sin(time * 0.1) * 5;
    camera.position.y = Math.cos(time * 0.15) * 3;
    camera.position.z = 30 + Math.sin(time * 0.05) * 10;
    
    // Look at origin with slight offset
    camera.lookAt(
      Math.sin(time * 0.2) * 2,
      Math.cos(time * 0.25) * 1,
      0
    );
  });
  
  return null;
}

interface CinematicSceneProps {
  className?: string;
  enableCameraMovement?: boolean;
}

export function CinematicScene({ 
  className = '', 
  enableCameraMovement = true 
}: CinematicSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.1} color="#001122" />
        
        {/* Key Light */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          color="#00ff41"
          castShadow
        />
        
        {/* Fill Light */}
        <directionalLight 
          position={[-10, 5, 5]} 
          intensity={0.3}
          color="#00d4ff"
        />
        
        {/* Rim Light */}
        <directionalLight 
          position={[0, -10, 10]} 
          intensity={0.5}
          color="#8b5cf6"
        />
        
        {/* Moving Accent Lights */}
        <pointLight 
          position={[Math.sin(Date.now() * 0.001) * 20, 10, 10]} 
          color="#ff0040" 
          intensity={0.4}
          distance={50}
        />
        <pointLight 
          position={[Math.cos(Date.now() * 0.0015) * 15, -10, 5]} 
          color="#00ffff" 
          intensity={0.3}
          distance={40}
        />

        {/* Cinematic Camera Movement */}
        {enableCameraMovement && <CinematicCamera />}

        {/* 3D Elements */}
        <Suspense fallback={null}>
          {/* Enhanced particle field */}
          <CinematicParticles count={6000} />
          
          {/* Cinematic Matrix rain */}
          <CinematicMatrix columns={35} rows={50} />
          
          {/* Floating holograms */}
          <FloatingHolograms count={12} />
        </Suspense>

        {/* Post-processing effects would go here */}
        <fog attach="fog" args={['#000000', 50, 200]} />
      </Canvas>
    </div>
  );
}