"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Parallax Scroll Effect for the Background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-8%", "8%"]
  );

  // Magnetic Button Spring Vectors
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const buttonSpringX = useSpring(mouseX, { stiffness: 200, damping: 15, mass: 0.6 });
  const buttonSpringY = useSpring(mouseY, { stiffness: 200, damping: 15, mass: 0.6 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull radius (within 120px)
    const distance = Math.hypot(distanceX, distanceY);
    if (distance < 120) {
      // Pull towards cursor with dampening
      mouseX.set(distanceX * 0.35);
      mouseY.set(distanceY * 0.35);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMagneticLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-44 overflow-hidden bg-background"
      aria-label="About Mainey Section"
    >
      {/* 1. Background Image with Parallax and Ambient Overlay (Ambient Life Layer) */}
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

      {/* Gold top border line separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent z-20" aria-hidden="true" />

      {/* 2. Content Container (Asymmetric 6/6 Composition) */}
      <div className="relative z-20 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Left Column: Badge (about image) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={springConfig}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] aspect-square group">
              {/* Subtle ambient pulse glow behind the badge */}
              <div
                className="absolute -inset-4 rounded-full bg-brand-gold/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              <motion.img
                src="/about image.png"
                alt="In The Main We Trust Capybara Badge illustration"
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] select-none pointer-events-none"
                whileHover={prefersReducedMotion ? {} : {
                  rotate: 2,
                  scale: 1.04,
                  filter: "drop-shadow(0 20px 40px rgba(212, 175, 55, 0.45))"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
              />
            </div>
          </motion.div>

          {/* Right Column: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Heading image */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[500px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] mb-8"
            >
              <img
                src="/About mainey text.png"
                alt="ABOUT MAINEY"
                className="w-full h-auto object-contain mx-auto lg:mx-0 select-none pointer-events-none"
              />
            </motion.div>

            {/* Description Text */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-6 text-[#dcab62]/90 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mb-10 drop-shadow-[0_3px_6px_rgba(0,0,0,0.65)]"
            >
              <p>
                Mainey the Capybara is here to bring good vibes,
                strong community, and meme energy to the blockchain.
              </p>
              <p>
                We don't chase pumps — we build a movement.
                Relax, Hodl, and let's make history together.
              </p>
            </motion.div>

            {/* CTA Button (Magnetic Microinteraction) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.4 }}
              className="w-full sm:w-auto"
            >
              <motion.a
                href="https://t.me/+4hVEk4VxztgzNGQ0"
                target="_blank"
                rel="noopener noreferrer"
                ref={buttonRef}
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={prefersReducedMotion ? {} : { x: buttonSpringX, y: buttonSpringY }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)",
                  borderColor: "#dcab62",
                  backgroundColor: "rgba(212, 175, 55, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-12 py-5 rounded-none border border-brand-gold bg-black/45 text-brand-gold hover:text-[#dcab62] font-kiro font-black text-sm md:text-lg tracking-widest uppercase flex items-center justify-center cursor-pointer transition-all duration-300 w-full sm:w-auto group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold text-center"
              >
                {/* Gold sheen light sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">JOIN THE MOVEMENT</span>
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
