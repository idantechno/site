"use client";

// LpSteps — ארבעה שלבים עם סמני ימים על קו שנמשך בגלילה.
// מטרה: להקטין מאמץ נתפס. מהשיחה הראשונה ועד לאוויר, 14 יום.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const STEPS = [
  {
    day: "יום 1",
    title: "שיחת אבחון",
    text: "20 דקות בטלפון או בזום. מוצאים יחד את הדבר האחד שגוזל ממך הכי הרבה זמן.",
  },
  {
    day: "ימים 2–4",
    title: "שאלון עומק",
    text: "איך העסק שלך מדבר? באילו מילים? אוספים את הטון והשפה כדי שהסוכן יישמע כמוך.",
  },
  {
    day: "ימים 5–12",
    title: "הקמה וחיבור",
    text: "אנחנו בונים ומחברים לאתר, ליומן ולכלים שכבר יש לך. אין לך שום דבר טכני לעשות.",
  },
  {
    day: "יום 14",
    title: "באוויר",
    text: "הסוכן עובד, ואנחנו נשארים זמינים. כל תשובה אפשר לכוונן גם אחרי ההשקה.",
  },
];

export default function LpSteps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: "#EBDCCB" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <p
            className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "#6091B0" }}
          >
            איך זה עובד
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-[1.06]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#062340" }}
          >
            מהשיחה הראשונה ועד שזה עובד:
            <span style={{ color: "#DC5D46" }}> 14 יום.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* הקו הנמשך — אופקי בדסקטופ, אנכי במובייל */}
          <svg
            aria-hidden="true"
            className="absolute hidden lg:block top-[22px] right-0 left-0 w-full"
            height="2"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.line
              x1="1000"
              y1="1"
              x2="0"
              y2="1"
              stroke="rgba(6,35,64,0.2)"
              strokeWidth="2"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.25 + i * 0.16,
                  duration: 0.7,
                  ease: EASE,
                }}
                className="relative flex lg:flex-col gap-5 lg:gap-0"
              >
                {/* נקודת ציון */}
                <div className="flex flex-col items-center lg:items-start flex-shrink-0">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.35 + i * 0.16,
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                    }}
                    className="flex items-center justify-center w-11 h-11 rounded-full font-display font-bold text-sm relative z-10"
                    style={{
                      backgroundColor: i === STEPS.length - 1 ? "#DC5D46" : "#062340",
                      color: "#ffffff",
                      boxShadow: "0 0 0 6px #EBDCCB",
                    }}
                  >
                    {i + 1}
                  </motion.span>
                  {/* קו אנכי במובייל */}
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="lg:hidden flex-1 w-px mt-2"
                      style={{ backgroundColor: "rgba(6,35,64,0.15)" }}
                    />
                  )}
                </div>

                <div className="lg:mt-7 pb-2">
                  <p
                    className="font-display font-semibold text-xs tracking-[0.14em] uppercase mb-2"
                    style={{ color: "#6091B0" }}
                  >
                    {step.day}
                  </p>
                  <h3
                    className="font-display font-bold text-xl mb-2.5"
                    style={{ color: "#062340" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed max-w-[36ch]"
                    style={{ color: "rgba(6, 35, 64, 0.6)" }}
                  >
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
