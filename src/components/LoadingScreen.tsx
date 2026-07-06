"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Start exit animation at 1.85 s, fully unmount at 2.45 s
    const exitTimer = setTimeout(() => setExit(true), 1850);
    const hideTimer = setTimeout(() => setVisible(false), 2450);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: exit ? 0 : 1 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#060f09]"
        >
          {/* ── Radial ambient glow in the center ─────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-[#14532d]/20 blur-[120px]" />
          </div>


          {/* ── Center content ──────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-8">

            {/* Gold top rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
            />

            {/* ─── Logo + flanking leaves (Animated together) ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center w-full"
            >

              {/* LEFT leaves — z-0 (behind logo), shifted 40% rightward, 10% smaller, screen blend mode */}
              <div
                className="absolute right-full top-1/2 h-[108px] sm:h-[135px] md:h-[162px] w-[162px] sm:w-[198px] md:w-[234px] pointer-events-none select-none overflow-hidden z-0 mix-blend-screen"
                style={{ transform: "translateY(-50%) translateX(40%) scaleX(-1)", mixBlendMode: "screen" }}
              >
                <video
                  src="/leaves video.webm"
                  autoPlay loop muted playsInline
                  className="absolute left-0 top-0 h-full w-auto object-cover object-left opacity-90"
                />
                {/* outer-edge fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060f09] via-transparent to-transparent" />
              </div>

              {/* MAINEY name-text logo — z-10 (in front of leaves), no shadow */}
              <img
                src="/name-text.png"
                alt="MAINEY THE CAPYBARA"
                className="relative z-10 w-[260px] sm:w-[340px] md:w-[420px] h-auto object-contain"
              />

              {/* RIGHT leaves — z-0 (behind logo), shifted 40% leftward, 10% smaller, screen blend mode */}
              <div
                className="absolute left-full top-1/2 h-[108px] sm:h-[135px] md:h-[162px] w-[162px] sm:w-[198px] md:w-[234px] pointer-events-none select-none overflow-hidden z-0 mix-blend-screen"
                style={{ transform: "translateY(-50%) translateX(-40%)", mixBlendMode: "screen" }}
              >
                <video
                  src="/leaves video.webm"
                  autoPlay loop muted playsInline
                  className="absolute left-0 top-0 h-full w-auto object-cover object-left opacity-90"
                />
                {/* outer-edge fade */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#060f09] via-transparent to-transparent" />
              </div>

            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-jakobenz font-black text-xs sm:text-sm tracking-[0.25em] text-[#dcab62]/80 uppercase [text-shadow:0_0_16px_rgba(212,175,55,0.25)]"
            >
              THE MOST CHILL CAPYBARA ON SOLANA
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-[#D4AF37]/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37]/60 via-[#ffd700] to-[#D4AF37]/60 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.75, ease: "easeInOut", delay: 0.1 }}
              />
            </div>

            {/* Gold bottom rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
