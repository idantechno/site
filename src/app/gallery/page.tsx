import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "גלריה ודוגמאות | Portal Studio",
  description:
    "דוגמאות לעבודות ופתרונות AI של Portal Studio — נוכחות דיגיטלית, מערכות חכמות והתאמות אישית לעסקים וליוצרים.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <header className="max-w-3xl mb-12">
            <h1
              className="font-display font-black tracking-tight leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#062340" }}
            >
              גלריה
            </h1>
            <p className="mt-5 text-lg font-body leading-relaxed" style={{ color: "#374151" }}>
              עבודות, דוגמאות ומדיה שאנחנו גאים בהם.
            </p>
          </header>

          <GalleryGrid />

          {/* פס המדיה שנוצרה ב-AI — תמונות מתחלפות + סרטונים רצים */}
          <div className="mt-16">
            <GalleryShowcase />
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
