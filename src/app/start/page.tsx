import type { Metadata } from "next";
import LpHeader from "@/components/lp/LpHeader";
import LpHero from "@/components/lp/LpHero";
import LpPain from "@/components/lp/LpPain";
import BeforeAfter from "@/components/lp/BeforeAfter";
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
  title: "Portal Studio | העסק שלך עונה ללקוחות, גם כשישנת",
  description:
    "מערכת חכמה שעונה לפניות בוואטסאפ וקובעת תורים בשבילך, בקול שלך ובסגנון שלך. באוויר תוך 14 יום. שיחת אבחון קצרה בחינם, בלי התחייבות.",
  alternates: { canonical: "/start" },
  openGraph: {
    title: "העסק שלך עונה ללקוחות. גם כשישנת.",
    description:
      "מערכת AI לעסקים קטנים שעונה, מתאמת ומסננת בשבילך. באוויר תוך 14 יום.",
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
