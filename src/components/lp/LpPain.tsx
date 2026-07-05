"use client";

// LpPain — עולם ה"לפני": כל המשימות הפתוחות שרודפות אחרי בעל העסק.
// רקע נייבי כהה, תזכורות נסחפות מאחורי הטקסט.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// בועות דקורטיביות — משימות פתוחות שמרחפות ברקע
const BUBBLES = [
  { text: "לחזור לליד מאתמול", left: "6%", delay: 0, duration: 12, top: "78%" },
  { text: "לשלוח את הצעת המחיר", left: "22%", delay: 3.5, duration: 10, top: "85%", mobileHidden: true },
  { text: "הפנייה מהאתר עדיין פתוחה", left: "45%", delay: 1.6, duration: 13, top: "80%", mobileHidden: true },
  { text: "להעלות את הפוסט השבוע", left: "63%", delay: 5, duration: 11, top: "88%" },
  { text: "תזכורת: פגישה מחר ב-9:00", left: "80%", delay: 2.4, duration: 12.5, top: "82%", mobileHidden: true },
  { text: "לא שכחת משהו?", left: "33%", delay: 7, duration: 12, top: "90%" },
];

export default function LpPain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#062340" }}
    >
      {/* בועות נסחפות — דקורטיבי בלבד */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {BUBBLES.map((b) => (
          <span
            key={b.text}
            className={`lp-bubble absolute rounded-2xl rounded-br-sm px-4 py-2 font-body text-sm whitespace-nowrap ${
              b.mobileHidden ? "hidden md:inline-block" : ""
            }`}
            style={
              {
                left: b.left,
                top: b.top,
                backgroundColor: "rgba(96, 145, 176, 0.13)",
                border: "1px solid rgba(96, 145, 176, 0.18)",
                color: "rgba(255, 255, 255, 0.55)",
                "--lp-bubble-delay": `${b.delay}s`,
                "--lp-bubble-duration": `${b.duration}s`,
                "--lp-bubble-opacity": "0.55",
              } as React.CSSProperties
            }
          >
            {b.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-6"
          style={{ color: "#6091B0" }}
        >
          רגע לפני שמתחילים
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="font-display font-black tracking-tighter leading-[1.05] mb-10"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: "#ffffff" }}
        >
          נשמע מוכר?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="font-body text-lg lg:text-xl leading-relaxed max-w-2xl"
          style={{ color: "rgba(255, 255, 255, 0.72)" }}
        >
          <p className="mb-6">
            שמונה בערב. סיימת את יום העבודה, ועכשיו מתחיל התפקיד השני:
            לחזור ללקוחה ששאלה בבוקר, לשלוח את הצעת המחיר שהבטחת, להיזכר
            אם מישהו בכלל ענה לליד מיום רביעי.
          </p>
          <p className="mb-6">
            לקוחות שמחכים לתשובה. לידים שמתקררים. הצעות מחיר שנשארות
            פתוחות. משימות שחוזרות כל שבוע. וברשימה הזאת יש רק זוג ידיים
            אחד. שלך. עסק טוב יש, פשוט יותר מדי ממנו תלוי בך אישית.
          </p>
          <p
            className="font-display font-semibold text-xl lg:text-2xl leading-snug"
            style={{ color: "#DC5D46" }}
          >
            יש דברים בעסק שלא צריכים לחכות לך.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
