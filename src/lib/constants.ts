export const WHATSAPP_NUMBER = "972515223921";
export const WHATSAPP_DISPLAY = "051-522-3921";
export const WHATSAPP_MESSAGE = encodeURIComponent("היי, אני רוצה לקבל אבחון קצר לעסק שלי");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const PHONE_TEL = "+972515223921";
export const PHONE_URL = `tel:${PHONE_TEL}`;

export const EMAIL = "ai@portalstudio.art";
export const EMAIL_URL = `mailto:${EMAIL}`;

export const FACEBOOK_URL = "https://www.facebook.com/share/1HwnV9hxZv/";
export const INSTAGRAM_URL = "https://www.instagram.com/portalstudioai";

/* ───────────────────────────────────────────────
   פרטי בית העסק (לצורך תאימות חוקית + סליקה)
   ─────────────────────────────────────────────── */

// ⚠️ למילוי: השם המשפטי המלא של העוסק (כעוסק פטור — שמך המלא הרשום ברשויות).
// נדרש למסמכים המחייבים ולאישור הסליקה.
export const BUSINESS_OWNER_NAME = "עידן פורטל";
export const BUSINESS_BRAND = "Portal Studio";
export const BUSINESS_TYPE = "עוסק פטור";
export const BUSINESS_NUMBER = "204470322";
export const BUSINESS_ADDRESS = "הרקפת 12, מגדל העמק";
export const BUSINESS_COUNTRY = "ישראל";

export const SITE_URL = "https://www.portalstudio.co.il";

// קישורי התשלום המתארחים של Morning (חשבונית ירוקה) — דף סליקה ייעודי לכל חבילה.
// כל קישור מפנה בחזרה ל-/thank-you לאחר תשלום מוצלח (מוגדר בצד מורנינג).
const CHECKOUT_URLS = {
  art: "https://mrng.to/0q7Gy7vrVF",
  design: "https://mrng.to/LJ1FYQoxfb",
  comfort: "https://mrng.to/bDC5DlLVqr",
} as const;

// תאריך עדכון אחרון של המסמכים המשפטיים (מוצג בעמודים)
export const LEGAL_LAST_UPDATED = "30 ביוני 2026";

// תוכניות החבילות. המחירים מותאמים-אישית ואינם מוצגים באתר (לפי החלטה) —
// setupFrom/monthly נשמרים כהפניה פנימית בלבד. עוסק פטור — ללא מע"מ.
// checkoutUrl: קישור התשלום הייעודי של כל חבילה במורנינג.
export const PLANS = {
  art: {
    name: "PORTAL ART",
    setupFrom: 800,
    monthly: 130,
    checkoutUrl: CHECKOUT_URLS.art,
  },
  design: {
    name: "PORTAL DESIGN",
    setupFrom: 650,
    monthly: 130,
    checkoutUrl: CHECKOUT_URLS.design,
  },
  comfort: {
    name: "PORTAL COMFORT",
    setupFrom: 1100,
    monthly: 150,
    checkoutUrl: CHECKOUT_URLS.comfort,
  },
} as const;

export type PlanId = keyof typeof PLANS;

/* ───────────────────────────────────────────────
   מחירי השקה — מקור אמת יחיד.
   המחירים הנוכחיים זמניים ועתידים לעלות. כל הקומפוננטות
   קוראות מכאן. להחלפת מנגנון בעתיד: שנה mechanism בלבד
   ("spots" = מספר מקומות · "date" = תאריך סיום).
   ─────────────────────────────────────────────── */
export const LAUNCH_PRICING = {
  active: true,
  mechanism: "spots" as "spots" | "date",
  spots: 10, // מנגנון "spots" — כמה עסקים ראשונים נכנסים בתנאי ההשקה
  endDate: "31.12.2026", // מנגנון "date" — עד מתי מחירי ההשקה בתוקף
  badge: "מחירי השקה",
} as const;

// שורת נדירות קצרה — לתג/צ'יפ ליד אזכור מחיר.
export function launchPricingShort(): string {
  return LAUNCH_PRICING.mechanism === "date"
    ? `בתוקף עד ${LAUNCH_PRICING.endDate}`
    : `ל-${LAUNCH_PRICING.spots} העסקים הראשונים`;
}

// משפט הסבר מלא — ליד סקשן החבילות, בטון של האתר.
export function launchPricingNote(): string {
  return LAUNCH_PRICING.mechanism === "date"
    ? `אנחנו בתחילת הדרך, והמחירים האלה בתוקף עד ${LAUNCH_PRICING.endDate} — אחר כך הם עולים.`
    : `אנחנו בתחילת הדרך, ו-${LAUNCH_PRICING.spots} העסקים הראשונים שנכנסים מקבלים תנאים שלא יחזרו.`;
}

export const COLORS = {
  navy: "#062340",
  coral: "#DC5D46",
  steel: "#6091B0",
  bg: "#FFFFFF",
  surface: "#F8F9FA",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e7eb",
} as const;

export const NAV_LINKS = [
  { label: "פתרונות", href: "/solutions" },
  { label: "חבילות", href: "/#packages" },
  { label: "גלריה", href: "/gallery" },
  { label: "תובנות", href: "/blog" },
];
