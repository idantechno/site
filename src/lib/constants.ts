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

// כתובת דף הסליקה המתארח של Grow/Morning (חשבונית ירוקה).
// ⚠️ placeholder עד שתאושר הסליקה. אחרי האישור — יוצרים דף תשלום לכל חבילה
//    במורנינג ומדביקים את הקישור ב-checkoutUrl של כל חבילה ב-PLANS למטה.
export const GROW_CHECKOUT_URL = "https://grow.business/"; // TODO: קישור סליקה אמיתי

// תאריך עדכון אחרון של המסמכים המשפטיים (מוצג בעמודים)
export const LEGAL_LAST_UPDATED = "30 ביוני 2026";

// תוכניות החבילות. המחירים מותאמים-אישית ואינם מוצגים באתר (לפי החלטה) —
// setupFrom/monthly נשמרים כהפניה פנימית בלבד (לבניית קישור התשלום ב-Grow).
// עוסק פטור — ללא מע"מ. checkoutUrl: placeholder עד אישור הסליקה,
// אחר כך קישור תשלום ייעודי לכל חבילה.
export const PLANS = {
  art: {
    name: "PORTAL ART",
    setupFrom: 800,
    monthly: 130,
    checkoutUrl: GROW_CHECKOUT_URL,
  },
  design: {
    name: "PORTAL DESIGN",
    setupFrom: 650,
    monthly: 130,
    checkoutUrl: GROW_CHECKOUT_URL,
  },
  comfort: {
    name: "PORTAL COMFORT",
    setupFrom: 1100,
    monthly: 150,
    checkoutUrl: GROW_CHECKOUT_URL,
  },
} as const;

export type PlanId = keyof typeof PLANS;

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
  { label: "חבילות", href: "/#packages" },
  { label: "על הסטודיו", href: "/#about" },
];
