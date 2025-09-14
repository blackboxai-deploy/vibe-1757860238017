export type ThemeType = 'neutral' | 'rogue' | 'secure' | 'zeus';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  codename: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    glow: string;
    particle1: string;
    particle2: string;
    particle3: string;
  };
  effects: {
    intensity: number;
    glitchLevel: 'low' | 'medium' | 'high' | 'extreme';
    particleCount: number;
    animationSpeed: number;
  };
  typography: {
    primaryFont: string;
    weight: string;
    letterSpacing: string;
  };
  audio?: {
    ambientTrack?: string;
    uiSounds?: boolean;
  };
}

export const themes: Record<ThemeType, ThemeConfig> = {
  neutral: {
    id: 'neutral',
    name: 'NEUTRAL',
    codename: 'COMPLIANCE_PROTOCOL',
    description: 'Standard GRC operational mode - PCI DSS, ISO 27001, SOC compliance',
    colors: {
      primary: '#00ffaa', // Original green from your portfolio
      secondary: '#00d4ff',
      accent: '#8b5cf6',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#00ffaa',
      border: '#00ffaa',
      glow: '#00ffaa',
      particle1: '#00ffaa',
      particle2: '#00d4ff',
      particle3: '#8b5cf6',
    },
    effects: {
      intensity: 1.0,
      glitchLevel: 'medium',
      particleCount: 6000,
      animationSpeed: 1.0,
    },
    typography: {
      primaryFont: "'JetBrains Mono', monospace",
      weight: 'normal',
      letterSpacing: '0.05em',
    },
  },

  rogue: {
    id: 'rogue',
    name: 'ROGUE',
    codename: 'PENTEST_PROTOCOL',
    description: 'Offensive security mode - penetration testing and vulnerability assessment',
    colors: {
      primary: '#ff3344', // Original red from your portfolio
      secondary: '#ff5566',
      accent: '#ff6b00',
      background: '#1a0a0a',
      surface: '#2a1010',
      text: '#ffffff',
      textSecondary: '#ff3344',
      border: '#ff3344',
      glow: '#ff3344',
      particle1: '#ff3344',
      particle2: '#ff5566',
      particle3: '#ff6b00',
    },
    effects: {
      intensity: 1.5,
      glitchLevel: 'extreme',
      particleCount: 8000,
      animationSpeed: 1.3,
    },
    typography: {
      primaryFont: "'JetBrains Mono', monospace",
      weight: 'bold',
      letterSpacing: '0.1em',
    },
  },

  secure: {
    id: 'secure',
    name: 'SECURE',
    codename: 'GUARDIAN_PROTOCOL',
    description: 'Enhanced security mode - ISO 27001 and advanced encryption layers',
    colors: {
      primary: '#a855f7', // Original purple from your portfolio
      secondary: '#b967f7',
      accent: '#06b6d4',
      background: '#0f0a1a',
      surface: '#1a0f2a',
      text: '#ffffff',
      textSecondary: '#a855f7',
      border: '#a855f7',
      glow: '#a855f7',
      particle1: '#a855f7',
      particle2: '#b967f7',
      particle3: '#06b6d4',
    },
    effects: {
      intensity: 1.2,
      glitchLevel: 'low',
      particleCount: 7000,
      animationSpeed: 0.8,
    },
    typography: {
      primaryFont: "'JetBrains Mono', monospace",
      weight: '300',
      letterSpacing: '0.08em',
    },
  },

  zeus: {
    id: 'zeus',
    name: 'ZEUS',
    codename: 'DIVINE_PROTOCOL',
    description: 'Godmode activated - unlimited administrative access and control',
    colors: {
      primary: '#ffffff', // Original white from your portfolio
      secondary: '#f0f9ff',
      accent: '#60a5fa',
      background: '#030712',
      surface: '#111827',
      text: '#ffffff',
      textSecondary: '#f0f9ff',
      border: '#ffffff',
      glow: '#ffffff',
      particle1: '#ffffff',
      particle2: '#f0f9ff',
      particle3: '#60a5fa',
    },
    effects: {
      intensity: 2.0,
      glitchLevel: 'high',
      particleCount: 10000,
      animationSpeed: 1.1,
    },
    typography: {
      primaryFont: "'JetBrains Mono', monospace",
      weight: '500',
      letterSpacing: '0.12em',
    },
  },
};

