"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs = [
  {
    q: "האם זה יחליף אותי?",
    a: "לא. זה מפנה אותך לעשות את מה שרק בני אדם יכולים — ליצור. הסוכן מטפל בשאלות החוזרות ובסינון הלידים, ואתה מקבל רק את הלקוחות הרציניים.",
  },
  {
    q: "האם זה מתאים למי שלא מבין בטכנולוגיה?",
    a: "בהחלט. אנחנו מטפלים בכל הצד הטכני. עבורך זה פשוט כמו לשלוח הודעה בוואטסאפ.",
  },
  {
    q: "האם התוכן יישמע גנרי?",
    a: "ממש לא. כל סוכן נבנה אישית לפי השפה, הטון והוויב של הסטודיו שלך. אנחנו עושים שאלון קצר לפני — וזה מה שמבדיל אותנו מהבוטים הזולים.",
  },
  {
    q: "כמה זמן לוקח להקים?",
    a: "חבילת Starter עד 4 שעות עבודה. לרוב העסקים זה אומר שבוע עד שבועיים מרגע אישור התסריט.",
  },
  {
    q: "מה קורה אם הלקוח שואל שאלה שהסוכן לא יודע?",
    a: "הסוכן מוגדר לזהות שאלות מחוץ לתחום ולהעביר אותן אליך בצורה חלקה — בלי לבלבל את הלקוח.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-display font-medium tracking-widest uppercase mb-3" style={{ color: "#DC5D46" }}>
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
