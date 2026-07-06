"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

// Standard bouncy spring configuration
const springConfig = { type: "spring" as const, stiffness: 120, damping: 14, mass: 0.8 };

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* 1. Full-bleed background image with dark green ambient overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="/hero bg.png" 
          alt="MAINEY Capybara Forest Background" 
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Rich dark forest overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#061109]/95 via-[#061109]/45 to-transparent z-10" />
      </div>

      {/* 2. Content Layout Container */}
      <div className="relative z-20 container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen">
        
        {/* Left Side: Brand Text & Token CTA Actions */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:pr-6 z-10">
          
          {/* Logo Name Image (MAINEY THE CAPYBARA) */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full max-w-[460px] md:max-w-[520px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-6"
          >
            <img 
              src="/name-text.png" 
              alt="MAINEY THE CAPYBARA" 
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Slogan Banner: "IN THE MAIN WE TRUST" */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springConfig, delay: 0.2 }}
            className="bg-black/75 border-y-2 border-brand-gold text-brand-gold px-6 md:px-8 py-3.5 text-base md:text-xl font-display font-black tracking-wider uppercase transform -skew-x-6 rotate-[-1deg] shadow-lg mb-6 max-w-md"
          >
            IN THE MAIN WE TRUST
          </motion.div>

          {/* Massive Forest Green, Vibrant Textured $MAIN Text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springConfig, delay: 0.35 }}
            className="font-display font-extrabold text-7xl md:text-9xl tracking-wider uppercase mb-6 bg-clip-text text-transparent select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.75)]"
            style={{
              backgroundImage: "linear-gradient(to bottom, #7CFF29, #15803D)", // Vibrant leaf green to forest green
              WebkitTextStroke: "3px #031408",
              textShadow: "0px 5px 8px rgba(0,0,0,0.5)"
            }}
          >
            $MAIN
          </motion.h1>

          {/* Description (Centered, no background) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[#FEF3C7] font-display font-black text-xs md:text-sm tracking-widest uppercase mb-10 max-w-xl filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)]"
          >
            THE MOST CHILL CAPYBARA ON SOLANA
          </motion.p>

          {/* CTAs (Centered) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springConfig, delay: 0.65 }}
            className="flex flex-wrap gap-4 justify-center w-full"
          >
            {/* BUY $MAIN Button */}
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-brand-green border-2 border-brand-gold hover:bg-[#1a5f36] text-white font-display font-black text-sm md:text-base tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-[0_5px_15px_rgba(20,83,45,0.4)] transition-colors duration-200"
            >
              BUY $MAIN
              <ArrowUpRight className="w-5 h-5 text-brand-gold" />
            </motion.button>

            {/* JOIN COMMUNITY Button */}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.85)", borderColor: "#FEF3C7" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-black/60 border-2 border-brand-gold hover:bg-black/85 text-brand-gold hover:text-foreground font-display font-black text-sm md:text-base tracking-widest uppercase flex items-center gap-2 cursor-pointer transition-all duration-200"
            >
              JOIN COMMUNITY
              <MessageCircle className="w-5 h-5 text-brand-gold" />
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side: Showcase Video (Uncropped, custom size) */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.3 }}
          className="lg:col-span-7 flex items-center justify-center w-full z-0"
        >
          <div className="w-full relative flex justify-center lg:px-4">
            {/* Capybara Loop Video 2 (WebM) - Uncropped (object-contain) */}
            <video
              src="/hero video 2.webm"
              autoPlay
              loop
              muted
              playsInline
              onEnded={(e) => {
                e.currentTarget.play();
              }}
              className="w-full lg:w-[215%] h-auto max-h-none lg:translate-x-12 xl:translate-x-20 select-none pointer-events-none object-contain origin-center"
            />
          </div>
        </motion.div>

      </div>
    </main>
  );
}
