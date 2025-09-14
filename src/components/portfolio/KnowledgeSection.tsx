'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { HolographicDisplay } from '../animations/CinematicEffects';
import { Card } from '../ui/card';
import { useThemeColors } from '@/contexts/ThemeContext';

export function KnowledgeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const colors = useThemeColors();

  const certifications = [
    {
      name: 'ISC2 CC',
      status: 'Candidate',
      description: 'Certified in Cybersecurity',
      level: 'FOUNDATIONAL',
      color: colors.primary
    },
    {
      name: 'Fortinet NSE',
      status: 'Levels 1, 2, 3',
      description: 'Network Security Expert',
      level: 'INTERMEDIATE',
      color: colors.secondary
    },
    {
      name: 'Cisco Cybersecurity',
      status: 'Multiple Tracks',
      description: 'Intro to Cybersecurity • CTM • IoT',
      level: 'FOUNDATIONAL',
      color: colors.accent
    },
    {
      name: 'IBM Compliance',
      status: 'Certified',
      description: 'Cybersecurity Compliance Framework',
      level: 'INTERMEDIATE',
      color: colors.primary
    }
  ];

  const skills = [
    {
      category: 'GRC Frameworks',
      items: ['PCI DSS v4.0', 'ISO/IEC 27001:2022', 'SOC 1/2', 'GDPR', 'NIST'],
      icon: '🛡️'
    },
    {
      category: 'Network & Infrastructure',
      items: ['VLAN Management', 'ADCs', 'Switching', 'Access Points', 'QoS'],
      icon: '🌐'
    },
    {
      category: 'Security Operations',
      items: ['SIEM', 'Incident Response', 'Threat Analysis', 'Risk Assessment', 'Vulnerability Management'],
      icon: '🔍'
    },
    {
      category: 'Development & Tools',
      items: ['Python', 'PowerShell', 'Bash', 'Docker', 'Raspberry Pi'],
      icon: '⚙️'
    }
  ];

  const achievements = [
    {
      title: 'PCI DSS v4.0 Expert',
      description: 'Led training and implementation of new v4.0 requirements',
      year: '2024',
      impact: 'HIGH'
    },
    {
      title: 'ISO 27001 Implementation',
      description: 'Successfully implemented all 94 Annex A controls',
      year: '2024',
      impact: 'CRITICAL'
    },
    {
      title: 'Network Security Enhancement',
      description: 'Improved network performance by 40% while strengthening security',
      year: '2023',
      impact: 'HIGH'
    },
    {
      title: 'Compliance Automation',
      description: 'Developed BOOMscan orchestrator reducing testing time by 70%',
      year: '2024',
      impact: 'MEDIUM'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="knowledge"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-green-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="KNOWLEDGE_BASE.encrypted"
            className="text-3xl md:text-5xl font-bold mb-6"
            autoGlitch={true}
            glitchInterval={8000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-current to-current mx-auto mb-4" style={{ color: colors.primary }} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Certifications, skills matrix, and professional achievements in GRC and cybersecurity domains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HolographicDisplay intensity={0.8}>
              <Card className="h-full bg-gray-900/50 border-2 backdrop-blur-sm p-6" style={{ borderColor: colors.border + '30' }}>
                <h3 className="text-xl font-bold mb-6 font-mono" style={{ color: colors.primary }}>
                  CERTIFICATIONS.log
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-current transition-colors"
                      style={{ borderColor: colors.border + '20' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-mono font-bold" style={{ color: cert.color }}>{cert.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded font-mono">
                          {cert.level}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{cert.description}</p>
                      <p className="text-xs font-mono" style={{ color: colors.secondary }}>
                        Status: {cert.status}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </HolographicDisplay>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HolographicDisplay intensity={0.8}>
              <Card className="h-full bg-gray-900/50 border-2 backdrop-blur-sm p-6" style={{ borderColor: colors.border + '30' }}>
                <h3 className="text-xl font-bold mb-6 font-mono" style={{ color: colors.primary }}>
                  SKILLS_MATRIX.sys
                </h3>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{skillGroup.icon}</span>
                        <h4 className="font-mono font-bold text-white">{skillGroup.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded text-xs font-mono transition-colors hover:scale-105 duration-200"
                            style={{
                              backgroundColor: colors.primary + '20',
                              color: colors.primary,
                              border: `1px solid ${colors.primary}30`
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </HolographicDisplay>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HolographicDisplay intensity={0.8}>
              <Card className="h-full bg-gray-900/50 border-2 backdrop-blur-sm p-6" style={{ borderColor: colors.border + '30' }}>
                <h3 className="text-xl font-bold mb-6 font-mono" style={{ color: colors.primary }}>
                  ACHIEVEMENTS.dat
                </h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                      className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-current transition-colors"
                      style={{ borderColor: colors.border + '20' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-mono font-bold text-white text-sm">{achievement.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-400">{achievement.year}</span>
                          <span 
                            className={`text-xs px-2 py-1 rounded font-mono ${
                              achievement.impact === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                              achievement.impact === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {achievement.impact}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </HolographicDisplay>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <HolographicDisplay intensity={1.0}>
            <Card className="bg-gray-900/50 border-2 backdrop-blur-sm p-8" style={{ borderColor: colors.border + '30' }}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 font-mono" style={{ color: colors.primary }}>
                  EDUCATION_PROTOCOL.active
                </h3>
                <div className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">
                        MCA (Cyber Security)
                      </h4>
                      <p className="font-mono mb-2" style={{ color: colors.secondary }}>
                        Jain University
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        Dec 2023 – Dec 2025 • Thesis & projects in cybersecurity and information security
                      </p>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs font-mono text-gray-400">
                          STATUS: IN_PROGRESS
                        </span>
                      </div>
                    </div>
                    <div className="w-px h-24 bg-gray-700 hidden md:block" />
                    <div className="flex-1 text-center md:text-right">
                      <div className="text-lg font-bold mb-2" style={{ color: colors.accent }}>
                        CURRENT FOCUS
                      </div>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>• Cybersecurity Research</div>
                        <div>• Information Security Thesis</div>
                        <div>• Advanced GRC Studies</div>
                        <div>• Practical Implementation Projects</div>
                      </div>
                    </div>
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