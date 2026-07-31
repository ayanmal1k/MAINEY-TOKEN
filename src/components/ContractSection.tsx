"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotchedButton from "./NotchedButton";

const CONTRACT_ADDRESS = "5YcoReZULnQht691zUmXLB1j6sYmWs5jTmKz3Vqypump";

export default function ContractSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = CONTRACT_ADDRESS;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contract-address"
      className="relative w-full py-12 md:py-16 bg-[#09150c] border-y border-[#D4AF37]/20 overflow-hidden"
      aria-label="Official Solana Contract Address"
    >
      {/* Background ambient lighting and subtle gradient glow */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-brand-green/20 via-[#D4AF37]/10 to-brand-green/20 rounded-full blur-[120px] opacity-70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge / Header Title */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122818]/90 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-lightgreen animate-pulse" />
            <span className="font-jakobenz font-black text-xs md:text-sm text-brand-gold tracking-widest uppercase">
              OFFICIAL SOLANA CONTRACT
            </span>
          </div>

          <h2 className="font-jakobenz font-black text-2xl sm:text-3xl md:text-4xl text-[#ffd700] tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2">
            CONTRACT ADDRESS
          </h2>

          <p className="font-kiro font-bold text-xs sm:text-sm md:text-base text-[#dcab62] tracking-wider max-w-xl mb-8">
            Verify the official $MAIN token contract address on Solana before trading
          </p>

          {/* Main Contract Address Container */}
          <div className="w-full max-w-3xl relative group">
            {/* Outer Glowing Frame */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/30 via-[#22C55E]/30 to-[#D4AF37]/30 blur-md opacity-60 group-hover:opacity-100 transition duration-500" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 md:p-6 bg-[#07130a]/95 border-2 border-[#D4AF37]/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
              
              {/* Address Display Box */}
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden text-left bg-[#050d07] px-4 py-3 sm:py-3.5 rounded-xl border border-[#D4AF37]/20 w-full sm:flex-1">
                <span className="material-symbols-outlined text-brand-gold text-xl sm:text-2xl shrink-0">
                  verified
                </span>
                
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] font-kiro font-black text-[#dcab62]/70 uppercase tracking-widest">
                    SOLANA CONTRACT (CA)
                  </span>
                  {/* Address Text - Full on desktop, responsive truncation / break on mobile */}
                  <code className="font-kiro font-bold text-xs sm:text-sm md:text-base text-[#ffd700] tracking-wider select-all truncate sm:select-text">
                    {CONTRACT_ADDRESS}
                  </code>
                </div>
              </div>

              {/* Interactive Copy Button */}
              <div className="w-full sm:w-auto shrink-0 flex justify-center">
                <NotchedButton
                  onClick={handleCopy}
                  variant={copied ? "green" : "outline"}
                  className="w-full sm:w-auto min-w-[160px]"
                  icon={
                    <span className="material-symbols-outlined text-lg">
                      {copied ? "check_circle" : "content_copy"}
                    </span>
                  }
                >
                  {copied ? "COPIED!" : "COPY ADDRESS"}
                </NotchedButton>
              </div>
            </div>
          </div>

          {/* Quick Links Row (Pump.fun, DexScreener, Solscan) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c1f11]/80 border border-[#D4AF37]/30 text-xs font-kiro font-black text-[#dcab62] hover:text-[#ffd700] hover:border-[#ffd700] hover:bg-[#122b17] transition-all duration-300 shadow-md hover:scale-105"
            >
              <span className="material-symbols-outlined text-sm text-brand-gold">rocket_launch</span>
              PUMP.FUN
            </a>

            <a
              href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c1f11]/80 border border-[#D4AF37]/30 text-xs font-kiro font-black text-[#dcab62] hover:text-[#ffd700] hover:border-[#ffd700] hover:bg-[#122b17] transition-all duration-300 shadow-md hover:scale-105"
            >
              <span className="material-symbols-outlined text-sm text-brand-gold">monitoring</span>
              DEXSCREENER
            </a>

            <a
              href={`https://solscan.io/token/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c1f11]/80 border border-[#D4AF37]/30 text-xs font-kiro font-black text-[#dcab62] hover:text-[#ffd700] hover:border-[#ffd700] hover:bg-[#122b17] transition-all duration-300 shadow-md hover:scale-105"
            >
              <span className="material-symbols-outlined text-sm text-brand-gold">open_in_new</span>
              SOLSCAN
            </a>
          </div>

          {/* Toast Notification Animation */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0a1f10] border-2 border-brand-lightgreen shadow-[0_10px_25px_rgba(34,197,94,0.4)] text-white"
              >
                <div className="w-8 h-8 rounded-full bg-brand-lightgreen/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-brand-lightgreen text-xl">check</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-jakobenz font-black text-xs text-brand-lightgreen uppercase tracking-wider">
                    Copied to Clipboard!
                  </span>
                  <span className="font-kiro text-xs text-[#dcab62]">
                    Contract address is ready to paste
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
