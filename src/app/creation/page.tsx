import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "יצירה מתוך חיבור | Portal Studio",
  description:
    "חמישה עולמות שאני אוהב, וחמש יצירות שנולדו מהם. כשעובדים מתוך חיבור אמיתי — התוצאה נראית אחרת.",
  alternates: { canonical: "/creation" },
  openGraph: {
    title: "מה שבוער בך, בגודל שמגיע לו",
    description: "חמישה עולמות שאני אוהב, וחמש יצירות שנולדו מהם.",
    type: "article",
    locale: "he_IL",
  },
};

const WORLDS = [
  {
    src: "/creation/chef.jpg",
    world: "בישול",
    alt: "עידן בחולצת שף מפזר מלח גס על סטייק על הגריל",
    line: "לתת לתשוקה את הכלים והעוצמות שמגיעים לה",
  },
  {
    src: "/creation/barca.jpg",
    world: "כדורגל",
    alt: "עידן בחולצת ברצלונה חוגג על הדשא",
    line: "תוצאה גבוהה במאמץ נמוך",
  },
  {
    src: "/creation/sea.jpg",
    world: "ים",
    alt: "עידן מתחת למים, קרני שמש נשברות מלמעלה",
    line: "ליצור תמונות וסרטונים קולנועיים — בלי יום צילום אחד",
  },
  {
    src: "/creation/stage.jpg",
    world: "מוזיקה",
    alt: "עידן שר על במה מול קהל, תאורת ספוט",
    line: "לתת לגרסה הכי טובה לחיות",
  },
  {
    src: "/creation/leo.jpg",
    world: "ליאו",
    alt: "איור בסגנון ספר ילדים של עידן והבן שלו, לצד הצילום המקורי",
    line: "לקחת את מה שאתה הכי אוהב — ולספר איתו סיפור",
  },
] as const;

const NAVY = "#062340";
const CORAL = "#DC5D46";
const STEEL = "#6091B0";
const WHATSAPP_GREEN = "#25D366";

function WorldCard({ w }: { w: (typeof WORLDS)[number] }) {
  return (
    <div>
      <div
        className="relative aspect-4/5 overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#E6D4C6" }}
      >
        <Image
          src={w.src}
          alt={w.alt}
          fill
          sizes="(max-width: 640px) 50vw, 540px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

