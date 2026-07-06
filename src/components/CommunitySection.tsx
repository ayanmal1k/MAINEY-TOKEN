"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

interface NotchedButtonProps {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}

// Reusable custom NotchedButton component matching the notch aesthetics of the site
function NotchedButton({ children, href, icon }: NotchedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;
  const R = 10; // notch radius
  const pad = 3.2; // inner gold border offset

  const outerPath = W && H ? `M ${R},0 L ${W - R},0 A ${R},${R} 0 0,0 ${W},${R} L ${W},${H - R} A ${R},${R} 0 0,0 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0,0 0,${H - R} L 0,${R} A ${R},${R} 0 0,0 ${R},0 Z` : "";
  const innerPath = W && H ? `M ${pad + R - pad},${pad} L ${W - pad - (R - pad)},${pad} A ${R - pad},${R - pad} 0 0,0 ${W - pad},${pad + R - pad} L ${W - pad},${H - pad - (R - pad)} A ${R - pad},${R - pad} 0 0,0 ${W - pad - (R - pad)},${H - pad} L ${pad + R - pad},${H - pad} A ${R - pad},${R - pad} 0 0,0 ${pad},${H - pad - (R - pad)} L ${pad},${pad + R - pad} A ${R - pad},${R - pad} 0 0,0 ${pad + R - pad},${pad} Z` : "";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center justify-center px-8 py-5 min-w-[200px] sm:min-w-[220px] h-[56px] text-[#dcab62] hover:text-[#ffd700] font-kiro font-black text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 z-10 cursor-pointer"
    >
      <div ref={containerRef} className="absolute inset-0 z-0">
        {W > 0 && H > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" viewBox={`0 0 ${W} ${H}`}>
            {/* Background fill */}
            <path d={outerPath} fill="#07120a" fillOpacity="0.95" />
            {/* Outer border */}
            <path d={outerPath} fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.8" />
            {/* Inner gold line */}
            <path d={innerPath} fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.25" />
          </svg>
        )}
      </div>
      <span className="relative z-10 flex items-center gap-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {icon}
        {children}
      </span>
    </motion.a>
  );
}

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Read reduced motion settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // GSAP ScrollTrigger timeline
  useEffect(() => {
    if (!sectionRef.current || !leftContentRef.current || !rightBadgeRef.current) return;

    const leftChildren = leftContentRef.current.children;
    const badge = rightBadgeRef.current;

    if (prefersReducedMotion) {
      gsap.set(leftChildren, { opacity: 0 });
      gsap.set(badge, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      });
      tl.to(leftChildren, { opacity: 1, duration: 0.5, stagger: 0.1 });
      tl.to(badge, { opacity: 1, duration: 0.6 }, "-=0.2");
      return () => tl.kill();
    }

    // Initial states
    gsap.set(leftChildren, { opacity: 0, y: 30 });
    gsap.set(badge, { opacity: 0, scale: 0.85, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.to(leftChildren, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    }).to(
      badge,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
      },
      "-=0.45"
    );

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative w-full pt-16 md:pt-24 pb-0 bg-[#0d2012] overflow-hidden"
      aria-label="MAINEY Community Section"
    >
      {/* Dark overlay (tiny bit) */}
      <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none" />
      {/* Subtle ambient light glow behind the badge */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-green/10 blur-[150px] pointer-events-none z-0" aria-hidden="true" />

      {/* Gold top border separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />

      {/* Content Container (Aligned to the bottom using items-end) */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Left Column: Title and social links (aligned to bottom but with padding for spacing) */}
          <div 
            ref={leftContentRef}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pb-16 md:pb-24"
          >
            {/* Title image */}
            <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] mb-8">
              <img
                src="/join the main community text.png"
                alt="JOIN THE MAIN COMMUNITY"
                className="w-full h-auto object-contain mx-auto lg:mx-0 select-none pointer-events-none"
              />
            </div>

            {/* Social Buttons Wrapper */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start w-full">
              {/* Telegram Button */}
              <NotchedButton 
                href="https://t.me/+VCIatTbYnQthYjdk" 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.97.53-1.34.52-.41-.01-1.21-.23-1.8-.42-.72-.24-1.3-.37-1.25-.79.03-.22.33-.44.9-.67 3.52-1.53 5.87-2.54 7.05-3.03 3.35-1.39 4.05-1.63 4.51-1.64.1 0 .33.02.48.15.12.1.16.24.18.34.02.1.03.22.01.32z" />
                  </svg>
                }
              >
                JOIN TELEGRAM
              </NotchedButton>

              {/* Follow on X Button */}
              <NotchedButton 
                href="https://x.com/MAINEYTHECAPY" 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              >
                FOLLOW ON X
              </NotchedButton>
            </div>
          </div>

          {/* Right Column: Large Logo Badge (Sitting exactly at the bottom) */}
          <div 
            ref={rightBadgeRef}
            className="lg:col-span-6 flex justify-center lg:justify-end items-end h-full mt-auto"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.03, 
                filter: "drop-shadow(0 15px 30px rgba(212, 175, 55, 0.35))" 
              }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="w-full max-w-[420px] sm:max-w-[540px] lg:max-w-[700px] flex items-end justify-center"
            >
              <img
                src="/community image.png"
                alt="Mainey The Capybara wooden board logo badge"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] block mb-0"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Gold bottom border separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />
    </section>
  );
}
