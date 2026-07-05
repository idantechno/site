"use client";

// BeforeAfter — רגע החתימה: מוקאפ טלפון עם טוגל "ככה זה היום / ככה זה עם פורטל".
// מראה את התוצאה בלי אף מילת פיצ'ר. הבועות נכנסות בהדרגה עם ספרינג.

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, ClockCountdown } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Mode = "before" | "after";

interface ChatMsg {
  from: "customer" | "business";
  text: string;
  time: string;
  dayBreak?: string; // תווית "למחרת" לפני ההודעה
}

const CHATS: Record<Mode, ChatMsg[]> = {
  before: [
    { from: "customer", text: "היי, יש אפשרות לתור מחר אחר הצהריים?", time: "21:47" },
    { from: "customer", text: "אשמח לתשובה כשנוח", time: "22:15" },
    {
      from: "business",
      text: "היי! סליחה על העיכוב, אתמול היה עמוס. יש מקום ב-17:00",
      time: "11:02",
      dayBreak: "למחרת",
    },
    { from: "customer", text: "כבר סגרתי במקום אחר, תודה", time: "11:40" },
  ],
  after: [
    { from: "customer", text: "היי, יש אפשרות לתור מחר אחר הצהריים?", time: "21:47" },
    {
      from: "business",
      text: "היי! כן, נשארו 16:30 או 18:00. מה נוח לך?",
      time: "21:47",
    },
    { from: "customer", text: "18:00 מושלם", time: "21:49" },
    {
      from: "business",
      text: "קבעתי לך למחר ב-18:00. תזכורת תגיע בבוקר",
      time: "21:49",
    },
  ],
};

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mode, setMode] = useState<Mode>("before");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
          {/* ── טקסט ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p
              className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "#6091B0" }}
            >
              ההבדל בשיחה אחת
            </p>
            <h2
              className="font-display font-black tracking-tighter leading-[1.06] mb-8"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#062340" }}
            >
              אותה לקוחה.
              <br />
              אותה שאלה.
              <br />
              <span style={{ color: "#DC5D46" }}>סוף אחר לגמרי.</span>
            </h2>
            <p
              className="font-body text-lg leading-relaxed max-w-md mb-8"
              style={{ color: "rgba(6, 35, 64, 0.65)" }}
            >
              לחיצה על הטוגל מראה את זה טוב יותר מכל הסבר. שיחה אמיתית מהסוג
              שקורה כל ערב, פעם בלי מערכת ופעם איתה.
            </p>
            <p
              className="font-body text-sm leading-relaxed max-w-md rounded-2xl px-5 py-4"
              style={{
                color: "rgba(6, 35, 64, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(6, 35, 64, 0.08)",
              }}
            >
              כל תשובה שהמערכת שולחת נכתבת מראש בטון שלך, ועוברת אישור שלך.
            </p>
          </motion.div>

          {/* ── הטלפון ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="flex flex-col items-center gap-6"
          >
            {/* טוגל */}
            <div
              role="tablist"
              aria-label="לפני ואחרי"
              className="relative flex rounded-full p-1"
              style={{
                backgroundColor: "rgba(6, 35, 64, 0.07)",
                border: "1px solid rgba(6, 35, 64, 0.08)",
              }}
            >
              {(
                [
                  { id: "before", label: "ככה זה היום" },
                  { id: "after", label: "ככה זה עם פורטל" },
                ] as const
              ).map((tab) => {
                const selected = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setMode(tab.id)}
                    className="relative rounded-full px-5 py-2.5 font-display font-semibold text-sm transition-colors duration-300"
                    style={{ color: selected ? "#ffffff" : "rgba(6, 35, 64, 0.55)" }}
                  >
                    {selected && (
                      <motion.span
                        layoutId="ba-toggle-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: tab.id === "after" ? "#DC5D46" : "#062340",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* מסגרת הטלפון — Double-bezel */}
            <div
              className="rounded-[3rem] p-2 w-full max-w-[340px]"
              style={{
                backgroundColor: "#062340",
                boxShadow: "0 40px 80px -32px rgba(6, 35, 64, 0.45)",
              }}
            >
              <div
                className="rounded-[calc(3rem-0.5rem)] overflow-hidden"
                style={{ backgroundColor: "#EFE7DD" }}
              >
                {/* כותרת שיחה */}
                <div
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{ backgroundColor: "#062340" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ backgroundColor: "#6091B0", color: "#fff" }}
                  >
                    ד
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-sm" style={{ color: "#fff" }}>
                      דנה · לקוחה
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {mode === "after" && (
                        <span
                          className="lp-status-dot inline-block w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#25D366" }}
                        />
                      )}
                      {mode === "after" ? "המערכת מחוברת" : "וואטסאפ עסקי"}
                    </span>
                  </div>
                </div>

                {/* גוף השיחה */}
                <div className="px-4 py-5 min-h-[360px] flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-2.5"
                    >
                      {CHATS[mode].map((msg, i) => (
                        <div key={`${mode}-${i}`} className="flex flex-col">
                          {msg.dayBreak && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.12 }}
                              className="self-center rounded-full px-3 py-1 mb-2 font-body text-[10px]"
                              style={{
                                backgroundColor: "rgba(6, 35, 64, 0.08)",
                                color: "rgba(6, 35, 64, 0.5)",
                              }}
                            >
                              {msg.dayBreak}
                            </motion.span>
                          )}
                          <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: 0.1 + i * 0.12,
                              type: "spring",
                              stiffness: 100,
                              damping: 20,
                            }}
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                              msg.from === "business"
                                ? "self-end rounded-bl-sm"
                                : "self-start rounded-br-sm"
                            }`}
                            style={
                              msg.from === "business"
                                ? {
                                    backgroundColor:
                                      mode === "after" ? "#D9EAD3" : "#ffffff",
                                    border: "1px solid rgba(6,35,64,0.06)",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid rgba(6,35,64,0.06)",
                                  }
                            }
                          >
                            <p className="font-body text-sm leading-snug" style={{ color: "#1a1a2e" }}>
                              {msg.text}
                            </p>
                            <p
                              className="font-body text-[10px] mt-1 text-left"
                              style={{ color: "rgba(26, 26, 46, 0.4)" }}
                              dir="ltr"
                            >
                              {msg.time}
                            </p>
                          </motion.div>
                        </div>
                      ))}

                      {/* שורת סטטוס מסכמת */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + CHATS[mode].length * 0.12 + 0.15 }}
                        className="self-center mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display font-semibold text-xs"
                        style={
                          mode === "after"
                            ? { backgroundColor: "rgba(37, 211, 102, 0.14)", color: "#1d7a43" }
                            : { backgroundColor: "rgba(220, 93, 70, 0.12)", color: "#C24A34" }
                        }
                      >
                        {mode === "after" ? (
                          <>
                            <CheckCircle size={15} weight="fill" />
                            נקבע תור · נשלחה תזכורת
                          </>
                        ) : (
                          <>
                            <ClockCountdown size={15} weight="fill" />
                            13 שעות בלי מענה · הלקוחה הלכה
                          </>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
