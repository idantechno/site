"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import {
  SHOWCASE_IMAGES,
  SHOWCASE_VIDEOS,
  hasShowcaseMedia,
} from "@/lib/showcase";

const ROTATE_MS = 4000;

function PortraitTile({
  images,
  offset,
  active,
  priority,
}: {
  images: string[];
  offset: number;
  active: number;
  priority?: boolean;
}) {
  const current = (active + offset) % images.length;
  return (
    <div
      className="relative overflow-hidden rounded-2xl aspect-[9/16]"
      style={{
        border: "1px solid rgba(6,35,64,0.1)",
        boxShadow: "0 12px 34px -14px rgba(6,35,64,0.35)",
      }}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="דוגמת מדיה שנוצרה ב-AI"
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          priority={priority && i === current}
        />
      ))}
    </div>
  );
}

export default function GalleryShowcase({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (SHOWCASE_IMAGES.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % SHOWCASE_IMAGES.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, []);

  if (!hasShowcaseMedia) return null;

  const tileCount = compact ? 2 : 3;
  const marqueeVideos = [...SHOWCASE_VIDEOS, ...SHOWCASE_VIDEOS];

  return (
    <section
      aria-labelledby="showcase-heading"
      className="relative overflow-hidden"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className="text-xs font-display font-semibold tracking-[0.18em] uppercase mb-2"
            style={{ color: "#6091B0" }}
          >
            מדיה שיצרנו ב-AI
          </p>
          <h2
            id="showcase-heading"
            className="font-display font-black tracking-tight"
            style={{ fontSize: "clamp(1.4rem, 3.2vw, 2rem)", color: "#062340" }}
          >
            תמונות וסרטונים — יצירה מקורית, לא סטוק.
          </h2>
        </div>
        {compact && (
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-display font-semibold text-sm"
            style={{ color: "#DC5D46" }}
          >
            לגלריה המלאה
            <ArrowLeft size={16} weight="bold" />
          </Link>
        )}
      </div>

      {/* ── תמונות מתחלפות (9:16) ── */}
      {SHOWCASE_IMAGES.length > 0 && (
        <div
          className="grid gap-4 mb-6"
          style={{
            gridTemplateColumns: `repeat(${tileCount}, minmax(0, 1fr))`,
            maxWidth: compact ? 460 : 700,
          }}
        >
          {Array.from({ length: tileCount }).map((_, i) => (
            <PortraitTile
              key={i}
              images={SHOWCASE_IMAGES}
              offset={i * 2}
              active={active}
              priority={!compact}
            />
          ))}
        </div>
      )}

      {/* ── סרטונים רצים (marquee, 9:16) ── */}
      {SHOWCASE_VIDEOS.length > 0 && (
        <div
          className="relative -mx-6 px-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="showcase-marquee-track gap-4 py-1">
            {marqueeVideos.map((v, i) => (
              <div
                key={`${v.src}-${i}`}
                className="relative shrink-0 overflow-hidden rounded-2xl aspect-[9/16]"
                style={{
                  width: compact ? 132 : 160,
                  border: "1px solid rgba(6,35,64,0.1)",
                  boxShadow: "0 12px 34px -14px rgba(6,35,64,0.35)",
                }}
              >
                <video
                  className="h-full w-full object-cover"
                  src={v.src}
                  poster={v.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
