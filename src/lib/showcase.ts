// ─────────────────────────────────────────────────────────────
// מקור-אמת יחיד לתוכן הגלריה: כרטיסיות (ויזואלים קונספטואליים)
// + פס ה-Showcase של המדיה שיצר עידן (תמונות + סרטונים ב-AI).
//
// כדי להוסיף מדיה: זרוק קבצים ל-
//   public/gallery/media/images/   (יחס 9:16, JPG/WebP רוחב ~1080px)
//   public/gallery/media/videos/   (MP4 H.264 מושתק, לופ ~6-10ש')
// והוסף את הנתיב למערך המתאים למטה.
// ─────────────────────────────────────────────────────────────

export type GalleryCard = {
  slug: string;
  label: string;
};

// כל כרטיסייה מקבלת מוקאפים אמיתיים מ-src/components/gallery/mockups.
// התחומים היצירתיים (נוכחות דיגיטלית / מיתוג) מיוצגים בפס ה-Showcase.
export const GALLERY_CARDS: GalleryCard[] = [
  { slug: "answer", label: "מערכות מענה לעסקים" },
  { slug: "automation", label: "אוטומציות וזרימות עבודה" },
  { slug: "integration", label: "אינטגרציות וכלים" },
  { slug: "custom", label: "פתרונות בהתאמה אישית" },
];

// ─── פס ה-Showcase של המדיה האישית ───
// כרגע מאוכלס בנכסי מותג קיימים כ-PLACEHOLDER כדי שהפס יעבוד ויראה חי.
// TODO(עידן): החלף במדיה שיצרת ב-AI (9:16).

export const SHOWCASE_IMAGES: string[] = [
  "/hero-orb-mobile.png",
  "/portal-gate-mobile.png",
  "/forwho-bg-mobile.png",
  "/about-hero-mobile.png",
  "/packages-banner-mobile.jpg",
];

export type ShowcaseVideo = { src: string; poster?: string };

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  { src: "/packages-banner-mobile.mp4", poster: "/packages-banner-mobile.jpg" },
  { src: "/nothing-falls-portal.mp4", poster: "/nothing-falls-swirl.png" },
];

export const hasShowcaseMedia =
  SHOWCASE_IMAGES.length > 0 || SHOWCASE_VIDEOS.length > 0;
