'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemedCinematicScene } from '../three/ThemedCinematicScene';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { CinematicTextReveal, HolographicDisplay, ScreenDistortion } from '../animations/CinematicEffects';
import { TypingAnimation } from '../animations/TypingAnimation';
import { Button } from '../ui/button';
import { useTheme, useThemeColors } from '@/contexts/ThemeContext';

export function CinematicHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [showSecondaryText, setShowSecondaryText] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { scrollY } = useScroll();
  const { themeConfig } = useTheme();
  const colors = useThemeColors();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    // Cinematic sequence timing
    const timer1 = setTimeout(() => setShowSecondaryText(true), 3000);
    const timer2 = setTimeout(() => setShowActions(true), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Screen distortion overlay */}
      <ScreenDistortion intensity={0.5} active={true} />

      {/* Cinematic 3D Background Scene */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <ThemedCinematicScene className="w-full h-full" enableCameraMovement={true} />
      </motion.div>

      {/* Cinematic gradient overlays */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-10"
      >
        {/* Film noir style lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        {/* Dynamic color washes */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Main content with cinematic layering */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="relative z-20 h-full flex items-center justify-center"
      >
        <div className="text-center max-w-6xl mx-auto px-6">
          
          {/* Cinematic title reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="mb-12"
          >
            <HolographicDisplay intensity={1.2} className="mb-8">
              <ThemedGlitchText
                text="APARDEEP.exe"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider"
                autoGlitch={true}
                glitchInterval={4000}
              />
            </HolographicDisplay>

            {/* Cinematic subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="mb-6"
            >
              <div className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-mono">
                <CinematicTextReveal 
                  text="NEURAL NETWORK ACTIVATED"
                  delay={500}
                />
              </div>
            </motion.div>

            {/* Dynamic role display */}
            {showSecondaryText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="mb-8"
              >
                <HolographicDisplay intensity={0.8}>
                  <TypingAnimation
                    text={[
                      'COMPLIANCE SPECIALIST',
                      'GRC EXPERT',
                      'PCI DSS SPECIALIST',
                      'ISO 27001 AUDITOR',
                      'SOC 1/2 CONSULTANT',
                      'RISK MANAGEMENT ANALYST',
                    ]}
                    speed={100}
                    delay={1000}
                    loop={true}
                    loopDelay={3000}
                    textColor={colors.secondary}
                    cursorColor={colors.primary}
                    className="text-lg md:text-xl lg:text-2xl text-center font-mono"
                  />
                </HolographicDisplay>
              </motion.div>
            )}
          </motion.div>

          {/* Mission briefing */}
          {showSecondaryText && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="mb-12"
            >
              <HolographicDisplay intensity={0.6} className="max-w-4xl mx-auto">
                <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-8">
                  <div className="font-mono text-sm mb-4 text-left" style={{ color: colors.primary }}>
                    {'> COMPLIANCE_BRIEFING.secure'}
                  </div>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed text-left">
                    Delhi-based GRC specialist at <span style={{ color: colors.primary }} className="font-mono">plutos ONE</span>. 
                    Aligning PCI DSS, ISO 27001, SOC 1/2 compliance frameworks with real-world security. 
                    MCA (Cyber Security) @ Jain University. Building audit-ready programs with{' '}
                    <span style={{ color: colors.primary }} className="font-mono">100%</span> compliance success rate.
                  </p>
                  <div className="font-mono text-sm mt-4 text-right" style={{ color: colors.secondary }}>
                    {'SECURITY_CLEARANCE: COMPLIANCE_EXPERT'}
                  </div>
                </div>
              </HolographicDisplay>
            </motion.div>
          )}

          {/* Cinematic action buttons */}
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-10 py-4 bg-transparent border-2 border-green-400 text-green-400 hover:text-black transition-all duration-500 font-mono text-base tracking-wider overflow-hidden shadow-lg shadow-green-400/25"
                >
                  <motion.div
                    className="absolute inset-0 bg-green-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
                    />
                    VIEW_COMPLIANCE_WORK.exe
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:text-black transition-all duration-500 font-mono text-base tracking-wider overflow-hidden shadow-lg shadow-cyan-400/25"
                >
                  <motion.div
                    className="absolute inset-0 bg-cyan-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-3 h-3 bg-current rounded-full"
                    />
                    INITIATE_SECURE_COMM.exe
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* System status with cinematic styling */}
          {showActions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            >
              <HolographicDisplay intensity={0.7}>
                <div className="flex items-center gap-6 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 10px #00ff41',
                        '0 0 20px #00ff41',
                        '0 0 10px #00ff41',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 font-mono text-sm">NEURAL_NET: ONLINE</span>
                  </motion.div>
                  
                  <div className="w-px h-4 bg-gray-600" />
                  
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-cyan-400/80 cursor-pointer"
                    onClick={() => scrollToSection('about')}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      <path 
                        d="M7 10L12 15L17 10" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </div>
              </HolographicDisplay>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Cinematic edge vignetting */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/30 to-transparent" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/30 to-transparent" />
      </div>
    </section>
  );
}