export const getThemeCSS = (theme: ThemeConfig) => {
  return `
    :root {
      --theme-primary: ${theme.colors.primary};
      --theme-secondary: ${theme.colors.secondary};
      --theme-accent: ${theme.colors.accent};
      --theme-background: ${theme.colors.background};
      --theme-surface: ${theme.colors.surface};
      --theme-text: ${theme.colors.text};
      --theme-text-secondary: ${theme.colors.textSecondary};
      --theme-border: ${theme.colors.border};
      --theme-glow: ${theme.colors.glow};
      --theme-particle1: ${theme.colors.particle1};
      --theme-particle2: ${theme.colors.particle2};
      --theme-particle3: ${theme.colors.particle3};
      --theme-intensity: ${theme.effects.intensity};
      --theme-animation-speed: ${theme.effects.animationSpeed};
      --theme-font: ${theme.typography.primaryFont};
      --theme-font-weight: ${theme.typography.weight};
      --theme-letter-spacing: ${theme.typography.letterSpacing};
    }

    body {
      background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 50%, ${theme.colors.background} 100%);
      color: ${theme.colors.text};
      font-family: var(--theme-font);
      font-weight: var(--theme-font-weight);
      letter-spacing: var(--theme-letter-spacing);
    }

    /* COMPLETE THEME COLOR OVERRIDE SYSTEM */
    
    /* Primary Colors - Main theme elements */
    .text-green-400, 
    .border-green-400,
    .bg-green-400,
    .text-green-500,
    .border-green-500,
    .bg-green-500 {
      color: var(--theme-primary) !important;
      border-color: var(--theme-primary) !important;
      background-color: var(--theme-primary) !important;
    }

    /* Secondary Colors - Accent elements */
    .text-cyan-400,
    .border-cyan-400,
    .bg-cyan-400,
    .text-blue-400,
    .border-blue-400,
    .bg-blue-400 {
      color: var(--theme-secondary) !important;
      border-color: var(--theme-secondary) !important;
      background-color: var(--theme-secondary) !important;
    }

    /* Accent Colors - Highlight elements */
    .text-purple-400,
    .border-purple-400,
    .bg-purple-400,
    .text-indigo-400,
    .border-indigo-400,
    .bg-indigo-400 {
      color: var(--theme-accent) !important;
      border-color: var(--theme-accent) !important;
      background-color: var(--theme-accent) !important;
    }

    /* Background Colors with Opacity */
    .bg-green-500\/20,
    .bg-green-400\/20,
    .bg-green-900 {
      background-color: color-mix(in srgb, var(--theme-primary) 20%, transparent) !important;
    }

    .bg-cyan-500\/20,
    .bg-cyan-400\/20,
    .bg-blue-500\/20 {
      background-color: color-mix(in srgb, var(--theme-secondary) 20%, transparent) !important;
    }

    .bg-purple-500\/20,
    .bg-purple-400\/20,
    .bg-indigo-500\/20 {
      background-color: color-mix(in srgb, var(--theme-accent) 20%, transparent) !important;
    }

    /* Hover States */
    .hover\\:text-green-400:hover,
    .hover\\:border-green-500:hover,
    .hover\\:bg-green-500:hover {
      color: var(--theme-primary) !important;
      border-color: var(--theme-primary) !important;
      background-color: var(--theme-primary) !important;
    }

    .hover\\:text-cyan-400:hover,
    .hover\\:border-cyan-400:hover,
    .hover\\:bg-cyan-400:hover {
      color: var(--theme-secondary) !important;
      border-color: var(--theme-secondary) !important;
      background-color: var(--theme-secondary) !important;
    }

    .hover\\:text-purple-400:hover,
    .hover\\:border-purple-400:hover,
    .hover\\:bg-purple-400:hover {
      color: var(--theme-accent) !important;
      border-color: var(--theme-accent) !important;
      background-color: var(--theme-accent) !important;
    }

    /* Gradients */
    .from-green-400 {
      --tw-gradient-from: var(--theme-primary) !important;
    }
    .to-cyan-400 {
      --tw-gradient-to: var(--theme-secondary) !important;
    }
    .from-purple-400 {
      --tw-gradient-from: var(--theme-accent) !important;
    }

    /* Box Shadows and Glows */
    .shadow-green-400\/25,
    .shadow-green-500\/30 {
      box-shadow: 0 0 25px color-mix(in srgb, var(--theme-primary) 25%, transparent) !important;
    }

    .shadow-cyan-400\/25,
    .shadow-blue-400\/25 {
      box-shadow: 0 0 25px color-mix(in srgb, var(--theme-secondary) 25%, transparent) !important;
    }

    .shadow-purple-400\/25 {
      box-shadow: 0 0 25px color-mix(in srgb, var(--theme-accent) 25%, transparent) !important;
    }

    /* Theme-specific glow effects */
    .theme-glow {
      box-shadow: 
        0 0 calc(5px * var(--theme-intensity)) var(--theme-glow),
        0 0 calc(10px * var(--theme-intensity)) var(--theme-glow),
        0 0 calc(15px * var(--theme-intensity)) var(--theme-glow);
    }

    .theme-text-shadow {
      text-shadow: 
        0 0 calc(5px * var(--theme-intensity)) var(--theme-glow),
        0 0 calc(10px * var(--theme-intensity)) var(--theme-glow),
        0 0 calc(15px * var(--theme-intensity)) var(--theme-glow);
    }

    .theme-border {
      border-color: var(--theme-border);
      box-shadow: 
        0 0 calc(5px * var(--theme-intensity)) var(--theme-border),
        inset 0 0 calc(5px * var(--theme-intensity)) var(--theme-border);
    }

    /* Animation speed adjustments */
    * {
      animation-duration: calc(1s / var(--theme-animation-speed));
    }

    /* Theme-specific selection */
    ::selection {
      background: linear-gradient(45deg, 
        ${theme.colors.primary}50, 
        ${theme.colors.secondary}50
      );
      color: ${theme.colors.text};
      text-shadow: 0 0 calc(10px * var(--theme-intensity)) currentColor;
    }

    /* Theme-specific scrollbar */
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, 
        var(--theme-primary) 0%, 
        var(--theme-secondary) 50%, 
        var(--theme-accent) 100%
      );
      box-shadow: 
        0 0 calc(10px * var(--theme-intensity)) var(--theme-glow),
        inset 0 0 calc(5px * var(--theme-intensity)) rgba(255, 255, 255, 0.2);
    }

    /* Navigation elements */
    nav a {
      border-color: var(--theme-border) !important;
      color: var(--theme-text-secondary) !important;
    }

    nav a:hover {
      box-shadow: 0 0 15px var(--theme-glow) !important;
    }

    /* Matrix rain color override */
    .matrix-char,
    .text-green-400[class*="matrix"] {
      color: var(--theme-primary) !important;
      text-shadow: 0 0 5px var(--theme-primary) !important;
    }

    /* Card and surface colors */
    .bg-gray-900\/50 {
      background-color: color-mix(in srgb, var(--theme-surface) 50%, transparent) !important;
    }

    .border-gray-700,
    .border-gray-800 {
      border-color: color-mix(in srgb, var(--theme-border) 30%, #374151) !important;
    }
  `;
};

// Theme transition effects
export const themeTransitionCSS = `
  .theme-transition {
    transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .theme-transition * {
    transition: 
      color 1.5s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 1.5s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 1.5s cubic-bezier(0.4, 0, 0.2, 1),
      text-shadow 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Theme switch animation overlay */
  .theme-switch-overlay {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, var(--theme-primary) 0%, transparent 70%);
    opacity: 0;
    pointer-events: none;
    z-index: 9999;
    transition: opacity 0.8s ease-out;
  }

  .theme-switch-overlay.active {
    opacity: 0.3;
  }
`;

export default themes;