"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

const tokenomicsData = [
  { label: "TOKEN NAME", value: "Mainey the Capybara" },
  { label: "TICKER", value: "$MAIN" },
  { label: "TOTAL SUPPLY", value: "1,000,000,000" },
  { label: "DECIMALS", value: "9" },
  { label: "BUY TAX", value: "0%" },
  { label: "SELL TAX", value: "0%" },
  { label: "NETWORK", value: "Solana" }
];

interface CardProps {
  label: string;
  value: string;
  idx: number;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function TokenomicsCard({ label, value, idx, handleMouseMove, handleMouseLeave, handleMouseEnter }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;
  const R = 12; // notch radius
  const pad = 4; // inner border offset
  const r_i = Math.max(0, R - pad);

  const outerPath = W && H ? `M ${R},0 L ${W - R},0 A ${R},${R} 0 0,0 ${W},${R} L ${W},${H - R} A ${R},${R} 0 0,0 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0,0 0,${H - R} L 0,${R} A ${R},${R} 0 0,0 ${R},0 Z` : "";
  const innerPath = W && H ? `M ${pad + r_i},${pad} L ${pad + W - pad * 2 - r_i},${pad} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2},${pad + r_i} L ${pad + W - pad * 2},${pad + H - pad * 2 - r_i} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2 - r_i},${pad + H - pad * 2} L ${pad + r_i},${pad + H - pad * 2} A ${r_i},${r_i} 0 0,0 ${pad},${pad + H - pad * 2 - r_i} L ${pad},${pad + r_i} A ${r_i},${r_i} 0 0,0 ${pad + r_i},${pad} Z` : "";

  return (
    <div
      ref={cardRef}
      role="listitem"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative flex flex-col items-center justify-center text-center py-5 px-3 min-h-[90px] focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none cursor-pointer transition-all duration-300 select-none group ${idx === 6 ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background SVG matching dynamic notches */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {W > 0 && H > 0 && (
          <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]" viewBox={`0 0 ${W} ${H}`}>
            {/* Background fill */}
            <path d={outerPath} fill="#0C1E11" fillOpacity="0.75" className="group-hover:fill-[#112918] transition-colors duration-300" />
            {/* Outer border */}
            <path d={outerPath} fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.3" className="group-hover:stroke-opacity-80 transition-opacity duration-300" />
            {/* Inner gold line */}
            <path d={innerPath} fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.05" className="group-hover:stroke-opacity-25 transition-opacity duration-300" />
          </svg>
        )}
      </div>

      {/* Shine overlay (clipped to the outer notch path) */}
      <div 
        className="shine-overlay absolute inset-0 pointer-events-none z-10 transition-colors duration-300" 
        aria-hidden="true" 
        style={{ clipPath: W && H ? `path('${outerPath}')` : undefined }} 
      />

      {/* Title / Label */}
      <span className="relative z-10 font-kiro font-bold text-[10px] sm:text-xs text-brand-gold tracking-widest uppercase mb-2 sm:mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {label}
      </span>
      
      {/* Value */}
      <span className="relative z-10 font-jakobenz font-black text-xs sm:text-sm md:text-base lg:text-lg text-[#dcab62] group-hover:text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] break-words w-full px-1">
        {value}
      </span>
    </div>
  );
}

export default function TokenomicsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [sectionSpotlight, setSectionSpotlight] = useState({ x: 0, y: 0, visible: false });

  // Handle prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.children;

    if (prefersReducedMotion) {
      // Just fade in for accessibility
      gsap.set(cards, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      });
      tl.to(cards, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
      });
      return () => tl.kill();
    }

    // Set initial 3D transform states for cards
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.85, rotateX: 15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  // Section Spotlight MouseMove Tracker
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handleSectionMouseLeave = () => {
    setSectionSpotlight(prev => ({ ...prev, visible: false }));
  };

  // Card 3D Spring Tilt Interactions
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 7; // Tilt angle X
    const angleY = (x - xc) / 7; // Tilt angle Y
    
    card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.04)`;
    
    // Shine reflection follow cursor
    const shine = card.querySelector(".shine-overlay") as HTMLDivElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(254, 243, 199, 0.14) 0%, transparent 80%)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"; // Fluid bounce-free release easing
    
    const shine = card.querySelector(".shine-overlay") as HTMLDivElement;
    if (shine) {
      shine.style.background = "transparent";
    }
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transition = "none"; // Instant response during mousemove
  };
  // Scroll-linked parallax for background bushes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bushY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-12%", "12%"]
  );
  return (
    <section 
      ref={sectionRef} 
      id="tokenomics"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full py-24 md:py-36 bg-[#0d2012] overflow-hidden"
      aria-label="Mainey Tokenomics Section"
    >
      {/* Background Bushes with Parallax Framing & dark overlay (adjusted size for wide layout) */}
      <motion.img
        src="/bushes right.png"
        alt=""
        style={{ y: bushY, scaleX: -1, clipPath: "inset(3px)" }}
        className="absolute left-[-25px] bottom-[-20px] h-[40%] md:h-[55%] w-auto object-contain select-none pointer-events-none z-10 opacity-35 md:opacity-50 brightness-[0.4]"
        aria-hidden="true"
      />
      <motion.img
        src="/bushes right.png"
        alt=""
        style={{ y: bushY, clipPath: "inset(3px)" }}
        className="absolute right-[-25px] bottom-[-20px] h-[40%] md:h-[55%] w-auto object-contain select-none pointer-events-none z-10 opacity-35 md:opacity-50 brightness-[0.4]"
        aria-hidden="true"
      />
      
      {/* 1. Ambient Background Layer (Spotlight + Grid + Glow Spot) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#081a0b_1px,transparent_1px),linear-gradient(to_bottom,#081a0b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Global ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-gold/5 blur-[140px]" />
        
        {/* Section-wide Mouse-Linked Glow spotlight (Ambient Life Layer) */}
        {!prefersReducedMotion && sectionSpotlight.visible && (
          <div 
            className="absolute inset-0 opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${sectionSpotlight.x}px ${sectionSpotlight.y}px, rgba(212, 175, 55, 0.08), transparent 85%)`
            }}
          />
        )}
      </div>

      {/* Gold top border separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />

      {/* 2. Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-10 max-w-[1600px] mx-auto flex flex-col items-center">
        
        {/* Section Header Title Image */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={springConfig}
          className="w-full max-w-[240px] sm:max-w-[340px] md:max-w-[380px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] mb-12 md:mb-20"
        >
          <img
            src="/tokenomics text.png"
            alt="TOKENOMICS"
            className="w-full h-auto object-contain mx-auto select-none pointer-events-none"
          />
        </motion.div>

        {/* Cards Row Grid (Focusable, Accessible list items) */}
        <div 
          ref={cardsContainerRef}
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-5 w-full"
        >
          {tokenomicsData.map((item, idx) => (
            <TokenomicsCard
              key={idx}
              idx={idx}
              label={item.label}
              value={item.value}
              handleMouseMove={handleCardMouseMove}
              handleMouseLeave={handleCardMouseLeave}
              handleMouseEnter={handleCardMouseEnter}
            />
          ))}
        </div>

      </div>

      {/* Gold bottom border separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />
    </section>
  );
}
