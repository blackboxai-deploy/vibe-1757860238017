'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  count?: number;
  types?: ('box' | 'sphere' | 'torus')[];
  colors?: number[];
  speed?: number;
  spread?: number;
}

interface GeometryItem {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  type: 'box' | 'sphere' | 'torus';
  color: number;
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  originalY: number;
}

export function FloatingGeometry({
  count = 15,
  types = ['box', 'sphere', 'torus'],
  colors = [0x00ff41, 0x00d4ff, 0x8b5cf6, 0xff0040],
  speed = 0.01,
  spread = 30,
}: FloatingGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random geometry items
  const geometries = useMemo<GeometryItem[]>(() => {
    return Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      
      return {
        position: [x, y, z],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        scale: Math.random() * 1.5 + 0.5,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ],
        floatSpeed: Math.random() * 0.02 + 0.01,
        originalY: y,
      };
    });
  }, [count, types, colors, spread]);

  // Animate the geometries
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, index) => {
      const geometry = geometries[index];
      
      // Rotation animation
      child.rotation.x += geometry.rotationSpeed[0];
      child.rotation.y += geometry.rotationSpeed[1];
      child.rotation.z += geometry.rotationSpeed[2];
      
      // Floating animation
      child.position.y = geometry.originalY + Math.sin(time * geometry.floatSpeed) * 2;
      
      // Slight orbital movement
      const orbitRadius = 1;
      child.position.x = geometry.position[0] + Math.cos(time * speed * 50) * orbitRadius;
      child.position.z = geometry.position[2] + Math.sin(time * speed * 50) * orbitRadius;
      
      // Pulsing scale effect
      const pulseScale = 1 + Math.sin(time * 2 + index) * 0.1;
      child.scale.setScalar(geometry.scale * pulseScale);
    });

    // Rotate entire group slowly
    groupRef.current.rotation.y = time * speed * 10;
  });

  const createMaterial = (color: number) => {
    return new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.7,
      shininess: 100,
      specular: new THREE.Color(0xffffff),
      emissive: new THREE.Color(color).multiplyScalar(0.1),
      wireframe: Math.random() > 0.7, // Some wireframe objects for variety
    });
  };

  const renderGeometry = (geometry: GeometryItem, index: number) => {
    const material = createMaterial(geometry.color);
    const props = {
      key: index,
      position: geometry.position,
      rotation: geometry.rotation,
      scale: geometry.scale,
      material: material,
    };

    switch (geometry.type) {
      case 'sphere':
        return (
          <Sphere {...props} args={[1, 16, 16]}>
            <primitive object={material} attach="material" />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus {...props} args={[1, 0.3, 8, 16]}>
            <primitive object={material} attach="material" />
          </Torus>
        );
      default:
        return (
          <Box {...props} args={[1, 1, 1]}>
            <primitive object={material} attach="material" />
          </Box>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {geometries.map((geometry, index) => renderGeometry(geometry, index))}
    </group>
  );
}