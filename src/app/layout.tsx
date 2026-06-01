import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Studio — סוכני WhatsApp לעסקים וליוצרים",
  description: "סוכני WhatsApp חכמים שעונים, מסננים ומקדמים את העסק שלך — בלי לאבד את הקול האנושי.",
  openGraph: {
    title: "Portal Studio",
    description: "סוכני WhatsApp חכמים לעסקים וליוצרים. אנושי, פשוט, מעצים.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
