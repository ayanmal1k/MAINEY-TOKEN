"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, Compass, Sparkles, Layers, Cpu, Code, ArrowRight } from "lucide-react";

// Types
interface MagneticProps {
  children: React.ReactNode;
}

// 1. Magnetic Component for premium hover micro-interactions
function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Scale movement to keep it bounded and subtle
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// 2. Custom Cursor using Framer Motion Spring physics
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerSpringConfig = { damping: 15, stiffness: 120, mass: 0.8 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const followerXSpring = useSpring(followerX, followerSpringConfig);
  const followerYSpring = useSpring(followerY, followerSpringConfig);

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, followerX, followerY, visible]);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
  }, []);

  if (reducedMotion || !visible) return null;

  return (
    <>
      <motion.div
        className={`custom-cursor hidden md:block ${
          hovered ? "w-[32px] h-[32px] bg-brand-blue mix-blend-difference" : "bg-brand-orange"
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <motion.div
        className={`custom-cursor-follower hidden md:block ${
          hovered ? "w-[60px] h-[60px] border-brand-blue scale-75" : "border-brand-orange"
        }`}
        style={{
          x: followerXSpring,
          y: followerYSpring,
        }}
      />
    </>
  );
}

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP Animation example (Continuous text marquee animation)
  useEffect(() => {
    if (!mounted || !marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, [mounted]);

  // Framer Motion staggered child reveal config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  } as const;

  const textScrambleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Decorative Glow Spots */}
      <div className="glow-spot bg-brand-orange top-[-10%] left-[-10%]" aria-hidden="true" />
      <div className="glow-spot bg-brand-blue bottom-[-10%] right-[-10%]" aria-hidden="true" />

      {/* Modern Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 1. Sleek Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-card-border backdrop-blur-md bg-background/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-display font-bold text-white text-lg">M</span>
            <span className="font-display font-extrabold text-xl tracking-widest text-foreground">MAINEY</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {["Design", "Framework", "Performance", "Showcase"].map((item, index) => (
              <Magnetic key={index}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="relative px-3 py-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              </Magnetic>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <Magnetic>
              <button className="interactive px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-md flex items-center gap-2">
                Explore Studio
                <ArrowUpRight size={16} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 relative z-10 py-16">
        {/* 2. Hero Section */}
        <section ref={heroRef} className="min-h-[75vh] flex flex-col justify-center items-start relative mb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-card-border bg-card-bg/60 backdrop-blur-md mb-8">
              <Sparkles className="text-brand-orange animate-pulse" size={16} />
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">Awwwards-grade Motion Core Active</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="font-display font-extrabold text-5xl md:text-8xl tracking-tight leading-[0.95] mb-8"
            >
              CRAFTING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-400 to-brand-blue">
                DIGITAL FRONTIER
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl font-sans"
            >
              An immersive website shell setup for <span className="text-white font-medium">MAINEY</span>. Powered by Next.js, 
              styled with Tailwind CSS, smoothly scrolled by Lenis, and dynamically choreographing animations with GSAP and Framer Motion.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
              <Magnetic>
                <button className="interactive px-8 py-4 rounded-full bg-brand-orange text-white font-bold text-base hover:bg-white hover:text-background transition-all duration-300 shadow-lg shadow-brand-orange/20 flex items-center gap-3">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="interactive px-8 py-4 rounded-full border border-card-border bg-card-bg/40 backdrop-blur-md text-neutral-300 font-semibold text-base hover:bg-card-bg/90 hover:text-white transition-all duration-300 flex items-center gap-3">
                  See Blueprints
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Infinite Text Marquee (GSAP Showcase) */}
        <section ref={marqueeRef} className="w-full overflow-hidden py-12 border-y border-card-border bg-card-bg/20 backdrop-blur-sm mb-24 rounded-2xl">
          <div className="marquee-inner flex whitespace-nowrap gap-16 text-neutral-600 font-display font-extrabold text-5xl md:text-7xl uppercase tracking-widest">
            {/* Duplicated to create seamless loop */}
            <div className="flex gap-16 shrink-0">
              <span>Next.js</span> <span className="text-brand-orange">•</span>
              <span>GSAP</span> <span className="text-brand-blue">•</span>
              <span>Lenis Scroll</span> <span className="text-brand-orange">•</span>
              <span>Framer Motion</span> <span className="text-brand-blue">•</span>
              <span>Tailwind CSS</span> <span className="text-brand-orange">•</span>
            </div>
            <div className="flex gap-16 shrink-0" aria-hidden="true">
              <span>Next.js</span> <span className="text-brand-orange">•</span>
              <span>GSAP</span> <span className="text-brand-blue">•</span>
              <span>Lenis Scroll</span> <span className="text-brand-orange">•</span>
              <span>Framer Motion</span> <span className="text-brand-blue">•</span>
              <span>Tailwind CSS</span> <span className="text-brand-orange">•</span>
            </div>
          </div>
        </section>

        {/* 4. Bento Grid (Awwwards-style layout) */}
        <section id="design" className="mb-24">
          <div className="mb-12">
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">ENGINE BLUEPRINTS</h2>
            <p className="text-neutral-400 max-w-xl">Four high-fidelity engine modules pre-installed and configured for production design.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 1: Next.js */}
            <motion.div 
              variants={textScrambleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border relative overflow-hidden group hover:border-brand-orange/40 transition-colors duration-500 md:col-span-2"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="p-3 bg-neutral-900 rounded-xl border border-card-border text-brand-orange">
                  <Code size={24} />
                </div>
                <span className="text-xs font-mono text-neutral-500 uppercase">Framework core</span>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2 text-white">Next.js App Architecture</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                Structured with Next.js 15+ App Router, full TypeScript types, React Server Components (RSC), optimization for layout shifts, and dynamic meta-data settings.
              </p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-orange/5 blur-2xl group-hover:bg-brand-orange/15 transition-all duration-500 rounded-full" />
            </motion.div>

            {/* Module 2: Tailwind */}
            <motion.div 
              variants={textScrambleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border relative overflow-hidden group hover:border-brand-blue/40 transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="p-3 bg-neutral-900 rounded-xl border border-card-border text-brand-blue">
                  <Layers size={24} />
                </div>
                <span className="text-xs font-mono text-neutral-500 uppercase">Styling Engine</span>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2 text-white">Tailwind CSS v4</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Utilizes the new `@import` design tokens, curated premium color variables, fluid layouts, and system fonts out-of-the-box.
              </p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-blue/5 blur-2xl group-hover:bg-brand-blue/15 transition-all duration-500 rounded-full" />
            </motion.div>

            {/* Module 3: GSAP */}
            <motion.div 
              variants={textScrambleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border relative overflow-hidden group hover:border-brand-blue/40 transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="p-3 bg-neutral-900 rounded-xl border border-card-border text-brand-blue">
                  <Cpu size={24} />
                </div>
                <span className="text-xs font-mono text-neutral-500 uppercase">Choreography</span>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2 text-white">GSAP & ScrollTrigger</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                The ultimate library for ultra-fast timeline choreography, scroll pinning, and high-performance canvas/WebGL render loops.
              </p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-blue/5 blur-2xl group-hover:bg-brand-blue/15 transition-all duration-500 rounded-full" />
            </motion.div>

            {/* Module 4: Framer Motion */}
            <motion.div 
              variants={textScrambleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border relative overflow-hidden group hover:border-brand-orange/40 transition-colors duration-500 md:col-span-2"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="p-3 bg-neutral-900 rounded-xl border border-card-border text-brand-orange">
                  <Compass size={24} />
                </div>
                <span className="text-xs font-mono text-neutral-500 uppercase">Physics Engine</span>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2 text-white">Framer Motion Spring Physics</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                Configured with spring configs for snappy cursors, magnetic proximity snaps, fluid layouts, and accessibility support for prefers-reduced-motion.
              </p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-orange/5 blur-2xl group-hover:bg-brand-orange/15 transition-all duration-500 rounded-full" />
            </motion.div>
          </div>
        </section>
      </main>

      {/* 5. Minimalist Footer */}
      <footer className="border-t border-card-border py-12 bg-card-bg/20 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 text-sm font-sans flex items-center gap-2">
            <span>© {new Date().getFullYear()} MAINEY Studio. Crafted for Premium Performance.</span>
          </div>

          <div className="flex items-center gap-6">
            {["GitHub", "Awwwards", "Twitter"].map((social, index) => (
              <Magnetic key={index}>
                <a 
                  href="#" 
                  className="interactive text-sm text-neutral-400 hover:text-brand-orange transition-colors duration-300"
                >
                  {social}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
