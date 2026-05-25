"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { num: "3×", label: "יותר פניות מוסננות", sub: "ממוצע לקוחות ב-6 חודשים" },
  { num: "80%", label: "חיסכון בזמן תפעולי", sub: "בהתכתבויות שגרתיות" },
  { num: "24/7", label: "מענה אוטומטי", sub: "גם שישי, שבת, חגים" },
  { num: "14", label: "ימים להטמעה", sub: "מהשיחה הראשונה ועד לאוויר" },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">

        {/* Left half — coral */}
        <div
          className="relative flex flex-col justify-center px-10 py-16 lg:px-16 overflow-hidden"
          style={{ backgroundColor: "#DC5D46" }}
        >
          {/* Decorative ring in corner */}
          <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-20">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
              <circle cx="140" cy="140" r="130" stroke="white" strokeWidth="30" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <p className="text-xs font-display font-medium tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
              התוצאות מדברות
            </p>
            <h2
              className="font-display font-black tracking-tighter leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#ffffff" }}
            >
              מספרים
              <br />
              שמספרים
              <br />
              <span style={{ color: "#062340" }}>את הסיפור.</span>
            </h2>
          </motion.div>
        </div>

        {/* Right half — navy, 2×2 stats grid */}
        <div
          className="grid grid-cols-2 divide-x divide-y"
          style={{ backgroundColor: "#062340", borderColor: "rgba(255,255,255,0.06)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="flex flex-col justify-center gap-1 px-8 py-10"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <span
                className="font-display font-black tracking-tighter leading-none"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#DC5D46" }}
              >
                {stat.num}
              </span>
              <span className="font-display font-semibold text-sm" style={{ color: "#ffffff" }}>
                {stat.label}
              </span>
              <span className="font-body text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
