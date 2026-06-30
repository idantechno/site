import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";

type LegalShellProps = {
  title: string;
  intro?: string;
  /** Show the "last updated" line (default: true). */
  showUpdated?: boolean;
  children: ReactNode;
};

/**
 * Shared layout for long-form legal / content pages
 * (terms, privacy, accessibility, etc.). Provides the site Nav,
 * a readable centered article column, and the Footer.
 */
export default function LegalShell({
  title,
  intro,
  showUpdated = true,
  children,
}: LegalShellProps) {
  return (
    <>
      <Nav />
      <main id="main" className="pt-28 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#062340" }}
            >
              {title}
            </h1>
            {intro && (
              <p className="mt-4 text-lg font-body" style={{ color: "#374151" }}>
                {intro}
              </p>
            )}
            {showUpdated && (
              <p
                className="mt-4 text-sm font-body"
                style={{ color: "rgba(6,35,64,0.55)" }}
              >
                עודכן לאחרונה: {LEGAL_LAST_UPDATED}
              </p>
            )}
          </header>

          <div className="legal-prose">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
