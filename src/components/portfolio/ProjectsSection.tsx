'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useThemeColors } from '@/contexts/ThemeContext';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: 'COMPLETED' | 'ONGOING' | 'ARCHIVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  image: string;
  details: {
    target: string;
    methodology: string[];
    findings: string;
    impact: string;
    timeline?: string;
  };
}

const projects: Project[] = [
  {
    id: 'COMP_001',
    title: 'PCI_DSS_V4_TRAINING_PROGRAM',
    category: 'Compliance Training',
    description: 'Designed and delivered comprehensive training sessions on PCI DSS v4.0 updates with gap assessments, case studies, and remediation plans for stakeholders.',
    technologies: ['PCI DSS v4.0', 'Gap Assessment', 'Training Materials', 'Case Studies', 'Remediation Planning'],
    status: 'COMPLETED',
    priority: 'HIGH',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48d2cf9e-69d9-41cf-adce-7f3a73066371.png',
    details: {
      target: 'Enterprise stakeholders and development teams',
      methodology: ['Gap analysis', 'Interactive workshops', 'Case study review', 'Action plan development'],
      findings: 'Identified 15+ areas requiring v4.0 compliance updates',
      impact: 'Enhanced organizational PCI DSS compliance readiness',
      timeline: 'Q2 2024 - Q3 2024'
    }
  },
  {
    id: 'COMP_002', 
    title: 'PCI_DSS_COMPLIANCE_AUDIT',
    category: 'Compliance Audit',
    description: 'Comprehensive evidence review, access control verification, encryption standards assessment, and action plans to strengthen cardholder data protection.',
    technologies: ['PCI DSS SAQ-D', 'Evidence Management', 'Access Controls', 'Encryption Standards', 'Risk Assessment'],
    status: 'COMPLETED',
    priority: 'CRITICAL',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1abd5848-65e4-4787-8cb5-d7e5cfd49d7f.png',
    details: {
      target: 'Financial services organization with card processing',
      methodology: ['Evidence collection', 'Control testing', 'Gap analysis', 'Remediation planning'],
      findings: 'Strengthened access controls and encryption implementations',
      impact: 'Achieved full PCI DSS compliance and audit readiness',
      timeline: 'Q1 2024 - Q2 2024'
    }
  },
  {
    id: 'COMP_003',
    title: 'NETWORK_MIGRATION_OPTIMIZATION',
    category: 'Network Security',
    description: 'Reorganized ADCs, hardened switches, aligned APs, and tuned QoS to improve performance and security for enterprise employees.',
    technologies: ['ADCs', 'Cisco Switches', 'Access Points', 'QoS Tuning', 'Network Hardening'],
    status: 'COMPLETED',
    priority: 'HIGH',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d8844f0-ad6f-461f-8f00-4b595a057a98.png',
    details: {
      target: 'Enterprise network infrastructure at Isourse Technologies',
      methodology: ['Network assessment', 'Hardware optimization', 'Security hardening', 'Performance tuning'],
      findings: 'Improved network performance by 40% while enhancing security',
      impact: 'Enhanced user experience and strengthened network security posture',
      timeline: 'Sep 2022 - Mar 2023'
    }
  },
  {
    id: 'COMP_004',
    title: 'DHCP_SNOOPING_PORT_SECURITY',
    category: 'Network Security',
    description: 'Implemented comprehensive protections against MITM attack vectors including DHCP spoofing and MAC flooding on Cisco switch infrastructure.',
    technologies: ['Cisco IOS', 'DHCP Snooping', 'Port Security', 'MAC Address Tables', 'MITM Protection'],
    status: 'COMPLETED',
    priority: 'HIGH',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d12f3267-603d-421d-830d-861bb996a664.png',
    details: {
      target: 'Corporate Cisco switch infrastructure',
      methodology: ['Network topology analysis', 'Security configuration', 'Testing and validation', 'Documentation'],
      findings: 'Successfully prevented DHCP spoofing and MAC flooding attacks',
      impact: 'Eliminated MITM attack vectors and enhanced network integrity',
      timeline: 'Q4 2022'
    }
  },
  {
    id: 'COMP_005',
    title: 'BOOMSCAN_ORCHESTRATOR',
    category: 'Security Tools',
    description: 'Developed one-click orchestrator for ZAP, Nuclei, Trivy, Semgrep with Docker images and comprehensive evidence output for audit documentation.',
    technologies: ['PowerShell', 'Python', 'Docker', 'OWASP ZAP', 'Nuclei', 'Trivy', 'Semgrep'],
    status: 'ONGOING',
    priority: 'MEDIUM',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4419f2cb-8331-4fa4-b689-29884189c217.png',
    details: {
      target: 'Security testing automation and evidence generation',
      methodology: ['Tool integration', 'Docker containerization', 'Output standardization', 'Evidence formatting'],
      findings: 'Reduced security testing time by 70% with standardized reporting',
      impact: 'Streamlined security assessment workflows and audit evidence generation',
      timeline: '2024 - Present'
    }
  },
  {
    id: 'COMP_006',
    title: 'ISO_27001_IMPLEMENTATION',
    category: 'ISO Compliance',
    description: 'Led ISO/IEC 27001:2022 implementation covering all 94 Annex A controls with comprehensive documentation and evidence management systems.',
    technologies: ['ISO 27001:2022', 'Annex A Controls', 'Risk Management', 'Policy Development', 'ISMS'],
    status: 'COMPLETED',
    priority: 'CRITICAL',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6924ef01-bb52-4ded-90b2-8a5a58abe46a.png',
    details: {
      target: 'Enterprise information security management system',
      methodology: ['Gap assessment', 'Control implementation', 'Policy development', 'Training delivery'],
      findings: 'Successfully implemented 94 Annex A controls with full documentation',
      impact: 'Achieved ISO 27001 certification readiness and enhanced security posture',
      timeline: 'Q3 2023 - Q1 2024'
    }
  }
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const colors = useThemeColors();

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'COMPLETED': return `text-green-400 bg-green-400/20`;
      case 'ONGOING': return `text-yellow-400 bg-yellow-400/20`;
      case 'ARCHIVED': return `text-gray-400 bg-gray-400/20`;
      default: return `text-gray-400 bg-gray-400/20`;
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'LOW': return `text-blue-400 bg-blue-400/20`;
      case 'MEDIUM': return `text-yellow-400 bg-yellow-400/20`;
      case 'HIGH': return `text-orange-400 bg-orange-400/20`;
      case 'CRITICAL': return `text-red-400 bg-red-400/20`;
      default: return `text-gray-400 bg-gray-400/20`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-blue-900/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="COMPLIANCE_OPERATIONS.log"
            className="text-3xl md:text-5xl font-bold mb-6"
            autoGlitch={true}
            glitchInterval={6000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-current to-current mx-auto mb-4" style={{ color: colors.primary }} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            GRC projects, compliance implementations, and security enablement initiatives. 
            Building audit-ready programs and evidence streams.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card 
                className="h-full bg-gray-900/50 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 overflow-hidden border-2"
                style={{ 
                  borderColor: colors.border + '30',
                  boxShadow: `0 0 10px ${colors.glow}20`
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      filter: 'contrast(1.1) saturate(0.9) brightness(0.8)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-mono ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                  
                  {/* Priority Level */}
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-mono ${getPriorityColor(project.priority)}`}>
                    PRIORITY: {project.priority}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono" style={{ color: colors.primary }}>{project.id}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs font-mono" style={{ color: colors.secondary }}>{project.category}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 font-mono group-hover:text-current transition-colors" style={{ color: colors.primary }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-500 rounded text-xs font-mono">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-transparent border text-xs font-mono transition-all duration-300"
                    style={{
                      borderColor: colors.border + '30',
                      color: colors.primary,
                    }}
                    size="sm"
                  >
                    ACCESS_DETAILS.exe
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card 
                className="bg-gray-900 backdrop-blur-sm border-2"
                style={{ borderColor: colors.border + '50' }}
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                    style={{
                      filter: 'contrast(1.1) saturate(0.9) brightness(0.8)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  <Button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 w-8 h-8 p-0"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-lg font-mono" style={{ color: colors.primary }}>{selectedProject.id}</span>
                    <div className={`px-3 py-1 rounded ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </div>
                    <div className={`px-3 py-1 rounded ${getPriorityColor(selectedProject.priority)}`}>
                      PRIORITY: {selectedProject.priority}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-mono font-bold mb-3" style={{ color: colors.primary }}>TARGET:</h4>
                        <p className="text-gray-300">{selectedProject.details.target}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-mono font-bold mb-3" style={{ color: colors.primary }}>METHODOLOGY:</h4>
                        <ul className="space-y-2">
                          {selectedProject.details.methodology.map((method, index) => (
                            <li key={index} className="text-gray-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary }} />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {selectedProject.details.timeline && (
                        <div>
                          <h4 className="font-mono font-bold mb-3" style={{ color: colors.secondary }}>TIMELINE:</h4>
                          <p className="text-gray-300">{selectedProject.details.timeline}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-mono font-bold mb-3" style={{ color: colors.secondary }}>KEY FINDINGS:</h4>
                        <p className="text-gray-300">{selectedProject.details.findings}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-mono font-bold mb-3" style={{ color: colors.secondary }}>IMPACT:</h4>
                        <p className="text-gray-300">{selectedProject.details.impact}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-mono font-bold mb-3" style={{ color: colors.accent }}>TECHNOLOGIES:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded font-mono text-sm"
                              style={{ 
                                backgroundColor: colors.accent + '20',
                                color: colors.accent 
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}