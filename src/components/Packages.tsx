"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  X,
  MusicNotes,
  Camera,
  FilmSlate,
  ChartLineUp,
} from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/constants";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import PortalEcho from "@/components/decorative/PortalEcho";

type Package = {
  id: string;
  name: string;
  icon: typeof MusicNotes;
  tagline: string;
  description: string[];
  fitForLabel: string;
  fitFor: string[];
  group: "artists" | "business";
};

const packages: Package[] = [
  {
    id: "music",
    name: "MUSIC ARTISTS",
    icon: MusicNotes,
    tagline:
      "לתת למוזיקה שלך להרגיש כמו עולם — לא רק כמו עוד שיר",
    description: [
      "יש רגע שבו אמן מבין שהמוזיקה שלו כבר טובה, אבל משהו בדרך שבה היא מוצגת עדיין לא מעביר את מה שהוא באמת.",
      "החבילה הזאת נבנתה בשביל לקחת את הוייב, האישיות והזהות שלך — ולתרגם אותם לנוכחות דיגיטלית שמרגישה כמוך.",
      "המטרה היא לא רק “להעלות תוכן”, אלא לבנות תחושה. שכשמישהו נכנס לעולם שלך — הוא מרגיש אותו.",
    ],
    fitForLabel: "החבילה מתאימה לאמנים שרוצים:",
    fitFor: [
      "להפוך את הסאונד שלהם לשפה ויזואלית",
      "לבנות נוכחות שמרגישה אמיתית ולא מאולצת",
      "ליצור חיבור עמוק יותר עם הקהל",
      "להיראות מקצועיים בלי לאבד את האותנטיות",
      "להפסיק להרגיש שהם “משחקים את המשחק של הרשתות”",
    ],
    group: "artists",
  },
  {
    id: "photo",
    name: "PHOTOGRAPHERS & VISUAL CREATORS",
    icon: Camera,
    tagline: "לגרום לעבודות שלך לדבר עוד לפני שאתה מסביר אותן",
    description: [
      "העין שלך כבר יודעת לראות דברים אחרת. אבל הרבה פעמים הדיגיטל לא מצליח להעביר את התחושה שיש בעבודות עצמן.",
      "החבילה הזאת נועדה לבנות חלל דיגיטלי שנותן מקום לעבודות לנשום. פחות רעש. יותר נוכחות.",
      "יותר תחושה של גלריה — פחות תחושה של “עמוד אינסטגרם עמוס”.",
    ],
    fitForLabel: "החבילה מתאימה ליוצרים שרוצים:",
    fitFor: [
      "למשוך קהל שמתחבר לאיכות ולא רק למחיר",
      "להציג עבודות בצורה שמרגישה יוקרתית ומדויקת",
      "לבנות זהות ויזואלית חזקה",
      "להפוך את העבודות לחוויה",
      "ליצור רושם מקצועי בלי להרגיש מסחרי מדי",
    ],
    group: "artists",
  },
  {
    id: "actors",
    name: "ACTORS & PERFORMERS",
    icon: FilmSlate,
    tagline: "לבנות נוכחות שממשיכה לדבר גם אחרי שהבמה יורדת",
    description: [
      "אומני במה חיים מרגש, נוכחות ואנרגיה. אבל בעולם הדיגיטלי — הרבה פעמים כל זה הולך לאיבוד.",
      "החבילה הזאת נועדה לקחת את האישיות, הכריזמה והנוכחות שלך — ולתת להן מקום גם מחוץ לבמה, האודישן או ההופעה.",
      "לא כדי “לשווק דמות”. אלא כדי ליצור המשכיות למה שאתה כבר מביא איתך באופן טבעי.",
    ],
    fitForLabel: "החבילה מתאימה לאנשים שרוצים:",
    fitFor: [
      "להיראות מקצועיים מול ליהוקים וסוכנויות",
      "לבנות מותג אישי בלי להרגיש מזויפים",
      "לרכז את כל החומרים שלהם במקום אחד",
      "ליצור חיבור עם קהל גם בין פרויקטים",
      "להרגיש שיש להם בית דיגיטלי אמיתי",
    ],
    group: "artists",
  },
  {
    id: "business",
    name: "CREATIVE BUSINESSES",
    icon: ChartLineUp,
    tagline: "להפוך יצירה לעסק — בלי להרוג את היצירה בדרך",
    description: [
      "הרבה עסקים יצירתיים מרגישים שהם חיים בין שני עולמות: מצד אחד — תשוקה, יצירה ורעיונות. מצד שני — הודעות, לקוחות, כאוס, ניהול והתעסקות בלתי נגמרת.",
      "החבילה הזאת נועדה לעשות סדר בתוך הבלאגן. לא כדי להפוך את העסק ל“קר” או תאגידי — אלא כדי לאפשר ליצירה לקבל מקום יציב לצמוח ממנו.",
      "המטרה היא לבנות מערכת שעובדת בשבילך מאחורי הקלעים, כדי שאתה תוכל להישאר בחלק שאתה באמת אוהב לעשות.",
    ],
    fitForLabel: "החבילה מתאימה לעסקים שרוצים:",
    fitFor: [
      "לעבוד בצורה רגועה ומסודרת יותר",
      "ליצור חוויית לקוח מקצועית ונעימה",
      "לבנות נוכחות שמרגישה ברמה גבוהה",
      "לחסוך זמן ואנרגיה על התנהלות",
      "להרגיש שהעסק סוף סוף “מחזיק את עצמו” יותר טוב",
    ],
    group: "business",
  },
];

