'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { Card } from '../ui/card';
import { CinematicTerminal } from '../ui/CinematicTerminal';
import { useThemeColors } from '@/contexts/ThemeContext';

interface StatisticProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function AnimatedStatistic({ value, label, suffix = '', delay = 0 }: StatisticProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        const duration = 2000;
        const increment = value / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);

        return () => clearInterval(timer);
      }, delay);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold mb-2 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
        {count}
        <span style={{ color: 'var(--theme-secondary)' }}>{suffix}</span>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const colors = useThemeColors();

  const terminalCommands = [
    {
      command: 'whoami',
      output: ['Apardeep Singh', 'Compliance Specialist • GRC Expert • Cybersecurity'],
      delay: 500
    },
    {
      command: 'cat profile.txt',
      output: [
        'Delhi-based GRC specialist at plutos ONE.',
        'Aligning PCI DSS, ISO 27001, SOC 1/2 frameworks.',
        'MCA (Cyber Security) @ Jain University.',
        'Building audit-ready programs and evidence streams.'
      ],
      delay: 1000
    },
    {
      command: 'ls certifications/',
      output: [
        'ISC2_CC_candidate.cert',
        'Fortinet_NSE_1_2_3.cert',
        'Cisco_Cybersecurity_tracks.cert',
        'IBM_Compliance_Framework.cert'
      ],
      delay: 800
    },
    {
      command: 'cat current_mission.txt',
      output: [
        'PRIMARY: PCI DSS v4.0 compliance implementation',
        'SECONDARY: ISO 27001:2022 Annex A controls',
        'ONGOING: MCA thesis research in cybersecurity',
        'STATUS: All systems operational'
      ],
      delay: 1200
    }
  ];

  const skills = [
    { name: 'PCI DSS v4.0', level: 95 },
    { name: 'ISO/IEC 27001:2022', level: 92 },
    { name: 'SOC 1/2 Compliance', level: 90 },
    { name: 'Risk Assessment', level: 88 },
    { name: 'Internal Audits', level: 85 },
    { name: 'Network Security', level: 87 },
    { name: 'SIEM & Incident Response', level: 83 },
    { name: 'Security Training', level: 91 },
  ];

  const certifications = [
    'ISC2 CC - Certified in Cybersecurity (Candidate)',
    'Fortinet NSE 1, 2, 3 - Network Security Expert',
    'Cisco: Intro to Cybersecurity • CTM • IoT',
    'IBM: Cybersecurity Compliance Framework',
    'MCA (Cyber Security) - Jain University (In Progress)',
    'Various GRC and Compliance Certifications',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-cyan-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="COMPLIANCE_PROFILE.dat"
            className="text-3xl md:text-5xl font-bold mb-6 text-center"
            autoGlitch={true}
            glitchInterval={8000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Cinematic Terminal */}
            <CinematicTerminal
              title="terminal@apardeep:~"
              commands={terminalCommands}
              autoStart={isInView}
              className="mb-8"
            />
            {/* Profile Info without Image */}
            <Card className="relative p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                  APARDEEP_SINGH_001
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Compliance Specialist • GRC Expert
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)',
                    color: 'var(--theme-primary)'
                  }}>
                    LOCATION: DELHI
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--theme-secondary) 20%, transparent)',
                    color: 'var(--theme-secondary)'
                  }}>
                    STATUS: OPERATIONAL
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--theme-accent) 20%, transparent)',
                    color: 'var(--theme-accent)'
                  }}>
                    CLEARANCE: GRC_EXPERT
                  </span>
                </div>
                
                {/* Company & Education Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-800/50 rounded border" style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)' }}>
                    <div className="font-mono text-sm" style={{ color: 'var(--theme-primary)' }}>COMPANY</div>
                    <div className="text-white font-bold">plutos ONE</div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded border" style={{ borderColor: 'color-mix(in srgb, var(--theme-secondary) 20%, transparent)' }}>
                    <div className="font-mono text-sm" style={{ color: 'var(--theme-secondary)' }}>EDUCATION</div>
                    <div className="text-white font-bold">Jain University</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bio Section */}
            <Card className="p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                MISSION_BRIEFING.txt
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                Compliance Specialist at plutos ONE focused on PCI DSS, ISO 27001, SOC 1/2 — 
                building audit-ready programs, evidence streams, and security culture. 
                Currently pursuing MCA (Cyber Security) at Jain University, keeping 
                academics and practice in perfect sync.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Expertise spans GRC frameworks, internal audits, risk registers, and 
                security enablement. Passionate about bridging compliance frameworks 
                with real-world security implementations across enterprise environments.
              </p>
            </Card>

            {/* Statistics */}
            <Card className="p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-6 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                OPERATION_STATISTICS.log
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <AnimatedStatistic value={50} label="Compliance Audits" suffix="+" delay={200} />
                <AnimatedStatistic value={120} label="Controls Tested" suffix="+" delay={400} />
                <AnimatedStatistic value={100} label="Audit Success Rate" suffix="%" delay={600} />
                <AnimatedStatistic value={3} label="Years Experience" suffix="+" delay={800} />
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Skills & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Skills */}
            <Card className="p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-6 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                EXPERTISE_MATRIX.sys
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300 font-mono">{skill.name}</span>
                      <span className="text-sm font-mono" style={{ color: 'var(--theme-secondary)' }}>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ 
                          background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-6 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                CREDENTIALS.cert
              </h4>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded border transition-colors hover:scale-105 duration-200"
                    style={{ 
                      borderColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)',
                    }}
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--theme-primary)' }} />
                    <span className="text-gray-300 text-sm font-mono">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Tools & Technologies */}
            <Card className="p-6 bg-gray-900/50 theme-border backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-6 font-mono theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                ARSENAL.toolkit
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'PCI DSS v4.0', 'ISO 27001:2022', 'SOC 1/2', 'GDPR', 'NIST',
                  'Risk Assessment', 'Internal Audits', 'Evidence Management', 'Policy Development', 'SRM',
                  'SIEM', 'Incident Response', 'Network Security', 'PowerShell', 'Python',
                  'Docker', 'Raspberry Pi', 'Wireshark', 'OWASP ZAP', 'Nmap'
                ].map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 1 }}
                    className="px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 cursor-default hover:scale-105"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--theme-secondary) 20%, transparent)',
                      color: 'var(--theme-secondary)',
                      border: `1px solid color-mix(in srgb, var(--theme-secondary) 30%, transparent)`
                    }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}