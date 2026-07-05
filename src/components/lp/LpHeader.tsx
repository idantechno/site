"use client";

// LpHeader — הדר מינימלי לעמוד הנחיתה: לוגו + כפתור CTA יחיד.
// בלי ניווט, בלי דליפות. אי צף מנותק מהקצה העליון.

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function LpHeader() {
  const reduced = useReducedMotion();

  function scrollToLead() {
    document.getElementById("lead")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-40 flex justify-center pointer-events-none"
    >
      <div
        className="pointer-events-auto mt-4 mx-4 flex items-center justify-between gap-6 rounded-full px-3 py-2 w-full max-w-3xl"
        style={{
          backgroundColor: "rgba(240, 225, 213, 0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(6, 35, 64, 0.08)",
          boxShadow: "0 12px 32px -16px rgba(6, 35, 64, 0.18)",
        }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="חזרה לראש העמוד"
          className="flex items-center gap-2 ps-2"
        >
          <Image
            src="/brand/portal-icon.png"
            alt="Portal Studio"
            width={36}
            height={36}
            priority
            className="w-9 h-9 object-contain"
          />
          <span
            className="hidden sm:inline font-display font-semibold text-base tracking-tight whitespace-nowrap"
            style={{ color: "#062340" }}
          >
            Portal Studio
          </span>
        </button>

        <button
          type="button"
          onClick={scrollToLead}
          className="btn-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display font-semibold text-sm text-white active:scale-[0.98] whitespace-nowrap"
          style={{ backgroundColor: "#DC5D46" }}
        >
          לאבחון קצר בחינם
        </button>
      </div>
    </motion.header>
  );
}
