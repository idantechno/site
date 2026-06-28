"use client";

// SubtleParticles — tiny drifting canvas dots.
// Used only in Hero and FinalCTA. Max 20 particles. Very slow movement.
// Fully respects prefers-reduced-motion.

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; opacity: number;
  color: string;
}

const PALETTE = [
  "rgba(96,145,176,",   // steel blue  (secondary — most present)
  "rgba(96,145,176,",   // steel blue
  "rgba(6,35,64,",      // navy
  "rgba(220,93,70,",    // coral       (precious accent — least)
];

interface SubtleParticlesProps {
  count?: number;
  className?: string;
}

export default function SubtleParticles({ count = 18, className = "" }: SubtleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: Math.round(count * 1.6) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 2.6 + 1,
        opacity: Math.random() * 0.45 + 0.28,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Soft glow halo — turns each dot into a speck of glowing stardust
        ctx.shadowBlur = p.r * 5;
        ctx.shadowColor = `${p.color}${Math.min(p.opacity * 1.7, 1)})`;
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(tick);
    };

    init();
    tick();

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
