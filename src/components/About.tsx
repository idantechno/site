"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import Smoke from "@/components/decorative/Smoke";
import FloatingShapes from "@/components/decorative/FloatingShapes";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const body = [
  "המסע שלי לעולם הטכנולוגיה לא התחיל ממשוואות או משורות קוד קרות, אלא מעולמות הבמה והיצירה. לכן אני מכיר מקרוב את האתגר שבין הרצון ליצור לבין הצורך לדעת איך למכור את זה.",
  "אמן שרוצה להתקדם צריך לדעת איך להציג את עצמו, לבנות נוכחות דיגיטלית, לייצר תוכן נכון, להגיע לקהל ולהתנהל כמו עסק.",
  "הקמתי את PORTAL STUDIO כדי לעזור לעסקים לעשות בדיוק את המעבר הזה — מהשראה ויצירה, לנוכחות דיגיטלית מסודרת, מקצועית וחכמה.",
  "אני מאמין ש-AI הוא לא תחליף ליצירה ולאמנות, אלא כלי שמאפשר לנו לקבל יותר שליטה על הדרך: להיראות טוב יותר, לעבוד מסודר יותר, להגיע ליותר אנשים ולהפוך את העיסוק שלנו למשהו שיכול להתפתח גם מבחינה עסקית.",
  "הגישה שלי משלבת יצירתיות, חשיבה עסקית וטכנולוגיה — בצורה פשוטה, נגישה ואנושית, בלי להפוך את האמן לאיש טכנולוגיה ובלי למחוק את הקול האישי של בעל העסק.",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F4E8E0" }}
    >
      {/* ── Headline — clean, on cream, comfortably below the nav ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 md:pt-40 pb-6 text-center">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 text-[11px] font-display font-medium tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
          style={{
            backgroundColor: "rgba(96,145,176,0.14)",
            color: "#6091B0",
            border: "1px solid rgba(96,145,176,0.35)",
          }}
        >
          אודות
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-black tracking-tighter leading-none"
          style={{
            fontSize: "clamp(1.5rem, 3.4vw, 2.5rem)",
            color: "#062340",
            letterSpacing: "-0.03em",
          }}
        >
          מהבמה —{" "}
          <span style={{ color: "#DC5D46" }}>לטכנולוגיה</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-3 text-sm md:text-base font-body mx-auto"
          style={{ color: "rgba(6,35,64,0.6)", maxWidth: "40ch" }}
        >
          הסיפור מאחורי PORTAL STUDIO
        </motion.p>
      </div>

      {/* ── Founder story — the unified image sits behind it, washed into the
            cream so the text stays readable, with brand-colored smoke drifting
            over it. ── */}
      <div className="relative">
        {/* Image backdrop (clipped only for its own fades) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/about-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={{ opacity: 0.9, filter: "brightness(1.05) saturate(1.05)" }}
          />
          {/* Cream wash — lifts the dark image so navy text reads on top */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(244,232,224,0.68)" }}
          />
          {/* Top fade — blend down from the cream headline */}
          <div
            className="absolute inset-x-0 top-0 h-28"
            style={{
              background:
                "linear-gradient(to bottom, #F4E8E0 0%, transparent 100%)",
            }}
          />
          {/* Bottom fade — melt back into cream */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                "linear-gradient(to top, #F4E8E0 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Brand-colored smoke — drifts over the image, behind the text */}
        <Smoke />

        {/* Story text */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 pb-20">
          {/* Lead paragraph — stylized */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold tracking-tight leading-snug text-center mb-6"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
              color: "#062340",
            }}
          >
            נעים להכיר, אני{" "}
            <span style={{ color: "#6091B0" }}>עידן</span> — המייסד של{" "}
            <span style={{ letterSpacing: "0.02em" }}>PORTAL STUDIO</span>
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mx-auto mb-8 h-px w-24 origin-center"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(220,93,70,0.6), transparent)",
            }}
          />

          {/* Body paragraphs */}
          <div className="flex flex-col gap-5">
            {body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm md:text-base font-body leading-relaxed text-right"
                style={{ color: "rgba(6,35,64,0.8)" }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Closing statement — emphasized */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-8 font-display font-bold tracking-tight leading-snug text-center"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              color: "#062340",
            }}
          >
            <span style={{ letterSpacing: "0.02em" }}>PORTAL STUDIO</span>{" "}
            הוא השער שלך לעולם דיגיטלי מסודר, מקצועי וחכם יותר —{" "}
            <span style={{ color: "#DC5D46" }}>
              כדי שתוכל להתמקד במה שאתה עושה הכי טוב: ליצור.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 pt-8 flex flex-wrap justify-center gap-4 items-center"
            style={{ borderTop: "1px solid rgba(6,35,64,0.12)" }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-display font-semibold text-white text-base active:scale-[0.98]"
              style={{ backgroundColor: "#DC5D46" }}
            >
              <WhatsappLogo size={20} weight="fill" />
              דברו איתי
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-display font-medium text-base transition-all duration-300 active:scale-[0.98] hover:bg-[#062340]/5"
              style={{
                color: "rgba(6,35,64,0.75)",
                border: "1px solid rgba(6,35,64,0.25)",
              }}
            >
              לחבילות
              <ArrowLeft size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Subtle ambient glow at bottom */}
      <AmbientGlow
        color="#DC5D46"
        size={420}
        opacity={0.1}
        className="z-0"
        style={{
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Subtle particles for life */}
      <SubtleParticles count={16} className="z-0" />
      <FloatingShapes className="z-0" />
    </section>
  );
}
