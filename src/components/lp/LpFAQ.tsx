"use client";

// LpFAQ — טיפול בהתנגדויות. 6 שאלות, כולל שאלת המחיר בכנות.
// אותה תבנית אקורדיון כמו ה-FAQ באתר הראשי, עם תוכן ייעודי לעמוד.

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FAQS = [
  {
    q: "כמה זה עולה?",
    a: "המחיר נקבע לפי מה שהעסק שלך באמת צריך, ומוצג במלואו לפני התשלום. בשיחת האבחון כבר יהיה לך מספר מדויק. בלי הפתעות ובלי אותיות קטנות.",
  },
  {
    q: "זה יחליף אותי מול הלקוחות?",
    a: "לא. הסוכן לוקח את מה שחוזר על עצמו, כמו מענה ראשוני באתר, תזכורות ומעקב אחרי פניות. כל מה שדורש שיקול דעת או מגע אישי עובר אליך, מסודר ומרוכז.",
  },
  {
    q: "צריך להבין בטכנולוגיה בשביל זה?",
    a: "ממש לא. את כל הצד הטכני אנחנו עושים, מההקמה ועד החיבור ליומן ולאתר. מבחינתך זה פשוט עובד, בלי מסכים חדשים ובלי הגדרות.",
  },
  {
    q: "כמה זמן לוקח עד שזה עוזר?",
    a: "מתחילים מדבר אחד, ולכן זה מהיר: 14 יום מהשיחה הראשונה ברוב העסקים. פתרון עם חיבורים מורכבים לוקח קצת יותר, ולוח זמנים מדויק סוגרים כבר בשיחת האבחון.",
  },
  {
    q: "מה קורה כשהסוכן לא יודע לענות?",
    a: "הוא לא ממציא. שאלה שמחוץ לתחום עוברת אליך בצורה חלקה, והלקוח מקבל הודעה שחוזרים אליו. עדיף שאלה שממתינה מתשובה שגויה.",
  },
  {
    q: "זה יישמע כמו בוט?",
    a: "לפני ההשקה אנחנו עוברים על שאלון עומק של השפה והטון של העסק. התשובות נכתבות בסגנון שלך ועוברות אישור שלך, אחת אחת.",
  },
];

export default function LpFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <p
            className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-4"
            style={{ color: "#6091B0" }}
          >
            שאלות שכולם שואלים
          </p>
          <h2
            className="font-display font-black tracking-tighter"
            style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#062340" }}
          >
            תשובות ישירות.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
              style={{ borderBottom: "1px solid rgba(6, 35, 64, 0.1)" }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-right gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className="font-display font-semibold text-base text-right"
                  style={{ color: "#062340" }}
                >
                  {faq.q}
                </span>
                <span className="flex-shrink-0">
                  {openIndex === i ? (
                    <Minus size={18} style={{ color: "#DC5D46" }} />
                  ) : (
                    <Plus size={18} style={{ color: "#6091B0" }} />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-5 text-sm font-body leading-relaxed"
                      style={{ color: "rgba(6, 35, 64, 0.6)" }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
