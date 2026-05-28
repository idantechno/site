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
  { label: "חבילות", href: "#packages" },
  { label: "דמו", href: "#demo" },
  { label: "על הסטודיו", href: "#about" },
];
