"use client";

// LpHero — הפולד הראשון: מה, למי ולמה תוך 5 שניות.
// ה-H1 הוא הטקסט הראשון שנצבע (LCP). האורב והטבעת נכנסים אחריו.
// בגלילה החוצה הטבעת גדלה ונמוגה — אפקט "כניסה דרך הפורטל".

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { WhatsappLogo, ArrowDown } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackLpEvent } from "@/lib/lp";
import PortalEcho from "@/components/decorative/PortalEcho";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import MagneticButton from "@/components/lp/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const H1_LINES = ["הכול בעסק עובר דרכך.", "בדיוק שם זה נתקע."];

export default function LpHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // טבעת הפורטל מתרחבת ונמוגה ככל שגוללים החוצה מההירו
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);

  function scrollToLead() {
    document.getElementById("lead")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100dvh] flex items-center"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      {/* ── שכבות רקע ── */}
      <SubtleParticles count={14} className="z-[1]" />
      <AmbientGlow
        color="#6091B0"
        size={520}
        opacity={0.12}
        className="z-0"
        style={{ top: "-120px", left: "8%" }}
      />
      <AmbientGlow
        color="#DC5D46"
        size={400}
        opacity={0.1}
        className="z-0"
        style={{ bottom: "-80px", right: "-100px" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-8 items-center">
          {/* ── טקסט — צד ימין ב-RTL ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 font-display font-medium text-[11px] tracking-[0.18em] uppercase"
              style={{
                color: "#6091B0",
                border: "1px solid rgba(96, 145, 176, 0.35)",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <span
                className="lp-status-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#DC5D46" }}
              />
              יד נוספת לעסק שלך · Portal Studio
            </motion.p>

            <h1
              className="font-display font-black tracking-tighter leading-[1.04] mb-7"
              style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)", color: "#062340" }}
            >
              {H1_LINES.map((line, li) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: reduced ? 0 : "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + li * 0.14, ease: EASE }}
                    style={li === 1 ? { color: "#DC5D46" } : undefined}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="font-body text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(6, 35, 64, 0.68)" }}
            >
              לחזור ללקוחות, לרדוף אחרי לידים, לזכור הצעות מחיר, לשלוח
              תזכורות. הכול אצלך בראש. אנחנו בונים לעסק יד נוספת: סוכן AI
              קטן ומדויק שלוקח את מה שחוזר על עצמו, ומתחיל בדבר אחד שעוזר
              כבר מחר בבוקר.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <button
                  type="button"
                  onClick={scrollToLead}
                  className="btn-glow inline-flex items-center gap-3 rounded-full px-7 py-4 font-display font-semibold text-white text-base active:scale-[0.98]"
                  style={{ backgroundColor: "#DC5D46" }}
                >
                  לאבחון קצר בחינם
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.18)" }}
                  >
                    <ArrowDown size={16} weight="bold" />
                  </span>
                </button>
              </MagneticButton>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLpEvent("lp_whatsapp_click", { source: "hero" })}
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-display font-semibold text-base active:scale-[0.98] transition-colors duration-300"
                style={{
                  color: "#062340",
                  border: "1.5px solid rgba(6, 35, 64, 0.25)",
                }}
              >
                <WhatsappLogo size={20} weight="fill" style={{ color: "#25D366" }} />
                לשאול אותנו בוואטסאפ
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-7 font-body text-sm"
              style={{ color: "rgba(6, 35, 64, 0.48)" }}
            >
              בלי התחייבות · שיחה של 20 דקות · בלי מערכת חדשה ללמוד
            </motion.p>
          </div>

          {/* ── ויזואל — האורב בתוך טבעת הפורטל ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            style={{ y: orbY }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <motion.div
              style={{ scale: ringScale, opacity: ringOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <PortalEcho
                size={560}
                color="#6091B0"
                baseOpacity={0.2}
                rings={5}
                style={{ position: "relative" }}
              />
            </motion.div>

            {/* Double-bezel: מעטפת חיצונית + ליבה פנימית */}
            <div
              className="relative rounded-[2.5rem] p-2"
              style={{
                backgroundColor: "rgba(6, 35, 64, 0.05)",
                border: "1px solid rgba(6, 35, 64, 0.08)",
              }}
            >
              <div
                className="relative w-[340px] h-[420px] rounded-[calc(2.5rem-0.5rem)] overflow-hidden"
                style={{
                  boxShadow:
                    "inset 0 1px 1px rgba(255,255,255,0.25), 0 32px 64px -24px rgba(6,35,64,0.35)",
                }}
              >
                <Image
                  src="/hero-orb.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 340px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                {/* דהייה עדינה לקרם בתחתית */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(240,225,213,0.55), transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
