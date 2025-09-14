'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  cursorColor?: string;
  textColor?: string;
  onComplete?: () => void;
  loop?: boolean;
  loopDelay?: number;
}

export function TypingAnimation({
  text,
  speed = 50,
  delay = 0,
  className = '',
  showCursor = true,
  cursorColor = '#00ff41',
  textColor = '#00ff41',
  onComplete,
  loop = false,
  loopDelay = 2000,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[currentTextIndex];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        return;
      }

      if (!isDeleting) {
        // Typing forward
        if (currentIndex < currentText.length) {
          setDisplayedText(currentText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing current text
          if (loop && textArray.length > 1) {
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(true);
            }, loopDelay);
          } else if (!loop) {
            onComplete?.();
          }
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          setDisplayedText(currentText.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }, delay + (isDeleting ? speed / 2 : speed));

    timeoutRef.current = timeout;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentIndex,
    currentText,
    isDeleting,
    isPaused,
    speed,
    delay,
    onComplete,
    loop,
    loopDelay,
    textArray,
    currentTextIndex,
  ]);

  // Reset delay after first run
  useEffect(() => {
    if (currentIndex > 0 && delay > 0) {
      // Remove initial delay after first character
      delay = 0;
    }
  }, [currentIndex]);

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span
        style={{
          color: textColor,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {displayedText}
      </span>
      {showCursor && (
        <motion.span
          style={{
            color: cursorColor,
            fontFamily: "'JetBrains Mono', monospace",
          }}
          animate={{
            opacity: [1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          |
        </motion.span>
      )}
    </motion.div>
  );
}

// Terminal-style typing component with multiple lines
interface TerminalTypingProps {
  lines: Array<{
    text: string;
    delay?: number;
    color?: string;
    prefix?: string;
  }>;
  className?: string;
  onComplete?: () => void;
}

export function TerminalTyping({
  lines,
  className = '',
  onComplete,
}: TerminalTypingProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = (lineText: string) => {
    setCompletedLines((prev) => [...prev, lineText]);
    
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
      }, 200);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className={`font-mono ${className}`}>
      {/* Completed lines */}
      {completedLines.map((line, index) => (
        <div
          key={index}
          className="mb-2"
          style={{
            color: lines[index]?.color || '#00ff41',
          }}
        >
          <span className="text-cyan-400">
            {lines[index]?.prefix || '> '}
          </span>
          {line}
        </div>
      ))}
      
      {/* Current typing line */}
      {currentLineIndex < lines.length && (
        <div className="mb-2">
          <span 
            className="text-cyan-400"
            style={{ color: '#00d4ff' }}
          >
            {lines[currentLineIndex].prefix || '> '}
          </span>
          <TypingAnimation
            text={lines[currentLineIndex].text}
            speed={30}
            delay={lines[currentLineIndex].delay || 0}
            textColor={lines[currentLineIndex].color || '#00ff41'}
            onComplete={() => handleLineComplete(lines[currentLineIndex].text)}
            showCursor={true}
            cursorColor="#00ff41"
          />
        </div>
      )}
    </div>
  );
}

// Code typing animation with syntax highlighting
interface CodeTypingProps {
  code: string;
  language?: string;
  className?: string;
  onComplete?: () => void;
}

export function CodeTyping({
  code,
  className = '',
  onComplete,
}: CodeTypingProps) {
  return (
    <div className={`bg-gray-900 p-4 rounded-lg border border-green-500/30 ${className}`}>
      <div className="flex items-center mb-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-sm ml-2 font-mono">
          terminal.exe
        </span>
      </div>
      
      <TypingAnimation
        text={code}
        speed={25}
        textColor="#00ff41"
        className="text-sm"
        onComplete={onComplete}
        showCursor={true}
        cursorColor="#00ff41"
      />
    </div>
  );
}