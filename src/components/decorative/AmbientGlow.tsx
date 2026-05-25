// AmbientGlow — a soft radial color bloom, purely decorative.
// Placed behind content via pointer-events-none + z-index.

import type { CSSProperties } from "react";

interface AmbientGlowProps {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

export default function AmbientGlow({
  color = "#F2A541",
  size = 480,
  opacity = 0.12,
  className = "",
  style,
}: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        opacity,
        filter: "blur(72px)",
        ...style,
      }}
    />
  );
}
