"use client";

// LpHero — הפולד הראשון: מה, למי ולמה תוך 5 שניות.
// ה-H1 הוא הטקסט הראשון שנצבע (LCP). האורב והטבעת נכנסים אחריו.
// בגלילה החוצה הטבעת גדלה ונמוגה — אפקט "כניסה דרך הפורטל".

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
import SubtleParticles from "@/components/decorative/SubtleParticles";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import MagneticButton from "@/components/lp/MagneticButton";
import NothingFalls from "@/components/lp/NothingFalls";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const H1_LINES = ["העסק מתפקד מצוין", "גם כשאין לך זמן."];

export default function LpHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // פרלקסה עדינה של הוויזואל בגלילה החוצה מההירו
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
              שקט תפעולי לעסק שלך · Portal Studio
            </motion.p>

            <h1
              className="font-display font-black tracking-tight leading-[1.12] mb-7"
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.4rem)", color: "#062340" }}
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
              Portal Studio מספקת פתרונות AI אישיים לבעלי עסקים, יוצרים,
              סטודיואים, קליניקות ועצמאיים בתחומים שונים. הפתרון עונה
              לפניות, עוקב אחרי לידים, שולח תזכורות ושומר שהצעות מחיר לא
              יישכחו. הכול בטון שלך ובאישור שלך, ומתחילים מהדבר האחד
              שהכי מכביד — בלי מערכת חדשה שצריך ללמוד.
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
                לכתוב לסוכן שלנו בוואטסאפ
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

          {/* ── ויזואל — אנימציית "שום דבר לא נופל" ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            style={{ y: orbY }}
            className="relative flex items-center justify-center mt-2 lg:mt-0"
          >
            <NothingFalls />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
