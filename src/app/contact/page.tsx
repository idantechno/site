import type { Metadata } from "next";
import {
  EnvelopeSimple,
  WhatsappLogo,
  MapPin,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  BUSINESS_OWNER_NAME,
  BUSINESS_TYPE,
  BUSINESS_NUMBER,
  BUSINESS_ADDRESS,
  EMAIL,
  EMAIL_URL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "צור קשר | Portal Studio",
  description:
    "דרכי יצירת קשר עם Portal Studio — אימייל, וואטסאפ, כתובת בית העסק ופרטי העוסק. נשמח לעמוד לרשותך.",
  alternates: { canonical: "/contact" },
};

const CARDS = [
  {
    Icon: EnvelopeSimple,
    label: "אימייל",
    value: EMAIL,
    href: EMAIL_URL,
    external: false,
  },
  {
    Icon: WhatsappLogo,
    label: "וואטסאפ / טלפון",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#062340" }}
            >
              דברו איתנו
            </h1>
            <p className="mt-4 text-lg font-body" style={{ color: "#374151" }}>
              נשמח לענות על כל שאלה ולעזור לך להתחיל. אפשר לפנות אלינו בכל אחת
              מהדרכים הבאות.
            </p>
          </header>

          {/* Contact methods */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {CARDS.map(({ Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="card-glow flex items-center gap-4 p-5 rounded-2xl bg-white"
                style={{ border: "1px solid rgba(6,35,64,0.1)" }}
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "rgba(220,93,70,0.1)", color: "#DC5D46" }}
                >
                  <Icon size={24} weight="fill" />
                </span>
                <span className="flex flex-col">
                  <span
                    className="font-display font-semibold text-base"
                    style={{ color: "#062340" }}
                  >
                    {label}
                  </span>
                  <span className="font-body text-sm" style={{ color: "#6091B0" }} dir="ltr">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Business / address details */}
          <section
            className="p-6 sm:p-8 rounded-2xl bg-white"
            style={{ border: "1px solid rgba(6,35,64,0.1)" }}
            aria-labelledby="business-details-heading"
          >
            <h2
              id="business-details-heading"
              className="font-display text-xl font-bold mb-5 flex items-center gap-2"
              style={{ color: "#062340" }}
            >
              <MapPin size={22} weight="fill" style={{ color: "#DC5D46" }} />
              פרטי בית העסק
            </h2>
            <dl className="font-body text-base leading-relaxed" style={{ color: "#1a1a2e" }}>
              <div className="flex gap-2 py-1.5">
                <dt className="font-semibold min-w-28" style={{ color: "#062340" }}>
                  שם העסק:
                </dt>
                <dd>
                  {BUSINESS_OWNER_NAME} ({BUSINESS_TYPE})
                </dd>
              </div>
              <div className="flex gap-2 py-1.5">
                <dt className="font-semibold min-w-28" style={{ color: "#062340" }}>
                  מספר עוסק:
                </dt>
                <dd dir="ltr">{BUSINESS_NUMBER}</dd>
              </div>
              <div className="flex gap-2 py-1.5">
                <dt className="font-semibold min-w-28" style={{ color: "#062340" }}>
                  כתובת:
                </dt>
                <dd>{BUSINESS_ADDRESS}</dd>
              </div>
            </dl>

            {/* Social */}
            <div
              className="mt-6 pt-6 flex items-center gap-4"
              style={{ borderTop: "1px solid rgba(6,35,64,0.1)" }}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portal Studio באינסטגרם"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-[#062340]/5"
                style={{ color: "#062340" }}
              >
                <InstagramLogo size={22} weight="fill" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portal Studio בפייסבוק"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-[#062340]/5"
                style={{ color: "#062340" }}
              >
                <FacebookLogo size={22} weight="fill" />
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
