import type { Metadata } from "next";
import Link from "next/link";
import {
  ChatCircleDots,
  Faders,
  Funnel,
  PlugsConnected,
  PenNib,
  ChartLineUp,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "פתרונות AI לניהול עסקים | Portal Studio",
  description:
    "מה מערכת ה-AI של Portal Studio עושה בפועל — מענה ותקשורת, אוטומציה וסדר, סינון לידים, אינטגרציות, תוכן ושיווק וניתוח. פתרונות חכמים שמותאמים אישית לעסק שלך.",
  alternates: { canonical: "/solutions" },
};

const CAPABILITIES = [
  {
    Icon: ChatCircleDots,
    title: "מענה ותקשורת",
    body: "צוות סוכנים שעונה לפניות ולשאלות בשפה ובטון של העסק שלך — וגם עוזרים לנהל את העסק: מייצרים מסמכים, מבצעים פעולות, ודואגים שאף לקוח לא ייפול בין הכיסאות.",
  },
  {
    Icon: Faders,
    title: "אוטומציה וסדר",
    body: "זרימת עבודה אוטומטית: תיעוד, תזכורות, מעקב אחרי לקוחות וחיובים — הכול מסודר במקום אחד שאפשר לסמוך עליו.",
  },
  {
    Icon: Funnel,
    title: "סינון לידים חכם",
    body: "המערכת מזהה מי באמת מתאים לעסק שלך, ומעבירה אליך לשיחה אישית רק את הפניות הרלוונטיות — פחות רעש, יותר עסקאות.",
  },
  {
    Icon: PlugsConnected,
    title: "אינטגרציות",
    body: "חיבור לכלים שכבר בשימוש — יומן, גיליונות, CRM, סליקה וערוצי תקשורת — כך שהכול עובד יחד בלי עבודה כפולה.",
  },
  {
    Icon: PenNib,
    title: "תוכן ושיווק",
    body: "עזרה ביצירת תוכן לרשתות, מענה מהיר ללידים ונוכחות דיגיטלית שמשקפת את הזהות שלך — בלי להישמע גנרי.",
  },
  {
    Icon: ChartLineUp,
    title: "ניתוח ומעקב",
    body: "תמונה ברורה של מה שקורה בעסק — פניות, לקוחות והזדמנויות — כדי שתקבל החלטות על בסיס נתונים, לא תחושות בטן.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <header className="max-w-3xl mb-14">
            <p
              className="text-sm font-display font-medium tracking-widest uppercase mb-3"
              style={{ color: "#6091B0" }}
            >
              הפתרונות שלנו
            </p>
            <h1
              className="font-display font-black tracking-tight leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#062340" }}
            >
              אפשר ללכת לאט ובטוח.
              <br />
              <span style={{ color: "#DC5D46" }}>אנחנו רוצים שתרוץ.</span>
            </h1>
            <p className="mt-5 text-lg font-body leading-relaxed" style={{ color: "#374151" }}>
              Portal Studio — חברה ששמה אותך במרכז ועוטפת אותך במערכות וכלים מבוססי
              בינה מלאכותית שמוציאים ממך את המיטב. אנחנו לוקחים על עצמנו את העבודה
              החוזרת בעסק — מענה, סדר, מעקב ואוטומציה — ומחזירים לך זמן ושליטה. כל
              פתרון נבנה בהתאמה אישית, כדי שירגיש כמוך ולא כמו מכונה.
            </p>
          </header>

          {/* Capabilities grid */}
          <section aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className="sr-only">
              יכולות המערכת
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CAPABILITIES.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="card-glow flex flex-col gap-4 p-7 rounded-2xl bg-white"
                  style={{ border: "1px solid rgba(6,35,64,0.1)" }}
                >
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ backgroundColor: "rgba(96,145,176,0.12)", color: "#6091B0" }}
                  >
                    <Icon size={26} weight="duotone" />
                  </span>
                  <h3 className="font-display font-bold text-lg" style={{ color: "#062340" }}>
                    {title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Human note */}
          <section
            className="mt-16 p-8 sm:p-10 rounded-2xl"
            style={{ backgroundColor: "#062340" }}
          >
            <h2 className="font-display font-bold text-2xl mb-3" style={{ color: "#fff" }}>
              טכנולוגיה שלא מוחקת את האדם
            </h2>
            <p className="font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              אנחנו לא משחילים אותך לתבנית. לפני שבונים שורת קוד אחת, אנחנו לומדים את
              הטון, השפה והערכים של העסק שלך — וההחלטות החשובות תמיד נשארות אצלך. ה-AI
              מרחיב את היכולת שלך, לא מחליף את הקול שמבדל אותך.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/#packages"
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-white text-base"
              style={{ backgroundColor: "#DC5D46" }}
            >
              לחבילות שלנו
              <ArrowLeft size={18} weight="bold" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-display font-medium text-base"
              style={{ color: "#062340", border: "1px solid rgba(6,35,64,0.3)" }}
            >
              בואו נדבר
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
