"use client";

// NothingFalls — "שום דבר לא נופל": כרטיסיות פניות נכנסות משלושה כיוונים
// (למעלה, ימין, שמאל) במעט בלגן, נבלעות בפורטל, ויוצאות מלמטה מסודרות
// עם סטטוס. לופ רציף של 7 שניות. transform+opacity בלבד;
// ב-reduced motion מוצג מצב סטטי מסודר.

import { motion, useReducedMotion } from "framer-motion";
import {
  EnvelopeSimple,
  Flame,
  Bell,
  FileText,
  CalendarBlank,
  CheckCircle,
} from "@phosphor-icons/react";

interface FlowCard {
  label: string;
  status: string;
  Icon: typeof EnvelopeSimple;
  // נקודת כניסה (יחסית למרכז) + נטייה התחלתית
  x0: number;
  y0: number;
  rotate: number;
}

// כיווני כניסה: למעלה / ימין / שמאל, בפיזור לא אחיד
const CARDS: FlowCard[] = [
  { label: "פנייה חדשה", status: "נענתה", Icon: EnvelopeSimple, x0: -30, y0: -250, rotate: -8 },
  { label: "ליד חם", status: "במעקב", Icon: Flame, x0: 230, y0: -90, rotate: 7 },
  { label: "תזכורת", status: "נשלחה", Icon: Bell, x0: -230, y0: -60, rotate: 6 },
  { label: "הצעת מחיר", status: "במעקב", Icon: FileText, x0: 40, y0: -250, rotate: -6 },
  { label: "פגישה", status: "ביומן", Icon: CalendarBlank, x0: 225, y0: -140, rotate: 9 },
];

const LOOP = 7; // שניות לכל כרטיסייה
const STAGGER = LOOP / CARDS.length; // כניסה רציפה, בלי הפסקות בלופ

function CardShell({ card, sorted }: { card: FlowCard; sorted: boolean }) {
  const { Icon } = card;
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2 w-[142px]"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(6, 35, 64, 0.08)",
        boxShadow: "0 10px 24px -12px rgba(6, 35, 64, 0.22)",
      }}
    >
      <span
        className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
        style={{
          backgroundColor: sorted ? "rgba(29, 122, 67, 0.1)" : "rgba(96, 145, 176, 0.14)",
          color: sorted ? "#1d7a43" : "#6091B0",
        }}
      >
        {sorted ? <CheckCircle size={15} weight="fill" /> : <Icon size={15} weight="duotone" />}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display font-semibold text-[11px]" style={{ color: "#062340" }}>
          {card.label}
        </span>
        <span
          className="font-body text-[10px]"
          style={{ color: sorted ? "#1d7a43" : "rgba(6, 35, 64, 0.45)" }}
        >
          {sorted ? card.status : "ממתין…"}
        </span>
      </span>
    </div>
  );
}

export default function NothingFalls() {
  const reduced = useReducedMotion();

  // מצב סטטי — נגיש ורגוע: הפורטל ושלוש כרטיסיות מסודרות
  if (reduced) {
    return (
      <div className="relative flex flex-col items-center gap-4 py-6" aria-hidden="true">
        <PortalVortex still />
        {CARDS.slice(0, 3).map((c) => (
          <CardShell key={c.label} card={c} sorted />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative w-[310px] sm:w-[380px] h-[400px] sm:h-[470px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      {/* פייד גם בצדדים — הכניסות מהצדדים לא נחתכות בקו חד */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        {/* הפורטל במרכז */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PortalVortex />
        </div>

        {CARDS.map((card, i) => {
          const delay = i * STAGGER;
          return (
            <div key={card.label}>
              {/* כניסה — מבולגן, מתכנס אל הפורטל */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  x: [card.x0, card.x0 * 0.55, card.x0 * 0.12, 0, 0],
                  y: [card.y0, card.y0 * 0.6, card.y0 * 0.15, 0, 0],
                  rotate: [card.rotate, card.rotate, card.rotate * 0.3, 0, 0],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.94, 1, 1, 0.8, 0.6],
                }}
                transition={{
                  duration: LOOP,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.36, 0.46, 0.5],
                }}
              >
                <CardShell card={card} sorted={false} />
              </motion.div>

              {/* יציאה — מסודר, מלמטה, עם סטטוס */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  y: [0, 0, 40, 175, 240],
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.6, 0.6, 1, 1, 0.97],
                }}
                transition={{
                  duration: LOOP,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 0.58, 0.9, 1],
                }}
              >
                <CardShell card={card} sorted />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* PortalVortex — פורטל אבסטרקטי: קשתות זורמות בצבעי המותג שמסתחררות
   לאט סביב ליבה זוהרת. שתי שכבות בסיבוב נגדי + נשימה עדינה של הליבה. */
function PortalVortex({ still = false }: { still?: boolean }) {
  return (
    <div className="relative" style={{ width: 190, height: 190 }}>
      {/* ליבה זוהרת — האור שבפתח */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: 52,
          background:
            "radial-gradient(circle, rgba(240,225,213,0.95) 0%, rgba(228,167,157,0.5) 45%, rgba(96,145,176,0.18) 75%, transparent 100%)",
          filter: "blur(2px)",
        }}
        animate={still ? undefined : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* שכבת קשתות חיצונית — סיבוב איטי עם כיוון השעון */}
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute inset-0 w-full h-full"
        animate={still ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {/* קשתות פתוחות בעוביים משתנים — תחושת זרימה, לא טבעת */}
        <path
          d="M 100 12 A 88 88 0 0 1 186 112"
          stroke="#6091B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M 172 152 A 88 88 0 0 1 60 181"
          stroke="#DC5D46"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 22 132 A 88 88 0 0 1 30 54"
          stroke="#062340"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      </motion.svg>

      {/* שכבת קשתות פנימית — סיבוב נגדי, אליפטי מעט (תחושת מערבולת) */}
      <motion.svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute inset-0 w-full h-full"
        style={{ scaleY: 0.92 }}
        animate={still ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M 100 36 A 64 64 0 0 1 163 90"
          stroke="#DC5D46"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M 158 130 A 64 64 0 0 1 84 162"
          stroke="#6091B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 42 122 A 64 64 0 0 1 52 62"
          stroke="#E4A79D"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.svg>

      {/* נקודות אור קטנות על המסלול — ניצוצות עדינים */}
      {!still &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5,
              height: 5,
              left: "50%",
              top: "50%",
              backgroundColor: i === 1 ? "#DC5D46" : "#6091B0",
              boxShadow: `0 0 8px ${i === 1 ? "rgba(220,93,70,0.7)" : "rgba(96,145,176,0.7)"}`,
            }}
            animate={{
              x: [0, 78, 0, -78, 0].map((v) => v * Math.cos(i * 2.1) - 2),
              y: [-78, 0, 78, 0, -78].map((v) => v * 1),
              opacity: [0.9, 0.5, 0.9, 0.5, 0.9],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.7,
            }}
          />
        ))}
    </div>
  );
}
