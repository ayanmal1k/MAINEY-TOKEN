"use client";

import { motion } from "framer-motion";

const navLinkClass =
  "font-jakobenz font-black text-sm tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="w-full bg-transparent py-5 px-6 absolute top-0 left-0 z-50 border-b border-[#D4AF37]/10"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Name Text Logo */}
        <a href="#" className="flex items-center select-none cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
          <img
            src="/name-text.png"
            alt="MAINEY"
            className="w-32 sm:w-36 md:w-44 h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
        </a>

        {/* Middle: Navigation Links — Jakobenz font, larger */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-9" role="navigation">
          <a href="#about"      className={navLinkClass}>ABOUT</a>
          <a href="#tokenomics" className={navLinkClass}>TOKENOMICS</a>
          <a href="#roadmap"    className={navLinkClass}>ROADMAP</a>
          <a href="#how-to-buy" className={navLinkClass}>HOW TO BUY</a>
          <a href="#community"  className={navLinkClass}>COMMUNITY</a>
        </nav>

        {/* Right: BUY $MAIN — hero-style green gradient button */}
        <motion.a
          href="https://raydium.io"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 0 22px rgba(50, 98, 43, 0.65)" }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden px-5 py-2.5 rounded-none bg-gradient-to-b from-[#34622b] via-[#284b21] to-[#1c3617] border border-[#d4af37]/80 hover:border-[#ffd700] text-[#dcab62] font-jakobenz font-black text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(40,75,33,0.5)] transition-all duration-300 whitespace-nowrap group"
        >
          {/* Glossy light sweep sheen on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">BUY $MAIN</span>
        </motion.a>

      </div>
    </motion.header>
  );
}
