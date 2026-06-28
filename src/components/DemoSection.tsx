"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { WhatsappLogo, ArrowLeft } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import FloatingShapes from "@/components/decorative/FloatingShapes";

const conversation = [
  { id: 1, from: "user", text: "היי, ראיתי שיש לכם סדנת צילום" },
  { id: 2, from: "agent", text: "שלום! כן, יש לנו סדנת צילום ב-22/6 בתל אביב. מה מעניין אותך לדעת?" },
  { id: 3, from: "user", text: "כמה עולה ומה כולל?" },
  { id: 4, from: "agent", text: "הסדנה עולה 480₪ לאדם וכוללת:\n• 4 שעות הדרכה מעשית\n• חומרים ותאורה\n• קובץ דיגיטלי של כל התמונות\n\nנשאר מקום אחד בלבד. מעניין?" },
  { id: 5, from: "user", text: "כן! איך נרשמים?" },
  { id: 6, from: "agent", text: "מצוין! אשלח לך קישור להרשמה. לפני כן — מה שמך ומה הניסיון שלך בצילום?" },
];

export default function DemoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const delays = [300, 1200, 2100, 3200, 4200, 5200];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleMessages(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="demo" className="relative overflow-hidden py-24" style={{ backgroundColor: "#F4E8E0" }}>
      {/* ── Soft decorative life — very gentle on white ── */}
      <AmbientGlow
        color="#DC5D46"
        size={420}
        opacity={0.10}
        className="z-0"
        style={{ top: "-120px", left: "-120px" }}
      />
      <AmbientGlow
        color="#6091B0"
        size={460}
        opacity={0.09}
        className="z-0"
        style={{ bottom: "-120px", right: "-100px" }}
      />
      <SubtleParticles count={12} className="z-0" />
      <FloatingShapes className="z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:sticky md:top-24"
          >
            <p className="text-sm font-display font-medium tracking-widest uppercase" style={{ color: "#6091B0" }}>
              דמו חי
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tight" style={{ color: "#062340" }}>
              הסוכן עובד.
              <br />
              <span style={{ color: "#6091B0" }}>ממש עכשיו.</span>
            </h2>
            <p className="text-base font-body leading-relaxed" style={{ color: "#6b7280" }}>
              זה לא בוט גנרי. כל שירות, כל שאלה, כל לקוח — הסוכן יודע את הפרטים ועונה בשפה של העסק שלך, לא בקול של מכונה.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-display font-medium text-white text-sm w-fit transition-all duration-200 active:scale-[0.98] hover:opacity-90"
              style={{ backgroundColor: "#DC5D46" }}
            >
              <WhatsappLogo size={18} weight="fill" />
              רוצים כזה לעסק שלכם?
              <ArrowLeft size={16} />
            </a>
          </motion.div>

          {/* Chat window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ border: "1px solid #e5e7eb" }}
          >
            {/* Chat header */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <WhatsappLogo size={22} color="white" weight="fill" />
              </div>
              <div>
                <p className="text-white font-display font-medium text-sm">הסוכן של הסטודיו</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="text-white/70 text-xs font-body">זמין 24/7</p>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="p-5 flex flex-col gap-3 min-h-[400px]"
              style={{ backgroundColor: "#ECE5DD" }}
            >
              <AnimatePresence>
                {conversation.slice(0, visibleMessages).map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-line"
                      style={{
                        backgroundColor: msg.from === "user" ? "#DCF8C6" : "#ffffff",
                        color: "#1a1a2e",
                        borderBottomLeftRadius: msg.from === "agent" ? "4px" : "16px",
                        borderBottomRightRadius: msg.from === "user" ? "4px" : "16px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {visibleMessages < conversation.length && visibleMessages > 0 && visibleMessages % 2 === 1 && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-[4px]"
                    style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#6b7280" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Agent label */}
            <div
              className="px-5 py-3 text-center text-xs font-body"
              style={{ backgroundColor: "#F8F9FA", color: "#6b7280", borderTop: "1px solid #e5e7eb" }}
            >
              הסוכן עונה בשפה של העסק שלך · לא רובוט
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
