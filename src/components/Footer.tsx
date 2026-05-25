import { WHATSAPP_URL, NAV_LINKS } from "@/lib/constants";
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
          <a href="/" className="font-display font-bold text-lg" style={{ color: "#ffffff" }}>
            Portal<span style={{ color: "#DC5D46" }}>AI</span>studio
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
            © 2025 PortalAIstudio
          </p>
        </div>
      </div>
    </footer>
  );
}
