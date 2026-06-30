import type { Metadata } from "next";
import Link from "next/link";
import { ImageSquare, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "גלריה ודוגמאות | Portal Studio",
  description:
    "דוגמאות לעבודות ופתרונות AI של Portal Studio — נוכחות דיגיטלית, מערכות חכמות והתאמות אישית לעסקים וליוצרים.",
  alternates: { canonical: "/gallery" },
};

const PLACEHOLDERS = [
  "נוכחות דיגיטלית ליוצרים",
  "מערכות מענה לעסקים",
  "אוטומציות וזרימות עבודה",
  "מיתוג ועיצוב דיגיטלי",
  "אינטגרציות וכלים",
  "פתרונות בהתאמה אישית",
];

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <header className="max-w-3xl mb-12">
            <p
              className="text-sm font-display font-medium tracking-widest uppercase mb-3"
              style={{ color: "#6091B0" }}
            >
              גלריה
            </p>
            <h1
              className="font-display font-black tracking-tight leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#062340" }}
            >
              עבודות ודוגמאות — בקרוב כאן.
            </h1>
            <p className="mt-5 text-lg font-body leading-relaxed" style={{ color: "#374151" }}>
              אנחנו אוספים מבחר עבודות, מקרי לקוח ודוגמאות לפתרונות שבנינו. בינתיים —
              מוזמן לראות את התחומים שאנחנו עובדים בהם, ולפנות אלינו לדוגמאות רלוונטיות
              לעסק שלך.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDERS.map((label) => (
              <div
                key={label}
                className="relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[4/3] p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(96,145,176,0.16), rgba(220,93,70,0.10))",
                  border: "1px solid rgba(6,35,64,0.1)",
                }}
              >
                <ImageSquare
                  size={40}
                  weight="duotone"
                  className="absolute top-5 right-5"
                  style={{ color: "rgba(6,35,64,0.25)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] font-display font-semibold tracking-[0.18em] uppercase mb-1"
                  style={{ color: "#DC5D46" }}
                >
                  בקרוב
                </span>
                <span className="font-display font-bold text-base" style={{ color: "#062340" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <section className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold text-white text-base"
              style={{ backgroundColor: "#DC5D46" }}
            >
              בקש דוגמאות לעסק שלך
              <ArrowLeft size={18} weight="bold" />
            </a>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-display font-medium text-base"
              style={{ color: "#062340", border: "1px solid rgba(6,35,64,0.3)" }}
            >
              מה המערכת עושה
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
