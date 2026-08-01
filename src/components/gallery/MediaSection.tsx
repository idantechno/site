"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X, CaretLeft, CaretRight, Play } from "@phosphor-icons/react";
import { MEDIA_IMAGES, MEDIA_VIDEOS } from "@/lib/galleryMedia";

/* ───────────────────── לייטבוקס תמונות (תצוגה מלאה) ───────────────────── */
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

/* ───────────────────── גריד תמונות (masonry) ───────────────────── */
function ImageGrid({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="columns-2 gap-4 md:columns-3 [column-fill:_balance]">
      {MEDIA_IMAGES.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`הגדל תמונה ${i + 1}`}
          className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid"
          style={{ border: "1px solid rgba(6,35,64,0.1)" }}
        >
          <Image
            src={img.src}
            alt="מדיה שנוצרה ב-AI"
            width={img.w}
            height={img.h}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(6,35,64,0.18)" }}
          />
        </button>
      ))}
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

  // הפעל רק כשגוללים לאזור (חוסך רוחב פס)
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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // מרכוז מדויק: הזז את הסרט כך שהתמונת-נושא הפעילה תמיד במרכז
  useEffect(() => {
    const recenter = () => {
      const strip = stripRef.current;
      const thumb = thumbRefs.current[active];
      if (!strip || !thumb) return;
      // getBoundingClientRect כולל את ה-transform הנוכחי => מחשבים דלתא ומוסיפים.
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
    <div ref={sectionRef} className="mt-14">
      <h3 className="font-display font-bold text-xl mb-5" style={{ color: "#062340" }}>
        סרטונים
      </h3>

      {/* נגן ראשי גדול — מסתגל ל-9:16 ול-16:9 */}
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background: "#062340",
          height: "min(68vh, 620px)",
          boxShadow: "0 24px 60px -22px rgba(6,35,64,0.5)",
        }}
      >
        {inView ? (
          <video
            key={current.src}
            src={current.src}
            poster={current.poster}
            className="h-full w-full"
            style={{ objectFit: "contain" }}
            autoPlay
            muted
            playsInline
            controls
            preload="auto"
            onEnded={advance}
          />
        ) : (
          <>
            <Image
              src={current.poster}
              alt="תצוגה מקדימה"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <span
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(220,93,70,0.95)" }}
            >
              <Play size={28} weight="fill" color="#fff" />
            </span>
          </>
        )}
      </div>

      {/* סרט תמונות-נושא — הפעיל תמיד במרכז, והסרט נע */}
      <div ref={stripRef} className="relative mt-4 overflow-hidden py-3">
        <div
          className="flex items-center gap-3 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${trackX}px)`, width: "max-content" }}
        >
          {MEDIA_VIDEOS.map((v, i) => {
            const isActive = i === active;
            const ratio = v.w / v.h;
            const h = isActive ? 138 : 104;
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
                <span
                  className="absolute inset-0 flex items-center justify-center transition-opacity"
                  style={{
                    background: isActive ? "transparent" : "rgba(6,35,64,0.18)",
                    opacity: isActive ? 0 : 1,
                  }}
                >
                  <Play size={20} weight="fill" color="#fff" />
                </span>
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
    <section aria-labelledby="media-heading" className="mt-16">
      <header className="mb-7">
        <p
          className="text-xs font-display font-semibold tracking-[0.18em] uppercase mb-2"
          style={{ color: "#6091B0" }}
        >
          מדיה
        </p>
        <h2
          id="media-heading"
          className="font-display font-black tracking-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "#062340" }}
        >
          יצירה מקורית — תמונות וסרטונים.
        </h2>
      </header>

      {MEDIA_IMAGES.length > 0 && <ImageGrid onOpen={(i) => setPhotoIndex(i)} />}
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
