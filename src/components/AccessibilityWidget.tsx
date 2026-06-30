"use client";

import { useEffect, useRef, useState } from "react";
import {
  PersonArmsSpread,
  X,
  Plus,
  Minus,
  CircleHalf,
  Drop,
  LinkSimple,
  TextAa,
  Pause,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";

const STORAGE_KEY = "portal-a11y";
const FONT_STEPS = ["100%", "115%", "130%", "150%"];

type Settings = {
  fontStep: number; // index into FONT_STEPS
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  readable: boolean;
  noMotion: boolean;
};

const DEFAULTS: Settings = {
  fontStep: 0,
  contrast: false,
  grayscale: false,
  links: false,
  readable: false,
  noMotion: false,
};

function apply(s: Settings) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.style.fontSize = FONT_STEPS[s.fontStep] ?? "100%";
  const filter = [s.contrast ? "contrast(1.4)" : "", s.grayscale ? "grayscale(1)" : ""]
    .join(" ")
    .trim();
  html.style.filter = filter;
  html.classList.toggle("a11y-links", s.links);
  html.classList.toggle("a11y-readable", s.readable);
  html.classList.toggle("a11y-no-motion", s.noMotion);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Load saved settings on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = { ...DEFAULTS, ...JSON.parse(raw) } as Settings;
        setSettings(saved);
        apply(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist + apply whenever settings change (after first paint).
  function update(next: Partial<Settings>) {
    setSettings((prev) => {
      const merged = { ...prev, ...next };
      apply(merged);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        /* ignore */
      }
      return merged;
    });
  }

  function changeFont(delta: number) {
    setSettings((prev) => {
      const fontStep = Math.min(FONT_STEPS.length - 1, Math.max(0, prev.fontStep + delta));
      const merged = { ...prev, fontStep };
      apply(merged);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {
        /* ignore */
      }
      return merged;
    });
  }

  function reset() {
    apply(DEFAULTS);
    setSettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  // Close on Escape + focus management.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const toggles: { key: keyof Settings; label: string; Icon: typeof CircleHalf }[] = [
    { key: "contrast", label: "ניגודיות גבוהה", Icon: CircleHalf },
    { key: "grayscale", label: "גווני אפור", Icon: Drop },
    { key: "links", label: "הדגשת קישורים", Icon: LinkSimple },
    { key: "readable", label: "גופן קריא", Icon: TextAa },
    { key: "noMotion", label: "עצירת אנימציות", Icon: Pause },
  ];

  return (
    <div ref={panelRef}>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="תפריט נגישות"
        className="fixed bottom-5 left-5 z-[70] flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#062340" }}
      >
        <PersonArmsSpread size={26} weight="bold" />
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="fixed bottom-20 left-5 z-[70] w-[19rem] max-w-[calc(100vw-2.5rem)] rounded-2xl p-5"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(6,35,64,0.12)",
            boxShadow: "0 20px 50px -12px rgba(6,35,64,0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base" style={{ color: "#062340" }}>
              נגישות
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט נגישות"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-[#062340]/5"
              style={{ color: "#062340" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Font size */}
          <div
            className="flex items-center justify-between mb-3 p-3 rounded-xl"
            style={{ backgroundColor: "rgba(6,35,64,0.04)" }}
          >
            <span className="font-body text-sm" style={{ color: "#062340" }}>
              גודל טקסט
            </span>
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeFont(-1)}
                disabled={settings.fontStep === 0}
                aria-label="הקטנת טקסט"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white disabled:opacity-40"
                style={{ border: "1px solid rgba(6,35,64,0.15)", color: "#062340" }}
              >
                <Minus size={16} weight="bold" />
              </button>
              <span className="font-display text-sm tabular-nums w-6 text-center" style={{ color: "#062340" }}>
                {settings.fontStep + 1}
              </span>
              <button
                type="button"
                onClick={() => changeFont(1)}
                disabled={settings.fontStep === FONT_STEPS.length - 1}
                aria-label="הגדלת טקסט"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white disabled:opacity-40"
                style={{ border: "1px solid rgba(6,35,64,0.15)", color: "#062340" }}
              >
                <Plus size={16} weight="bold" />
              </button>
            </span>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2">
            {toggles.map(({ key, label, Icon }) => {
              const active = settings[key] as boolean;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => update({ [key]: !active } as Partial<Settings>)}
                  aria-pressed={active}
                  className="flex items-center gap-3 p-3 rounded-xl text-right transition-colors"
                  style={{
                    backgroundColor: active ? "#062340" : "rgba(6,35,64,0.04)",
                    color: active ? "#ffffff" : "#062340",
                  }}
                >
                  <Icon size={18} weight={active ? "fill" : "regular"} />
                  <span className="font-body text-sm flex-1">{label}</span>
                  <span
                    className="text-[11px] font-display font-semibold"
                    style={{ opacity: 0.7 }}
                  >
                    {active ? "פעיל" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2.5 rounded-xl font-body text-sm transition-colors hover:bg-[#062340]/5"
            style={{ color: "#DC5D46", border: "1px solid rgba(220,93,70,0.3)" }}
          >
            <ArrowCounterClockwise size={16} />
            איפוס הגדרות
          </button>

          <a
            href="/accessibility"
            className="mt-3 block text-center text-xs font-body underline"
            style={{ color: "rgba(6,35,64,0.6)" }}
          >
            הצהרת הנגישות המלאה
          </a>
        </div>
      )}
    </div>
  );
}
