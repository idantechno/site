export const WHATSAPP_NUMBER = "972500000000";
export const WHATSAPP_MESSAGE = encodeURIComponent("היי, אני רוצה לקבל אבחון קצר לעסק שלי");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

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
