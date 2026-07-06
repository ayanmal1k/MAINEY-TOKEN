"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

const roadmapData = [
  {
    phase: "PHASE 1",
    title: "FOUNDATION",
    items: [
      "Fair Launch",
      "LP Locked",
      "Telegram & X Launch",
      "DexScreener Update",
      "Community Building",
      "Meme Content Begins"
    ]
  },
  {
    phase: "PHASE 2",
    title: "GROWTH",
    items: [
      "1,000+ Holders",
      "Trending Campaigns",
      "Influencer Partnerships",
      "Community Raids",
      "Daily Meme Competitions",
      "Coin Listing Sites"
    ]
  },
  {
    phase: "PHASE 3",
    title: "EXPANSION",
    items: [
      "5,000+ Holders",
      "Major Marketing Push",
      "Community Spaces (X & Telegram)",
      "Merchandise Concepts",
      "Mainey Sticker Pack & GIFs",
      "Brand Partnerships"
    ]
  },
  {
    phase: "PHASE 4",
    title: "MAIN ERA",
    items: [
      "10,000+ Holders",
      "Global Community Growth",
      "Cross-Community Collaborations",
      "Ecosystem Expansion",
      "Long-Term Utility Exploration",
      "Become the MAIN Character of the Trenches"
    ]
  }
];

