"use client";

// NothingFalls — "שום דבר לא נופל": כרטיסיות פניות נכנסות משלושה כיוונים
// (למעלה, ימין, שמאל) במעט בלגן, נמסות לתוך מערבולת האנרגיה של המותג
// (public/nothing-falls-swirl.png — התמונה עצמה, מונפשת) ויוצאות מלמטה
// מסודרות עם סטטוס. נתיבי ניתוב דקים נדלקים בעדינות כשכרטיסייה עוברת
// בהם. לופ רציף של 7 שניות. transform+opacity בלבד; ב-reduced motion
// מוצג מצב סטטי מסודר.

import Image from "next/image";
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
const ABSORB_AT = 0.46; // הרגע (0–1 בלופ) שבו כרטיסייה נבלעת בקונסולה

// נתיבי ניתוב במערכת הצירים של ה-SVG הקבוע (380×470, מרכז ב-190,235).
// כל נתיב מתחיל בנקודת הכניסה של כרטיסייה ומסתיים בפתח השער.
const ROUTES = {
  topA: "M 160 -12 C 152 70, 156 130, 180 174",
  topB: "M 230 -12 C 238 70, 228 132, 202 174",
  right: "M 404 118 C 330 138, 300 158, 272 188",
  left: "M -24 172 C 50 178, 84 190, 100 206",
  exit: "M 190 330 C 190 372, 190 410, 190 456",
};

