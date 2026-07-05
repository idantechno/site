"use client";

// PlanQuiz — שאלון התאמה: 4 שאלות, חצי דקה, המלצת חבילה בסוף.
// משחקולוגיה שמסננת לידים ובונה מיקרו-מחויבות לפני הטופס.
// התוצאה משודרת ב-CustomEvent כדי שטופס הליד ימלא אותה מראש.

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkle } from "@phosphor-icons/react";
import type { PlanId } from "@/lib/constants";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, scoreQuiz, trackLpEvent } from "@/lib/lp";
import PortalEcho from "@/components/decorative/PortalEcho";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Stage = "intro" | "questions" | "result";

const CONFETTI_COLORS = ["#DC5D46", "#6091B0", "#062340", "#DC5D46", "#6091B0", "#DC5D46", "#6091B0", "#062340"];

export default function PlanQuiz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const [stage, setStage] = useState<Stage>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<PlanId | null>(null);

  const progress = stage === "result" ? 1 : answers.length / QUIZ_QUESTIONS.length;

  function startQuiz() {
    setStage("questions");
    setQIndex(0);
    setAnswers([]);
    setResult(null);
    trackLpEvent("lp_quiz_start");
  }

  function answer(optionIndex: number) {
    const next = [...answers];
    next[qIndex] = optionIndex;
    setAnswers(next);

    if (qIndex < QUIZ_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      const plan = scoreQuiz(next);
      setResult(plan);
      setStage("result");
      trackLpEvent("lp_quiz_complete", { plan });
      // מודיעים לטופס הליד על החבילה המומלצת
      window.dispatchEvent(new CustomEvent("lp:plan", { detail: plan }));
    }
  }

  function goBack() {
    if (qIndex > 0) setQIndex(qIndex - 1);
    else setStage("intro");
  }

  function scrollToLead() {
    document.getElementById("lead")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }

  const resultCopy = result ? QUIZ_RESULTS[result] : null;

  return (
    <section
      ref={ref}
      id="quiz"
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      <PortalEcho
        size={620}
        color="#6091B0"
        baseOpacity={0.1}
        rings={4}
        className="z-0"
        style={{ top: "50%", left: "-260px", transform: "translateY(-50%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12"
        >
          <p
            className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "#6091B0" }}
          >
            רגע של משחק
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-[1.06]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#062340" }}
          >
            איזו חבילה מתאימה לעסק שלך?
          </h2>
        </motion.div>

        {/* ── כרטיס השאלון — Double-bezel ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="rounded-[2.5rem] p-2"
          style={{
            backgroundColor: "rgba(6, 35, 64, 0.05)",
            border: "1px solid rgba(6, 35, 64, 0.08)",
          }}
        >
          <div
            className="relative rounded-[calc(2.5rem-0.5rem)] px-6 py-10 sm:px-12 overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)",
              minHeight: 420,
            }}
          >
            {/* טבעת התקדמות */}
            <div className="absolute top-6 left-6" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="rgba(6,35,64,0.08)" strokeWidth="3" />
                <motion.circle
                  cx="22"
                  cy="22"
                  r="19"
                  stroke="#DC5D46"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ rotate: -90, transformOrigin: "center" }}
                  strokeDasharray={2 * Math.PI * 19}
                  animate={{ strokeDashoffset: 2 * Math.PI * 19 * (1 - progress) }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              {/* ── פתיחה ── */}
              {stage === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex flex-col items-center justify-center text-center gap-6 min-h-[340px]"
                >
                  <span
                    className="flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ backgroundColor: "rgba(220, 93, 70, 0.1)" }}
                  >
                    <Sparkle size={26} weight="fill" style={{ color: "#DC5D46" }} />
                  </span>
                  <p
                    className="font-body text-lg leading-relaxed max-w-md"
                    style={{ color: "rgba(6, 35, 64, 0.65)" }}
                  >
                    4 שאלות, חצי דקה, ובסוף נדע להגיד איזו חבילה מתאימה לעסק
                    שלך. בלי אימייל ובלי פרטים.
                  </p>
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="btn-glow inline-flex items-center gap-3 rounded-full px-8 py-4 font-display font-semibold text-white text-base active:scale-[0.98]"
                    style={{ backgroundColor: "#062340" }}
                  >
                    להתחיל
                    <ArrowLeft size={18} weight="bold" />
                  </button>
                </motion.div>
              )}

              {/* ── שאלות ── */}
              {stage === "questions" && (
                <motion.div
                  key={`q-${qIndex}`}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 28 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-7 min-h-[340px] justify-center"
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="font-display font-semibold text-xs tracking-[0.14em] uppercase"
                      style={{ color: "#6091B0" }}
                    >
                      שאלה {qIndex + 1} מתוך {QUIZ_QUESTIONS.length}
                    </p>
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1 font-body text-xs"
                      style={{ color: "rgba(6, 35, 64, 0.45)" }}
                    >
                      <ArrowRight size={13} />
                      חזרה
                    </button>
                  </div>

                  <h3
                    className="font-display font-bold text-2xl sm:text-3xl tracking-tight"
                    style={{ color: "#062340" }}
                  >
                    {QUIZ_QUESTIONS[qIndex].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUIZ_QUESTIONS[qIndex].options.map((opt, oi) => (
                      <motion.button
                        key={opt.label}
                        type="button"
                        onClick={() => answer(oi)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + oi * 0.07, duration: 0.4, ease: EASE }}
                        className="text-right rounded-2xl px-5 py-4 font-body text-base transition-all duration-300 active:scale-[0.98]"
                        style={{
                          border:
                            answers[qIndex] === oi
                              ? "1.5px solid #DC5D46"
                              : "1.5px solid rgba(6, 35, 64, 0.12)",
                          backgroundColor:
                            answers[qIndex] === oi
                              ? "rgba(220, 93, 70, 0.06)"
                              : "rgba(240, 225, 213, 0.35)",
                          color: "#062340",
                        }}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── תוצאה ── */}
              {stage === "result" && resultCopy && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  className="relative flex flex-col items-center text-center gap-5 min-h-[340px] justify-center"
                >
                  {/* קונפטי-לייט: 8 נקודות בצבעי המותג */}
                  {!reduced &&
                    CONFETTI_COLORS.map((c, ci) => (
                      <motion.span
                        key={ci}
                        aria-hidden="true"
                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                        style={{ backgroundColor: c, top: "38%", left: "50%" }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos((ci / 8) * Math.PI * 2) * (70 + (ci % 3) * 26),
                          y: Math.sin((ci / 8) * Math.PI * 2) * (56 + (ci % 3) * 22),
                          opacity: 0,
                          scale: 0.4,
                        }}
                        transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                      />
                    ))}

                  <p
                    className="font-display font-medium text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: "#6091B0" }}
                  >
                    נראה שהכיוון שלך
                  </p>
                  <h3
                    className="font-display font-black tracking-tighter leading-none"
                    style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#DC5D46" }}
                  >
                    {resultCopy.title}
                  </h3>
                  <p
                    className="font-body text-base leading-relaxed max-w-md"
                    style={{ color: "rgba(6, 35, 64, 0.65)" }}
                  >
                    {resultCopy.why}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={scrollToLead}
                      className="btn-glow inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-display font-semibold text-white text-base active:scale-[0.98]"
                      style={{ backgroundColor: "#DC5D46" }}
                    >
                      לקבל אבחון על החבילה הזאת
                      <ArrowLeft size={17} weight="bold" />
                    </button>
                    <Link
                      href={`/order?plan=${resultCopy.planId}`}
                      onClick={() => trackLpEvent("lp_order_click", { plan: resultCopy.planId })}
                      className="font-body text-sm underline underline-offset-4"
                      style={{ color: "rgba(6, 35, 64, 0.55)" }}
                    >
                      לפרטים ולהזמנה
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={startQuiz}
                    className="font-body text-xs mt-1"
                    style={{ color: "rgba(6, 35, 64, 0.4)" }}
                  >
                    לענות שוב
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
