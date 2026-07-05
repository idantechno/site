"use client";

// StickyCtaBar — בר CTA דביק במובייל בלבד.
// מופיע אחרי שגוללים את רוב ההירו, נעלם כשהטופס הסופי נראה.
// אחראי גם על class בגוף העמוד שדוחק את ווידג'ט הצ'אט מעל הבר.

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackLpEvent } from "@/lib/lp";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("lp-page");
    trackLpEvent("lp_view");

    let heroPassed = false;
    let leadVisible = false;

    const update = () => setVisible(heroPassed && !leadVisible);

    // ההירו הוא הסקשן הראשון בעמוד
    const hero = document.querySelector("main section");
    const lead = document.getElementById("lead");

    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            heroPassed = entry.intersectionRatio < 0.2;
            update();
          },
          { threshold: [0, 0.2, 1] }
        )
      : null;
    if (hero) heroObserver?.observe(hero);

    const leadObserver = lead
      ? new IntersectionObserver(
          ([entry]) => {
            leadVisible = entry.isIntersecting;
            update();
          },
          { threshold: 0.15 }
        )
      : null;
    if (lead) leadObserver?.observe(lead);

    return () => {
      document.body.classList.remove("lp-page");
      heroObserver?.disconnect();
      leadObserver?.disconnect();
    };
  }, []);

  function scrollToLead() {
    document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="lp-sticky-bar fixed bottom-0 inset-x-0 z-40 md:hidden px-4 pt-3"
          style={{
            backgroundColor: "rgba(240, 225, 213, 0.9)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(6, 35, 64, 0.08)",
          }}
        >
          <div className="flex items-stretch gap-3 max-w-md mx-auto">
            <button
              type="button"
              onClick={scrollToLead}
              className="btn-glow flex-1 inline-flex items-center justify-center rounded-full px-5 py-3.5 font-display font-semibold text-white text-sm active:scale-[0.98]"
              style={{ backgroundColor: "#DC5D46", minHeight: 48 }}
            >
              לאבחון קצר בחינם
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="וואטסאפ"
              onClick={() => trackLpEvent("lp_whatsapp_click", { source: "sticky" })}
              className="inline-flex items-center justify-center rounded-full active:scale-[0.98]"
              style={{
                width: 48,
                minHeight: 48,
                backgroundColor: "#062340",
                color: "#25D366",
              }}
            >
              <WhatsappLogo size={22} weight="fill" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
