import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PortalAIstudio — סוכני WhatsApp לעסקים יצירתיים",
  description: "סוכני WhatsApp חכמים שעונים, מסננים ומקדמים את העסק שלך — בלי לאבד את הקול האנושי.",
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
