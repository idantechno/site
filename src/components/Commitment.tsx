"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PortalEcho from "@/components/decorative/PortalEcho";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import Smoke from "@/components/decorative/Smoke";

const commitments = [
  "לשמור על הזהות והקול האותנטי של כל עסק ויוצר — ולא להפוך אותו לעוד “תבנית” גנרית.",
  "להשתמש ב-AI ככלי שמעצים את האדם והעסק שמאחוריו — לא כתחליף לקול האנושי שמבדל אותך.",
  "לבנות פתרונות פשוטים, ברורים ונוחים לעבודה — גם למי שלא מגיע מעולם הטכנולוגיה.",
  "ליצור נוכחות דיגיטלית שמרגישה אמיתית, אנושית ומחוברת לעולם של הלקוח.",
  "לעזור לעסקים וליוצרים לעבוד בצורה מקצועית, מסודרת וחכמה יותר — בלי לאבד את האנושיות והאופי האישי שלהם.",
];

export default function Commitment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="commitment"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(to bottom, #F4E8E0 0%, #EFE2D6 50%, #F4E8E0 100%)",
      }}
    >
      {/* Top accent border — subtle separator from Packages */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(220,93,70,0.25), transparent)",
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(96,145,176,0.06), transparent 70%)",
        }}
      />

      {/* ── Breathing decorative elements ── */}
      <PortalEcho
        size={520}
        color="#6091B0"
        baseOpacity={0.09}
        rings={4}
        className="z-0"
        style={{ top: "20%", left: "-180px" }}
      />
      <AmbientGlow
        color="#DC5D46"
        size={360}
        opacity={0.10}
        className="z-0"
        style={{ bottom: "10%", right: "-120px" }}
      />
      <SubtleParticles count={12} className="z-0" />
      <Smoke className="z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6" ref={ref}>
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black tracking-tighter leading-none text-center"
          style={{
            fontSize: "clamp(2rem, 4.8vw, 3.4rem)",
            color: "#062340",
            letterSpacing: "-0.035em",
          }}
        >
          אנושיים.{" "}
          <span style={{ color: "#6091B0" }}>גם בעידן של AI.</span>
        </motion.h2>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7 text-base md:text-lg font-body leading-relaxed text-center mx-auto"
          style={{ color: "rgba(6,35,64,0.72)", maxWidth: "58ch" }}
        >
          המטרה של{" "}
          <span style={{ letterSpacing: "0.02em", color: "#062340" }}>
            PORTAL STUDIO
          </span>{" "}
          היא לעזור ליוצרים ולעסקים להשתלב בעולם הדיגיטלי החדש בצורה חכמה,
          אנושית ואותנטית — בלי לאבד את הקול, הזהות והאופי שהופכים אותם
          למי שהם.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="mx-auto mt-14 mb-12 h-px w-28 origin-center"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(220,93,70,0.6), transparent)",
          }}
        />

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="text-[11px] font-display font-medium tracking-[0.22em] uppercase text-center mb-10"
          style={{ color: "rgba(6,35,64,0.55)" }}
        >
          ההתחייבות שלי ללקוחות
        </motion.p>

        {/* Commitments — numbered list */}
        <ul className="flex flex-col">
          {commitments.map((text, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isLast = i === commitments.length - 1;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[90px_1fr] gap-5 md:gap-7 items-start py-7"
                style={{
                  borderBottom: !isLast
                    ? "1px solid rgba(6,35,64,0.1)"
                    : "none",
                }}
              >
                {/* Outline number */}
                <span
                  className="font-display font-black tracking-tighter leading-none select-none pt-1"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(220,93,70,0.45)",
                  }}
                >
                  {num}
                </span>

                {/* Commitment text */}
                <p
                  className="text-base md:text-lg font-body leading-relaxed pt-2"
                  style={{ color: "rgba(6,35,64,0.82)" }}
                >
                  {text}
                </p>
              </motion.li>
            );
          })}
        </ul>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-14 pt-8 flex flex-col items-center gap-2"
          style={{ borderTop: "1px solid rgba(6,35,64,0.1)" }}
        >
          <span
            className="font-display font-bold text-base tracking-tight"
            style={{ color: "#062340" }}
          >
            עידן
          </span>
          <span
            className="text-[11px] font-display font-medium tracking-[0.22em] uppercase"
            style={{ color: "rgba(6,35,64,0.45)" }}
          >
            מייסד · PORTAL STUDIO
          </span>
        </motion.div>
      </div>

      {/* Bottom accent border — subtle separator to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(220,93,70,0.25), transparent)",
        }}
      />
    </section>
  );
}
