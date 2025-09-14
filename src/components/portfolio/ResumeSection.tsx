'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { HolographicDisplay } from '../animations/CinematicEffects';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useThemeColors } from '@/contexts/ThemeContext';

export function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const colors = useThemeColors();

  const resumeStats = [
    { label: 'Years Experience', value: '3+', icon: '⏱️' },
    { label: 'Compliance Audits', value: '50+', icon: '🔍' },
    { label: 'Organizations Helped', value: '25+', icon: '🏢' },
    { label: 'Success Rate', value: '100%', icon: '✅' },
  ];

  const handleResumeDownload = () => {
    window.open('https://drive.google.com/file/d/11HlimTS8ni2j6CAAIPG5qMHVR7vmSj0E/view', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-purple-900/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="PROFESSIONAL_RESUME.pdf"
            className="text-3xl md:text-5xl font-bold mb-6"
            autoGlitch={true}
            glitchInterval={8000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-current to-current mx-auto mb-4" style={{ color: colors.primary }} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Download a comprehensive overview of GRC expertise, compliance achievements, 
            and professional cybersecurity experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Resume Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HolographicDisplay intensity={1.0}>
              <Card className="bg-gray-900/50 border-2 backdrop-blur-sm p-8" style={{ borderColor: colors.border + '30' }}>
                <h3 className="text-2xl font-bold mb-8 font-mono text-center" style={{ color: colors.primary }}>
                  CAREER_STATISTICS.log
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {resumeStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      className="text-center p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-current transition-colors"
                      style={{ borderColor: colors.border + '20' }}
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold font-mono mb-1" style={{ color: colors.primary }}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm font-mono">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="font-mono font-bold mb-4 text-center" style={{ color: colors.secondary }}>
                    RECENT_HIGHLIGHTS
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                      <span className="text-gray-300">Led PCI DSS v4.0 training across multiple organizations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }} />
                      <span className="text-gray-300">Implemented ISO 27001:2022 with all 94 Annex A controls</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                      <span className="text-gray-300">Developed BOOMscan automation reducing testing time by 70%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                      <span className="text-gray-300">Enhanced network security with 40% performance improvement</span>
                    </div>
                  </div>
                </div>
              </Card>
            </HolographicDisplay>
          </motion.div>

          {/* Right Column - Resume Download */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HolographicDisplay intensity={1.2}>
              <Card className="bg-gray-900/50 border-2 backdrop-blur-sm p-8 text-center" style={{ borderColor: colors.border + '30' }}>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl mb-6"
                >
                  📄
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 font-mono" style={{ color: colors.primary }}>
                  DOWNLOAD_RESUME.exe
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Get the complete professional summary including work experience, 
                  certifications, projects, and technical skills in a concise PDF format.
                </p>

                <div className="mb-8 p-4 bg-gray-800/50 rounded border border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <div className="text-gray-400">FORMAT</div>
                      <div style={{ color: colors.secondary }}>PDF</div>
                    </div>
                    <div>
                      <div className="text-gray-400">SIZE</div>
                      <div style={{ color: colors.secondary }}>~250KB</div>
                    </div>
                    <div>
                      <div className="text-gray-400">UPDATED</div>
                      <div style={{ color: colors.secondary }}>2024</div>
                    </div>
                    <div>
                      <div className="text-gray-400">VERSION</div>
                      <div style={{ color: colors.secondary }}>Latest</div>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleResumeDownload}
                    className="w-full bg-transparent border-2 text-lg font-mono py-4 transition-all duration-500 relative overflow-hidden group"
                    style={{
                      borderColor: colors.border,
                      color: colors.primary,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ backgroundColor: colors.primary }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-black">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-xl"
                      >
                        ⬇️
                      </motion.div>
                      DOWNLOAD_CV.exe
                    </span>
                  </Button>
                </motion.div>

                <p className="text-xs text-gray-500 mt-4 font-mono">
                  Secure download via Google Drive • Virus-free • Always current
                </p>
              </Card>
            </HolographicDisplay>
          </motion.div>
        </div>

        {/* Work Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <HolographicDisplay intensity={0.8}>
            <Card className="bg-gray-900/50 border-2 backdrop-blur-sm p-8" style={{ borderColor: colors.border + '30' }}>
              <h3 className="text-2xl font-bold mb-8 font-mono text-center" style={{ color: colors.primary }}>
                WORK_EXPERIENCE.timeline
              </h3>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-800/30 rounded border border-gray-700">
                  <div className="flex-shrink-0">
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">
                      CURRENT
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white mb-1">Compliance Specialist</h4>
                    <p className="text-gray-400 text-sm mb-2">plutos ONE • May 2025 – Present</p>
                    <p className="text-gray-300 text-sm">
                      PCI DSS & ISO 27001 alignment, audits, access reviews, evidence lifecycle management
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-800/30 rounded border border-gray-700">
                  <div className="flex-shrink-0">
                    <div className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded text-xs font-mono">
                      PREVIOUS
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white mb-1">Associate Consultant</h4>
                    <p className="text-gray-400 text-sm mb-2">ControlCase • May 2023 – Apr 2025</p>
                    <p className="text-gray-300 text-sm">
                      Client audits for PCI, ISO, SOC; gap analysis and remediation guidance
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-800/30 rounded border border-gray-700">
                  <div className="flex-shrink-0">
                    <div className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded text-xs font-mono">
                      ARCHIVED
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white mb-1">Network Engineer</h4>
                    <p className="text-gray-400 text-sm mb-2">Isourse Technologies • Sep 2022 – Mar 2023</p>
                    <p className="text-gray-300 text-sm">
                      DLP/IPS/IDS, ADCs, switching & AP optimization, network security hardening
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </HolographicDisplay>
        </motion.div>
      </div>
    </section>
  );
}