interface RoadmapCardProps {
  phase: typeof roadmapData[0];
  idx: number;
  prefersReducedMotion: boolean;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function RoadmapCard({
  phase,
  idx,
  prefersReducedMotion,
  handleMouseMove,
  handleMouseLeave,
  handleMouseEnter
}: RoadmapCardProps) {
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
  const R = 14; // Notch radius to match the custom corners
  const pad = 4.5; // Double-border padding offset
  const r_i = Math.max(0, R - pad); // Inner notch radius

  // Dynamic SVG path calculations for custom notched/scoped corners
  const outerPath = W && H ? `M ${R},0 L ${W - R},0 A ${R},${R} 0 0,0 ${W},${R} L ${W},${H - R} A ${R},${R} 0 0,0 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0,0 0,${H - R} L 0,${R} A ${R},${R} 0 0,0 ${R},0 Z` : "";
  const innerPath = W && H ? `M ${pad + r_i},${pad} L ${pad + W - pad * 2 - r_i},${pad} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2},${pad + r_i} L ${pad + W - pad * 2},${pad + H - pad * 2 - r_i} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2 - r_i},${pad + H - pad * 2} L ${pad + r_i},${pad + H - pad * 2} A ${r_i},${r_i} 0 0,0 ${pad},${pad + H - pad * 2 - r_i} L ${pad},${pad + r_i} A ${r_i},${r_i} 0 0,0 ${pad + r_i},${pad} Z` : "";

  const isCompleted = idx === 0;

  return (
    <div
      ref={cardRef}
      role="listitem"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative flex flex-col items-start justify-start p-6 pt-20 pb-8 focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:outline-none transition-all duration-300 select-none group min-h-[440px] w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Vector SVG Background Layer for custom double border and notched corners */}
      {W > 0 && H > 0 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]" 
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
        >
          {/* Card Fill */}
          <path 
            d={outerPath} 
            fill="#0C1E11" 
            fillOpacity="0.9" 
            className="transition-all duration-300 group-hover:fill-[#112918]"
          />
          {/* Outer Border (Gold) */}
          <path 
            d={outerPath} 
            fill="transparent" 
            stroke="#D4AF37" 
            strokeWidth="1.2"
            strokeOpacity="0.4"
            className="transition-all duration-300 group-hover:stroke-opacity-80"
          />
          {/* Inner Inset Border (Gold/Bronze) */}
          <path 
            d={innerPath} 
            fill="transparent" 
            stroke="#D4AF37" 
            strokeWidth="0.8"
            strokeOpacity="0.15"
            className="transition-all duration-300 group-hover:stroke-opacity-40"
          />
        </svg>
      )}

      {/* Wooden Plank Board absolute header */}
      <div 
        className="plank-header absolute top-[-36px] left-1/2 -translate-x-1/2 w-[88%] h-[84px] z-20 pointer-events-none select-none transition-transform duration-300"
        style={{ transformStyle: "preserve-3d", transform: "translateX(-50%)" }}
      >
        <img
          src="/plank-short.png"
          alt=""
          className="w-full h-full object-fill drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        />
        
        {/* Text overlay inside wood board */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 px-4 text-center">
          <span className="font-kiro font-black text-[10px] sm:text-xs text-brand-gold tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {phase.phase}
          </span>
          <span className="font-jakobenz font-black text-sm sm:text-base md:text-lg text-[#dcab62] tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] mt-0.5 whitespace-nowrap">
            {phase.title}
          </span>
        </div>
      </div>

      {/* Card content - list of items */}
      <ul className="w-full space-y-4 pt-2 relative z-10">
        {phase.items.map((item, itemIdx) => (
          <li 
            key={itemIdx} 
            className={`flex items-start transition-colors duration-300 ${
              isCompleted 
                ? "text-[#dcab62]/90 group-hover:text-white" 
                : "text-[#dcab62]/55 group-hover:text-[#dcab62]/85"
            }`}
          >
            {isCompleted ? (
              /* Circle Checkmark SVG */
              <svg
                className="w-5 h-5 flex-shrink-0 text-brand-gold mr-3 mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="#D4AF37" fill="transparent" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
            ) : (
              /* Pending/Dashed empty circle SVG */
              <svg
                className="w-5 h-5 flex-shrink-0 text-[#dcab62]/30 mr-3 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeDasharray="3 2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" fill="transparent" />
              </svg>
            )}
            
            <span className="font-sans text-sm sm:text-base leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] text-left">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Read accessibility settings
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
        stagger: 0.08,
      });
      return () => tl.kill();
    }

    // Set initial 3D transforms
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.9, rotateX: 8 });

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
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);



  // 3D Parallax Hover Handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12; // tilt sensitivity
    const angleY = (x - xc) / 12;
    
    card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    
    // Plank header parallax shift
    const plank = card.querySelector(".plank-header") as HTMLDivElement;
    if (plank) {
      const dx = (x - xc) / 12;
      const dy = (y - yc) / 12;
      plank.style.transform = `translateX(-50%) translate3d(${dx}px, ${dy}px, 20px)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    
    const plank = card.querySelector(".plank-header") as HTMLDivElement;
    if (plank) {
      plank.style.transform = "translateX(-50%) translate3d(0px, 0px, 0px)";
      plank.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    }
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transition = "none";
    
    const plank = card.querySelector(".plank-header") as HTMLDivElement;
    if (plank) {
      plank.style.transition = "none";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full py-24 md:py-36 bg-[#0d2012] overflow-hidden"
      aria-label="MAINEY Roadmap Section"
    >

      
      {/* Background glow separator */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-green/10 blur-[150px]" />
      </div>

      {/* Gold top border separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col items-center">
        
        {/* Section Heading Title Image Wrapper with looping Leaf Videos */}
        <div className="relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] mx-auto mb-20 md:mb-28">
          {/* Left Leaf Video (Flipped horizontally + cropped boundary to hide outlines) */}
          <video
            src="/leaves%20video.webm"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => e.currentTarget.play()}
            className="absolute left-[-35px] sm:left-[-55px] md:left-[-75px] w-[45px] sm:w-[70px] md:w-[90px] h-auto object-contain select-none pointer-events-none z-30"
            style={{ transform: "scaleX(-1)", clipPath: "inset(6%)" }}
          />

          {/* Section Heading Title Image */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={springConfig}
            className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] relative z-20"
          >
            <img
              src="/main roadmap.png"
              alt="MAIN ROADMAP"
              className="w-full h-auto object-contain mx-auto select-none pointer-events-none"
            />
          </motion.div>

          {/* Right Leaf Video (cropped boundary to hide outlines) */}
          <video
            src="/leaves%20video.webm"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => e.currentTarget.play()}
            className="absolute right-[-35px] sm:right-[-55px] md:right-[-75px] w-[45px] sm:w-[70px] md:w-[90px] h-auto object-contain select-none pointer-events-none z-30"
            style={{ clipPath: "inset(6%)" }}
          />
        </div>

        {/* Phase Cards Grid */}
        <div
          ref={cardsContainerRef}
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full"
        >
          {roadmapData.map((phase, idx) => (
            <RoadmapCard
              key={idx}
              phase={phase}
              idx={idx}
              prefersReducedMotion={prefersReducedMotion}
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