export default function CreationPage() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ─────────── HERO — this is the frame that gets screenshotted ─────────── */}
        <section className="min-h-[100svh] flex items-center pt-24 pb-20 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* ─ צד הטקסט ─ */}
            <div>
            <Image
              src="/brand/portal-icon.svg"
              alt="Portal Studio"
              width={150}
              height={150}
              priority
              className="w-[92px] sm:w-[120px] md:w-[150px] h-auto mb-7"
            />

            <p
              className="text-[15px] sm:text-[17px] font-display font-semibold tracking-[0.3em] mb-6"
              style={{ color: CORAL }}
            >
              PORTAL STUDIO
            </p>

            <h1
              className="font-display font-black tracking-tight leading-[1.12] max-w-[18ch]"
              style={{ fontSize: "clamp(2.05rem, 4.7vw, 4rem)", color: NAVY }}
            >
              לקחת את מה שבוער בך
              <br />
              ולהפוך אותו למוצר שימושי
            </h1>

            <p
              className="mt-6 font-body leading-relaxed max-w-[44ch]"
              style={{ fontSize: "clamp(1.15rem, 3vw, 2rem)", color: "#374151" }}
            >
              מדיה, אתרים, נוכחות דיגיטלית, וסוכנים חכמים — לעסקים וליוצרים.
            </p>

            </div>

            {/* ─ צד התמונות — שתיים, שתיים, ואחת ממורכזת ─ */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {WORLDS.slice(0, 4).map((w) => (
                <WorldCard key={w.src} w={w} />
              ))}
              <div className="col-span-2 mx-auto w-[calc(50%-8px)]">
                <WorldCard w={WORLDS[4]} />
              </div>
            </div>
            </div>

            {/* ─ הסיום: המשפט, ומתחתיו הכפתור — ברוחב מלא ─ */}
            <div className="mt-10 md:mt-12 flex flex-col items-center text-center gap-4">
              <p
                className="font-body leading-relaxed max-w-[42ch]"
                style={{ fontSize: "clamp(1.1rem, 2.6vw, 1.75rem)", color: "#4b5563" }}
              >
                רוצים לקבל טיפים והדרכות על איך ליצור בעצמכם? כתבו לנו 😊
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-display font-semibold text-white text-[1.05rem]"
                style={{ backgroundColor: STEEL }}
              >
                <WhatsappLogo size={24} weight="fill" color={WHATSAPP_GREEN} />
                בואו נדבר
              </a>
            </div>
          </div>
        </section>

        {/* ─────────── הסיפור ─────────── */}
        <section className="px-6 py-16" style={{ backgroundColor: NAVY }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="font-display font-black tracking-tight leading-tight text-white"
              style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.3rem)" }}
            >
              אף אחת מהתמונות האלה לא אמיתית.
              <br />
              <span style={{ color: CORAL }}>אבל לא זה מה שמעניין.</span>
            </h2>

            <div
              className="mt-7 space-y-5 font-body leading-relaxed text-[1.02rem]"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              <p>
                לקחתי חמישה דברים שאני הכי אוהב — כדורגל, בישול, ים, ליאו ומוזיקה.
                כשאתה מחובר למשהו, אתה יודע איך הוא צריך להיראות. אתה מזהה מתי זה
                עדיין לא זה. אתה יודע מה חסר, גם כשאתה לא יודע להסביר למה.
              </p>
              <p className="text-white font-semibold">
                כשאתה עושה מתוך אהבה זה יוצא הכי טוב. אין מה לעשות.
              </p>
              <p>
                את הדרך שלי לעולם ה-AI התחלתי בדיוק ככה — מתוך חיבור למה שאני אוהב
                לעשות. וזה בדיוק מה שאני עושה היום עם עסקים ועם יוצרים.
              </p>
              <p>
                כי AI לא עושה אף אחד מקצוען. הוא נותן לנו את הכלים, החופש והמקום
                לעשות את מה שאנחנו כבר עושים — הכי טוב שאפשר.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── חמשת העולמות בגדול ─────────── */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h2
              className="font-display font-black tracking-tight mb-10"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: NAVY }}
            >
              חמישה עולמות
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {WORLDS.map((w) => (
                <figure key={w.src} className="group">
                  <div
                    className="relative aspect-4/5 overflow-hidden rounded-2xl"
                    style={{ backgroundColor: "#E6D4C6" }}
                  >
                    <Image
                      src={w.src}
                      alt={w.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p
                      className="font-display font-bold text-sm tracking-wide"
                      style={{ color: CORAL }}
                    >
                      {w.world}
                    </p>
                    <p
                      className="mt-1 font-body leading-relaxed"
                      style={{ color: "#374151" }}
                    >
                      {w.line}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── CTA ─────────── */}
        <section className="px-6 pb-24">
          <div
            className="max-w-5xl mx-auto rounded-3xl px-8 py-14 text-center"
            style={{ backgroundColor: "#F8F0E8", border: "1px solid #E6D4C6" }}
          >
            <h2
              className="font-display font-black tracking-tight leading-tight max-w-[20ch] mx-auto"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.1rem)", color: NAVY }}
            >
              לכל אחד יש דבר אחד כזה.
            </h2>
            <p
              className="mt-4 font-body leading-relaxed max-w-[42ch] mx-auto"
              style={{ color: "#374151" }}
            >
              משהו שהוא עושה כי בא לו, לא כי צריך. משם מתחילים — והיום, הרבה יותר
              קל לגרום לזה לקרות.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display font-semibold text-white"
                style={{ backgroundColor: CORAL }}
              >
                בוא נדבר
                <ArrowLeft size={18} weight="bold" />
              </a>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-display font-semibold"
                style={{ color: NAVY, border: `1px solid ${NAVY}33` }}
              >
                לגלריה
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
