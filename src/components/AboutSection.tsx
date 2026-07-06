"use client";

import { motion } from "framer-motion";

const springConfig = { type: "spring" as const, stiffness: 100, damping: 15, mass: 0.8 };

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-44 overflow-hidden bg-background">
      {/* 1. Background Image with Ambient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/about bg.png"
          alt="MAINEY About Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Rich dark overlay gradient to blend nicely with top and bottom sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061109] via-transparent to-[#061109] z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Gold top border line to act as a separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-20" />

      {/* 2. Content Container */}
      <div className="relative z-20 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Badge (about image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springConfig}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] aspect-square group">
              {/* Subtle ambient pulse glow behind the badge */}
              <div className="absolute -inset-4 rounded-full bg-brand-gold/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <motion.img
                src="/about image.png"
                alt="In The Main We Trust Badge"
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] select-none pointer-events-none"
                whileHover={{ 
                  rotate: 2, 
                  scale: 1.04,
                  filter: "drop-shadow(0 20px 40px rgba(212, 175, 55, 0.45))"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
              />
            </div>
          </motion.div>

          {/* Right Side: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Heading image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-6 text-[#FEF3C7]/90 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mb-10 drop-shadow-[0_3px_6px_rgba(0,0,0,0.65)]"
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...springConfig, delay: 0.4 }}
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)",
                  borderColor: "#FEF3C7",
                  backgroundColor: "rgba(212, 175, 55, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-12 py-5 rounded-2xl border border-brand-gold bg-black/45 text-brand-gold hover:text-[#FEF3C7] font-kiro font-black text-sm md:text-lg tracking-widest uppercase flex items-center justify-center cursor-pointer transition-all duration-300 w-full sm:w-auto group"
              >
                {/* Gold sheen light sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">JOIN THE MOVEMENT</span>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
