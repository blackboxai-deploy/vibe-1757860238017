'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { HolographicDisplay } from '../animations/CinematicEffects';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useThemeColors } from '@/contexts/ThemeContext';

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const colors = useThemeColors();

  const services = [
    {
      title: 'GRC Program Development',
      icon: '📋',
      description: 'Gap assessments, policies & SOPs, risk registers, evidence lifecycle management, and SRM implementation.',
      features: [
        'PCI DSS v4.0 SAQ-D enablement',
        'ISO/IEC 27001:2022 Annex A mapping',
        'SOC 1/2 readiness & narratives',
        'Risk assessment frameworks',
        'Policy development and maintenance'
      ],
      pricing: 'Enterprise',
      timeline: '4-12 weeks'
    },
    {
      title: 'Compliance Audits & Reviews',
      icon: '🔍',
      description: 'Internal audits, controls testing, access reviews, asset & change tracking with comprehensive reporting.',
      features: [
        'Evidence pack build & maintenance',
        'Findings triage & remediation plans',
        'Board-ready compliance reporting',
        'Control effectiveness testing',
        'Continuous monitoring setup'
      ],
      pricing: 'Project-based',
      timeline: '2-8 weeks'
    },
    {
      title: 'Security Training & Enablement',
      icon: '🎓',
      description: 'Department-wise ISO basics, PCI awareness, incident drills, and secure SDLC training programs.',
      features: [
        'ISO 27001 basics for all teams',
        'PCI DSS scope & responsibilities',
        'Phishing & IR tabletop sessions',
        'Secure development lifecycle',
        'Security awareness programs'
      ],
      pricing: 'Per session',
      timeline: '1-4 weeks'
    }
  ];

  const downloadableResources = [
    {
      title: 'ISO/IEC 27001:2022 Checklist',
      description: 'Excel checklist covering all 94 Annex A controls with progress tracking and compliance mapping.',
      type: 'XLSX',
      size: '2.1 MB',
      downloads: '1.2K+',
      icon: '📊'
    },
    {
      title: 'PCI DSS v4.0 Compliance Kit',
      description: 'Full requirement coverage (260+ items) arranged by the 12 core areas with implementation guidance.',
      type: 'XLSX',
      size: '3.8 MB',
      downloads: '980+',
      icon: '💳'
    },
    {
      title: 'GDPR Compliance Checklist',
      description: 'Comprehensive checklist for GDPR articles & principles — consent, rights, data minimization.',
      type: 'XLSX',
      size: '1.5 MB',
      downloads: '750+',
      icon: '🛡️'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-cyan-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="SERVICES_CATALOG.secure"
            className="text-3xl md:text-5xl font-bold mb-6"
            autoGlitch={true}
            glitchInterval={7000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-current to-current mx-auto mb-4" style={{ color: colors.primary }} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive GRC services, compliance consulting, and security enablement solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <HolographicDisplay intensity={0.7}>
                <Card className="h-full bg-gray-900/50 border-2 backdrop-blur-sm p-6 group hover:scale-105 transition-transform duration-300" style={{ borderColor: colors.border + '30' }}>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold font-mono mb-2" style={{ color: colors.primary }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.secondary }} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-xs font-mono text-gray-400">PRICING</div>
                        <div className="font-mono font-bold" style={{ color: colors.accent }}>{service.pricing}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-gray-400">TIMELINE</div>
                        <div className="font-mono font-bold" style={{ color: colors.accent }}>{service.timeline}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-transparent border-2 font-mono text-xs transition-all duration-300"
                      style={{
                        borderColor: colors.border + '50',
                        color: colors.primary,
                      }}
                    >
                      REQUEST_CONSULTATION.exe
                    </Button>
                  </div>
                </Card>
              </HolographicDisplay>
            </motion.div>
          ))}
        </div>

        {/* Downloadable Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <ThemedGlitchText
              text="COMPLIANCE_RESOURCES.download"
              className="text-2xl md:text-3xl font-bold mb-4"
              autoGlitch={true}
              glitchInterval={9000}
            />
            <p className="text-gray-400">
              Free compliance checklists and frameworks for immediate implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {downloadableResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
              >
                <HolographicDisplay intensity={0.6}>
                  <Card className="bg-gray-900/50 border-2 backdrop-blur-sm p-6 group hover:scale-105 transition-transform duration-300" style={{ borderColor: colors.border + '30' }}>
                    <div className="text-center">
                      <div className="text-3xl mb-4">{resource.icon}</div>
                      <h4 className="font-mono font-bold mb-2" style={{ color: colors.primary }}>
                        {resource.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-4 text-xs font-mono">
                        <span className="text-gray-400">Type: {resource.type}</span>
                        <span className="text-gray-400">Size: {resource.size}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }} />
                        <span className="text-xs font-mono" style={{ color: colors.secondary }}>
                          {resource.downloads} downloads
                        </span>
                      </div>

                      <Button 
                        className="w-full bg-transparent border-2 font-mono text-xs transition-all duration-300"
                        style={{
                          borderColor: colors.border + '50',
                          color: colors.primary,
                        }}
                      >
                        DOWNLOAD_SECURE.exe
                      </Button>
                    </div>
                  </Card>
                </HolographicDisplay>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}