import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Portal Studio — מערכת AI לניהול עסקים",
  description:
    "Portal Studio — מערכת חכמה מבוססת בינה מלאכותית לניהול העסק שלך, במנוי. פשוט, אנושי ומעצים.",
  openGraph: {
    title: "Portal Studio",
    description: "מערכת AI לניהול עסקים. פשוט, אנושי, מעצים.",
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
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          דילוג לתוכן הראשי
        </a>
        <JsonLd />
        {children}
        <AccessibilityWidget />
        <CookieConsent />
        {/* Portal Studio chat widget */}
        <Script
          id="portal-widget"
          src="https://app.portalstudio.co.il/widget.js"
          strategy="afterInteractive"
          data-public-key="GIcgPI08bMIXBPHhis6p9b72"
          data-api-origin="https://api.portalstudio.co.il"
          data-locale="he"
          data-title="צ'אט עם Portal Studio"
        />
      </body>
    </html>
  );
}
