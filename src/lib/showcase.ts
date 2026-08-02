// ─────────────────────────────────────────────────────────────
// מקור-אמת יחיד לגלריה. כל כרטיסייה = תיקיית תמונות שנפתחת בלחיצה
// (לייטבוקס). התמונות יושבות תחת public/gallery/<slug>/.
// ─────────────────────────────────────────────────────────────

export type GalleryCard = {
  slug: string;
  label: string;
  /** תמונות הגלריה של הכרטיסייה. ריק => כרטיסיית "בקרוב". */
  images: string[];
};

const cat = (slug: string, names: string[]) =>
  names.map((n) => `/gallery/${slug}/${n}.webp`);

// כל 20 המוקאפים (מענה/אוטומציות/אינטגרציות/התאמה אישית) מרוכזים כרגע
// בכרטיסיית "כלים ופתרונות" — עידן יסנן בעתיד.
const solutionsImages = [
  ...cat("answer", ["01-chat", "02-inbox", "03-summary", "04-followup", "05-tone"]),
  ...cat("automation", ["01-flow", "02-reminders", "03-billing", "04-before-after", "05-board"]),
  ...cat("integration", ["01-hub", "02-dashboard", "03-sync", "04-channels", "05-connectors"]),
  ...cat("custom", ["01-modular", "02-picker", "03-blueprint", "04-sketch-to-product", "05-needs-map"]),
];

// 3 כרטיסיות בלבד. presence/brand ריקות ("בקרוב") עד שיתקבלו דוגמאות.
export const GALLERY_CARDS: GalleryCard[] = [
  { slug: "presence", label: "נוכחות דיגיטלית ליוצרים", images: [] },
  { slug: "brand", label: "מיתוג ועיצוב דיגיטלי", images: [] },
  {
    slug: "solutions",
    label: "כלים ופתרונות בהתאמה אישית לעסקים",
    images: solutionsImages,
  },
];
