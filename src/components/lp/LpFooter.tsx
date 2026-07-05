// LpFooter — פוטר רזה: שקיפות עסקית ולינקים משפטיים.
// הדליפה היחידה מהעמוד ("לאתר המלא") נמצאת כאן, אחרונה בכוונה.

import Link from "next/link";
import {
  BUSINESS_OWNER_NAME,
  BUSINESS_BRAND,
  BUSINESS_TYPE,
  BUSINESS_NUMBER,
  BUSINESS_ADDRESS,
  EMAIL,
  EMAIL_URL,
} from "@/lib/constants";

export default function LpFooter() {
  return (
    <footer
      className="py-12 pb-28 md:pb-12"
      style={{ backgroundColor: "#062340" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-display font-black text-lg tracking-tight" style={{ color: "rgba(255,255,255,0.9)" }}>
            PORTAL STUDIO
          </p>
          <nav aria-label="קישורים משפטיים" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/terms", label: "תקנון" },
              { href: "/privacy", label: "פרטיות" },
              { href: "/accessibility", label: "הצהרת נגישות" },
              { href: "/", label: "לאתר המלא" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm underline-offset-4 hover:underline"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          {BUSINESS_BRAND} · {BUSINESS_OWNER_NAME} · {BUSINESS_TYPE}{" "}
          {BUSINESS_NUMBER} · {BUSINESS_ADDRESS} ·{" "}
          <a href={EMAIL_URL} className="underline underline-offset-2" dir="ltr">
            {EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
