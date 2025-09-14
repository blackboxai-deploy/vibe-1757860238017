'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { ParticleField } from './ParticleField';
import { MatrixRain } from './MatrixRain';
import { FloatingGeometry } from './FloatingGeometry';

interface HeroSceneProps {
  className?: string;
  enableControls?: boolean;
  particleCount?: number;
  showMatrix?: boolean;
  showGeometry?: boolean;
}

export function HeroScene({
  className = '',
  enableControls = false,
  particleCount = 3000,
  showMatrix = true,
  showGeometry = true,
}: HeroSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 30],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.2} />
        <pointLight 
          position={[10, 10, 10]} 
          color="#00ff41" 
          intensity={0.5}
          distance={100}
          decay={2}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          color="#00d4ff" 
          intensity={0.3}
          distance={80}
          decay={2}
        />
        <spotLight
          position={[0, 20, 20]}
          angle={0.3}
          penumbra={1}
          intensity={0.2}
          color="#8b5cf6"
          castShadow
        />

        {/* Camera setup */}
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        {/* Controls for development (disabled in production) */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}

        {/* 3D Elements */}
        <Suspense fallback={null}>
          {/* Background particle field */}
          <ParticleField 
            count={particleCount}
            radius={60}
            speed={0.0005}
            colors={[0x00ff41, 0x00d4ff, 0x8b5cf6]}
            mouseInfluence={true}
          />

          {/* Matrix rain effect */}
          {showMatrix && (
            <MatrixRain 
              columns={25}
              rows={40}
              speed={0.015}
            />
          )}

          {/* Floating geometric shapes */}
          {showGeometry && (
            <FloatingGeometry 
              count={12}
              types={['box', 'sphere', 'torus']}
              colors={[0x00ff41, 0x00d4ff, 0x8b5cf6, 0xff0040]}
              speed={0.008}
              spread={40}
            />
          )}
        </Suspense>

        {/* Post-processing effects would go here */}
      </Canvas>
    </div>
  );
}