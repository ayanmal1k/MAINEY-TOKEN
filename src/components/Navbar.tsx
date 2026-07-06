"use client";

import { motion } from "framer-motion";
import NotchedButton from "./NotchedButton";

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

        {/* Middle: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" role="navigation">
          <a 
            href="#about" 
            className="font-kiro font-bold text-xs tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          >
            ABOUT
          </a>
          <a 
            href="#tokenomics" 
            className="font-kiro font-bold text-xs tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          >
            TOKENOMICS
          </a>
          <a 
            href="#roadmap" 
            className="font-kiro font-bold text-xs tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          >
            ROADMAP
          </a>
          <a 
            href="#how-to-buy" 
            className="font-kiro font-bold text-xs tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          >
            HOW TO BUY
          </a>
          <a 
            href="#community" 
            className="font-kiro font-bold text-xs tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          >
            COMMUNITY
          </a>
        </nav>

        {/* Right: Buy Button */}
        <div className="flex items-center">
          <NotchedButton 
            variant="green"
            href="https://raydium.io"
            className="px-4 py-2.5 h-[38px] min-w-[105px] text-[10px] md:text-xs"
          >
            BUY $MAIN
          </NotchedButton>
        </div>
      </div>
    </motion.header>
  );
}
