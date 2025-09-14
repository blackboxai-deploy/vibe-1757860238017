'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Box, Torus } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import { useThemeColors, useThemeEffects } from '@/contexts/ThemeContext';

// Themed particle system
function ThemedParticles({ count }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const colors = useThemeColors();
  const effects = useThemeEffects();
  const { camera } = useThree();

  const [positions, particleColors, sizes] = useMemo(() => {
    const positions = new Float32Array((count || effects.particleCount) * 3);
    const particleColors = new Float32Array((count || effects.particleCount) * 3);
    const sizes = new Float32Array(count || effects.particleCount);
    
    const colorPalette = [
      new THREE.Color(colors.particle1),
      new THREE.Color(colors.particle2),
      new THREE.Color(colors.particle3),
      new THREE.Color(colors.primary),
      new THREE.Color(colors.secondary),
    ];
    
    for (let i = 0; i < (count || effects.particleCount); i++) {
      const layer = Math.floor(i / ((count || effects.particleCount) / 5));
      const radius = 30 + layer * 20;
      
      const spherical = new THREE.Spherical(
        radius * (0.5 + Math.random() * 0.5) * effects.intensity,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );
      
      const vector = new THREE.Vector3().setFromSpherical(spherical);
      
      positions[i * 3] = vector.x;
      positions[i * 3 + 1] = vector.y;
      positions[i * 3 + 2] = vector.z;
      
      const distance = vector.length();
      const colorIndex = Math.floor((distance / 100) * colorPalette.length);
      const color = colorPalette[Math.min(colorIndex, colorPalette.length - 1)];
      
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 3 + 0.5 * effects.intensity;
    }
    
    return [positions, particleColors, sizes];
  }, [count, effects, colors]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const colors = ref.current.geometry.attributes.color.array as Float32Array;
    
    const cameraPos = camera.position;
    const speed = effects.animationSpeed;
    
    for (let i = 0; i < (count || effects.particleCount); i++) {
      const i3 = i * 3;
      
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];
      const originalZ = positions[i3 + 2];
      
      const waveIntensity = (1 - Math.abs(originalZ) / 100) * effects.intensity;
      positions[i3] = originalX + Math.sin(time * 0.5 * speed + originalY * 0.05) * waveIntensity;
      positions[i3 + 1] = originalY + Math.cos(time * 0.3 * speed + originalX * 0.05) * waveIntensity;
      positions[i3 + 2] = originalZ + Math.sin(time * 0.4 * speed + (originalX + originalY) * 0.03) * 0.5;
      
      const distance = Math.sqrt(
        Math.pow(positions[i3] - cameraPos.x, 2) +
        Math.pow(positions[i3 + 1] - cameraPos.y, 2) +
        Math.pow(positions[i3 + 2] - cameraPos.z, 2)
      );
      
      const pulse = Math.sin(time * 2 * speed + distance * 0.1) * 0.3 + 0.7;
      const intensityMultiplier = effects.intensity;
      colors[i3] *= pulse * intensityMultiplier;
      colors[i3 + 1] *= pulse * intensityMultiplier;
      colors[i3 + 2] *= pulse * intensityMultiplier;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;
    
    ref.current.rotation.x = Math.sin(time * 0.1 * speed) * 0.2;
    ref.current.rotation.y = time * 0.05 * speed;
    ref.current.rotation.z = Math.cos(time * 0.15 * speed) * 0.1;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleColors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <PointMaterial
        size={2 * effects.intensity}
        transparent
        opacity={0.9 * effects.intensity}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// Themed floating holograms
function ThemedHolograms({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const colors = useThemeColors();
  const effects = useThemeEffects();
  
  const holograms = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 60 * effects.intensity,
        (Math.random() - 0.5) * 40 * effects.intensity,
        (Math.random() - 0.5) * 60 * effects.intensity,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: (Math.random() * 2 + 0.5) * effects.intensity,
      type: ['box', 'sphere', 'torus'][Math.floor(Math.random() * 3)] as 'box' | 'sphere' | 'torus',
      colorKey: ['primary', 'secondary', 'accent', 'particle1'][Math.floor(Math.random() * 4)] as keyof typeof colors,
      speed: (Math.random() * 0.02 + 0.01) * effects.animationSpeed,
      orbitRadius: Math.random() * 5 + 2,
    }));
  }, [count, effects, colors]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      const hologram = holograms[i];
      
      child.position.y = hologram.position[1] + Math.sin(time * hologram.speed * 10) * 3 * effects.intensity;
      
      const orbitX = hologram.position[0] + Math.cos(time * hologram.speed * 5) * hologram.orbitRadius;
      const orbitZ = hologram.position[2] + Math.sin(time * hologram.speed * 5) * hologram.orbitRadius;
      
      child.position.x = orbitX;
      child.position.z = orbitZ;
      
      child.rotation.x += hologram.speed * 2;
      child.rotation.y += hologram.speed * 1.5;
      child.rotation.z += hologram.speed * 0.5;
      
      const scaleMultiplier = 1 + Math.sin(time * 3 + i) * 0.2;
      child.scale.setScalar(hologram.scale * scaleMultiplier);
    });
    
    groupRef.current.rotation.y = time * 0.02 * effects.animationSpeed;
  });

  const createThemedMaterial = (colorKey: keyof typeof colors) => {
    const color = new THREE.Color(colors[colorKey]);
    return new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.4 * effects.intensity,
      shininess: 100,
      specular: new THREE.Color(0xffffff),
      emissive: color.clone().multiplyScalar(0.3 * effects.intensity),
      wireframe: Math.random() > 0.5,
    });
  };

  return (
    <group ref={groupRef}>
      {holograms.map((hologram, i) => {
        const material = createThemedMaterial(hologram.colorKey);
        
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

// Themed camera controller
function ThemedCamera() {
  const { camera } = useThree();
  const effects = useThemeEffects();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speed = effects.animationSpeed;
    const intensity = effects.intensity;
    
    camera.position.x = Math.sin(time * 0.1 * speed) * 5 * intensity;
    camera.position.y = Math.cos(time * 0.15 * speed) * 3 * intensity;
    camera.position.z = 30 + Math.sin(time * 0.05 * speed) * 10 * intensity;
    
    camera.lookAt(
      Math.sin(time * 0.2 * speed) * 2,
      Math.cos(time * 0.25 * speed) * 1,
      0
    );
  });
  
  return null;
}

interface ThemedCinematicSceneProps {
  className?: string;
  enableCameraMovement?: boolean;
}

export function ThemedCinematicScene({ 
  className = '', 
  enableCameraMovement = true 
}: ThemedCinematicSceneProps) {
  const colors = useThemeColors();
  const effects = useThemeEffects();

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
        {/* Themed Lighting Setup */}
        <ambientLight intensity={0.1 * effects.intensity} color={colors.background} />
        
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8 * effects.intensity}
          color={colors.primary}
          castShadow
        />
        
        <directionalLight 
          position={[-10, 5, 5]} 
          intensity={0.3 * effects.intensity}
          color={colors.secondary}
        />
        
        <directionalLight 
          position={[0, -10, 10]} 
          intensity={0.5 * effects.intensity}
          color={colors.accent}
        />
        
        <pointLight 
          position={[Math.sin(Date.now() * 0.001) * 20, 10, 10]} 
          color={colors.particle1} 
          intensity={0.4 * effects.intensity}
          distance={50}
        />
        <pointLight 
          position={[Math.cos(Date.now() * 0.0015) * 15, -10, 5]} 
          color={colors.particle2} 
          intensity={0.3 * effects.intensity}
          distance={40}
        />

        {enableCameraMovement && <ThemedCamera />}

        <Suspense fallback={null}>
          <ThemedParticles />
          <ThemedHolograms count={12} />
        </Suspense>

        <fog attach="fog" args={[colors.background, 50 * effects.intensity, 200 * effects.intensity]} />
      </Canvas>
    </div>
  );
}