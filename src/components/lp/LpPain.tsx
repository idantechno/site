"use client";

// LpPain — עולם ה"לפני": כל המשימות הפתוחות שרודפות אחרי בעל העסק.
// רקע נייבי כהה, תזכורות נסחפות מאחורי הטקסט.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// בועות דקורטיביות — המשימות הפתוחות שרודפות אחרי בעל העסק.
// הרבה, בקצבים ובגדלים שונים — התחושה של עומס אמיתי.
const BUBBLES = [
  { text: "לחזור לליד מאתמול", left: "5%", delay: 0, duration: 9, top: "76%", size: 15, opacity: 0.7 },
  { text: "לשלוח את הצעת המחיר", left: "20%", delay: 3.2, duration: 7.5, top: "84%", size: 13, opacity: 0.55, mobileHidden: true },
  { text: "הפנייה מהאתר עדיין פתוחה", left: "42%", delay: 1.4, duration: 10, top: "80%", size: 16, opacity: 0.75, mobileHidden: true },
  { text: "להעלות את הפוסט השבוע", left: "60%", delay: 4.6, duration: 8, top: "88%", size: 13, opacity: 0.5 },
  { text: "תזכורת: פגישה מחר ב-9:00", left: "78%", delay: 2.2, duration: 9.5, top: "82%", size: 15, opacity: 0.7, mobileHidden: true },
  { text: "עוד לא חזרו אליי…", left: "31%", delay: 6.4, duration: 8.5, top: "90%", size: 14, opacity: 0.65 },
  { text: "פולואפ להצעה מרביעי", left: "68%", delay: 0.8, duration: 11, top: "78%", size: 13, opacity: 0.5, mobileHidden: true },
  { text: "לענות לביקורת בגוגל", left: "12%", delay: 5.4, duration: 8, top: "86%", size: 14, opacity: 0.6, mobileHidden: true },
  { text: "כמה עולה אצלכם?", left: "50%", delay: 7.8, duration: 7, top: "92%", size: 15, opacity: 0.7 },
  { text: "לשלם לספק עד חמישי", left: "88%", delay: 4, duration: 9, top: "88%", size: 12, opacity: 0.45, mobileHidden: true },
  { text: "אפשר להזיז את התור?", left: "26%", delay: 9.2, duration: 8, top: "84%", size: 14, opacity: 0.6 },
  { text: "המסמכים לרואה החשבון", left: "72%", delay: 6.8, duration: 10, top: "90%", size: 12, opacity: 0.45, mobileHidden: true },
  { text: "לקוחה מחכה לתשובה", left: "38%", delay: 3.8, duration: 7.5, top: "94%", size: 16, opacity: 0.75 },
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
            className={`lp-bubble absolute rounded-2xl rounded-br-sm px-4 py-2 font-body whitespace-nowrap ${
              b.mobileHidden ? "hidden md:inline-block" : ""
            }`}
            style={
              {
                left: b.left,
                top: b.top,
                fontSize: b.size,
                backgroundColor: "rgba(96, 145, 176, 0.14)",
                border: "1px solid rgba(96, 145, 176, 0.2)",
                color: "rgba(255, 255, 255, 0.6)",
                "--lp-bubble-delay": `${b.delay}s`,
                "--lp-bubble-duration": `${b.duration}s`,
                "--lp-bubble-opacity": `${b.opacity}`,
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
