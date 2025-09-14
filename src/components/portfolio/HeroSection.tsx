'use client';

import { useEffect, useRef } from 'react';
import { SimpleScene } from '../three/SimpleScene';
import { GlitchText } from '../animations/GlitchText';
import { TypingAnimation } from '../animations/TypingAnimation';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add any additional initialization logic here
    const handleResize = () => {
      // Handle responsive behavior if needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <SimpleScene className="w-full h-full" />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6">
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <GlitchText
              text="CYBER_SECURITY_EXPERT.exe"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider"
              glitchIntensity="medium"
              autoGlitch={true}
              glitchInterval={5000}
              colors={{
                primary: '#00ff41',
                shadow1: '#00d4ff',
                shadow2: '#ff0040',
              }}
            />
          </motion.div>

          {/* Subtitle with typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mb-8 text-lg md:text-xl lg:text-2xl"
          >
            <TypingAnimation
              text={[
                'PENETRATION TESTER',
                'ETHICAL HACKER', 
                'SECURITY ANALYST',
                'CYBER FORENSICS EXPERT',
                'VULNERABILITY RESEARCHER',
              ]}
              speed={100}
              delay={2000}
              loop={true}
              loopDelay={3000}
              textColor="#00d4ff"
              cursorColor="#00ff41"
              className="text-center"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="mb-12"
          >
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Specializing in advanced cybersecurity operations, penetration testing, 
              and ethical hacking. Protecting digital infrastructure through 
              cutting-edge security research and vulnerability assessment.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-3 bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-mono text-sm tracking-wider overflow-hidden"
            >
              <span className="relative z-10">VIEW_OPERATIONS.exe</span>
              <motion.div
                className="absolute inset-0 bg-green-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            
            <Button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono text-sm tracking-wider overflow-hidden"
            >
              <span className="relative z-10">ESTABLISH_CONNECTION.exe</span>
              <motion.div
                className="absolute inset-0 bg-cyan-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          {/* System Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-green-400 font-mono text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                SYSTEM_STATUS: OPERATIONAL
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-green-400/60 cursor-pointer"
                onClick={() => scrollToSection('about')}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
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
          </motion.div>
        </div>
      </div>

      {/* Matrix code overlay */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent z-30" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent z-30" />
    </section>
  );
}