const artistPackages = packages.filter((p) => p.group === "artists");
const businessPackage = packages.find((p) => p.group === "business")!;

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string | null>(null);

  const openPkg = packages.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  return (
    <section
      id="packages"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#062340" }}
    >
      {/* ── Decorative life ── */}
      <AmbientGlow
        color="#DC5D46"
        size={520}
        opacity={0.09}
        className="z-0"
        style={{ top: "30%", left: "-180px" }}
      />
      <PortalEcho
        size={560}
        color="#6091B0"
        baseOpacity={0.08}
        rings={4}
        className="z-0"
        style={{ bottom: "10%", right: "-160px" }}
      />

      {/* ── Cinematic banner image ── */}
      <div className="relative w-full overflow-hidden h-[clamp(180px,28vh,320px)] md:h-[clamp(260px,38vh,420px)]">
        <Image
          src="/packages-banner.png"
          alt="הפורטל — השער לעולם הדיגיטלי שלך"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 55%" }}
        />
        {/* Top fade — into previous section */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #062340 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade — into packages content */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, #062340 0%, rgba(6,35,64,0.7) 40%, transparent 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(6,35,64,0.55) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative pb-28 -mt-20 md:-mt-24">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(220,93,70,0.10), transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        {/* ── Main section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <p
            className="text-[11px] font-display font-medium tracking-[0.22em] uppercase mb-4"
            style={{ color: "#DC5D46" }}
          >
            החבילות שלנו
          </p>
          <h2
            className="font-display font-black tracking-tighter leading-none"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "#ffffff",
              letterSpacing: "-0.035em",
            }}
          >
            כל יוצר —
            <br />
            <span style={{ color: "#DC5D46" }}>והעולם הדיגיטלי שלו.</span>
          </h2>
          <p
            className="mt-6 text-base md:text-lg font-body mx-auto"
            style={{ color: "rgba(255,255,255,0.55)", maxWidth: "50ch" }}
          >
            לא חבילה אחת לכולם. כל סוג של אמן זוכה לשפה, לטיפול ולנוכחות
            דיגיטלית שמתאימה לעולם שלו.
          </p>
        </motion.div>

        {/* ── Sub-section: Artists ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 flex items-center gap-4"
        >
          <span
            className="text-[11px] font-display font-medium tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            לאמנים ויוצרים
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          />
        </motion.div>

        {/* Artists grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {artistPackages.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={i}
              inView={inView}
              onOpen={() => setOpenId(pkg.id)}
            />
          ))}
        </div>

        {/* ── Sub-section: Business ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-10 flex items-center gap-4"
        >
          <span
            className="text-[11px] font-display font-medium tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "rgba(96,145,176,0.85)" }}
          >
            לסטודיואים ועסקים יצירתיים
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          />
        </motion.div>

        {/* Business wide card */}
        <BusinessCard pkg={businessPackage} onOpen={() => setOpenId(businessPackage.id)} />
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {openPkg && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenId(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{
              backgroundColor: "rgba(6,35,64,0.78)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                backgroundColor: "#06223D",
                border:
                  openPkg.group === "business"
                    ? "1px solid rgba(96,145,176,0.35)"
                    : "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 80px -20px rgba(0,0,0,0.6)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpenId(null)}
                aria-label="סגירה"
                className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <X size={16} style={{ color: "#ffffff" }} />
              </button>

              <div className="p-8 md:p-10 flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor:
                          openPkg.group === "business"
                            ? "rgba(96,145,176,0.15)"
                            : "rgba(220,93,70,0.12)",
                        border:
                          openPkg.group === "business"
                            ? "1px solid rgba(96,145,176,0.3)"
                            : "1px solid rgba(220,93,70,0.25)",
                      }}
                    >
                      <openPkg.icon
                        size={20}
                        style={{
                          color:
                            openPkg.group === "business"
                              ? "#6091B0"
                              : "#DC5D46",
                        }}
                        weight="duotone"
                      />
                    </div>
                    <span
                      className="text-[11px] font-display font-medium tracking-[0.22em] uppercase"
                      style={{
                        color:
                          openPkg.group === "business"
                            ? "#6091B0"
                            : "#DC5D46",
                      }}
                    >
                      {openPkg.group === "business"
                        ? "לסטודיואים ועסקים יצירתיים"
                        : "לאמנים ויוצרים"}
                    </span>
                  </div>
                  <h3
                    className="font-display font-black tracking-tighter leading-tight"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {openPkg.name}
                  </h3>
                  <p
                    className="font-display font-bold tracking-tight leading-snug"
                    style={{
                      fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
                      color: "#ffffff",
                    }}
                  >
                    {openPkg.tagline}
                  </p>
                </div>

                {/* Description paragraphs */}
                <div className="flex flex-col gap-4">
                  {openPkg.description.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base font-body leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Fit for */}
                <div className="flex flex-col gap-4">
                  <h4
                    className="text-[11px] font-display font-medium tracking-[0.22em] uppercase"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {openPkg.fitForLabel}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {openPkg.fitFor.map((item) => {
                      const accent =
                        openPkg.group === "business" ? "#6091B0" : "#DC5D46";
                      return (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm md:text-base font-body"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          <span
                            className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${accent}26`,
                              border: `1px solid ${accent}4D`,
                            }}
                          >
                            <Check
                              size={11}
                              weight="bold"
                              style={{ color: accent }}
                            />
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA */}
                <div
                  className="pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p
                    className="text-sm font-body"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    מעוניינים בחבילה הזו? בואו נדבר.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-display font-medium transition-all duration-200 active:scale-[0.98] hover:opacity-90"
                    style={{
                      backgroundColor:
                        openPkg.group === "business" ? "#6091B0" : "#DC5D46",
                      color: "#ffffff",
                    }}
                  >
                    שלחו הודעה
                    <ArrowLeft size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Artist card ──
function PackageCard({
  pkg,
  index,
  inView,
  onOpen,
}: {
  pkg: Package;
  index: number;
  inView: boolean;
  onOpen: () => void;
}) {
  const Icon = pkg.icon;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      whileHover={{ y: -4 }}
      className="group relative text-right rounded-2xl p-8 md:p-9 flex flex-col gap-6 cursor-pointer transition-shadow min-h-[420px]"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: "rgba(220,93,70,0.12)",
          border: "1px solid rgba(220,93,70,0.25)",
        }}
      >
        <Icon size={22} style={{ color: "#DC5D46" }} weight="duotone" />
      </div>

      {/* Name — large */}
      <h3
        className="font-display font-black tracking-tighter leading-tight"
        style={{
          fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
          color: "#ffffff",
          letterSpacing: "-0.03em",
        }}
      >
        {pkg.name}
      </h3>

      {/* Tagline — prominent */}
      <p
        className="font-display font-bold tracking-tight leading-snug"
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
          color: "#ffffff",
        }}
      >
        {pkg.tagline}
      </p>

      {/* CTA */}
      <div
        className="mt-auto pt-5 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span
          className="inline-flex items-center gap-2 text-sm font-display font-medium"
          style={{ color: "#DC5D46" }}
        >
          לפירוט החבילה
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
        </span>
      </div>
    </motion.button>
  );
}

// ── Business wide card ──
function BusinessCard({
  pkg,
  onOpen,
}: {
  pkg: Package;
  onOpen: () => void;
}) {
  const Icon = pkg.icon;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ y: -3 }}
      className="group relative w-full text-right rounded-2xl p-8 md:p-10 cursor-pointer transition-shadow overflow-hidden"
      style={{
        backgroundColor: "#06223D",
        border: "1px solid rgba(96,145,176,0.30)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 50px -20px rgba(96,145,176,0.25)",
      }}
    >
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 0% 100%, rgba(96,145,176,0.18), transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "rgba(96,145,176,0.15)",
            border: "1px solid rgba(96,145,176,0.35)",
          }}
        >
          <Icon size={28} style={{ color: "#6091B0" }} weight="duotone" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h3
            className="font-display font-black tracking-tighter leading-tight"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            {pkg.name}
          </h3>
          <p
            className="font-display font-bold tracking-tight leading-snug"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "#ffffff",
            }}
          >
            {pkg.tagline}
          </p>
        </div>

        {/* CTA */}
        <span
          className="inline-flex items-center justify-center gap-2 text-sm font-display font-medium px-5 py-3 rounded-full whitespace-nowrap self-start md:self-center transition-all"
          style={{
            color: "#ffffff",
            backgroundColor: "rgba(96,145,176,0.15)",
            border: "1px solid rgba(96,145,176,0.4)",
          }}
        >
          לפירוט החבילה
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
        </span>
      </div>
    </motion.button>
  );
}
