"use client";

// LpManifesto — הצהרת המותג: לא מוכרים טכנולוגיה, בונים שקט תפעולי.
// טיפוגרפיה גדולה בחשיפה מדורגת, באותה שפה ויזואלית של שאר העמוד.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const VERBS = ["עונה.", "מסדר.", "מזכיר.", "עוקב.", "מסנן."];

export default function LpManifesto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">
          {/* ── ההצהרה ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-7"
              style={{ color: "#6091B0" }}
            >
              למה אנחנו עושים את זה
            </motion.p>

            <h2
              className="font-display font-black tracking-tighter leading-[1.02]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#062340" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  שקט תפעולי
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                  style={{ color: "#DC5D46" }}
                >
                  לעסק שלך.
                </motion.span>
              </span>
            </h2>
          </div>

          {/* ── הפעלים + ההסבר ── */}
          <div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
              {VERBS.map((verb, i) => (
                <motion.span
                  key={verb}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
                  className="font-display font-bold text-2xl lg:text-3xl tracking-tight"
                  style={{ color: "#6091B0" }}
                >
                  {verb}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + VERBS.length * 0.12, duration: 0.6, ease: EASE }}
                className="font-display font-bold text-2xl lg:text-3xl tracking-tight"
                style={{ color: "#062340" }}
              >
                ומחזיר לך שליטה.
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "rgba(6, 35, 64, 0.65)" }}
            >
              קוראים לנו פורטל לא במקרה. זה השער שדרכו עסק קטן נכנס לעולם
              ה-AI בקלות ובתחושה ביתית: סוכן קטן שמחובר לעבודה האמיתית
              שלך, בקליניקה, בסטודיו, בחנות או בעסק של אדם אחד. בלי עוד
              מערכת ללמוד. מתחילים מהדבר האחד שהכי מכביד, ומחר בבוקר הוא
              כבר לא מחכה לך.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
