'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { themes, ThemeType } from '@/lib/theme-system';
import { Card } from './card';

export function ThemeSelector() {
  const { currentTheme, setTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (theme: ThemeType) => {
    const icons = {
      neutral: '⬢',
      rogue: '⬣',
      secure: '⬟',
      zeus: '⬢'
    };
    return icons[theme];
  };

  const getThemeDescription = (theme: ThemeType) => {
    const descriptions = {
      neutral: 'Standard operational security protocols',
      rogue: 'Aggressive offensive capabilities engaged',
      secure: 'Maximum encryption and defense layers',
      zeus: 'Unlimited access - godmode activated'
    };
    return descriptions[theme];
  };

  return (
    <div ref={selectorRef} className="fixed top-8 right-8 z-50">
      {/* Current Theme Display */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className="bg-black/90 border-2 backdrop-blur-sm p-4 min-w-[200px] theme-border theme-glow">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                className="text-2xl theme-text-shadow"
                animate={{
                  rotate: isTransitioning ? 360 : 0,
                  scale: isTransitioning ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.8 }}
                style={{ color: 'var(--theme-primary)' }}
              >
                {getThemeIcon(currentTheme)}
              </motion.div>
              <div>
                <div className="font-mono text-sm font-bold" style={{ color: 'var(--theme-primary)' }}>
                  {themes[currentTheme].codename}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {themes[currentTheme].name}_MODE
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm"
              style={{ color: 'var(--theme-secondary)' }}
            >
              ▼
            </motion.div>
          </div>

          {/* Current theme status indicator */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--theme-primary)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-gray-300">
              {isTransitioning ? 'SWITCHING_PROTOCOL...' : 'SYSTEM_ACTIVE'}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Theme Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full mt-2 right-0 w-80"
          >
            <Card className="bg-black/95 border-2 backdrop-blur-md overflow-hidden theme-border">
              <div className="p-4">
                <div className="text-sm font-mono font-bold mb-3 theme-text-shadow" style={{ color: 'var(--theme-primary)' }}>
                  SELECT_PROTOCOL.exe
                </div>
                
                <div className="space-y-2">
                  {(Object.keys(themes) as ThemeType[]).map((themeKey) => {
                    const theme = themes[themeKey];
                    const isActive = themeKey === currentTheme;
                    
                    return (
                      <motion.div
                        key={themeKey}
                        className={`
                          relative p-3 rounded border-2 cursor-pointer transition-all duration-300
                          ${isActive ? 'border-current theme-glow' : 'border-gray-600 hover:border-gray-400'}
                        `}
                        style={{
                          backgroundColor: isActive ? `${theme.colors.primary}10` : 'transparent',
                          borderColor: isActive ? theme.colors.primary : undefined,
                        }}
                        onClick={() => {
                          if (!isTransitioning && !isActive) {
                            setTheme(themeKey);
                            setIsOpen(false);
                          }
                        }}
                        onMouseEnter={() => setHoveredTheme(themeKey)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="text-xl"
                            style={{ color: theme.colors.primary }}
                            animate={{
                              scale: hoveredTheme === themeKey ? [1, 1.2, 1] : 1,
                              textShadow: hoveredTheme === themeKey 
                                ? `0 0 10px ${theme.colors.primary}` 
                                : 'none',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {getThemeIcon(themeKey)}
                          </motion.div>
                          
                          <div className="flex-1">
                            <div 
                              className="font-mono text-sm font-bold"
                              style={{ color: theme.colors.primary }}
                            >
                              {theme.codename}
                            </div>
                            <div className="text-xs text-gray-400 font-mono mt-1">
                              {getThemeDescription(themeKey)}
                            </div>
                          </div>

                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-xs font-mono px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: theme.colors.primary,
                                color: theme.colors.background 
                              }}
                            >
                              ACTIVE
                            </motion.div>
                          )}
                        </div>

                        {/* Theme preview colors */}
                        <div className="flex gap-1 mt-3">
                          {[theme.colors.primary, theme.colors.secondary, theme.colors.accent].map((color, index) => (
                            <motion.div
                              key={index}
                              className="w-4 h-1 rounded"
                              style={{ backgroundColor: color }}
                              animate={{
                                height: hoveredTheme === themeKey ? 6 : 4,
                                opacity: hoveredTheme === themeKey ? 1 : 0.7,
                              }}
                              transition={{ duration: 0.2 }}
                            />
                          ))}
                        </div>

                        {/* Hover effect overlay */}
                        {hoveredTheme === themeKey && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 rounded"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700">
                  <div className="text-xs font-mono text-gray-500 text-center">
                    PROTOCOL_SELECTION_v2.1.4
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disabled overlay during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-transparent border-t-current rounded-full"
            style={{ borderTopColor: 'var(--theme-primary)' }}
          />
        </div>
      )}
    </div>
  );
}