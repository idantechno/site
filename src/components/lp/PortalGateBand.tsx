// PortalGateBand — רצועת תמונת השער בין ה-FAQ לטופס: הקשת, המדרגות והאור.
// פייד לקרם למעלה ולמטה כדי שתשב טבעי בין הסקשנים. בלי טקסט — רגע של אווירה
// רגע לפני השארת הפרטים.

import Image from "next/image";

export default function PortalGateBand() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden h-[340px] sm:h-[440px] lg:h-[560px] pointer-events-none select-none"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      {/* מובייל — גרסה לאורך */}
      <Image
        src="/portal-gate-mobile.png"
        alt=""
        fill
        quality={90}
        loading="eager"
        sizes="100vw"
        className="md:hidden"
        style={{ objectFit: "cover", objectPosition: "center 65%", opacity: 0.62 }}
      />
      {/* דסקטופ — גרסה לרוחב */}
      <Image
        src="/portal-gate.png"
        alt=""
        fill
        quality={90}
        loading="eager"
        sizes="100vw"
        className="hidden md:block"
        style={{ objectFit: "cover", objectPosition: "center 70%", opacity: 0.62 }}
      />
      {/* פייד לקרם למעלה, ופייד תחתון עדין בלבד — שהמדרגה התחתונה
          תישאר גלויה ותוביל ישר אל טופס השארת הפרטים שמתחת */}
      <div
        className="absolute inset-x-0 top-0 h-[28%]"
        style={{ background: "linear-gradient(to bottom, #F0E1D5, rgba(240,225,213,0))" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[10%]"
        style={{ background: "linear-gradient(to top, #F0E1D5, rgba(240,225,213,0))" }}
      />
    </section>
  );
}
