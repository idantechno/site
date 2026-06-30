"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "portal-cookie-consent"; // "accepted" | "rejected"
const META_PIXEL_ID = "1316824070553371";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    __portalPixelLoaded?: boolean;
  }
}

/** Loads the Meta Pixel only after explicit consent. */
function loadMetaPixel() {
  if (typeof window === "undefined" || window.__portalPixelLoaded) return;
  window.__portalPixelLoaded = true;

  /* eslint-disable */
  // @ts-nocheck — standard Meta Pixel bootstrap snippet
  (function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage unavailable */
    }
    if (stored === "accepted") {
      loadMetaPixel();
    } else if (stored !== "rejected") {
      setVisible(true);
    }
  }, []);

  function choose(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    if (choice === "accepted") loadMetaPixel();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת עוגיות"
      className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          backgroundColor: "rgba(6,35,64,0.97)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 12px 40px -8px rgba(6,35,64,0.5)",
        }}
      >
        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.9)" }}>
          אנחנו משתמשים בעוגיות הכרחיות לתפעול האתר, וכן — בהסכמתך — בעוגיות מדידה
          ושיווק לשיפור החוויה. ניתן לדחות בכל עת. למידע נוסף ראה{" "}
          <Link href="/privacy" className="underline" style={{ color: "#fff" }}>
            מדיניות הפרטיות
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => choose("rejected")}
            className="px-4 py-2.5 rounded-full font-display font-medium text-sm transition-colors"
            style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.35)" }}
          >
            דחיית עוגיות לא הכרחיות
          </button>
          <button
            onClick={() => choose("accepted")}
            className="px-5 py-2.5 rounded-full font-display font-semibold text-sm text-white"
            style={{ backgroundColor: "#DC5D46" }}
          >
            אישור הכל
          </button>
        </div>
      </div>
    </div>
  );
}
