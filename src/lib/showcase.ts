// ─────────────────────────────────────────────────────────────
// מקור-אמת יחיד לגלריה. כל כרטיסייה = תיקיית תמונות שנפתחת בלחיצה
// (לייטבוקס). התמונות יושבות תחת public/gallery/<slug>/.
//
// כדי להוסיף תמונות לכרטיסייה: זרוק קבצים ל-public/gallery/<slug>/
// והוסף את הנתיב למערך images של אותה כרטיסייה.
// ─────────────────────────────────────────────────────────────

export type GalleryCard = {
  slug: string;
  label: string;
  /** תמונות הגלריה של הכרטיסייה. ריק => כרטיסיית "בקרוב". */
  images: string[];
};

const g = (slug: string, names: string[]) =>
  names.map((n) => `/gallery/${slug}/${n}.webp`);

// הסדר תואם לפריסת המקור (6 כרטיסיות).
export const GALLERY_CARDS: GalleryCard[] = [
  { slug: "presence", label: "נוכחות דיגיטלית ליוצרים", images: [] },
  {
    slug: "answer",
    label: "מערכות מענה לעסקים",
    images: g("answer", ["01-chat", "02-inbox", "03-summary", "04-followup", "05-tone"]),
  },
  {
    slug: "automation",
    label: "אוטומציות וזרימות עבודה",
    images: g("automation", ["01-flow", "02-reminders", "03-billing", "04-before-after", "05-board"]),
  },
  { slug: "brand", label: "מיתוג ועיצוב דיגיטלי", images: [] },
  {
    slug: "integration",
    label: "אינטגרציות וכלים",
    images: g("integration", ["01-hub", "02-dashboard", "03-sync", "04-channels", "05-connectors"]),
  },
  {
    slug: "custom",
    label: "פתרונות בהתאמה אישית",
    images: g("custom", ["01-modular", "02-picker", "03-blueprint", "04-sketch-to-product", "05-needs-map"]),
  },
];
