"use client";

import { motion } from "framer-motion";

import AboutSection from "@/components/AboutSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import RoadmapSection from "@/components/RoadmapSection";
import HowToBuySection from "@/components/HowToBuySection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

// Standard bouncy spring configuration
const springConfig = { type: "spring" as const, stiffness: 120, damping: 14, mass: 0.8 };

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-background">
      {/* Loading Screen — unmounts after ~2.45 s */}
      <LoadingScreen />

      {/* Navbar */}
      <Navbar />

      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
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
        <div className="relative z-20 container mx-auto px-6 py-8 md:py-24 md:pt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen">

          {/* Left Side: Brand Text & Token CTA Actions */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:pr-6 z-10">

            {/* Logo Name Image (MAINEY THE CAPYBARA) */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full max-w-[460px] md:max-w-[520px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-0"
            >
              <img
                src="/name-text.png"
                alt="MAINEY THE CAPYBARA"
                className="w-full h-auto object-contain mx-auto"
              />
            </motion.div>

            {/* Slogan Banner: "IN THE MAIN WE TRUST" Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springConfig, delay: 0.2 }}
              className="w-full max-w-[360px] md:max-w-[420px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] -mt-8 mb-0"
            >
              <img
                src="/in main we trust.png"
                alt="IN THE MAIN WE TRUST"
                className="w-full h-auto object-contain mx-auto"
              />
            </motion.div>

            {/* Massive Forest Green, Vibrant Textured $MAIN Text Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springConfig, delay: 0.35 }}
              className="w-full max-w-[440px] md:max-w-[540px] drop-shadow-[0_6px_15px_rgba(0,0,0,0.6)] -mt-8 mb-2"
            >
              <img
                src="/main-text.png"
                alt="$MAIN"
                className="w-full h-auto object-contain mx-auto"
              />
            </motion.div>

            {/* Description (Centered, no background) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#dcab62] font-jakobenz font-black text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase mb-10 max-w-xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] [text-shadow:0_0_20px_rgba(212,175,55,0.3)]"
            >
              THE MOST CHILL CAPYBARA ON SOLANA
            </motion.p>

            {/* CTAs (Centered) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.65 }}
              className="flex flex-row flex-nowrap gap-3 md:gap-4 justify-center w-full max-w-full px-2"
            >
              {/* BUY $MAIN Button */}
              <motion.a
                href="https://raydium.io"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(50, 98, 43, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-5 md:px-10 py-4 rounded-none bg-gradient-to-b from-[#34622b] via-[#284b21] to-[#1c3617] border border-[#d4af37]/80 hover:border-[#ffd700] text-[#dcab62] font-kiro font-black text-sm md:text-lg tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(40,75,33,0.5)] transition-all duration-300 w-[48%] md:w-auto whitespace-nowrap group text-center"
              >
                {/* Glossy light sweep sheen on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">BUY $MAIN</span>
              </motion.a>

              {/* JOIN COMMUNITY Button */}
              <motion.a
                href="https://t.me/+4hVEk4VxztgzNGQ0"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(220, 171, 98, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden px-5 md:px-10 py-4 rounded-none bg-gradient-to-b from-[#121c15]/90 via-[#0a110b]/95 to-[#030604]/98 border border-[#dcab62]/30 hover:border-[#dcab62]/85 text-[#dcab62] font-kiro font-black text-sm md:text-lg tracking-widest uppercase flex items-center justify-center cursor-pointer transition-all duration-300 w-[48%] md:w-auto whitespace-nowrap group text-center"
              >
                {/* Subtle green sheen on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#22C55E]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10">JOIN COMMUNITY</span>
              </motion.a>
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
                className="w-full max-w-[450px] md:max-w-[550px] lg:max-w-none lg:w-[215%] h-auto max-h-none lg:translate-x-12 xl:translate-x-20 select-none pointer-events-none object-contain origin-center"
              />
            </div>
          </motion.div>

          {/* Features Section Plank */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.8 }}
            className="lg:col-span-12 w-full mt-16 lg:mt-8 flex justify-center z-30"
          >
            <div className="relative w-[260px] h-[720px] lg:w-full lg:max-w-6xl lg:h-[160px] mx-auto flex items-center justify-center">
              {/* Rotated Wood Plank Background: long plank rotated 90deg on mobile, horizontal on desktop */}
              <div className="absolute w-[720px] h-[260px] lg:w-full lg:h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 lg:rotate-0 z-0 pointer-events-none select-none">
                <img
                  src="/plank-long.png"
                  alt="Wood Plank Background"
                  className="w-full h-full object-fill drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]"
                />
              </div>

              {/* Features Content Row / Column */}
              <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-around py-12 lg:py-0 px-4 lg:px-8">
                {/* Feature 1: Fair Launch */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/5 py-4 lg:py-0 relative"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] bg-[#1e140a]/40">
                    <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110">
                      shield
                    </span>
                  </div>
                  <h3 className="font-jakobenz font-black text-brand-gold text-sm lg:text-base tracking-wider uppercase transition-colors duration-300 group-hover:text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    FAIR LAUNCH
                  </h3>
                  <p className="text-[#dcab62] font-kiro font-bold text-xs lg:text-sm tracking-wide mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    No Presale
                  </p>
                  {/* Vertical Divider (only on desktop, skip for last item) */}
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#3a200a]/50" />
                </motion.div>

                {/* Feature 2: LP Locked */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/5 py-4 lg:py-0 relative"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] bg-[#1e140a]/40">
                    <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110">
                      lock
                    </span>
                  </div>
                  <h3 className="font-jakobenz font-black text-brand-gold text-sm lg:text-base tracking-wider uppercase transition-colors duration-300 group-hover:text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    LP LOCKED
                  </h3>
                  <p className="text-[#dcab62] font-kiro font-bold text-xs lg:text-sm tracking-wide mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    100% Locked
                  </p>
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#3a200a]/50" />
                </motion.div>

                {/* Feature 3: Tax */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/5 py-4 lg:py-0 relative"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] bg-[#1e140a]/40">
                    <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110">
                      percent
                    </span>
                  </div>
                  <h3 className="font-jakobenz font-black text-brand-gold text-sm lg:text-base tracking-wider uppercase transition-colors duration-300 group-hover:text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    TAX
                  </h3>
                  <p className="text-[#dcab62] font-kiro font-bold text-xs lg:text-sm tracking-wide mt-0.5 whitespace-nowrap filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    0% Buy / 0% Sell
                  </p>
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#3a200a]/50" />
                </motion.div>

                {/* Feature 4: Network */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  className="flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/5 py-4 lg:py-0 relative"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] bg-[#1e140a]/40">
                    <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110">
                      layers
                    </span>
                  </div>
                  <h3 className="font-jakobenz font-black text-brand-gold text-sm lg:text-base tracking-wider uppercase transition-colors duration-300 group-hover:text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    NETWORK
                  </h3>
                  <p className="text-[#dcab62] font-kiro font-bold text-xs lg:text-sm tracking-wide mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Solana
                  </p>
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#3a200a]/50" />
                </motion.div>

                {/* Feature 5: Supply */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  className="flex flex-col items-center text-center cursor-pointer group w-full lg:w-1/5 py-4 lg:py-0 relative"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:border-[#ffd700] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.7)] bg-[#1e140a]/40">
                    <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl transition-all duration-300 group-hover:text-[#ffd700] group-hover:scale-110">
                      wallet
                    </span>
                  </div>
                  <h3 className="font-jakobenz font-black text-brand-gold text-sm lg:text-base tracking-wider uppercase transition-colors duration-300 group-hover:text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    SUPPLY
                  </h3>
                  <p className="text-[#dcab62] font-kiro font-bold text-xs lg:text-sm tracking-wide mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    1,000,000,000
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Tokenomics Section */}
      <TokenomicsSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* How To Buy Section */}
      <HowToBuySection />

      {/* Community Section */}
      <CommunitySection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
