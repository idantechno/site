import type { Metadata } from "next";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpPain from "@/components/lp/LpPain";
import BeforeAfter from "@/components/lp/BeforeAfter";
import LpManifesto from "@/components/lp/LpManifesto";
import LpSteps from "@/components/lp/LpSteps";
import LpStats from "@/components/lp/LpStats";
import PlanQuiz from "@/components/lp/PlanQuiz";
import LpPlans from "@/components/lp/LpPlans";
import LpFAQ from "@/components/lp/LpFAQ";
import LeadForm from "@/components/lp/LeadForm";
import StickyCtaBar from "@/components/lp/StickyCtaBar";
import LpFooter from "@/components/lp/LpFooter";
import LightTrail from "@/components/decorative/LightTrail";

export const metadata: Metadata = {
  title: "Portal Studio | יד נוספת לעסק שלך",
  description:
    "הכול בעסק עובר דרכך? Portal Studio בונה סוכן AI קטן ומדויק שעונה ללקוחות באתר ועוקב אחרי הלידים בשבילך. מתחילים מדבר אחד שעוזר כבר מחר בבוקר. שיחת אבחון בחינם.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "הכול בעסק עובר דרכך. בדיוק שם זה נתקע.",
    description:
      "יד נוספת לעסק: סוכן AI קטן שעונה ללקוחות ועוקב אחרי הלידים בשבילך. באוויר תוך 14 יום.",
    type: "website",
    locale: "he_IL",
  },
};

export default function StartPage() {
  return (
    <main id="main">
      <LpHeader />
      <LpHero />
      <LpPain />
      <BeforeAfter />
      <LpManifesto />
      <LightTrail fromColor="#6091B0" toColor="#DC5D46" />
      <LpSteps />
      <LpStats />
      <PlanQuiz />
      <LightTrail fromColor="#DC5D46" toColor="#6091B0" />
      <LpPlans />
      <LpFAQ />
      <LeadForm />
      <LpFooter />
      <StickyCtaBar />
    </main>
  );
}
