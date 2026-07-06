"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// SVG Cursor with deep wooden colors and precise macOS styling (Tip at 0,0)
function WoodCursorArrow({ opacity = 1, scale = 1, isHovered = false }: { opacity?: number; scale?: number; isHovered?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        opacity, 
        transform: `scale(${scale})`, 
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      <defs>
        {/* Deep, rich, natural wood grain gradient (No orange tones, pure dark walnut/espresso wood) */}
        <linearGradient id="deepWoodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5C3A21" />  {/* Walnut Brown */}
          <stop offset="50%" stop-color="#4A2E1B" />  {/* Deep Bark Brown */}
          <stop offset="100%" stop-color="#2D1B0F" /> {/* Espresso Dark Wood */}
        </linearGradient>
        <filter id="cursorShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1.5" stdDeviation="1.2" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>
      {/* Precision Mac-like cursor path (aligned exactly at 0,0 tip) */}
      <path
        d="M0 0v17l4.5-4.5h6.5L0 0z"
        fill="url(#deepWoodGradient)"
        stroke={isHovered ? "#3E2515" : "#1A0F09"}
        stroke-width="1.2"
        stroke-linejoin="round"
        filter="url(#cursorShadow)"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Single trailing follower with smooth, organic Mac-like spring physics
  const followerXSpring = useSpring(cursorX, { damping: 24, stiffness: 130, mass: 1.0 });
  const followerYSpring = useSpring(cursorY, { damping: 24, stiffness: 130, mass: 1.0 });

  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
  }, []);

  if (reducedMotion || !visible) return null;

  return (
    <>
      {/* 1. Faded trailing shadow of same wooden color, scaled slightly larger */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: followerXSpring,
          y: followerYSpring,
        }}
      >
        <WoodCursorArrow opacity={0.35} scale={hovered ? 1.7 : 1.3} isHovered={hovered} />
      </motion.div>

      {/* 2. Main Leader Cursor (Direct follow, 0 latency, standard size) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <WoodCursorArrow opacity={1.0} scale={hovered ? 1.25 : 1.0} isHovered={hovered} />
      </motion.div>
    </>
  );
}
