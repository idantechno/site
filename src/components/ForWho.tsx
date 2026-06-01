"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Microphone,
  Camera,
  ChalkboardTeacher,
  Headset,
  ChartLineUp,
  Target,
} from "@phosphor-icons/react";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";

const audiences = [
  // ── Creative side ──
  {
    icon: Microphone,
    label: "אומנים ומבצעי במה",
    desc: "נוכחות דיגיטלית שמרגישה כמוך — בלי לאבד את הקול האותנטי",
  },
  {
    icon: Camera,
    label: "צלמים, סטודיואים וגלריות",
    desc: "מענה מקצועי לבריפים, תאריכים ומחירים — בלי להחזיק טלפון 24/7",
  },
  {
    icon: ChalkboardTeacher,
    label: "מדריכי סדנאות ויוצרי קהילה",
    desc: "הרשמות, שאלות ותאריכים — בלי עומס הודעות",
  },
  // ── Business side ──
  {
    icon: Headset,
    label: "עסקי שירות שרוצים מענה אנושי 24/7",
    desc: "תגובה רגישה ומדויקת ללקוחות בכל שעה — בלי שהעסק שלך יישמע אפילו לרגע רובוטי",
  },
  {
    icon: ChartLineUp,
    label: "בעלי עסקים שמחפשים סדר ויעילות",
    desc: "פחות התעסקות תפעולית בהודעות, יותר זמן לעבודה האמיתית ולאנשים שמולך",
  },
  {
    icon: Target,
    label: "עסקים שרוצים לקוחות איכותיים יותר",
    desc: "סינון חכם שמעביר אליך רק את מי שמתאים — והשיחות נשמעות כמו ממך, לא ממכונה",
  },
];

export default function ForWho() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="for-who"
      className="relative overflow-hidden py-24"
      style={{ backgroundColor: "#062340" }}
    >
      {/* ── Atmospheric background image ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Image
          src="/forwho-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 md:opacity-70"
          style={{ objectPosition: "center center" }}
        />
        {/* Mobile-only strong darkening — image becomes pure atmospheric texture */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ backgroundColor: "rgba(6,35,64,0.55)" }}
        />
        {/* Vignette — soften edges into navy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 35%, rgba(6,35,64,0.65) 100%)",
          }}
        />
        {/* Top fade — seamless join with previous section */}
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, #062340 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade — seamless join with next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, #062340 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Decorative life ── */}
      <AmbientGlow
        color="#DC5D46"
        size={420}
        opacity={0.10}
        className="z-0"
        style={{ top: "10%", right: "-120px" }}
      />
      <AmbientGlow
        color="#6091B0"
        size={380}
        opacity={0.09}
        className="z-0"
        style={{ bottom: "8%", left: "-100px" }}
      />
      <SubtleParticles count={14} className="z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-14"
        >
          <p className="text-sm font-display font-medium tracking-widest uppercase mb-3" style={{ color: "#DC5D46" }}>
            למי זה מתאים?
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tighter" style={{ color: "#ffffff" }}>
            למי שמרגיש שעומס ההודעות
            <br />
            <span style={{ color: "#6091B0" }}>חונק את העבודה האמיתית.</span>
          </h2>
        </motion.div>

        {/* 6 categories — clean 3×2 glass grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="card-glow rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px -10px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(220,93,70,0.18)",
                    border: "1px solid rgba(220,93,70,0.35)",
                  }}
                >
                  <Icon size={22} style={{ color: "#DC5D46" }} weight="duotone" />
                </div>
                <div>
                  <h3
                    className="font-display font-semibold text-base mb-1.5"
                    style={{ color: "#ffffff" }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="text-sm font-body leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
