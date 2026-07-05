"use client";

// LpStats — רצועת הוכחה עם מוני count-up.
// המספרים זהים לאלה שבאתר הראשי (StatsStrip) — מקור אמת אחד לנתונים.

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  static?: string; // ערך שאינו נספר (למשל 24/7)
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 3, suffix: "×", label: "יותר פניות מוסננות", sub: "ממוצע לקוחות ב-6 חודשים" },
  { value: 80, suffix: "%", label: "חיסכון בזמן תפעולי", sub: "בהתכתבויות שגרתיות" },
  { value: 0, static: "24/7", label: "מענה אוטומטי", sub: "גם שישי, שבת, חגים" },
  { value: 14, label: "ימים להטמעה", sub: "מהשיחה הראשונה ועד לאוויר" },
];

function CountUp({ stat, start }: { stat: Stat; start: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${stat.suffix ?? ""}`);

  useEffect(() => {
    if (!start || stat.static) return;
    const controls = animate(mv, stat.value, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [start, stat, mv]);

  if (stat.static) {
    return <span dir="ltr">{stat.static}</span>;
  }
  return <motion.span dir="ltr">{start ? rounded : `0${stat.suffix ?? ""}`}</motion.span>;
}

export default function LpStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ backgroundColor: "#062340" }}>
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-12"
          style={{ color: "#6091B0" }}
        >
          מה זה עושה בפועל
        </motion.p>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:divide-x lg:divide-x-reverse"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="flex flex-col gap-1.5 lg:px-8 first:lg:pr-0"
            >
              <span
                className="font-display font-black tracking-tighter leading-none"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                  color: "#DC5D46",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <CountUp stat={stat} start={inView} />
              </span>
              <span className="font-display font-semibold text-sm" style={{ color: "#ffffff" }}>
                {stat.label}
              </span>
              <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
