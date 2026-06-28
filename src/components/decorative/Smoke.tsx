"use client";

// Smoke — soft drifting fog blobs in the brand colors.
// Purely decorative: sits behind content to blend an image backdrop into the
// surrounding cream, and to add slow atmospheric movement.
// NOTE: no overflow clipping — the blobs fade out via their radial gradient, so
// a hard container edge would otherwise leave a visible straight "seam".
// Only animates while on-screen (and not for reduced-motion users).

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Blob {
  color: string;
  size: number;
  left: string;
  top: string;
  dur: number;
  dx: number;
  dy: number;
}

// Weighted toward steel (the secondary brand color), with navy + a touch of coral.
const BLOBS: Blob[] = [
  { color: "rgba(96,145,176,0.6)", size: 560, left: "20%", top: "26%", dur: 26, dx: 44, dy: -26 },
  { color: "rgba(6,35,64,0.36)", size: 620, left: "74%", top: "48%", dur: 34, dx: -50, dy: 28 },
  { color: "rgba(96,145,176,0.46)", size: 480, left: "82%", top: "20%", dur: 30, dx: -36, dy: 34 },
  { color: "rgba(220,93,70,0.36)", size: 420, left: "44%", top: "70%", dur: 32, dx: 32, dy: 34 },
  { color: "rgba(96,145,176,0.4)", size: 520, left: "30%", top: "58%", dur: 38, dx: 38, dy: 24 },
];

interface SmokeProps {
  className?: string;
}

export default function Smoke({ className = "" }: SmokeProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "150px" });
  const active = inView && !prefersReduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: "blur(34px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={active ? { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.14, 1] } : undefined}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
