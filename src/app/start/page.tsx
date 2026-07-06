import type { Metadata } from "next";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpPain from "@/components/lp/LpPain";
import BeforeAfter from "@/components/lp/BeforeAfter";
import LpManifesto from "@/components/lp/LpManifesto";
import LpSteps from "@/components/lp/LpSteps";
import LpStats from "@/components/lp/LpStats";
import LpFAQ from "@/components/lp/LpFAQ";
import PortalGateBand from "@/components/lp/PortalGateBand";
import LeadForm from "@/components/lp/LeadForm";
import StickyCtaBar from "@/components/lp/StickyCtaBar";
import LpFooter from "@/components/lp/LpFooter";
import LightTrail from "@/components/decorative/LightTrail";

export const metadata: Metadata = {
  title: "Portal Studio | שקט תפעולי לעסק שלך",
  description:
    "יש דברים בעסק שלא צריכים לחכות לך: פניות, תזכורות, מעקב אחרי לידים. סוכן AI קטן ומדויק מטפל בהם בשבילך. מתחילים מדבר אחד שעוזר כבר מחר בבוקר. שיחת אבחון בחינם.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "העסק מתפקד מצוין גם כשאין לך זמן.",
    description:
      "שקט תפעולי לעסק: סוכן AI קטן שעונה ללקוחות ועוקב אחרי הלידים בשבילך. באוויר תוך 14 יום.",
    type: "website",
    locale: "he_IL",
  },
};

export default function StartPage() {
  return (
    <main id="main">
      {/* מבנה לפי Start with Why: הירו (למה) → כאב (הזדהות) → מניפסט
          (האמונה ולמי אנחנו בונים) → דמו (איך זה נראה) → תהליך → הוכחה */}
      <LpHeader />
      <LpHero />
      <LpPain />
      <LpManifesto />
      <BeforeAfter />
      <LightTrail fromColor="#6091B0" toColor="#DC5D46" />
      <LpSteps />
      <LpStats />
      <LightTrail fromColor="#DC5D46" toColor="#6091B0" />
      <LpFAQ />
      <PortalGateBand />
      <LeadForm />
      <LpFooter />
      <StickyCtaBar />
    </main>
  );
}
