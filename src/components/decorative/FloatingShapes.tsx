"use client";

// FloatingShapes — a few abstract, brand-language shapes (portal rings, arcs,
// an aperture dot) that drift and rotate slowly. Decorative artful touches.
// Respects prefers-reduced-motion.

import { motion, useReducedMotion } from "framer-motion";

interface FloatingShapesProps {
  className?: string;
}

export default function FloatingShapes({ className = "" }: FloatingShapesProps) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Concentric ring — slow rotate + gentle drift (top-left) */}
      <motion.svg
        className="absolute"
        style={{ top: "12%", left: "6%" }}
        width="190"
        height="190"
        viewBox="0 0 190 190"
        fill="none"
        animate={{ rotate: 360, x: [0, 26, 0], y: [0, -20, 0] }}
        transition={{
          rotate: { duration: 90, repeat: Infinity, ease: "linear" },
          x: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 30, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <circle cx="95" cy="95" r="86" stroke="#6091B0" strokeOpacity="0.4" strokeWidth="1.5" />
        <circle cx="95" cy="95" r="60" stroke="#6091B0" strokeOpacity="0.26" strokeWidth="1.5" />
      </motion.svg>

      {/* Open arc — slow counter-rotate + drift (bottom-right) */}
      <motion.svg
        className="absolute"
        style={{ bottom: "14%", right: "8%" }}
        width="230"
        height="230"
        viewBox="0 0 230 230"
        fill="none"
        animate={{ rotate: -360, x: [0, -28, 0], y: [0, 22, 0] }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: "linear" },
          x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 34, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <path
          d="M 115 14 A 101 101 0 0 1 216 115"
          stroke="#DC5D46"
          strokeOpacity="0.34"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Aperture dot — gentle breathing pulse (mid-right) */}
      <motion.svg
        className="absolute"
        style={{ top: "56%", left: "66%" }}
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="48" cy="48" r="36" stroke="#6091B0" strokeOpacity="0.36" strokeWidth="1.5" />
        <circle cx="48" cy="48" r="5" fill="#DC5D46" fillOpacity="0.5" />
      </motion.svg>

      {/* Small ring — slow drift (lower-left) */}
      <motion.svg
        className="absolute"
        style={{ bottom: "22%", left: "26%" }}
        width="84"
        height="84"
        viewBox="0 0 84 84"
        fill="none"
        animate={{ rotate: 360, x: [0, 18, 0], y: [0, 16, 0] }}
        transition={{
          rotate: { duration: 110, repeat: Infinity, ease: "linear" },
          x: { duration: 32, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <circle cx="42" cy="42" r="36" stroke="#DC5D46" strokeOpacity="0.22" strokeWidth="1.5" />
      </motion.svg>
    </div>
  );
}
