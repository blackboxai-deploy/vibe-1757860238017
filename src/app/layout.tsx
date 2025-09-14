import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APARDEEP.exe | Compliance • Cybersecurity • GRC",
  description: "Apardeep Singh — Compliance Specialist in PCI DSS, ISO/IEC 27001, SOC 1/2. Audit-ready programs, evidence streams, risk registers, and security enablement.",
  keywords: "compliance, cybersecurity, GRC, PCI DSS, ISO 27001, SOC 2, audit, risk management, cybersecurity specialist",
  authors: [{ name: "Apardeep Singh" }],
  creator: "Apardeep Singh",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00ffaa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cybersec-portfolio.com",
    siteName: "CYBER_SECURITY_EXPERT.exe",
    title: "CYBER_SECURITY_EXPERT.exe | Cinematic Hacker Portfolio",
    description: "Immersive 3D portfolio showcasing advanced cybersecurity skills and ethical hacking expertise.",
    images: [
      {
        url: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/110b1fb0-e753-4e5a-8e2f-6c809612fba5.png",
        width: 1200,
        height: 630,
        alt: "CYBER_SECURITY_EXPERT.exe - Cinematic 3D Hacker Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBER_SECURITY_EXPERT.exe | 3D Hacker Portfolio",
    description: "Cinematic 3D portfolio with Matrix-inspired design and advanced cybersecurity showcase.",
    images: ["https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c81f642-2068-407d-b9ca-212a52bf7f96.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts for enhanced typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Cyberpunk favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preload critical resources */}
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" />
      </head>
      <body
        className="antialiased bg-black text-white overflow-x-hidden selection:bg-green-400/20 selection:text-green-400"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      >
        {/* Global cursor effects */}
        <div 
          id="cursor-follower"
          className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border border-green-400/50 mix-blend-difference transition-transform duration-100 ease-out"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        
        {/* Scanline overlay effect */}
        <div
          className="fixed inset-0 pointer-events-none z-40 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.03) 2px,
              rgba(0, 255, 65, 0.03) 4px
            )`,
          }}
        />
        
        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
        
        {/* Global scripts for cursor and effects */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Cursor follower effect
              (function() {
                if (typeof window !== 'undefined') {
                  const cursor = document.getElementById('cursor-follower');
                  if (cursor) {
                    let mouseX = 0, mouseY = 0;
                    let cursorX = 0, cursorY = 0;
                    
                    document.addEventListener('mousemove', (e) => {
                      mouseX = e.clientX;
                      mouseY = e.clientY;
                    });
                    
                    function animateCursor() {
                      cursorX += (mouseX - cursorX) * 0.1;
                      cursorY += (mouseY - cursorY) * 0.1;
                      
                      cursor.style.left = cursorX + 'px';
                      cursor.style.top = cursorY + 'px';
                      
                      requestAnimationFrame(animateCursor);
                    }
                    
                    animateCursor();
                  }
                }
              })();
              
              // Glitch effect on load
              (function() {
                if (typeof window !== 'undefined') {
                  setTimeout(() => {
                    document.body.classList.add('loaded');
                  }, 100);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}