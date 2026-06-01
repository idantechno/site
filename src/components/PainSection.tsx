"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import PortalEcho from "@/components/decorative/PortalEcho";

export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#DC5D46" }} ref={ref}>
      {/* ── Decorative life — deep navy accents on the warm coral ── */}
      <AmbientGlow
        color="#011427"
        size={460}
        opacity={0.18}
        className="z-0"
        style={{ top: "-100px", right: "-100px" }}
      />
      <PortalEcho
        size={500}
        color="#011427"
        baseOpacity={0.10}
        rings={4}
        className="z-0"
        style={{ bottom: "-100px", left: "20%" }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

        {/* Left — bold statement */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center px-10 py-20 lg:px-16 relative"
        >
          {/* Huge decorative quote mark */}
          <span
            className="absolute top-8 right-10 font-display font-black leading-none select-none pointer-events-none"
            style={{ fontSize: "18rem", color: "rgba(0,0,0,0.07)", lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p
            className="relative font-display font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#ffffff" }}
          >
            לקוחות לא תמיד
            <br />
            הולכים למתחרה
            <br />
            כי הוא <span style={{ color: "#062340" }}>טוב יותר.</span>
          </p>
          <p
            className="mt-6 text-lg font-display font-medium"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            לפעמים הוא פשוט ענה לפניכם.
          </p>
        </motion.div>

        {/* Right — navy panel with 3 value props */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center px-10 py-20 lg:px-16 gap-10"
          style={{ backgroundColor: "#062340" }}
        >
          <p
            className="text-xs font-display font-medium tracking-widest uppercase"
            style={{ color: "#DC5D46" }}
          >
            למה Portal Studio
          </p>

          {[
            { title: "הקול נשאר שלך", body: "הסוכן מדבר בשפה של העסק שלך — לא כמו רובוט, אלא כמו עוזר אישי שאימנת." },
            { title: "נתחיל בצעד קטן", body: "אין צורך בהסבה טכנולוגית. מתחילים מנקודה אחת ומרחיבים בהתאם לצמיחה." },
            { title: "שיחה בין אנשים", body: "אנחנו לא מוכרים תוכנה. אנחנו בונים פתרון יחד, בשיחה פתוחה ובהתאמה אמיתית." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1.5"
              style={{ paddingTop: i > 0 ? "2.5rem" : 0, borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
            >
              <h3 className="font-display font-bold text-lg tracking-tighter" style={{ color: "#ffffff" }}>
                {item.title}
              </h3>
              <p className="text-sm font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
