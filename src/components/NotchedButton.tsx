"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface NotchedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "green" | "dark" | "outline";
  className?: string;
}

export default function NotchedButton({
  children,
  href,
  onClick,
  icon,
  variant = "outline",
  className = "",
}: NotchedButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;
  const R = 10; // notch radius
  const pad = 3.2; // inner border offset
  const r_i = Math.max(0, R - pad);

  const outerPath = W && H ? `M ${R},0 L ${W - R},0 A ${R},${R} 0 0,0 ${W},${R} L ${W},${H - R} A ${R},${R} 0 0,0 ${W - R},${H} L ${R},${H} A ${R},${R} 0 0,0 0,${H - R} L 0,${R} A ${R},${R} 0 0,0 ${R},0 Z` : "";
  const innerPath = W && H ? `M ${pad + r_i},${pad} L ${pad + W - pad * 2 - r_i},${pad} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2},${pad + r_i} L ${pad + W - pad * 2},${pad + H - pad * 2 - r_i} A ${r_i},${r_i} 0 0,0 ${pad + W - pad * 2 - r_i},${pad + H - pad * 2} L ${pad + r_i},${pad + H - pad * 2} A ${r_i},${r_i} 0 0,0 ${pad},${pad + H - pad * 2 - r_i} L ${pad},${pad + r_i} A ${r_i},${r_i} 0 0,0 ${pad + r_i},${pad} Z` : "";

  // Styles based on variant
  let fillBg = "#061208";
  let strokeColor = "#D4AF37";
  let innerStrokeColor = "#D4AF37";
  let outerOpacity = "0.8";
  let innerOpacity = "0.25";
  let hoverShadow = "0 0 25px rgba(212, 175, 55, 0.4)";

  if (variant === "green") {
    fillBg = "#23491c";
    strokeColor = "#D4AF37";
    innerStrokeColor = "#ffd700";
    hoverShadow = "0 0 25px rgba(50, 98, 43, 0.6)";
  } else if (variant === "dark") {
    fillBg = "#080f0a";
    strokeColor = "#dcab62";
    innerStrokeColor = "#dcab62";
    outerOpacity = "0.3";
    innerOpacity = "0.1";
    hoverShadow = "0 0 25px rgba(220, 171, 98, 0.25)";
  }

  const content = (
    <>
      <div ref={containerRef} className="absolute inset-0 z-0">
        {W > 0 && H > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]" viewBox={`0 0 ${W} ${H}`}>
            <path d={outerPath} fill={fillBg} fillOpacity="0.95" />
            <path d={outerPath} fill="none" stroke={strokeColor} strokeWidth="1.2" strokeOpacity={outerOpacity} />
            <path d={innerPath} fill="none" stroke={innerStrokeColor} strokeWidth="0.8" strokeOpacity={innerOpacity} />
          </svg>
        )}
      </div>
      <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {icon}
        {children}
      </span>
    </>
  );

  const motionProps = {
    whileHover: prefersReducedMotion ? {} : { scale: 1.05, y: -2, boxShadow: hoverShadow },
    whileTap: { scale: 0.98 },
    className: `relative flex items-center justify-center px-8 py-4.5 font-kiro font-black text-xs md:text-sm tracking-widest uppercase transition-all duration-300 z-10 cursor-pointer text-[#dcab62] hover:text-[#ffd700] ${className}`
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...motionProps}>
      {content}
    </motion.button>
  );
}
