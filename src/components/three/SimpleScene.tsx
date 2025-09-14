'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface SimpleSceneProps {
  className?: string;
}

function SimpleParticles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array([
            0, 0, 0,
            1, 1, 1,
            -1, -1, -1,
          ]), 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#00ff41" size={0.1} />
    </points>
  );
}

export function SimpleScene({ className = '' }: SimpleSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
        }}
        camera={{
          position: [0, 0, 5],
          fov: 60,
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#00ff41" intensity={0.5} />
        
        <Suspense fallback={null}>
          <SimpleParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}