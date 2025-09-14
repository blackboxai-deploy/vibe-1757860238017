'use client';

import { useEffect, useState } from 'react';
import { CinematicHeroSection } from '@/components/portfolio/CinematicHeroSection';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { KnowledgeSection } from '@/components/portfolio/KnowledgeSection';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { ServicesSection } from '@/components/portfolio/ServicesSection';
import { ResumeSection } from '@/components/portfolio/ResumeSection';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { CinematicLoader } from '@/components/animations/CinematicEffects';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeSelector } from '@/components/ui/ThemeSelector';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading && (
          <CinematicLoader onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Theme Selector */}
          <ThemeSelector />

          {/* Main Portfolio Content */}
          <div className="relative">
            <CinematicHeroSection />
            <AboutSection />
            <KnowledgeSection />
            <ProjectsSection />
            <ServicesSection />
            <ResumeSection />
            <ContactSection />
          </div>

          {/* Enhanced Floating Navigation */}
          <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 mobile-hidden">
            <div className="flex flex-col gap-4">
              {[
                { id: 'hero', label: 'HOME' },
                { id: 'about', label: 'ABOUT' },
                { id: 'knowledge', label: 'CERTS' },
                { id: 'projects', label: 'WORK' },
                { id: 'services', label: 'SERVICES' },
                { id: 'resume', label: 'RESUME' },
                { id: 'contact', label: 'CONTACT' },
              ].map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group relative px-4 py-3 border-2 bg-black/90 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 font-mono text-xs hover:scale-110 theme-border theme-glow"
                  style={{
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text-secondary)',
                    boxShadow: `0 0 10px color-mix(in srgb, var(--theme-glow) 30%, transparent)`,
                  }}
                >
                  <span className="relative z-10 theme-text-shadow">{item.label}</span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  />
                </a>
              ))}
            </div>
          </nav>

          {/* Enhanced Background Matrix Effect */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
            <div className="matrix-rain-container">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="absolute font-mono text-sm matrix-char"
                  style={{
                    left: `${i * 3.33}%`,
                    animation: `matrix-fall ${4 + Math.random() * 3}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    color: 'var(--theme-primary)',
                    textShadow: '0 0 5px var(--theme-primary)',
                  }}
                >
                  {['01', 'HACK', 'SEC', 'DATA', 'CODE', 'CYBER'][Math.floor(Math.random() * 6)]}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .mobile-hidden {
          display: block;
        }
        
        @media (max-width: 768px) {
          .mobile-hidden {
            display: none;
          }
        }

        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #000 0%, #111 50%, #000 100%);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--theme-primary) 0%, var(--theme-secondary) 50%, var(--theme-accent) 100%);
          border-radius: 6px;
          box-shadow: 
            0 0 10px color-mix(in srgb, var(--theme-glow) 50%, transparent),
            inset 0 0 5px rgba(255, 255, 255, 0.2);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          box-shadow: 
            0 0 20px color-mix(in srgb, var(--theme-glow) 80%, transparent),
            inset 0 0 10px rgba(255, 255, 255, 0.3);
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Selection styling */
        ::selection {
          background: linear-gradient(45deg, 
            color-mix(in srgb, var(--theme-primary) 30%, transparent), 
            color-mix(in srgb, var(--theme-secondary) 30%, transparent)
          );
          color: var(--theme-text);
          text-shadow: 0 0 10px var(--theme-primary);
        }
      `}</style>
    </ThemeProvider>
  );
}