// איזה נתיב "נדלק" עבור כל כרטיסייה (לפי כיוון הכניסה שלה)
const CARD_ROUTES: (keyof typeof ROUTES)[] = ["topA", "right", "left", "topB", "right"];

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

  // מצב סטטי — נגיש ורגוע: המערבולת ושלוש כרטיסיות מסודרות
  if (reduced) {
    return (
      <div className="relative flex flex-col items-center gap-4 py-6" aria-hidden="true">
        <SwirlCore still />
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
        {/* מארג הנתיבים — מאחורי הכל */}
        <RouteLines />

        {/* המערבולת — מאחורי הכרטיסיות; ההיעלמות לתוכה נעשית בדהיית
            הכרטיסייה עצמה, כך שהווידאו לא מלביין את הכרטיסיות היוצאות */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SwirlCore />
        </div>

        {CARDS.map((card, i) => {
          const delay = i * STAGGER;
          return (
            <div key={card.label}>
              {/* כניסה — מבולגן, מתכנס אל פתח השער ונמס לתוך הערפל */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  x: [card.x0, card.x0 * 0.55, card.x0 * 0.15, card.x0 * 0.04, 0],
                  y: [card.y0, card.y0 * 0.6, card.y0 * 0.2, -52, -6],
                  rotate: [card.rotate, card.rotate, card.rotate * 0.3, 0, 0],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.94, 1, 1, 0.92, 0.78],
                }}
                transition={{
                  duration: LOOP,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.34, 0.44, ABSORB_AT + 0.04],
                }}
              >
                <CardShell card={card} sorted={false} />
              </motion.div>

              {/* יציאה — מסודר, מתגבש מתוך הערפל התחתון של השער, עם סטטוס */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{ translateX: "-50%", translateY: "-50%" }}
                animate={{
                  y: [0, 0, 48, 175, 240],
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.78, 0.78, 1, 1, 0.97],
                }}
                transition={{
                  duration: LOOP,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, ABSORB_AT + 0.04, 0.58, 0.9, 1],
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

/* RouteLines — מארג נתיבים עדין שמזין את הקונסולה: קווים דקים קבועים,
   ועליהם "אות" קצר שנוסע לאורך הנתיב בסנכרון עם הכרטיסייה שעוברת בו.
   ה-SVG בגודל קבוע וממורכז כדי להישאר מיושר עם קואורדינטות הכרטיסיות. */
function RouteLines() {
  return (
    <svg
      width={380}
      height={470}
      viewBox="0 0 380 470"
      fill="none"
      className="absolute left-1/2 top-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* הקווים הקבועים */}
      {Object.values(ROUTES).map((d) => (
        <path key={d} d={d} stroke="rgba(6, 35, 64, 0.08)" strokeWidth="1.5" />
      ))}

      {/* אות נוסע לכל כרטיסייה — על נתיב הכניסה שלה, מעט לפני הבליעה */}
      {CARDS.map((card, i) => (
        <motion.path
          key={card.label}
          d={ROUTES[CARD_ROUTES[i]]}
          pathLength={1}
          strokeDasharray="0.18 0.82"
          stroke="rgba(96, 145, 176, 0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0.2 }}
          animate={{ strokeDashoffset: [0.2, -1] }}
          transition={{
            duration: 1.6,
            delay: i * STAGGER + LOOP * ABSORB_AT - 1.5,
            repeat: Infinity,
            repeatDelay: LOOP - 1.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* אות יציאה — קורל עדין, פעם בכל בליעה */}
      <motion.path
        d={ROUTES.exit}
        pathLength={1}
        strokeDasharray="0.18 0.82"
        stroke="rgba(220, 93, 70, 0.4)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ strokeDashoffset: 0.2 }}
        animate={{ strokeDashoffset: [0.2, -1] }}
        transition={{
          duration: 1.1,
          delay: LOOP * 0.58,
          repeat: Infinity,
          repeatDelay: STAGGER - 1.1,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ── SwirlCore — מערבולת האנרגיה של המותג: וידאו הלופ
   (public/nothing-falls-portal.mp4, 6 שניות) עם מסכה רדיאלית שממיסה את
   השוליים אל רקע הקרם של העמוד. מעליו אור ליבה פועם, הבזק בכל בליעה
   ואבק כוכבים בצבעי המותג. ב-reduced motion מוצגת תמונת הסטיל
   (nothing-falls-swirl.png) במקום הווידאו. ── */

const SWIRL_MASK =
  "radial-gradient(ellipse 50% 50% at 50% 50%, black 44%, rgba(0,0,0,0.55) 62%, transparent 76%)";

// אבק כוכבים סביב הליבה — נקודות דטרמיניסטיות בצבעי המותג (בתוך קופסה 500×282)
const DUST = [
  { x: 208, y: 176, s: 3, c: "rgba(220, 93, 70, 0.75)", d: 4.6, delay: 0 },
  { x: 262, y: 196, s: 2.5, c: "rgba(96, 145, 176, 0.7)", d: 5.4, delay: 1.2 },
  { x: 300, y: 150, s: 3.5, c: "rgba(255, 246, 236, 0.9)", d: 4.2, delay: 2.2 },
  { x: 232, y: 116, s: 2.5, c: "rgba(255, 246, 236, 0.8)", d: 5.8, delay: 0.7 },
  { x: 186, y: 132, s: 2, c: "rgba(96, 145, 176, 0.65)", d: 5.0, delay: 3.0 },
  { x: 282, y: 100, s: 2.5, c: "rgba(220, 93, 70, 0.55)", d: 4.8, delay: 3.8 },
  { x: 320, y: 190, s: 2, c: "rgba(220, 93, 70, 0.5)", d: 5.6, delay: 1.9 },
  { x: 252, y: 70, s: 2, c: "rgba(96, 145, 176, 0.55)", d: 6.0, delay: 4.6 },
];

function SwirlCore({ still = false }: { still?: boolean }) {
  // במצב אנימציה הפורטל כפול — ממלא את אזור הוויזואל; במצב סטטי (reduced
  // motion, פריסת עמודה) נשאר קומפקטי כדי לא לשבור את הפריסה
  const w = still ? 500 : 1000;
  const h = still ? 282 : 564;
  return (
    <div className="relative flex-shrink-0" style={{ width: w, height: h }}>
      {/* מצב סטטי — תמונת הסטיל של המערבולת במקום הווידאו */}
      {still ? (
        <Image
          src="/nothing-falls-swirl.png"
          alt=""
          fill
          sizes="500px"
          quality={90}
          style={{
            objectFit: "cover",
            maskImage: SWIRL_MASK,
            WebkitMaskImage: SWIRL_MASK,
          }}
        />
      ) : (
        /* וידאו הפורטל — סטטי לחלוטין חוץ מהתנועה שבתוך הווידאו עצמו;
           המסכה ממיסה את השוליים לרקע הקרם */
        <video
          src="/nothing-falls-portal.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          ref={(el) => {
            // חיזוק ל-autoplay: הבטחת muted לפני ניסיון ניגון
            if (el) {
              el.muted = true;
              el.play?.().catch(() => {});
            }
          }}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            maskImage: SWIRL_MASK,
            WebkitMaskImage: SWIRL_MASK,
          }}
        />
      )}

      {/* ערפל — אור חם ורך סביב הליבה, נושם בשקיפות בלבד (בלי תזוזה) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: 300,
          top: 120,
          width: 400,
          height: 320,
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(255, 243, 226, 0.9) 0%, rgba(220, 93, 70, 0.2) 50%, rgba(96, 145, 176, 0.12) 75%, transparent 100%)",
          filter: "blur(26px)",
        }}
        animate={still ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* אבק כוכבים — עולה לאט מתוך המערבולת ונמוג (קואורדינטות ×2) */}
      {!still &&
        DUST.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.x * 2,
              top: p.y * 2,
              width: p.s * 2,
              height: p.s * 2,
              backgroundColor: p.c,
            }}
            initial={{ opacity: 0 }}
            animate={{ y: [0, -55], opacity: [0, 1, 0] }}
            transition={{
              duration: p.d,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

