"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinkClass =
  "font-jakobenz font-black text-sm tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-300 uppercase hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]";

const mobileLinkClass =
  "font-jakobenz font-black text-base tracking-widest text-[#dcab62] hover:text-[#ffd700] transition-colors duration-200 uppercase py-3 border-b border-[#D4AF37]/10 w-full text-center";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Desktop: absolute transparent overlay ─────────────────────────── */}
      {/* ─── Mobile:  relative solid bar that pushes hero content down ──────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={[
          "w-full z-50",
          /* mobile — in-flow, solid dark bg */
          "relative bg-[#061109]/97 backdrop-blur-md border-b border-[#D4AF37]/15",
          /* md+ — absolute transparent overlay */
          "md:absolute md:top-0 md:left-0 md:bg-transparent md:backdrop-blur-none md:border-b md:border-[#D4AF37]/10",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-5 py-4 md:py-5 flex items-center justify-between">

          {/* Left: Logo */}
          <a href="#" className="flex items-center select-none cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/name-text.png"
              alt="MAINEY"
              className="w-28 sm:w-32 md:w-44 h-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </a>

          {/* Middle: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9" role="navigation">
            <a href="#about"      className={navLinkClass}>ABOUT</a>
            <a href="#tokenomics" className={navLinkClass}>TOKENOMICS</a>
            <a href="#roadmap"    className={navLinkClass}>ROADMAP</a>
            <a href="#how-to-buy" className={navLinkClass}>HOW TO BUY</a>
            <a href="#community"  className={navLinkClass}>COMMUNITY</a>
          </nav>

          {/* Right: BUY $MAIN button (always visible) + hamburger on mobile */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://raydium.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 22px rgba(50, 98, 43, 0.65)" }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-4 md:px-5 py-2 md:py-2.5 rounded-none bg-gradient-to-b from-[#34622b] via-[#284b21] to-[#1c3617] border border-[#d4af37]/80 hover:border-[#ffd700] text-[#dcab62] font-jakobenz font-black text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(40,75,33,0.5)] transition-all duration-300 whitespace-nowrap group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">BUY $MAIN</span>
            </motion.a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] group"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-6 h-[2px] bg-[#dcab62] group-hover:bg-[#ffd700] transition-colors rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[2px] bg-[#dcab62] group-hover:bg-[#ffd700] transition-colors rounded-full"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-6 h-[2px] bg-[#dcab62] group-hover:bg-[#ffd700] transition-colors rounded-full origin-center"
              />
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden bg-[#040d06]/98 border-t border-[#D4AF37]/10 px-6 pb-4 flex flex-col items-center"
              role="navigation"
            >
              <a href="#about"      onClick={closeMenu} className={mobileLinkClass}>ABOUT</a>
              <a href="#tokenomics" onClick={closeMenu} className={mobileLinkClass}>TOKENOMICS</a>
              <a href="#roadmap"    onClick={closeMenu} className={mobileLinkClass}>ROADMAP</a>
              <a href="#how-to-buy" onClick={closeMenu} className={mobileLinkClass}>HOW TO BUY</a>
              <a href="#community"  onClick={closeMenu} className={mobileLinkClass}>COMMUNITY</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

