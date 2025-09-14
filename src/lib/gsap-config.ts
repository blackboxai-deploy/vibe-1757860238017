import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Global GSAP configuration
gsap.defaults({
  duration: 1,
  ease: 'power2.out',
});

// Animation presets for common effects
export const fadeInUp = {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
};

export const fadeInDown = {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: 'power2.out',
};

export const fadeInLeft = {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power2.out',
};

export const fadeInRight = {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: 'power2.out',
};

export const scaleIn = {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: 'back.out(1.7)',
};

export const rotateIn = {
  rotation: 360,
  scale: 0,
  opacity: 0,
  duration: 1.2,
  ease: 'back.out(1.7)',
};

// Glitch animation
export const glitchAnimation = {
  keyframes: {
    x: [0, -5, 5, -3, 3, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    skewX: [0, -2, 2, -1, 1, 0],
  },
  duration: 0.3,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true,
  repeatDelay: Math.random() * 3 + 2,
};

// Typing animation helper
export const createTypingAnimation = (
  element: HTMLElement,
  text: string,
  options: {
    speed?: number;
    delay?: number;
    cursor?: boolean;
    onComplete?: () => void;
  } = {}
) => {
  const { speed = 0.05, delay = 0, cursor = true, onComplete } = options;
  
  const tl = gsap.timeline({ delay });
  
  // Add cursor if enabled
  if (cursor) {
    element.innerHTML = '|';
    tl.to(element, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    }, 0);
  }
  
  // Type out the text
  tl.to(element, {
    text: cursor ? text + '|' : text,
    duration: text.length * speed,
    ease: 'none',
    delay: 0.5,
    onComplete: () => {
      if (cursor) {
        // Remove cursor after typing
        gsap.set(element, { text: text });
      }
      onComplete?.();
    },
  });
  
  return tl;
};

// Scroll reveal animation
export const createScrollReveal = (
  elements: string | Element | Element[],
  options: gsap.TweenVars & { trigger?: string } = {}
) => {
  const { trigger, ...animationProps } = options;
  
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 100,
      scale: 0.8,
      ...animationProps.from,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      ...animationProps,
      scrollTrigger: {
        trigger: trigger || elements,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...(animationProps.scrollTrigger || {}),
      },
    }
  );
};

// Matrix rain animation
export const createMatrixRainAnimation = (container: HTMLElement, options: {
  columns?: number;
  speed?: number;
  characters?: string;
} = {}) => {
  const { columns = 20, speed = 50, characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' } = options;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  
  const fontSize = 14;
  const columnWidth = canvas.width / columns;
  const drops: number[] = Array(columns).fill(0);
  
  ctx.fillStyle = '#000';
  ctx.font = `${fontSize}px monospace`;
  
  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * columnWidth, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };
  
  const interval = setInterval(draw, speed);
  
  return () => clearInterval(interval);
};

// Particle system animation
export const createParticleAnimation = (
  particles: { x: number; y: number; vx: number; vy: number }[],
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas.getContext('2d')!;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff41';
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

export { gsap, ScrollTrigger, TextPlugin };