"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { WHATSAPP_URL, NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.6)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled
          ? "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 0 rgba(0,0,0,0.06)"
          : "none",
        transition:
          "background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="font-display font-bold text-xl"
          style={{
            color: scrolled ? "#062340" : "#ffffff",
            transition: "color 0.4s ease",
          }}
        >
          Portal
          <span style={{ color: "#DC5D46" }}>AI</span>
          <span style={{ transition: "color 0.4s ease" }}>studio</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body hover:opacity-70"
                style={{
                  color: scrolled ? "#1a1a2e" : "rgba(255,255,255,0.82)",
                  transition: "color 0.4s ease, opacity 0.2s ease",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button — outline when transparent, filled when scrolled */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-medium active:scale-[0.98]"
          style={{
            backgroundColor: scrolled ? "#DC5D46" : "transparent",
            color: scrolled ? "#ffffff" : "rgba(255,255,255,0.9)",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.4)",
            transition: "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease",
          }}
        >
          שלחו הודעה
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
        >
          {open ? (
            <X size={24} style={{ color: scrolled ? "#062340" : "#ffffff", transition: "color 0.4s ease" }} />
          ) : (
            <List size={24} style={{ color: scrolled ? "#062340" : "#ffffff", transition: "color 0.4s ease" }} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "rgba(6,35,64,0.95)",
            borderColor: scrolled ? "#e5e7eb" : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
          }}
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-body py-1"
                  style={{ color: scrolled ? "#1a1a2e" : "rgba(255,255,255,0.85)" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-5 py-3 rounded-full text-sm font-display font-medium text-white"
                style={{ backgroundColor: "#DC5D46" }}
                onClick={() => setOpen(false)}
              >
                שלחו הודעה
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
