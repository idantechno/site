import type { Metadata } from "next";
import Script from "next/script";
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

const META_PIXEL_ID = "1316824070553371";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-full flex flex-col">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
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
