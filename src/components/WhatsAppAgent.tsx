"use client";

// WhatsAppAgent — סוכן שעונה בוואטסאפ בקול של העסק.
// הדמיה מונפשת של מסך טלפון (הודעות שנכנסות אחת-אחת + אינדיקטור הקלדה),
// והזמנה לנסות את הסוכן החי — הוא כבר עונה. מבוסס על DemoSection שהוסר,
// מותאם למערכת העיצוב הנוכחית (קרם/נייבי/קורל).

import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { WhatsappLogo, ArrowLeft, Check } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import PortalEcho from "@/components/decorative/PortalEcho";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Msg = { id: number; from: "user" | "agent"; text: string };

const conversation: Msg[] = [
  { id: 1, from: "user", text: "היי, ראיתי את העבודות שלכם. אתם מצלמים גם אירועים קטנים?" },
  { id: 2, from: "agent", text: "היי! כן, בשמחה. על איזה תאריך חשבת, וכמה אנשים בערך?" },
  { id: 3, from: "user", text: "יום הולדת, בערך 30 איש, ב-14 באוגוסט" },
  {
    id: 4,
    from: "agent",
    text: "מעולה — ה-14/8 פנוי. רשמתי את הפרטים והעברתי אותם לרותם, והיא תחזור אליך היום עם הצעה מדויקת.",
  },
  { id: 5, from: "user", text: "מושלם, תודה!" },
  { id: 6, from: "agent", text: "בכיף. ואם עולה עוד שאלה — אני כאן, מסביב לשעון." },
];

const REVEAL_DELAYS = [300, 1400, 2500, 3700, 5100, 6100];

export default function WhatsAppAgent() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setVisible(conversation.length);
      return;
    }
    const timers = REVEAL_DELAYS.map((delay, i) =>
      setTimeout(() => setVisible(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, prefersReduced]);

  // אינדיקטור הקלדה מופיע כשהסוכן עומד לענות (הודעה זוגית הבאה)
  const nextIsAgent =
    visible < conversation.length && conversation[visible]?.from === "agent";

  return (
    <section
      id="whatsapp-agent"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      {/* חיות דקורטיבית עדינה */}
      <AmbientGlow
        color="#25D366"
        size={460}
        opacity={0.1}
        className="z-0"
        style={{ top: "-100px", right: "-120px" }}
      />
      <PortalEcho
        size={520}
        color="#6091B0"
        baseOpacity={0.07}
        rings={4}
        className="z-0"
        style={{ bottom: "-4%", left: "-160px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-14 md:gap-16 items-center">
          {/* ── טקסט ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col gap-6"
          >
            <p
              className="inline-flex items-center gap-2 text-[11px] font-display font-medium tracking-[0.22em] uppercase"
              style={{ color: "#6091B0" }}
            >
              <WhatsappLogo size={15} weight="fill" style={{ color: "#25D366" }} />
              הסוכן שעונה לפניכם
            </p>

            <h2
              className="font-display font-black tracking-tighter leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#062340" }}
            >
              סוכן שעונה בוואטסאפ —
              <br />
              <span style={{ color: "#DC5D46" }}>בקול של העסק שלך.</span>
            </h2>

            <p
              className="font-body text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(6,35,64,0.65)" }}
            >
              לא מענה גנרי. הסוכן יודע את הפרטים, עונה בשפה שלך, מסנן ומתאם —
              ומעביר אליך רק את מה שבאמת דורש אותך.
            </p>

            {/* שלוש נקודות אמון קצרות */}
            <ul className="flex flex-col gap-2.5">
              {[
                "עונה תוך שניות, מסביב לשעון",
                "כל תשובה בטון שלך — ובאישור שלך",
                "מה שדורש שיקול דעת עובר אליך",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 font-body text-sm"
                  style={{ color: "rgba(6,35,64,0.8)" }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(37,211,102,0.15)",
                      border: "1px solid rgba(37,211,102,0.35)",
                    }}
                  >
                    <Check size={11} weight="bold" style={{ color: "#1d7a43" }} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            {/* CTA — דמו חי אמיתי */}
            <div className="flex flex-col gap-3 pt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-display font-semibold text-white text-sm w-fit transition-all duration-200 active:scale-[0.98] hover:opacity-90"
                style={{ backgroundColor: "#062340" }}
              >
                <WhatsappLogo size={18} weight="fill" style={{ color: "#25D366" }} />
                כתוב לסוכן שלנו עכשיו — ותרגיש בעצמך
                <ArrowLeft size={16} />
              </a>
              <p className="font-body text-sm" style={{ color: "rgba(6,35,64,0.5)" }}>
                מה שתרגיש עכשיו — הלקוחות שלך ירגישו. וזה רק ערוץ אחד: הסוכן עונה
                גם בצ'אט באתר ובמקומות שבהם הלקוחות שלך כבר נמצאים.
              </p>
            </div>
          </motion.div>

          {/* ── מסך הטלפון ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="flex justify-center"
          >
            <div
              className="rounded-[3rem] p-2 w-full max-w-[340px]"
              style={{
                backgroundColor: "#062340",
                boxShadow: "0 40px 80px -32px rgba(6,35,64,0.5)",
              }}
            >
              <div className="rounded-[calc(3rem-0.5rem)] overflow-hidden">
                {/* כותרת וואטסאפ */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ backgroundColor: "#075E54" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <WhatsappLogo size={20} weight="fill" style={{ color: "#fff" }} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-display font-semibold text-sm truncate"
                      style={{ color: "#fff" }}
                    >
                      הסוכן של רותם
                    </span>
                    <span
                      className="flex items-center gap-1.5 font-body text-[11px]"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <span
                        className="lp-status-dot inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "#25D366" }}
                      />
                      מקוון · עונה בקול של העסק
                    </span>
                  </div>
                </div>

                {/* גוף השיחה */}
                <div
                  className="px-3.5 py-4 min-h-[380px] flex flex-col justify-end gap-2"
                  style={{ backgroundColor: "#ECE5DD" }}
                >
                  <AnimatePresence>
                    {conversation.slice(0, visible).map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className={`flex ${
                          msg.from === "user" ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className="max-w-[80%] px-3.5 py-2 rounded-2xl font-body text-sm leading-snug"
                          style={{
                            backgroundColor:
                              msg.from === "agent" ? "#D9FDD3" : "#ffffff",
                            color: "#1a1a2e",
                            borderBottomRightRadius:
                              msg.from === "agent" ? "4px" : "16px",
                            borderBottomLeftRadius:
                              msg.from === "user" ? "4px" : "16px",
                            boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
                          }}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}

                    {/* אינדיקטור הקלדה */}
                    {!prefersReduced && nextIsAgent && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-end"
                      >
                        <div
                          className="px-4 py-3 rounded-2xl rounded-br-[4px]"
                          style={{
                            backgroundColor: "#D9FDD3",
                            boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
                          }}
                        >
                          <div className="flex gap-1 items-center">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: "#4b6b57" }}
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
                  </AnimatePresence>
                </div>

                {/* פוטר קטן */}
                <div
                  className="px-5 py-2.5 text-center font-body text-[11px]"
                  style={{
                    backgroundColor: "#075E54",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  שיחה אמיתית עם הסוכן — לא רובוט
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
