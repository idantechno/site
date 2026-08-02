"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X, CaretLeft, CaretRight, Play } from "@phosphor-icons/react";
import { MEDIA_IMAGES, MEDIA_VIDEOS } from "@/lib/galleryMedia";

/* ───────────────────── לייטבוקס תמונות (איכות מלאה) ───────────────────── */
function PhotoLightbox({
  index,
  setIndex,
  onClose,
}: {
  index: number;
  setIndex: (u: (i: number) => number) => void;
  onClose: () => void;
}) {
  const count = MEDIA_IMAGES.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count, setIndex]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count, setIndex]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const img = MEDIA_IMAGES[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="תצוגת תמונה"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(6,35,64,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="סגור"
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
        style={{ background: "rgba(255,255,255,0.14)" }}
      >
        <X size={22} weight="bold" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="הקודם"
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-white sm:right-8"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            <CaretRight size={24} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="הבא"
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-white sm:left-8"
            style={{ background: "rgba(255,255,255,0.16)" }}
          >
            <CaretLeft size={24} weight="bold" />
          </button>
        </>
      )}
      <div
        className="relative flex items-center justify-center"
        style={{ maxWidth: "92vw", maxHeight: "86vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={img.src}
          src={img.src}
          alt="מדיה שנוצרה ב-AI"
          width={img.w}
          height={img.h}
          sizes="92vw"
          className="h-auto w-auto rounded-xl"
          style={{ maxWidth: "92vw", maxHeight: "86vh", objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}

/* ───────────────────── סרט תמונות אופקי (ניווט בחצים) ───────────────────── */
function ScrollArrow({
  side,
  onClick,
}: {
  side: "right" | "left";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "right" ? "הקודם" : "הבא"}
      className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
      style={{
        [side]: 8,
        background: "rgba(6,35,64,0.82)",
        boxShadow: "0 6px 18px -6px rgba(6,35,64,0.6)",
      }}
    >
      {side === "right" ? (
        <CaretRight size={22} weight="bold" />
      ) : (
        <CaretLeft size={22} weight="bold" />
      )}
    </button>
  );
}

function ImageStrip({ onOpen }: { onOpen: (i: number) => void }) {
  const H = 224;
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollByDir = (dir: number) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={scrollRef}
        dir="ltr"
        className="no-scrollbar flex gap-4 overflow-x-auto px-1 py-5"
      >
        {MEDIA_IMAGES.map((img, i) => {
          const ratio = img.w / img.h;
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`הגדל תמונה ${i + 1}`}
              className="group relative shrink-0 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.05]"
              style={{
                height: H,
                width: H * ratio,
                border: "1px solid rgba(6,35,64,0.1)",
                boxShadow: "0 10px 26px -14px rgba(6,35,64,0.4)",
              }}
            >
              <Image
                src={img.src}
                alt="מדיה שנוצרה ב-AI"
                fill
                sizes="400px"
                className="object-cover"
              />
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "rgba(6,35,64,0.12)" }}
              />
            </button>
          );
        })}
      </div>
      {/* חצי ניווט — צד ימין (הקודם) וצד שמאל (הבא) */}
      <ScrollArrow side="right" onClick={() => scrollByDir(1)} />
      <ScrollArrow side="left" onClick={() => scrollByDir(-1)} />
    </div>
  );
}

/* ───────────────────── נגן וידאו + סרט תמונות-נושא ───────────────────── */
function VideoStage() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [trackX, setTrackX] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // טען/נגן רק כשגוללים לאזור
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // מרכוז מדויק של הסרטון הפעיל (עמיד ל-RTL)
  useEffect(() => {
    const recenter = () => {
      const strip = stripRef.current;
      const thumb = thumbRefs.current[active];
      if (!strip || !thumb) return;
      const s = strip.getBoundingClientRect();
      const t = thumb.getBoundingClientRect();
      const delta = s.left + s.width / 2 - (t.left + t.width / 2);
      setTrackX((prev) => prev + delta);
    };
    const raf = requestAnimationFrame(recenter);
    window.addEventListener("resize", recenter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recenter);
    };
  }, [active]);

  const advance = () => setActive((a) => (a + 1) % MEDIA_VIDEOS.length);
  const current = MEDIA_VIDEOS[active];

  return (
    <div ref={sectionRef} className="mt-12">
      {/* נגן ראשי — מתאים לרוחב (16:9), בלי שום שליטה */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "16 / 9",
          background: "rgba(6,35,64,0.30)",
          boxShadow: "0 24px 60px -22px rgba(6,35,64,0.5)",
        }}
      >
        {inView ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            className="h-full w-full"
            style={{ objectFit: "contain", pointerEvents: "none" }}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onEnded={advance}
          />
        ) : (
          <Image
            src={current.poster}
            alt="תצוגה מקדימה"
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        )}
      </div>

      {/* סרט תמונות-נושא — הפעיל תמיד במרכז; מימין שהוצגו, משמאל הבאים */}
      <div ref={stripRef} className="relative mt-4 overflow-hidden py-3">
        <div
          className="flex items-center gap-3 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${trackX}px)`, width: "max-content" }}
        >
          {MEDIA_VIDEOS.map((v, i) => {
            const isActive = i === active;
            const ratio = v.w / v.h;
            const h = isActive ? 128 : 92;
            return (
              <button
                key={v.src}
                ref={(el) => { thumbRefs.current[i] = el; }}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`נגן סרטון ${i + 1}`}
                aria-current={isActive}
                className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-500"
                style={{
                  height: h,
                  width: h * ratio,
                  outline: isActive ? "3px solid #DC5D46" : "none",
                  outlineOffset: 2,
                  opacity: isActive ? 1 : 0.5,
                  boxShadow: isActive ? "0 14px 30px -10px rgba(6,35,64,0.55)" : "none",
                }}
              >
                <Image src={v.poster} alt="" fill sizes="240px" className="object-cover" />
                {!isActive && (
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(6,35,64,0.18)" }}
                  >
                    <Play size={18} weight="fill" color="#fff" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── האזור המלא ───────────────────── */
export default function MediaSection() {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  if (MEDIA_IMAGES.length === 0 && MEDIA_VIDEOS.length === 0) return null;

  return (
    <section aria-label="מדיה" className="mt-16">
      {MEDIA_IMAGES.length > 0 && <ImageStrip onOpen={(i) => setPhotoIndex(i)} />}
      {MEDIA_VIDEOS.length > 0 && <VideoStage />}

      {photoIndex !== null && (
        <PhotoLightbox
          index={photoIndex}
          setIndex={setPhotoIndex as (u: (i: number) => number) => void}
          onClose={() => setPhotoIndex(null)}
        />
      )}
    </section>
  );
}
