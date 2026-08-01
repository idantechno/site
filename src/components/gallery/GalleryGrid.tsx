"use client";

import { useEffect, useState } from "react";
import { GALLERY_CARDS, type GalleryCard } from "@/lib/showcase";
import { MOCKUPS } from "./mockups";

const ROTATE_MS = 4500;

function LiveTile({
  card,
  mockups,
  index,
}: {
  card: GalleryCard;
  mockups: React.FC[];
  index: number;
}) {
  const [active, setActive] = useState(0);
  const count = mockups.length;

  useEffect(() => {
    if (count < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const start = window.setTimeout(
      () => setActive((a) => (a + 1) % count),
      (index % 3) * 1100
    );
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % count),
      ROTATE_MS
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [count, index]);

  return (
    <div
      className="card-glow relative overflow-hidden rounded-2xl aspect-[4/3]"
      style={{ border: "1px solid rgba(6,35,64,0.1)", containerType: "inline-size" }}
    >
      {mockups.map((Mockup, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Mockup />
        </div>
      ))}

      {/* label overlay */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 p-5"
        style={{
          background:
            "linear-gradient(to top, rgba(6,35,64,0.88) 0%, rgba(6,35,64,0.4) 55%, transparent 100%)",
        }}
      >
        <span className="font-display font-bold text-base text-white">
          {card.label}
        </span>
      </div>

      {/* dot indicators */}
      {count > 1 && (
        <div className="absolute top-4 left-4 z-10 flex gap-1.5">
          {mockups.map((_, i) => (
            <span
              key={i}
              className="block h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === active ? 14 : 6,
                backgroundColor:
                  i === active ? "#DC5D46" : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {GALLERY_CARDS.map((card, i) => {
        const mockups = MOCKUPS[card.slug];
        if (!mockups || mockups.length === 0) return null;
        return (
          <LiveTile key={card.slug} card={card} mockups={mockups} index={i} />
        );
      })}
    </div>
  );
}
