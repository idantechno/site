"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  X,
  CaretDown,
  EnvelopeSimple,
  Phone,
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  PHONE_URL,
  EMAIL,
  EMAIL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  NAV_LINKS,
} from "@/lib/constants";

type ContactItem = {
  icon: typeof EnvelopeSimple;
  label: string;
  sublabel: string;
  href: string;
  external?: boolean;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: EnvelopeSimple,
    label: "אימייל",
    sublabel: EMAIL,
    href: EMAIL_URL,
  },
  {
    icon: Phone,
    label: "טלפון",
    sublabel: WHATSAPP_DISPLAY,
    href: PHONE_URL,
  },
  {
    icon: WhatsappLogo,
    label: "וואטסאפ",
    sublabel: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: InstagramLogo,
    label: "אינסטגרם",
    sublabel: "@portalstudioai",
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: FacebookLogo,
    label: "פייסבוק",
    sublabel: "Portal Studio",
    href: FACEBOOK_URL,
    external: true,
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contactRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close contact dropdown on outside click + Escape
  useEffect(() => {
    if (!contactOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!contactRef.current?.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(96,145,176,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(6,35,64,0.12)"
          : "1px solid rgba(6,35,64,0.08)",
        boxShadow: scrolled
          ? "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 20px -8px rgba(6,35,64,0.25)"
          : "none",
        transition:
          "background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Image
            src="/brand/portal-icon.png"
            alt="Portal Studio"
            width={40}
            height={40}
            priority
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span
              className="font-display text-lg sm:text-xl font-semibold tracking-tight"
              style={{
                color: scrolled ? "#ffffff" : "#062340",
                transition: "color 0.4s ease",
              }}
            >
              Portal
            </span>
            <span
              className="font-display text-[10px] font-medium tracking-[0.32em] uppercase mt-1"
              style={{
                color: scrolled ? "rgba(255,255,255,0.85)" : "rgba(6,35,64,0.6)",
                transition: "color 0.4s ease",
              }}
            >
              Studio
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body hover:opacity-70"
                style={{
                  color: scrolled ? "rgba(255,255,255,0.92)" : "rgba(6,35,64,0.82)",
                  transition: "color 0.4s ease, opacity 0.2s ease",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Contact dropdown */}
          <li className="relative" ref={contactRef}>
            <button
              onClick={() => setContactOpen((v) => !v)}
              aria-expanded={contactOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-sm font-body hover:opacity-70"
              style={{
                color: scrolled ? "rgba(255,255,255,0.92)" : "rgba(6,35,64,0.82)",
                transition: "color 0.4s ease, opacity 0.2s ease",
              }}
            >
              צור קשר
              <CaretDown
                size={12}
                weight="bold"
                style={{
                  transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-4 w-72 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.98)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    boxShadow:
                      "0 1px 2px rgba(1,20,39,0.06), 0 20px 40px -12px rgba(1,20,39,0.25), 0 0 0 1px rgba(1,20,39,0.06)",
                  }}
                >
                  <div className="py-2">
                    {CONTACT_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          {...(item.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          onClick={() => setContactOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#011427]/5"
                        >
                          <div
                            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: "rgba(220,93,70,0.10)",
                              color: "#DC5D46",
                            }}
                          >
                            <Icon size={18} weight="fill" />
                          </div>
                          <div className="flex flex-col leading-tight text-right">
                            <span
                              className="text-sm font-display font-medium"
                              style={{ color: "#011427" }}
                            >
                              {item.label}
                            </span>
                            <span
                              className="text-xs font-body"
                              style={{ color: "#6091B0" }}
                              dir="ltr"
                            >
                              {item.sublabel}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* CTA button — outline when transparent, filled when scrolled */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-medium active:scale-[0.98]"
          style={{
            backgroundColor: scrolled ? "#DC5D46" : "transparent",
            color: scrolled ? "#ffffff" : "rgba(6,35,64,0.9)",
            border: scrolled ? "none" : "1px solid rgba(6,35,64,0.3)",
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
            <X size={24} style={{ color: scrolled ? "#ffffff" : "#062340", transition: "color 0.4s ease" }} />
          ) : (
            <List size={24} style={{ color: scrolled ? "#ffffff" : "#062340", transition: "color 0.4s ease" }} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: scrolled ? "rgba(96,145,176,0.97)" : "rgba(6,35,64,0.95)",
            borderColor: scrolled ? "rgba(6,35,64,0.12)" : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
          }}
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-body py-1"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Mobile: contact items inline */}
            <li
              className="pt-3 mt-2"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <p
                className="text-[11px] font-display font-medium tracking-[0.2em] uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                צור קשר
              </p>
              <div className="flex flex-col gap-2">
                {CONTACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 py-2"
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: "rgba(220,93,70,0.15)",
                          color: "#DC5D46",
                        }}
                      >
                        <Icon size={16} weight="fill" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span
                          className="text-sm font-display font-medium"
                          style={{ color: "#ffffff" }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-xs font-body"
                          style={{
                            color: "rgba(255,255,255,0.6)",
                          }}
                          dir="ltr"
                        >
                          {item.sublabel}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </li>

            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-5 py-3 rounded-full text-sm font-display font-medium text-white mt-2"
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
