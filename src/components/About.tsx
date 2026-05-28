"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";

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
  "המסע שלי לעולם הטכנולוגיה לא התחיל ממשוואות או משורות קוד קרות, אלא מעולמות הבמה והיצירה — משחק, מוזיקה והפקה — ולכן אני מכיר מקרוב את האתגר של אמנים היום: ליצור זה כבר לא מספיק. אמן שרוצה להתקדם צריך לדעת איך להציג את עצמו, לבנות נוכחות דיגיטלית, לייצר תוכן נכון, להגיע לקהל ולהתנהל כמו עסק.",
  "הקמתי את PORTAL STUDIO כדי לעזור לאמנים לעשות בדיוק את המעבר הזה — מהשראה ויצירה, לנוכחות דיגיטלית מסודרת, מקצועית וחכמה.",
  "אני מאמין ש-AI הוא לא תחליף לאמנות, אלא כלי שמאפשר לאמנים לקבל יותר שליטה על הדרך שלהם: להיראות טוב יותר, לעבוד מסודר יותר, להגיע ליותר אנשים, ולהפוך את היצירה שלהם למשהו שיכול גם להתקדם עסקית.",
  "הגישה שלי משלבת יצירתיות, חשיבה עסקית וטכנולוגיה — בצורה פשוטה, נגישה ואנושית, בלי להפוך את האמן לאיש טכנולוגיה ובלי למחוק את הקול האישי שלו.",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#062340" }}
    >
      {/* ── Editorial composite hero ──
            Mobile: illustration on top half + photo on bottom half (vertically stacked)
            Desktop: illustration left + photo right (horizontally split) */}
      <div className="relative w-full overflow-hidden h-[min(64vh,520px)] md:h-[min(62vh,540px)]">
        {/* Illustration — top half on mobile, left half on desktop */}
        <div className="absolute overflow-hidden inset-x-0 top-0 h-[55%] md:inset-y-0 md:left-0 md:right-auto md:w-1/2 md:h-full">
          <Image
            src="/portal-illustration.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[35%_center] md:object-[right_center]"
            style={{ opacity: 0.92 }}
          />
        </div>

        {/* Photo — bottom half on mobile, right half on desktop */}
        <div className="absolute overflow-hidden inset-x-0 bottom-0 h-[55%] md:inset-y-0 md:right-0 md:left-auto md:w-1/2 md:h-full">
          <Image
            src="/about-stage.png"
            alt="הסיפור מאחורי Portal Studio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_28%]"
            style={{ opacity: 0.62 }}
          />
        </div>

        {/* Seam blend — mobile (horizontal where top meets bottom) */}
        <div
          className="md:hidden absolute inset-x-0 top-[42%] bottom-[42%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(6,35,64,0.7) 40%, rgba(6,35,64,0.7) 60%, transparent 100%)",
          }}
        />

        {/* Seam blend — desktop (vertical where left meets right) */}
        <div
          className="hidden md:block absolute inset-y-0 pointer-events-none"
          style={{
            left: "30%",
            right: "30%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(6,35,64,0.7) 40%, rgba(6,35,64,0.7) 60%, transparent 100%)",
          }}
        />

        {/* Overall mood tint — unifies both sides into one navy atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "rgba(6,35,64,0.22)" }}
        />

        {/* Top fade — nav legibility */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,35,64,0.85) 0%, transparent 100%)",
          }}
        />

        {/* Side vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(6,35,64,0.55) 100%)",
          }}
        />

        {/* Soft bottom fade into navy — lets images breathe further down */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #062340 0%, rgba(6,35,64,0.78) 45%, transparent 100%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Headline overlay — anchored bottom-center */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="max-w-5xl mx-auto px-6 pb-14 md:pb-20 text-center">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-[11px] font-display font-medium tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(220,93,70,0.18)",
                color: "#DC5D46",
                border: "1px solid rgba(220,93,70,0.4)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
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
                fontSize: "clamp(2.6rem, 7vw, 5.4rem)",
                color: "#ffffff",
                letterSpacing: "-0.04em",
              }}
            >
              מהבמה —{" "}
              <span style={{ color: "#DC5D46" }}>לטכנולוגיה.</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 text-base md:text-lg font-body mx-auto"
              style={{ color: "rgba(255,255,255,0.6)", maxWidth: "44ch" }}
            >
              הסיפור מאחורי PORTAL STUDIO.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Editorial text body ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-28 -mt-6">
        {/* Lead paragraph — stylized */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold tracking-tight leading-snug text-center mb-10"
          style={{
            fontSize: "clamp(1.35rem, 2.5vw, 1.85rem)",
            color: "#ffffff",
          }}
        >
          נעים להכיר, אני{" "}
          <span style={{ color: "#DC5D46" }}>עידן</span> — המייסד של{" "}
          <span style={{ letterSpacing: "0.02em" }}>PORTAL STUDIO</span>.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mx-auto mb-12 h-px w-28 origin-center"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(220,93,70,0.6), transparent)",
          }}
        />

        {/* Body paragraphs */}
        <div className="flex flex-col gap-7">
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
              className="text-base md:text-lg font-body leading-loose text-right"
              style={{ color: "rgba(255,255,255,0.78)" }}
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
          className="mt-12 font-display font-bold tracking-tight leading-snug text-center"
          style={{
            fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
            color: "#ffffff",
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
          className="mt-14 pt-10 flex flex-wrap justify-center gap-4 items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
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
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-display font-medium text-base transition-all duration-300 active:scale-[0.98] hover:bg-white/10"
            style={{
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            לחבילות
            <ArrowLeft size={18} />
          </a>
        </motion.div>
      </div>

      {/* Subtle ambient glow at bottom */}
      <AmbientGlow
        color="#DC5D46"
        size={420}
        opacity={0.08}
        className="z-0"
        style={{
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Subtle particles for life */}
      <SubtleParticles count={18} className="z-0" />
    </section>
  );
}
