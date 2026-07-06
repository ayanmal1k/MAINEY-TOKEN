"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

export default function HowToBuySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  // Read reduced motion settings
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // ResizeObserver for dynamic custom borders
  useEffect(() => {
    if (!boardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger timeline for staggering steps and internal icon animations
  useEffect(() => {
    if (!sectionRef.current || !stepsContainerRef.current) return;

    const steps = stepsContainerRef.current.querySelectorAll(".step-item");
    const arrows = stepsContainerRef.current.querySelectorAll(".step-arrow");

    if (prefersReducedMotion) {
      gsap.set(steps, { opacity: 0 });
      gsap.set(arrows, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      });
      tl.to(steps, { opacity: 1, duration: 0.5, stagger: 0.1 });
      tl.to(arrows, { opacity: 0.6, duration: 0.4 }, "-=0.2");
      return () => tl.kill();
    }

    // Set initial states for components
    gsap.set(steps, { opacity: 0, y: 40 });
    gsap.set(arrows, { opacity: 0, scale: 0.5 });

    // Inner icon elements initial states
    gsap.set(".solana-bar-1, .solana-bar-2, .solana-bar-3", { opacity: 0 });
    gsap.set(".wallet-flap", { rotate: -15, transformOrigin: "left bottom" });
    gsap.set(".wallet-clasp", { scale: 0, transformOrigin: "center center" });
    gsap.set(".swap-arrow-top, .swap-arrow-bottom", { rotate: -180, transformOrigin: "center center" });
    gsap.set(".crown-body", { scaleY: 0, transformOrigin: "center bottom" });
    gsap.set(".crown-gem", { scale: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Step cards stagger reveal
    tl.to(steps, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    });

    // Solana logo path slide stagger
    tl.fromTo(".solana-bar-1", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.5")
      .fromTo(".solana-bar-2", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.32")
      .fromTo(".solana-bar-3", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.32");

    // Wallet opening flap animation
    tl.to(".wallet-flap", { rotate: 0, duration: 0.5, ease: "back.out(1.8)" }, "-=0.4")
      .to(".wallet-clasp", { scale: 1, duration: 0.3, ease: "back.out(2)" }, "-=0.3");

    // Swap arrows rotation
    tl.to(".swap-arrow-top, .swap-arrow-bottom", { rotate: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, "-=0.5");

    // Crown points reveal and gem pops
    tl.to(".crown-body", { scaleY: 1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.4")
      .to(".crown-gem", { scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, "-=0.3");

    // Reveal connector arrows
    tl.to(
      arrows,
      {
        opacity: 0.6,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.5)",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

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

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-10%", "10%"]
  );

  // Mouse Spotlight handler
  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };

  const handleBoardMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, visible: false }));
  };

  // Border vector SVG path calculations
  const W = dimensions.width;
  const H = dimensions.height;
  const R = 16; // Notch radius
  const pad = 4.5; // Inner border padding offset
  const r_i = Math.max(0, R - pad); // Inner notch radius

  const outerPath = W && H ? `M ${R},0 L ${W - R},0 A ${R},${R} 0 0,0 ${W},${R} L ${W},${H - R} A ${R},${R} 0 0,0 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0,0 0,${H - R} L 0,${R} A ${R},${R} 0 0,0 ${R},0 Z` : "";
  const innerPath = W && H ? `M ${pad + r_i},${pad} L ${pad + W - pad * 2 - r_i},${pad} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2},${pad + r_i} L ${pad + W - pad * 2},${pad + H - pad * 2 - r_i} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2 - r_i},${pad + H - pad * 2} L ${pad + r_i},${pad + H - pad * 2} A ${r_i},${r_i} 0 0,0 ${pad},${pad + H - pad * 2 - r_i} L ${pad},${pad + r_i} A ${r_i},${r_i} 0 0,0 ${pad + r_i},${pad} Z` : "";

  return (
    <section
      ref={sectionRef}
      id="how-to-buy"
      className="relative w-full py-24 md:py-36 bg-[#0d2012] overflow-hidden"
      aria-label="MAINEY How to Buy Section"
    >
      {/* Background Image with Parallax (matches About Section) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-[120%] top-[-10%]">
        <motion.img
          src="/about bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ y: backgroundY }}
          aria-hidden="true"
        />
        {/* Rich dark overlay gradient to blend nicely with top and bottom sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2012] via-[#0d2012]/30 to-[#0d2012] z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* 1. Background Bushes with Parallax Framing (flipped left using scaleX style, original right) */}
      <motion.img
        src="/bushes right.png"
        alt=""
        style={{ y: bushY, scaleX: -1, clipPath: "inset(3px)" }}
        className="absolute left-[-20px] bottom-[-20px] h-[55%] md:h-[75%] w-auto object-contain select-none pointer-events-none z-10 opacity-35 md:opacity-50 brightness-[0.4]"
        aria-hidden="true"
      />
      <motion.img
        src="/bushes right.png"
        alt=""
        style={{ y: bushY, clipPath: "inset(3px)" }}
        className="absolute right-[-20px] bottom-[-20px] h-[55%] md:h-[75%] w-auto object-contain select-none pointer-events-none z-10 opacity-35 md:opacity-50 brightness-[0.4]"
        aria-hidden="true"
      />

      {/* Subtle ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-green/5 blur-[160px] pointer-events-none z-0" aria-hidden="true" />

      {/* Gold top border separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />

      {/* 2. Content Container */}
      <div className="relative z-20 container mx-auto px-6 max-w-7xl flex flex-col items-center">

        {/* Title Image */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={springConfig}
          className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] mb-16 md:mb-24"
        >
          <img
            src="/how to buy main text.png"
            alt="HOW TO BUY $MAIN"
            className="w-full h-auto object-contain mx-auto select-none pointer-events-none"
          />
        </motion.div>

        {/* Board wrapper with custom SVG border background */}
        <div
          ref={boardRef}
          onMouseMove={handleBoardMouseMove}
          onMouseLeave={handleBoardMouseLeave}
          className="relative w-full max-w-6xl p-6 py-10 md:py-16 md:px-12 transition-all duration-300 z-10"
        >
          {/* Custom SVG border card background */}
          {W > 0 && H > 0 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]"
              viewBox={`0 0 ${W} ${H}`}
              aria-hidden="true"
            >
              <path
                d={outerPath}
                fill="#0C1E11"
                fillOpacity="0.88"
              />
              <path
                d={outerPath}
                fill="transparent"
                stroke="#D4AF37"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
              <path
                d={innerPath}
                fill="transparent"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.15"
              />
            </svg>
          )}

          {/* Golden Spotlight Overlay */}
          {!prefersReducedMotion && spotlight.visible && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300"
              style={{
                background: `radial-gradient(250px circle at ${spotlight.x}px ${spotlight.y}px, rgba(212, 175, 55, 0.08), transparent 80%)`
              }}
              aria-hidden="true"
            />
          )}

          {/* Steps Grid Content */}
          <div
            ref={stepsContainerRef}
            className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 w-full"
          >
            {/* Step 1 */}
            <div className="step-item flex flex-col items-center text-center max-w-[200px] w-full group">
              <div className="w-14 h-14 mb-4 flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110">
                {/* Solana logo SVG with animation classes (Solid color #dcab62) */}
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 508.07 398.17" className="w-full h-full">
                  <path className="solana-bar-1" fill="#dcab62" d="M84.53,358.89A16.63,16.63,0,0,1,96.28,354H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,439Z" transform="translate(-1.98 -55)" />
                  <path className="solana-bar-2" fill="#dcab62" d="M84.53,59.85A17.08,17.08,0,0,1,96.28,55H501.73a8.3,8.3,0,0,1,5.87,14.18l-80.09,80.09a16.61,16.61,0,0,1-11.75,4.86H10.31A8.31,8.31,0,0,1,4.43,140Z" transform="translate(-1.98 -55)" />
                  <path className="solana-bar-3" fill="#dcab62" d="M427.51,208.42a16.61,16.61,0,0,0-11.75-4.86H10.31a8.31,8.31,0,0,0-5.88,14.18l80.1,80.09a16.60,16.60,0,0,0,11.75,4.86H501.73a8.3,8.3,0,0,0,5.87-14.18Z" transform="translate(-1.98 -55)" />
                </svg>
              </div>
              <h3 className="font-jakobenz font-black text-base md:text-lg text-brand-gold tracking-wide mb-2 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-[#ffd700]">
                GET SOLANA
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#dcab62]/80 group-hover:text-[#dcab62] transition-colors duration-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Buy SOL from your favorite exchange
              </p>
            </div>

            {/* Separator Arrow 1 */}
            <div className="step-arrow flex items-center justify-center opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transform md:rotate-0 rotate-90 text-brand-gold">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="step-item flex flex-col items-center text-center max-w-[200px] w-full group">
              <div className="w-14 h-14 mb-4 flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110">
                {/* Wallet SVG with animation classes */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <path className="wallet-flap" d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                  <path className="wallet-body" d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                  <path className="wallet-strap" d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6h-4z" />
                  <circle className="wallet-clasp" cx="18" cy="15" r="1.2" fill="#D4AF37" />
                </svg>
              </div>
              <h3 className="font-jakobenz font-black text-base md:text-lg text-brand-gold tracking-wide mb-2 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-[#ffd700]">
                CONNECT WALLET
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#dcab62]/80 group-hover:text-[#dcab62] transition-colors duration-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Connect your wallet to Pump.fun
              </p>
            </div>

            {/* Separator Arrow 2 */}
            <div className="step-arrow flex items-center justify-center opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transform md:rotate-0 rotate-90 text-brand-gold">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="step-item flex flex-col items-center text-center max-w-[200px] w-full group">
              <div className="w-14 h-14 mb-4 flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
                {/* Swap Loop Arrows SVG with animation classes (color changed to #dcab62) */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#dcab62" strokeWidth="1.8" className="w-12 h-12 transition-transform duration-700 ease-out group-hover:rotate-180">
                  <path className="swap-arrow-top" d="M17 2.1l4 4-4 4" />
                  <path className="swap-arrow-top" d="M3 12a9 9 0 0 1 15-6.7L21 6" />
                  <path className="swap-arrow-bottom" d="M7 21.9l-4-4 4-4" />
                  <path className="swap-arrow-bottom" d="M21 12a9 9 0 0 1-15 6.7L3 18" />
                  <path className="swap-arrow-line" d="M10 12h4m-2-2v4" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="font-jakobenz font-black text-base md:text-lg text-brand-gold tracking-wide mb-2 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-[#ffd700]">
                SWAP ON PUMP.FUN
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#dcab62]/80 group-hover:text-[#dcab62] transition-colors duration-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Swap SOL for $MAIN on Pump.fun
              </p>
            </div>

            {/* Separator Arrow 3 */}
            <div className="step-arrow flex items-center justify-center opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transform md:rotate-0 rotate-90 text-brand-gold">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="step-item flex flex-col items-center text-center max-w-[200px] w-full group">
              <div className="w-14 h-14 mb-4 flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110">
                {/* Crown SVG with animation classes */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                  <path className="crown-body" d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" fill="none" />
                  <path className="crown-base" d="M3 20h18" strokeWidth="2" />
                  <circle className="crown-gem" cx="2" cy="4" r="1.2" fill="#D4AF37" />
                  <circle className="crown-gem" cx="22" cy="4" r="1.2" fill="#D4AF37" />
                  <circle className="crown-gem" cx="12" cy="4" r="1.2" fill="#D4AF37" />
                </svg>
              </div>
              <h3 className="font-jakobenz font-black text-base md:text-lg text-brand-gold tracking-wide mb-2 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-[#ffd700]">
                HODL & ENJOY
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#dcab62]/80 group-hover:text-[#dcab62] transition-colors duration-300 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Hold $MAIN and be part of the movement
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Gold bottom border separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent z-20" aria-hidden="true" />
    </section>
  );
}
