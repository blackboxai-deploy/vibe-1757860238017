'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
  autoGlitch?: boolean;
  glitchInterval?: number;
  colors?: {
    primary: string;
    shadow1: string;
    shadow2: string;
  };
}

export function GlitchText({
  text,
  className = '',
  glitchIntensity = 'medium',
  autoGlitch = true,
  glitchInterval = 3000,
  colors = {
    primary: '#00ff41',
    shadow1: '#00d4ff', 
    shadow2: '#ff0040',
  },
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const glitchCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
  const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

  const getIntensitySettings = () => {
    switch (glitchIntensity) {
      case 'low':
        return { duration: 100, probability: 0.1, maxReplacements: 2 };
      case 'high':
        return { duration: 300, probability: 0.4, maxReplacements: 8 };
      default:
        return { duration: 200, probability: 0.2, maxReplacements: 4 };
    }
  };

  const createGlitchText = () => {
    const settings = getIntensitySettings();
    const chars = text.split('');
    let replacedCount = 0;

    const glitched = chars.map((char) => {
      if (replacedCount < settings.maxReplacements && Math.random() < settings.probability) {
        replacedCount++;
        const useMatrix = Math.random() > 0.5;
        const sourceChars = useMatrix ? matrixChars : glitchCharacters;
        return sourceChars.charAt(Math.floor(Math.random() * sourceChars.length));
      }
      return char;
    }).join('');

    return glitched;
  };

  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    const settings = getIntensitySettings();
    
    // Create multiple glitch frames
    const glitchFrames = 5;
    let frameCount = 0;
    
    const frameInterval = setInterval(() => {
      setGlitchedText(createGlitchText());
      frameCount++;
      
      if (frameCount >= glitchFrames) {
        clearInterval(frameInterval);
        setTimeout(() => {
          setGlitchedText(text);
          setIsGlitching(false);
        }, 50);
      }
    }, settings.duration / glitchFrames);
  };

  useEffect(() => {
    if (autoGlitch) {
      intervalRef.current = setInterval(() => {
        triggerGlitch();
      }, glitchInterval + Math.random() * 2000); // Add some randomness

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoGlitch, glitchInterval]);

  const glitchAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      skewX: [0, -1, 1, -0.5, 0.5, 0],
      filter: [
        'hue-rotate(0deg)',
        'hue-rotate(90deg)',
        'hue-rotate(180deg)',
        'hue-rotate(270deg)',
        'hue-rotate(0deg)',
      ],
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.div
        className="relative z-10"
        variants={glitchAnimation}
        initial="hidden"
        animate={isGlitching ? 'glitch' : 'visible'}
        onMouseEnter={() => !isGlitching && triggerGlitch()}
        style={{
          color: colors.primary,
          textShadow: isGlitching
            ? `2px 0 ${colors.shadow1}, -2px 0 ${colors.shadow2}, 0 2px ${colors.primary}`
            : `0 0 10px ${colors.primary}, 0 0 20px ${colors.primary}`,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 'bold',
        }}
      >
        {glitchedText}
      </motion.div>

      {/* Glitch shadow layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.shadow1,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 'bold',
            }}
            animate={{
              x: [-1, 1, -1],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
          >
            {glitchedText}
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.shadow2,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 'bold',
            }}
            animate={{
              x: [1, -1, 1],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: 'reverse' }}
          >
            {glitchedText}
          </motion.div>
        </>
      )}

      {/* Scanline effect */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.primary}20 50%, transparent 100%)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 0.3,
            ease: 'linear',
            repeat: 2,
          }}
        />
      )}
    </div>
  );
}