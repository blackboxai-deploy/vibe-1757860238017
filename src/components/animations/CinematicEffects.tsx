'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cinematic screen distortion overlay
export function ScreenDistortion({ intensity = 0.3, active = true }: { 
  intensity?: number; 
  active?: boolean; 
}) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay">
      {/* Chromatic aberration */}
      <div 
        className="absolute inset-0 bg-red-500 opacity-10"
        style={{
          transform: `translate(${intensity}px, 0)`,
          mixBlendMode: 'screen',
        }}
      />
      <div 
        className="absolute inset-0 bg-blue-500 opacity-10"
        style={{
          transform: `translate(-${intensity}px, 0)`,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Film grain */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          animation: 'grain 0.1s infinite',
        }}
      />
      
      {/* VHS tracking lines */}
      <div 
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )`,
          animation: 'tracking 0.3s infinite linear',
        }}
      />
    </div>
  );
}

// Cinematic loading sequence
export function CinematicLoader({ onComplete }: { onComplete?: () => void }) {
  const [loadingStage, setLoadingStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingStages = [
    'INITIALIZING_NEURAL_NETWORK...',
    'DECRYPTING_SECURITY_PROTOCOLS...',
    'ESTABLISHING_SECURE_CONNECTION...',
    'LOADING_CLASSIFIED_DATA...',
    'ACTIVATING_DEFENSE_SYSTEMS...',
    'CINEMATIC_MODE_ENGAGED...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (loadingStage < loadingStages.length - 1) {
            setLoadingStage(prev => prev + 1);
            return 0;
          } else {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 500);
            return 100;
          }
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loadingStage, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="text-center max-w-2xl px-8">
        {/* Central loading indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-4 border-transparent border-t-green-400 rounded-full"
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 border-2 border-transparent border-r-cyan-400 rounded-full"
            />
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          key={loadingStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-mono text-green-400 mb-4">
            {loadingStages[loadingStage]}
          </h2>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-400 font-mono text-sm">PROGRESS</span>
            <span className="text-green-400 font-mono text-sm">
              {Math.floor(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* System status */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="text-green-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              NEURAL_NET: ONLINE
            </div>
          </div>
          <div className="text-cyan-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              SECURITY: MAXIMUM
            </div>
          </div>
          <div className="text-purple-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              VISUALS: ENHANCED
            </div>
          </div>
          <div className="text-yellow-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              MODE: CINEMATIC
            </div>
          </div>
        </div>
      </div>

      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 font-mono text-sm"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: -20,
              opacity: 0.5 
            }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 20,
              opacity: [0.5, 1, 0.5, 0] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear' 
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Cinematic section transitions
export function SectionTransition({ 
  isVisible, 
  direction = 'up',
  children 
}: { 
  isVisible: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
}) {
  const getTransition = () => {
    switch (direction) {
      case 'down':
        return { y: [-100, 0], opacity: [0, 1] };
      case 'left':
        return { x: [-100, 0], opacity: [0, 1] };
      case 'right':
        return { x: [100, 0], opacity: [0, 1] };
      default:
        return { y: [100, 0], opacity: [0, 1] };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.215, 0.61, 0.355, 1],
        delay: 0.1
      }}
    >
      {children}
    </motion.div>
  );
}

// Holographic display effect
export function HolographicDisplay({ 
  children, 
  intensity = 1,
  className = '' 
}: { 
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Holographic layers */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, 
            rgba(0, 255, 65, ${0.1 * intensity}) 0%,
            rgba(0, 212, 255, ${0.1 * intensity}) 25%,
            rgba(139, 92, 246, ${0.1 * intensity}) 50%,
            rgba(255, 0, 64, ${0.1 * intensity}) 75%,
            rgba(0, 255, 65, ${0.1 * intensity}) 100%
          )`,
          backgroundSize: '400% 400%',
          animation: 'holographicShift 4s ease infinite',
          borderRadius: 'inherit',
        }}
      />
      
      {/* Scan lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 255, 65, ${0.1 * intensity}) 1px,
            rgba(0, 255, 65, ${0.1 * intensity}) 2px
          )`
        }}
      />
      
      {/* Flicker effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-white"
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{ 
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 2,
        }}
      />
    </div>
  );
}

// Cinematic text reveal
export function CinematicTextReveal({ 
  text, 
  delay = 0,
  className = '',
  onComplete 
}: { 
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [visibleChars, setVisibleChars] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars(prev => {
          if (prev >= text.length) {
            clearInterval(interval);
            onComplete?.();
            return text.length;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={index < visibleChars ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={index === visibleChars - 1 ? 'text-green-400' : ''}
        >
          {char}
        </motion.span>
      ))}
      {visibleChars < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-green-400"
        >
          |
        </motion.span>
      )}
    </span>
  );
}