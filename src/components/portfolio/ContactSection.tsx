'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ThemedGlitchText } from '../animations/ThemedGlitchText';
import { TerminalTyping } from '../animations/TypingAnimation';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface TerminalLine {
  text: string;
  color?: string;
  prefix?: string;
  delay?: number;
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [terminalState, setTerminalState] = useState<'intro' | 'form' | 'success' | 'error'>('intro');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const introLines: TerminalLine[] = [
    { text: 'Initializing secure communication channel...', delay: 500 },
    { text: 'Establishing encrypted connection...', delay: 200, color: '#00d4ff' },
    { text: 'Connection established. Security level: MAXIMUM', delay: 300, color: '#00ff41' },
    { text: 'Ready to receive transmission.', delay: 400, color: '#00ff41' },
    { text: 'Type HELP for available commands.', delay: 200, color: '#8b5cf6' },
  ];

  const successLines: TerminalLine[] = [
    { text: 'Message transmission complete.', color: '#00ff41' },
    { text: 'Encrypted and stored in secure database.', color: '#00ff41', delay: 300 },
    { text: 'Response will be initiated within 24 hours.', color: '#00d4ff', delay: 500 },
    { text: 'Connection terminated. Stay secure.', color: '#8b5cf6', delay: 700 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalState('success');
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const startNewSession = () => {
    setTerminalState('form');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-blue-900/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ThemedGlitchText
            text="SECURE_COMMUNICATIONS.exe"
            className="text-3xl md:text-5xl font-bold mb-6"
            autoGlitch={true}
            glitchInterval={10000}
          />
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Initiate secure communication protocol. All transmissions are encrypted 
            and monitored for operational security.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-gray-900/80 border-purple-500/30 backdrop-blur-sm overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 p-4 bg-gray-800/50 border-b border-purple-500/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm ml-4 font-mono">
                  secure_comms_terminal.exe
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-mono">SECURE</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm min-h-[400px]">
                {terminalState === 'intro' && (
                  <div>
                    <TerminalTyping
                      lines={introLines}
                      onComplete={() => {
                        setTimeout(() => {
                          setTerminalState('form');
                        }, 1000);
                      }}
                    />
                  </div>
                )}

                {terminalState === 'form' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="text-green-400 mb-4">
                      {'> SECURE_COMMUNICATION_FORM initialized...'}
                    </div>
                    <div className="text-cyan-400 mb-6">
                      {'> Please enter your transmission details:'}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-purple-400 mb-2 font-mono text-xs">
                          {'> OPERATOR_NAME:'}
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-gray-800/50 border-purple-500/30 text-green-400 font-mono placeholder:text-gray-500 focus:border-purple-500"
                          placeholder="Enter your codename..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-purple-400 mb-2 font-mono text-xs">
                          {'> COMM_FREQUENCY (Email):'}
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-800/50 border-purple-500/30 text-green-400 font-mono placeholder:text-gray-500 focus:border-purple-500"
                          placeholder="secure@channel.encrypted"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-purple-400 mb-2 font-mono text-xs">
                          {'> OPERATION_SUBJECT:'}
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className="bg-gray-800/50 border-purple-500/30 text-green-400 font-mono placeholder:text-gray-500 focus:border-purple-500"
                          placeholder="Mission briefing required..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-purple-400 mb-2 font-mono text-xs">
                          {'> TRANSMISSION_CONTENT:'}
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="bg-gray-800/50 border-purple-500/30 text-green-400 font-mono placeholder:text-gray-500 focus:border-purple-500 min-h-[100px] resize-none"
                          placeholder="Enter your secure message here..."
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          className="bg-green-500/20 hover:bg-green-500/40 border border-green-500/50 text-green-400 font-mono text-xs tracking-wider"
                        >
                          TRANSMIT_MESSAGE.exe
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setTerminalState('intro')}
                          className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-400 font-mono text-xs tracking-wider"
                        >
                          ABORT_MISSION.exe
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {terminalState === 'success' && (
                  <div>
                    <TerminalTyping
                      lines={successLines}
                      onComplete={() => {
                        setTimeout(() => {
                          setTerminalState('intro');
                        }, 3000);
                      }}
                    />
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Contact Info & Security Notes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <Card className="p-6 bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-purple-400 mb-6 font-mono">
                COMMUNICATION_CHANNELS.cfg
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded border border-purple-500/20">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 font-mono text-lg">@</span>
                  </div>
                  <div>
                    <div className="text-gray-300 font-mono">EMAIL_PRIMARY</div>
                    <div className="text-green-400 text-sm font-mono">apardeepsingh@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded border border-purple-500/20">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-400 font-mono text-lg">#</span>
                  </div>
                  <div>
                    <div className="text-gray-300 font-mono">LINKEDIN_PROFESSIONAL</div>
                    <div className="text-cyan-400 text-sm font-mono">linkedin.com/in/apardeep-singh</div>
                  </div>
                </div>
                
                <div 
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded border border-purple-500/20 cursor-pointer hover:border-purple-500/40 transition-colors group"
                  onClick={() => window.open('https://drive.google.com/file/d/11HlimTS8ni2j6CAAIPG5qMHVR7vmSj0E/view', '_blank')}
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <span className="text-purple-400 font-mono text-lg">📄</span>
                  </div>
                  <div>
                    <div className="text-gray-300 font-mono">RESUME_DOWNLOAD</div>
                    <div className="text-purple-400 text-sm font-mono">Professional CV & Experience</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Notice */}
            <Card className="p-6 bg-red-900/10 border-red-500/30 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-red-400 mb-4 font-mono">
                SECURITY_PROTOCOL.alert
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    All communications are monitored and encrypted using military-grade protocols.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    Response time: 24-48 hours for non-critical operations.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    For urgent security incidents, use emergency protocols only.
                  </p>
                </div>
              </div>
            </Card>

            {/* Location & Availability */}
            <Card className="p-6 bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono">
                OPERATIONAL_STATUS.sys
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded">
                  <span className="text-gray-300 font-mono text-sm">TIMEZONE</span>
                  <span className="text-green-400 font-mono text-sm">UTC-05:00 (EST)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded">
                  <span className="text-gray-300 font-mono text-sm">AVAILABILITY</span>
                  <span className="text-green-400 font-mono text-sm">24/7 MONITORING</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded">
                  <span className="text-gray-300 font-mono text-sm">LOCATION</span>
                  <span className="text-cyan-400 font-mono text-sm">[CLASSIFIED]</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded">
                  <span className="text-gray-300 font-mono text-sm">SECURITY_LEVEL</span>
                  <span className="text-red-400 font-mono text-sm">MAXIMUM</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}