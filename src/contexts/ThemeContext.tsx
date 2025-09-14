'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeType, ThemeConfig, themes, getThemeCSS, themeTransitionCSS } from '@/lib/theme-system';

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('neutral');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setTheme = (theme: ThemeType) => {
    if (theme === currentTheme || isTransitioning) return;

    setIsTransitioning(true);

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-switch-overlay active';
    document.body.appendChild(overlay);

    // Apply transition class to body
    document.body.classList.add('theme-transition');

    setTimeout(() => {
      setCurrentTheme(theme);
      
      // Store theme preference
      localStorage.setItem('portfolio-theme', theme);

      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.classList.remove('theme-transition');
          setIsTransitioning(false);
        }, 800);
      }, 200);
    }, 300);
  };

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme CSS
    const themeConfig = themes[currentTheme];
    const styleId = 'dynamic-theme-styles';
    
    // Remove existing theme styles
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new theme styles
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      ${getThemeCSS(themeConfig)}
      ${themeTransitionCSS}
    `;
    document.head.appendChild(style);

    // Update favicon based on theme
    updateFavicon(currentTheme);

    // Announce theme change for screen readers
    announceThemeChange(themeConfig);

  }, [currentTheme]);

  const updateFavicon = (theme: ThemeType) => {
    const faviconColors = {
      neutral: '#00ff41',
      rogue: '#ff0040', 
      secure: '#8b5cf6',
      zeus: '#ffffff'
    };

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    // Draw themed favicon
    ctx.fillStyle = faviconColors[theme];
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#000000';
    ctx.font = '20px monospace';
    ctx.fillText('⬢', 6, 24);

    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (link) {
      link.href = canvas.toDataURL();
    }
  };

  const announceThemeChange = (themeConfig: ThemeConfig) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = `Theme changed to ${themeConfig.name} - ${themeConfig.description}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const value: ThemeContextType = {
    currentTheme,
    themeConfig: themes[currentTheme],
    setTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook for theme-aware styling
export function useThemeColors() {
  const { themeConfig } = useTheme();
  return themeConfig.colors;
}

// Hook for theme-aware effects
export function useThemeEffects() {
  const { themeConfig } = useTheme();
  return themeConfig.effects;
}