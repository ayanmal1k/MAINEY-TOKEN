"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const cols = footerRef.current.querySelectorAll(".footer-col");

    const scrollTriggerConfig = {
      trigger: footerRef.current,
      start: "top 95%",
      toggleActions: "play none none none"
    };

    gsap.fromTo(cols,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.12, 
        ease: "power2.out",
        scrollTrigger: scrollTriggerConfig
      }
    );
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full py-10 md:py-14 bg-[#0a180f] border-t border-[#D4AF37]/20 overflow-hidden"
      aria-label="MAINEY Footer"
    >
      {/* Background glow overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-brand-green/5 blur-[120px]" />
      </div>

      {/* Grid Container */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center justify-between">
          
          {/* Left Column: Name Text Logo */}
          <div className="footer-col flex flex-col items-center md:items-start text-center md:text-left select-none pointer-events-none">
            <img 
              src="/name-text.png" 
              alt="MAINEY" 
              className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]" 
            />
          </div>

          {/* Center Column: Social Icon Links */}
          <div className="footer-col flex flex-row gap-5 items-center justify-center">
            {/* Telegram Icon Link */}
            <motion.a
              href="https://t.me/+VCIatTbYnQthYjdk"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 6, borderColor: "#ffd700", color: "#ffd700" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/50 text-[#dcab62] hover:text-[#ffd700] flex items-center justify-center transition-colors duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] bg-black/25"
              aria-label="Join our Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5.5 h-5.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.97.53-1.34.52-.41-.01-1.21-.23-1.8-.42-.72-.24-1.3-.37-1.25-.79.03-.22.33-.44.9-.67 3.52-1.53 5.87-2.54 7.05-3.03 3.35-1.39 4.05-1.63 4.51-1.64.1 0 .33.02.48.15.12.1.16.24.18.34.02.1.03.22.01.32z" />
              </svg>
            </motion.a>

            {/* X Icon Link */}
            <motion.a
              href="https://x.com/MAINEYTHECAPY"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: -6, borderColor: "#ffd700", color: "#ffd700" }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/50 text-[#dcab62] hover:text-[#ffd700] flex items-center justify-center transition-colors duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] bg-black/25"
              aria-label="Follow us on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
          </div>

          {/* Right Column: Disclaimer Text */}
          <div className="footer-col flex flex-col items-center md:items-end text-center md:text-right text-[10px] md:text-xs leading-relaxed text-[#dcab62]/70 font-sans font-medium">
            <p>$MAIN is a meme coin with no intrinsic value</p>
            <p>or expectation of financial return.</p>
            <p>Always do your own research.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
