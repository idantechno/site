"use client";

// PortalEcho — breathing concentric SVG rings.
// Very slow, low opacity — feels like a portal or lens pulse.

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface PortalEchoProps {
  size?: number;
  color?: string;
  baseOpacity?: number;
  rings?: number;
  className?: string;
  style?: CSSProperties;
}

export default function PortalEcho({
  size = 440,
  color = "#6091B0",
  baseOpacity = 0.07,
  rings = 4,
  className = "",
  style,
}: PortalEchoProps) {
  const radii = Array.from({ length: rings }, (_, i) =>
    Math.round(190 * (1 - i * (0.22)))
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, position: "absolute", ...style }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        width="100%"
        height="100%"
        overflow="visible"
      >
        {radii.map((r, i) => (
          <motion.circle
            key={i}
            cx="200"
            cy="200"
            r={r}
            stroke={color}
            strokeWidth="1"
            animate={{
              opacity: [baseOpacity * 0.4, baseOpacity, baseOpacity * 0.4],
              scale: [0.96, 1.02, 0.96],
            }}
            transition={{
              duration: 5 + i * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.9,
            }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}
      </svg>
    </div>
  );
}
