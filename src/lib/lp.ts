// lp.ts — קונפיגורציה ותוכן לעמוד הנחיתה /start.
// כל הקופי, שאלות השאלון והלוגיקה של הליד מרוכזים כאן כדי ששינויי תוכן
// לא ידרשו נגיעה בקומפוננטות.

import { WHATSAPP_NUMBER, PLANS, type PlanId } from "@/lib/constants";

/* ───────────────────────────────────────────────
   שאלון התאמת חבילה — 4 שאלות, ניקוד משוקלל
   ─────────────────────────────────────────────── */

export interface QuizOption {
  label: string;
  // ניקוד לכל חבילה. הגבוה ביותר בסוף מנצח.
  scores: Record<PlanId, number>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "business",
    question: "מה העסק שלך?",
    options: [
      { label: "אמנות ויצירה", scores: { art: 3, design: 1, comfort: 0 } },
      { label: "צילום, עיצוב או סטודיו", scores: { art: 1, design: 3, comfort: 0 } },
      { label: "שירותים ותורים", scores: { art: 0, design: 1, comfort: 3 } },
      { label: "משהו אחר", scores: { art: 0, design: 1, comfort: 2 } },
    ],
  },
  {
    id: "timeDrain",
    question: "מה גוזל לך הכי הרבה זמן ביום?",
    options: [
      { label: "מענה לפניות ושאלות חוזרות", scores: { art: 0, design: 1, comfort: 3 } },
      { label: "פולואפ ללידים והצעות מחיר", scores: { art: 0, design: 1, comfort: 3 } },
      { label: "שיווק, תוכן ונוכחות ברשת", scores: { art: 3, design: 2, comfort: 0 } },
      { label: "סדר, מעקב ומשימות שחוזרות", scores: { art: 1, design: 1, comfort: 2 } },
    ],
  },
  {
    id: "goal",
    question: "מה הכי חשוב שיקרה בחודשיים הקרובים?",
    options: [
      { label: "יותר לקוחות חדשים", scores: { art: 2, design: 2, comfort: 1 } },
      { label: "פחות שעות על תפעול", scores: { art: 0, design: 1, comfort: 3 } },
      { label: "נוכחות שנראית מקצועית", scores: { art: 3, design: 3, comfort: 0 } },
      { label: "שאף פנייה לא תלך לאיבוד", scores: { art: 0, design: 1, comfort: 3 } },
    ],
  },
  {
    id: "volume",
    question: "כמה פניות נכנסות אצלך ביום, בערך?",
    options: [
      { label: "בודדות", scores: { art: 2, design: 2, comfort: 0 } },
      { label: "5 עד 15", scores: { art: 1, design: 2, comfort: 2 } },
      { label: "יותר מ-15", scores: { art: 0, design: 1, comfort: 3 } },
      { label: "אין לי מושג, וזו בדיוק הבעיה", scores: { art: 1, design: 1, comfort: 2 } },
    ],
  },
];

export interface QuizResultCopy {
  planId: PlanId;
  title: string;
  why: string;
}

export const QUIZ_RESULTS: Record<PlanId, QuizResultCopy> = {
  art: {
    planId: "art",
    title: "PORTAL ART",
    why: "היצירה שלך במרכז. נוכחות ושפה שיווקית שנבנות סביבך, עם סוכן שעונה בשמך ושומר על הקול שלך.",
  },
  design: {
    planId: "design",
    title: "PORTAL DESIGN",
    why: "עסק ויזואלי צריך במה ויזואלית. אתר מעוצב, גלריה ומערכת תיאומים, עם סוכן שעונה לפניות בזמן שהעדשה אצלך ביד.",
  },
  comfort: {
    planId: "comfort",
    title: "PORTAL COMFORT",
    why: "סוכן שעונה לפניות באתר שלך ועוקב אחרי הלידים. שום דבר לא נופל בין הכיסאות, ורק מה שדורש אותך מגיע אליך.",
  },
};

export function scoreQuiz(answers: number[]): PlanId {
  const totals: Record<PlanId, number> = { art: 0, design: 0, comfort: 0 };
  answers.forEach((optionIndex, qIndex) => {
    const option = QUIZ_QUESTIONS[qIndex]?.options[optionIndex];
    if (!option) return;
    (Object.keys(totals) as PlanId[]).forEach((plan) => {
      totals[plan] += option.scores[plan];
    });
  });
  return (Object.keys(totals) as PlanId[]).reduce((best, plan) =>
    totals[plan] > totals[best] ? plan : best
  );
}

/* ───────────────────────────────────────────────
   בניית קישור וואטסאפ עם פרטי הליד
   ─────────────────────────────────────────────── */

export function buildLeadWhatsAppUrl(
  name: string,
  phone: string,
  planId?: PlanId | null
): string {
  const planPart = planId
    ? ` בשאלון באתר יצא לי ${PLANS[planId].name}.`
    : "";
  const text = `היי, אני ${name.trim()} (${phone.trim()}).${planPart} אשמח לשיחת אבחון קצרה.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ───────────────────────────────────────────────
   אנליטיקס — בטוח לכישלון, בלי תלות ב-GTM
   ─────────────────────────────────────────────── */

type LpEvent =
  | "lp_view"
  | "lp_quiz_start"
  | "lp_quiz_complete"
  | "lp_lead_submit"
  | "lp_whatsapp_click"
  | "lp_order_click";

export function trackLpEvent(event: LpEvent, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}
