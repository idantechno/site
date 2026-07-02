import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  WhatsappLogo,
  EnvelopeSimple,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER, EMAIL, EMAIL_URL, WHATSAPP_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "התשלום התקבל — תודה! | Portal Studio",
  description:
    "התשלום התקבל בהצלחה. הנה הצעדים הבאים כדי להפעיל את מערכת Portal Studio ולהתחיל לעבוד.",
  alternates: { canonical: "/thank-you" },
  // דף פנימי שמגיעים אליו רק אחרי תשלום — לא נדרש אינדוקס במנועי חיפוש.
  robots: { index: false, follow: false },
};

// הודעת וואטסאפ ייעודית להפעלה לאחר תשלום.
const WHATSAPP_ACTIVATION_MSG = encodeURIComponent(
  "היי! השלמתי תשלום עבור Portal Studio ואני רוצה להתחיל 🙌"
);
const WHATSAPP_ACTIVATION_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_ACTIVATION_MSG}`;

const STEPS = [
  {
    title: "הקבלה בדרך למייל",
    body: "קבלה על התשלום נשלחת אוטומטית לכתובת האימייל שהזנת. אם היא לא הגיעה תוך כמה דקות, כדאי לבדוק גם בתיקיית הספאם.",
  },
  {
    title: "יוצרים קשר להפעלה",
    body: "כדי שנפעיל עבורך את המערכת ונמסור לך את פרטי הכניסה, צור איתנו קשר בוואטסאפ בלחיצה על הכפתור למטה. נחזור אליך בהקדם עם כל מה שצריך.",
  },
  {
    title: "מתחילים לעבוד",
    body: "לאחר ההפעלה נלווה אותך בהקמה הראשונית ובהתאמת הסוכנים לעסק שלך, כדי שתתחיל להשתמש במערכת במהירות.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <header className="text-center mb-12">
            <span
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: "rgba(96,145,176,0.12)", color: "#6091B0" }}
            >
              <CheckCircle size={48} weight="fill" />
            </span>
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#062340" }}
            >
              התשלום התקבל בהצלחה 🎉
            </h1>
            <p className="mt-4 text-lg font-body" style={{ color: "#374151" }}>
              תודה שהצטרפת ל-Portal Studio! קיבלנו את התשלום, ואנחנו כאן כדי לעזור לך
              להתחיל. הנה מה שקורה עכשיו.
            </p>
          </header>

          {/* Next steps */}
          <ol className="flex flex-col gap-4 mb-10">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                style={{ border: "1px solid rgba(6,35,64,0.1)" }}
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 font-display font-bold"
                  style={{ backgroundColor: "#062340", color: "#fff" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span
                    className="font-display font-semibold text-base mb-1"
                    style={{ color: "#062340" }}
                  >
                    {step.title}
                  </span>
                  <span className="font-body text-sm leading-relaxed" style={{ color: "#374151" }}>
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          {/* Primary CTA — WhatsApp activation */}
          <a
            href={WHATSAPP_ACTIVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-display font-semibold text-white text-lg"
            style={{ backgroundColor: "#DC5D46" }}
          >
            <WhatsappLogo size={24} weight="fill" />
            פתיחת וואטסאפ להפעלת המערכת
          </a>

          {/* Secondary contact + back home */}
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 font-body text-sm underline"
              style={{ color: "#6091B0" }}
              dir="ltr"
            >
              <EnvelopeSimple size={18} weight="fill" />
              {EMAIL}
            </a>
            <p className="font-body text-xs" style={{ color: "rgba(6,35,64,0.5)" }}>
              אפשר גם בוואטסאפ / טלפון: <span dir="ltr">{WHATSAPP_DISPLAY}</span>
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-1.5 font-body text-sm"
              style={{ color: "#062340" }}
            >
              חזרה לעמוד הבית
              <ArrowLeft size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
