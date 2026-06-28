"use client";

// LightTrail — a thin animated SVG line used as a section divider.
// Draws itself slowly, then fades, then repeats. Very subtle.

import { motion } from "framer-motion";

interface LightTrailProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
}

export default function LightTrail({
  fromColor = "#6091B0",
  toColor = "#DC5D46",
  height = 2,
  className = "",
}: LightTrailProps) {
  const id = `lt-${fromColor.replace("#", "")}-${toColor.replace("#", "")}`;

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 2"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        fill="none"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0" />
            <stop offset="30%" stopColor={fromColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor={toColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="1"
          x2="1440"
          y2="1"
          stroke={`url(#${id})`}
          strokeWidth="2"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "0px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
