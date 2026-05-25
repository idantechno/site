"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import PortalEcho from "@/components/decorative/PortalEcho";
import SubtleParticles from "@/components/decorative/SubtleParticles";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="final-cta" className="relative overflow-hidden" style={{ backgroundColor: "#062340" }} ref={ref}>
      {/* Atmospheric orb — left side, fades into navy toward the headline */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[58%]"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 88%)",
          }}
        >
          <Image
            src="/hero-orb.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center left" }}
          />
        </div>
      </div>

      {/* Floating particles */}
      <SubtleParticles count={20} className="z-[1]" />

      {/* Portal echo — center-right */}
      <PortalEcho
        size={600}
        color="#2FB7A4"
        baseOpacity={0.16}
        rings={5}
        className="z-[1]"
        style={{ top: "50%", right: "-80px", transform: "translateY(-50%)" }}
      />

      {/* Amber glow near CTA area */}
      <AmbientGlow
        color="#F2A541"
        size={440}
        opacity={0.2}
        className="z-[1]"
        style={{ bottom: "40px", left: "28%" }}
      />

      {/* Decorative large coral arc — bottom right */}
      <div className="absolute -bottom-24 -left-24 pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="230" stroke="#DC5D46" strokeWidth="60" strokeOpacity="0.12" />
          <circle cx="250" cy="250" r="150" stroke="#DC5D46" strokeWidth="1" strokeOpacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end">

          {/* Left — massive statement text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-display font-medium tracking-widest uppercase mb-8" style={{ color: "#DC5D46" }}>
              מתחילים?
            </p>
            <h2
              className="font-display font-black tracking-tighter leading-none"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "#ffffff" }}
            >
              אנחנו
              <br />
              <span style={{ color: "#DC5D46" }}>עושים</span>
              <br />
              את ההבדל.
            </h2>
          </motion.div>

          {/* Right — CTA block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 lg:max-w-xs lg:pb-4"
          >
            <p className="text-base font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              בלי לחץ. רק שיחה.
              נאבחן איפה העסק שלך מאבד זמן ואיך לשחרר אותו בחזרה לידיים שלך.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-display font-semibold text-white text-base active:scale-[0.98] self-start"
              style={{ backgroundColor: "#DC5D46" }}
            >
              <WhatsappLogo size={22} weight="fill" />
              שלחו הודעה עכשיו
            </a>

            <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.25)" }}>
              נתחיל בצעד קטן · הקול נשאר שלך · בלי התחייבות
            </p>
          </motion.div>
        </div>

        {/* Bottom divider line with label */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-8 flex items-center justify-between origin-right"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="font-display font-black text-xl tracking-tighter" style={{ color: "rgba(255,255,255,0.12)" }}>
            PORTAL AI STUDIO
          </span>
          <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.2)" }}>
            סוכני WhatsApp לעסקים יצירתיים
          </span>
        </motion.div>
      </div>
    </section>
  );
}
