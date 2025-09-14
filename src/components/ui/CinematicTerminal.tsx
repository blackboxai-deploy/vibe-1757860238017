'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeColors } from '@/contexts/ThemeContext';

interface TerminalCommand {
  command: string;
  output: string | string[];
  delay?: number;
  typing?: boolean;
}

interface CinematicTerminalProps {
  title?: string;
  commands: TerminalCommand[];
  onComplete?: () => void;
  autoStart?: boolean;
  className?: string;
}

export function CinematicTerminal({
  title = 'terminal@apardeep:~',
  commands,
  onComplete,
  autoStart = true,
  className = ''
}: CinematicTerminalProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [displayedCommands, setDisplayedCommands] = useState<Array<{ command: string; output: string[] }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypedText, setCurrentTypedText] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const colors = useThemeColors();

  useEffect(() => {
    if (!autoStart) return;
    
    const timer = setTimeout(() => {
      executeNextCommand();
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoStart]);

  useEffect(() => {
    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, currentTypedText]);

  const executeNextCommand = () => {
    if (currentCommandIndex >= commands.length - 1) {
      onComplete?.();
      return;
    }

    const nextIndex = currentCommandIndex + 1;
    const command = commands[nextIndex];
    
    setCurrentCommandIndex(nextIndex);
    setIsTyping(true);
    setCurrentTypedText('');

    // Type the command
    const commandText = command.command;
    let charIndex = 0;
    
    const typeCommand = () => {
      if (charIndex < commandText.length) {
        setCurrentTypedText(commandText.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeCommand, Math.random() * 100 + 50);
      } else {
        // Command typed, now show output
        setTimeout(() => {
          const output = Array.isArray(command.output) ? command.output : [command.output];
          setDisplayedCommands(prev => [...prev, { command: commandText, output }]);
          setCurrentTypedText('');
          setIsTyping(false);
          
          // Continue to next command
          setTimeout(() => {
            executeNextCommand();
          }, command.delay || 1500);
        }, 500);
      }
    };

    setTimeout(typeCommand, command.delay || 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden border-2 ${className}`}
      style={{ 
        borderColor: colors.border + '50',
        boxShadow: `0 0 20px ${colors.glow}30`
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 p-4 bg-gray-800/50 border-b" style={{ borderColor: colors.border + '20' }}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm ml-4 font-mono flex-grow text-center">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.primary }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-mono" style={{ color: colors.primary }}>
            SECURE
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-6 font-mono text-sm min-h-[300px] max-h-[500px] overflow-y-auto"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${colors.primary}03 2px,
            ${colors.primary}03 4px
          )`
        }}
      >
        {/* Completed commands */}
        {displayedCommands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <div className="flex items-start gap-2 mb-2">
              <span style={{ color: colors.secondary }}>$</span>
              <span className="text-white">{cmd.command}</span>
            </div>
            <div className="ml-4 space-y-1">
              {cmd.output.map((line, lineIndex) => (
                <motion.div
                  key={lineIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: lineIndex * 0.1 }}
                  className="text-gray-300"
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Current typing command */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <span style={{ color: colors.secondary }}>$</span>
            <span className="text-white">
              {currentTypedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: colors.primary }}
              >
                |
              </motion.span>
            </span>
          </div>
        )}

        {/* Ready prompt when done */}
        {!isTyping && currentCommandIndex >= commands.length - 1 && (
          <div className="flex items-start gap-2 mt-4">
            <span style={{ color: colors.secondary }}>$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-white"
              style={{ color: colors.primary }}
            >
              |
            </motion.span>
          </div>
        )}
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(transparent 0%, ${colors.primary}20 50%, transparent 100%)`,
          height: '2px',
        }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}