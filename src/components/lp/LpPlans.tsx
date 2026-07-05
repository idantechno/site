"use client";

// LpPlans — שלוש החבילות בבנטו א-סימטרי (COMFORT רחבה — הקהל הרחב של העמוד).
// בלי מחירים, לפי ההחלטה הקיימת. CTA לשאלון או להזמנה.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChatsCircle, Palette, Camera } from "@phosphor-icons/react";
import { trackLpEvent } from "@/lib/lp";
import type { PlanId } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface PlanCard {
  id: PlanId;
  name: string;
  tagline: string;
  points: string[];
  wide?: boolean;
}

const CARDS: PlanCard[] = [
  {
    id: "comfort",
    name: "PORTAL COMFORT",
    tagline: "לכל עסק שרוצה שקט תפעולי",
    points: [
      "סוכן שעונה ללקוחות באתר שלך, בקול שלך",
      "מעקב אחרי לידים והצעות מחיר פתוחות",
      "תזכורות ותיאומים ישירות ליומן",
      "סינון פניות: רק מה שדורש אותך מגיע אליך",
    ],
    wide: true,
  },
  {
    id: "design",
    name: "PORTAL DESIGN",
    tagline: "לצלמים, מעצבים וסטודיו",
    points: ["אתר וגלריה מעוצבים", "מערכת הזמנות וסדנאות", "סוכן שעונה כשהעדשה בידיים"],
  },
  {
    id: "art",
    name: "PORTAL ART",
    tagline: "לאמנים ויוצרים",
    points: ["מיתוג ושפה אישית", "נוכחות דיגיטלית שנבנית סביבך", "ליווי אסטרטגי צמוד"],
  },
];

const ICONS: Record<PlanId, React.ReactNode> = {
  comfort: <ChatsCircle size={26} weight="duotone" />,
  design: <Camera size={26} weight="duotone" />,
  art: <Palette size={26} weight="duotone" />,
};

export default function LpPlans() {
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
          className="mb-14 max-w-2xl"
        >
          <p
            className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-5"
            style={{ color: "#6091B0" }}
          >
            החבילות
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-[1.06] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#062340" }}
          >
            שלוש דרכים להתחיל.
          </h2>
          <p className="font-body text-base leading-relaxed" style={{ color: "rgba(6,35,64,0.6)" }}>
            המחיר נקבע לפי ההיקף שהעסק שלך באמת צריך, ומוצג במלואו לפני
            תשלום. בשיחת האבחון כבר יהיה לך מספר מדויק.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: EASE }}
              className={`card-glow relative flex flex-col rounded-[2rem] p-8 ${
                card.wide ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
              style={{
                backgroundColor: card.wide ? "#062340" : "#ffffff",
                border: "1px solid rgba(6, 35, 64, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{
                    backgroundColor: card.wide
                      ? "rgba(220, 93, 70, 0.16)"
                      : "rgba(96, 145, 176, 0.12)",
                    color: card.wide ? "#DC5D46" : "#6091B0",
                  }}
                >
                  {ICONS[card.id]}
                </span>
                {card.wide && (
                  <span
                    className="rounded-full px-3.5 py-1.5 font-display font-semibold text-[11px] tracking-wide"
                    style={{ backgroundColor: "#DC5D46", color: "#fff" }}
                  >
                    הכי מבוקשת
                  </span>
                )}
              </div>

              <h3
                className="font-display font-black text-2xl tracking-tight mb-1.5"
                style={{ color: card.wide ? "#ffffff" : "#062340" }}
              >
                {card.name}
              </h3>
              <p
                className="font-body text-sm mb-6"
                style={{ color: card.wide ? "rgba(255,255,255,0.6)" : "rgba(6,35,64,0.55)" }}
              >
                {card.tagline}
              </p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {card.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 font-body text-sm leading-relaxed"
                    style={{ color: card.wide ? "rgba(255,255,255,0.78)" : "rgba(6,35,64,0.7)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: card.wide ? "#DC5D46" : "#6091B0" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                href={`/order?plan=${card.id}`}
                onClick={() => trackLpEvent("lp_order_click", { plan: card.id })}
                className="inline-flex items-center justify-between gap-3 rounded-full px-5 py-3 font-display font-semibold text-sm transition-colors duration-300 active:scale-[0.98]"
                style={
                  card.wide
                    ? { backgroundColor: "#DC5D46", color: "#fff" }
                    : {
                        border: "1.5px solid rgba(6, 35, 64, 0.2)",
                        color: "#062340",
                      }
                }
              >
                לפרטים ולהזמנה
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full"
                  style={{
                    backgroundColor: card.wide
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(6,35,64,0.06)",
                  }}
                >
                  <ArrowLeft size={14} weight="bold" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 font-body text-sm text-center"
          style={{ color: "rgba(6, 35, 64, 0.5)" }}
        >
          עדיין בהתלבטות?{" "}
          <a
            href="#quiz"
            className="underline underline-offset-4 font-semibold"
            style={{ color: "#C24A34" }}
          >
            השאלון למעלה
          </a>{" "}
          ייתן כיוון תוך חצי דקה.
        </motion.p>
      </div>
    </section>
  );
}
