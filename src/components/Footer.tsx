import Image from "next/image";
import { WhatsappLogo, FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  NAV_LINKS,
} from "@/lib/constants";
import PortalEcho from "@/components/decorative/PortalEcho";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#062340", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Faint portal echo — bottom right, barely visible */}
      <PortalEcho
        size={380}
        color="#F2A541"
        baseOpacity={0.04}
        rings={3}
        style={{ bottom: "-100px", left: "-60px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/brand/portal-icon.png"
              alt="Portal Studio"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-lg font-semibold tracking-tight"
                style={{ color: "#ffffff" }}
              >
                Portal
              </span>
              <span
                className="font-display text-[10px] font-medium tracking-[0.32em] uppercase mt-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Studio
              </span>
            </div>
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body transition-opacity hover:opacity-60"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body transition-opacity hover:opacity-60"
              style={{ color: "#DC5D46" }}
            >
              שיחת אפיון
            </a>
          </nav>

          <p className="text-xs font-body" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 Portal Studio
          </p>
        </div>

        {/* ─── Contact row ─── */}
        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Phone → WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`וואטסאפ ${WHATSAPP_DISPLAY}`}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <WhatsappLogo
              size={22}
              weight="fill"
              style={{ color: "#DC5D46" }}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-sm font-body tracking-wide" dir="ltr">
              {WHATSAPP_DISPLAY}
            </span>
          </a>

          {/* Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portal Studio בפייסבוק"
            className="group flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <FacebookLogo
              size={22}
              weight="fill"
              className="transition-transform group-hover:scale-110"
            />
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portal Studio באינסטגרם"
            className="group flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <InstagramLogo
              size={22}
              weight="fill"
              className="transition-transform group-hover:scale-110"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
