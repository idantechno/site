"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import FloatingShapes from "@/components/decorative/FloatingShapes";

const faqs = [
  {
    q: "האם זה יחליף אותי?",
    a: "לא. המערכת לוקחת על עצמה את העבודה החוזרת — מענה לשאלות נפוצות, סינון פניות וסדר פנימי — ומשחררת אותך להתמקד במה שרק אתה יכול לעשות. אתה נשאר בשליטה, ומקבל רק את מה שבאמת דורש אותך.",
  },
  {
    q: "האם זה מתאים למי שלא מבין בטכנולוגיה?",
    a: "בהחלט. אנחנו מטפלים בכל הצד הטכני — הקמה, חיבורים והגדרות. מבחינתך זה פשוט ואינטואיטיבי, בלי להפוך אותך לאיש טכנולוגיה.",
  },
  {
    q: "האם זה יישמע גנרי?",
    a: "ממש לא. המערכת וצוות הסוכנים שלה נבנים אישית לפי השפה, הטון והוויב של העסק שלך — אחרי שאלון עומק שאנחנו עושים לפני. זה מה שמבדיל אותנו מפתרונות מדף.",
  },
  {
    q: "מה זה בעצם “צוות הסוכנים”?",
    a: "אלו עוזרים חכמים מבוססי AI שעובדים בתוך המערכת ועוזרים לנהל את העסק ואת הקשרים העסקיים שלך עם אנשים — מענה, מעקב, סדר ואוטומציה — כל אחד מותאם לעסק שלך.",
  },
  {
    q: "כמה זמן לוקח להקים?",
    a: "לרוב העסקים — שבוע עד שבועיים מרגע שמסכמים את האפיון. פתרון מורכב יותר עם אינטגרציות לוקח קצת יותר, ונדע לתת לך לוח זמנים מדויק כבר בשיחת האפיון.",
  },
  {
    q: "מה קורה אם נתקלים בשאלה שהמערכת לא יודעת לענות עליה?",
    a: "המערכת מזהה מה מחוץ לתחום ומעבירה אותו אליך בצורה חלקה — בלי לבלבל את הלקוח ובלי לאלתר תשובות.",
  },
  {
    q: "האם אתם מבצעים הדרכות בכלי AI?",
    a: "כן. מעבר להקמה, אנחנו מלווים ומדריכים אותך ואת הצוות איך לשלב כלי AI בעבודה היומיומית — בצורה פשוטה, בלי להפוך אתכם לאנשי טכנולוגיה.",
  },
  {
    q: "האם שימוש ב-AI יכול לעזור לי בשיווק?",
    a: "בהחלט — מתוכן לרשתות, דרך מענה מהיר ללידים ועד סינון הלקוחות שמתאימים לך. AI עוזר לך להגיע ליותר אנשים ולהיראות מקצועי יותר, בלי לאבד את הקול האישי.",
  },
  {
    q: "מתי כדאי לי להשתמש ב-AI ומתי לעשות בעצמי?",
    a: "כלל אצבע: מה שחוזר על עצמו, גוזל זמן או דורש זמינות 24/7 — תן למערכת. מה שדורש יצירתיות, שיקול דעת ומגע אנושי — תשאיר לעצמך. אנחנו עוזרים לך לסמן את הקו הזה נכון.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-24" style={{ backgroundColor: "#F4E8E0" }}>
      {/* ── Whisper-soft decoration ── */}
      <AmbientGlow
        color="#6091B0"
        size={380}
        opacity={0.08}
        className="z-0"
        style={{ top: "20%", right: "-160px" }}
      />
      <AmbientGlow
        color="#DC5D46"
        size={340}
        opacity={0.07}
        className="z-0"
        style={{ bottom: "10%", left: "-120px" }}
      />
      <SubtleParticles count={12} className="z-0" />
      <FloatingShapes className="z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-display font-medium tracking-widest uppercase mb-3" style={{ color: "#6091B0" }}>
            שאלות נפוצות
          </p>
          <h2 className="text-3xl font-display font-bold tracking-tight" style={{ color: "#062340" }}>
            תשובות ישירות.
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-right gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-display font-medium text-base text-right" style={{ color: "#062340" }}>
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
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm font-body leading-relaxed" style={{ color: "#6b7280" }}>
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
