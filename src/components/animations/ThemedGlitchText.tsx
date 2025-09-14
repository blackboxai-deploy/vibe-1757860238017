'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, useThemeColors } from '@/contexts/ThemeContext';

interface ThemedGlitchTextProps {
  text: string;
  className?: string;
  autoGlitch?: boolean;
  glitchInterval?: number;
}

export function ThemedGlitchText({
  text,
  className = '',
  autoGlitch = true,
  glitchInterval = 3000,
}: ThemedGlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { themeConfig } = useTheme();
  const colors = useThemeColors();

  const glitchCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
  const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';

  const getIntensitySettings = () => {
    switch (themeConfig.effects.glitchLevel) {
      case 'low':
        return { duration: 80, probability: 0.08, maxReplacements: 1 };
      case 'high':
        return { duration: 250, probability: 0.3, maxReplacements: 6 };
      case 'extreme':
        return { duration: 400, probability: 0.5, maxReplacements: 10 };
      default:
        return { duration: 150, probability: 0.15, maxReplacements: 3 };
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
    
    const glitchFrames = themeConfig.effects.glitchLevel === 'extreme' ? 8 : 
                         themeConfig.effects.glitchLevel === 'high' ? 6 : 4;
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
      const baseInterval = glitchInterval;
      const randomness = themeConfig.effects.glitchLevel === 'extreme' ? 1000 : 2000;
      
      intervalRef.current = setInterval(() => {
        triggerGlitch();
      }, baseInterval + Math.random() * randomness);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoGlitch, glitchInterval, themeConfig]);

  const glitchAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6 * themeConfig.effects.animationSpeed,
        ease: 'easeOut' as const,
      },
    },
    glitch: {
      x: themeConfig.effects.glitchLevel === 'extreme' ? [0, -4, 4, -3, 3, -2, 2, 0] : [0, -2, 2, -1, 1, 0],
      skewX: [0, -2, 2, -1, 1, 0],
      filter: [
        'hue-rotate(0deg) contrast(1)',
        'hue-rotate(90deg) contrast(1.5)',
        'hue-rotate(180deg) contrast(1.2)',
        'hue-rotate(270deg) contrast(1.8)',
        'hue-rotate(0deg) contrast(1)',
      ],
      transition: {
        duration: 0.2 * themeConfig.effects.animationSpeed,
        ease: 'easeInOut' as const,
      },
    },
  };

  const getThemeShadows = () => {
    if (isGlitching) {
      return `2px 0 ${colors.secondary}, -2px 0 ${colors.accent}, 0 2px ${colors.primary}`;
    }
    return `0 0 ${10 * themeConfig.effects.intensity}px ${colors.primary}, 0 0 ${20 * themeConfig.effects.intensity}px ${colors.primary}`;
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
          textShadow: getThemeShadows(),
          fontFamily: themeConfig.typography.primaryFont,
          fontWeight: themeConfig.typography.weight,
          letterSpacing: themeConfig.typography.letterSpacing,
        }}
      >
        {glitchedText}
      </motion.div>

      {/* Themed glitch shadow layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.secondary,
              fontFamily: themeConfig.typography.primaryFont,
              fontWeight: themeConfig.typography.weight,
            }}
            animate={{
              x: [-1, 1, -1],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{ 
              duration: 0.1 * themeConfig.effects.animationSpeed, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          >
            {glitchedText}
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 z-0"
            style={{
              color: colors.accent,
              fontFamily: themeConfig.typography.primaryFont,
              fontWeight: themeConfig.typography.weight,
            }}
            animate={{
              x: [1, -1, 1],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{ 
              duration: 0.15 * themeConfig.effects.animationSpeed, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          >
            {glitchedText}
          </motion.div>
        </>
      )}

      {/* Themed scanline effect */}
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
            duration: 0.3 * themeConfig.effects.animationSpeed,
            ease: 'linear',
            repeat: themeConfig.effects.glitchLevel === 'extreme' ? 4 : 2,
          }}
        />
      )}
    </div>
  );
}