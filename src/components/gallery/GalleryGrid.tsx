"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ImageSquare,
  MagnifyingGlassPlus,
  X,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { GALLERY_CARDS, type GalleryCard } from "@/lib/showcase";

function CoverCard({
  card,
  index,
  onOpen,
}: {
  card: GalleryCard;
  index: number;
  onOpen: (i: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`פתח גלריה: ${card.label} (${card.images.length} תמונות)`}
      className="card-glow group relative block w-full overflow-hidden rounded-2xl aspect-[4/3] text-right"
      style={{ border: "1px solid rgba(6,35,64,0.1)" }}
    >
      <Image
        src={card.images[0]}
        alt={card.label}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {/* hover hint */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(6,35,64,0.28)" }}
      >
        <span
          className="flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold text-sm text-white"
          style={{ background: "rgba(220,93,70,0.95)" }}
        >
          <MagnifyingGlassPlus size={18} weight="bold" />
          פתח גלריה
        </span>
      </div>
      {/* count badge */}
      <span
        className="absolute top-4 left-4 z-10 rounded-full px-2.5 py-1 text-[11px] font-display font-semibold text-white"
        style={{ background: "rgba(6,35,64,0.55)", backdropFilter: "blur(4px)" }}
      >
        {card.images.length} תמונות
      </span>
      {/* label — סקרים כהה וחזק כדי שהכיתוב לעולם לא ייבלע ברקע הבהיר */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4"
        style={{
          paddingTop: "2.75rem",
          background:
            "linear-gradient(to top, rgba(6,35,64,0.97) 0%, rgba(6,35,64,0.92) 34%, rgba(6,35,64,0.5) 66%, transparent 100%)",
        }}
      >
        <span
          className="font-display font-bold text-base text-white"
          style={{ textShadow: "0 1px 5px rgba(0,0,0,0.6)" }}
        >
          {card.label}
        </span>
      </div>
    </button>
  );
}

function PlaceholderCard({ card }: { card: GalleryCard }) {
  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden rounded-2xl aspect-[4/3] p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(96,145,176,0.16), rgba(220,93,70,0.10))",
        border: "1px solid rgba(6,35,64,0.1)",
      }}
    >
      <ImageSquare
        size={40}
        weight="duotone"
        className="absolute top-5 right-5"
        style={{ color: "rgba(6,35,64,0.25)" }}
        aria-hidden="true"
      />
      <span
        className="text-[10px] font-display font-semibold tracking-[0.18em] uppercase mb-1"
        style={{ color: "#DC5D46" }}
      >
        בקרוב
      </span>
      <span className="font-display font-bold text-base" style={{ color: "#062340" }}>
        {card.label}
      </span>
    </div>
  );
}

function Lightbox({
  card,
  imgIndex,
  setImgIndex,
  onClose,
}: {
  card: GalleryCard;
  imgIndex: number;
  setImgIndex: (updater: (i: number) => number) => void;
  onClose: () => void;
}) {
  const count = card.images.length;
  const next = useCallback(
    () => setImgIndex((i) => (i + 1) % count),
    [count, setImgIndex]
  );
  const prev = useCallback(
    () => setImgIndex((i) => (i - 1 + count) % count),
    [count, setImgIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // RTL: חץ שמאל = הבא, חץ ימין = הקודם
      else if (e.key === "ArrowLeft") next();
      else if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`גלריה: ${card.label}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(6,35,64,0.82)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* header */}
      <div className="mb-4 flex w-full max-w-4xl items-center justify-between">
        <span className="font-display font-bold text-lg text-white">
          {card.label}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="סגור גלריה"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* main image + arrows */}
      <div
        className="relative flex w-full max-w-4xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {count > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="תמונה קודמת"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white sm:-right-14"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            <CaretRight size={22} weight="bold" />
          </button>
        )}
        <div
          className="relative w-full overflow-hidden rounded-2xl aspect-[4/3]"
          style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
        >
          <Image
            key={card.images[imgIndex]}
            src={card.images[imgIndex]}
            alt={`${card.label} — ${imgIndex + 1}`}
            fill
            sizes="(max-width: 960px) 92vw, 896px"
            className="object-cover"
            priority
          />
        </div>
        {count > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="תמונה הבאה"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white sm:-left-14"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            <CaretLeft size={22} weight="bold" />
          </button>
        )}
      </div>

      {/* thumbnails */}
      {count > 1 && (
        <div
          className="mt-4 flex max-w-4xl gap-2 overflow-x-auto px-1"
          onClick={(e) => e.stopPropagation()}
        >
          {card.images.map((src, i) => (
            <button
              type="button"
              key={src}
              onClick={() => setImgIndex(() => i)}
              aria-label={`תמונה ${i + 1}`}
              className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all"
              style={{
                outline: i === imgIndex ? "2px solid #DC5D46" : "none",
                opacity: i === imgIndex ? 1 : 0.55,
              }}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const open = (i: number) => {
    setImgIndex(0);
    setActive(i);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GALLERY_CARDS.map((card, i) =>
          card.images.length > 0 ? (
            <CoverCard key={card.slug} card={card} index={i} onOpen={open} />
          ) : (
            <PlaceholderCard key={card.slug} card={card} />
          )
        )}
      </div>

      {active !== null && (
        <Lightbox
          card={GALLERY_CARDS[active]}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
