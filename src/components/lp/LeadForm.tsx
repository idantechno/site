"use client";

// LeadForm — טופס הליד הסופי: שני שדות בלבד.
// שליחה בונה קישור וואטסאפ עם ההודעה מוכנה מראש, כולל תוצאת השאלון אם יש.

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo, PaperPlaneTilt, ShieldCheck } from "@phosphor-icons/react";
import { WHATSAPP_URL, PLANS, type PlanId } from "@/lib/constants";
import { buildLeadWhatsAppUrl, submitLeadToPortal, trackLpEvent } from "@/lib/lp";
import PortalEcho from "@/components/decorative/PortalEcho";
import SubtleParticles from "@/components/decorative/SubtleParticles";
import AmbientGlow from "@/components/decorative/AmbientGlow";
import MagneticButton from "@/components/lp/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function LeadForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  // מאזינים לתוצאת השאלון
  useEffect(() => {
    function onPlan(e: Event) {
      const detail = (e as CustomEvent<PlanId>).detail;
      if (detail && PLANS[detail]) setPlan(detail);
    }
    window.addEventListener("lp:plan", onPlan);
    return () => window.removeEventListener("lp:plan", onPlan);
  }, []);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "sending" || status === "sent") return;
    const e: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) e.name = "איך קוראים לך?";
    if (!/^[0-9+\-\s()]{7,}$/.test(phone.trim())) e.phone = "נא להזין מספר טלפון תקין";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(Object.keys(e)[0] === "name" ? "lead-name" : "lead-phone")?.focus();
      return;
    }
    trackLpEvent("lp_lead_submit", plan ? { plan } : undefined);
    setStatus("sending");

    // הפנייה נרשמת ישירות במערכת Portal Studio (אותה שיחה כמו הצ'אט באתר).
    // אם המערכת לא זמינה — נפילה רכה לוואטסאפ כדי שהליד לא ילך לאיבוד.
    const ok = await submitLeadToPortal(name, phone, plan);
    if (ok) {
      setStatus("sent");
    } else {
      setStatus("fallback");
      window.open(buildLeadWhatsAppUrl(name, phone, plan), "_blank", "noopener,noreferrer");
    }
  }

  const fieldClass =
    "w-full rounded-2xl px-5 py-4 font-body text-base bg-white outline-none transition-shadow";
  const fieldStyle = { border: "1px solid rgba(6,35,64,0.15)", color: "#1a1a2e" } as const;

  return (
    <section
      ref={ref}
      id="lead"
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: "#F0E1D5" }}
    >
      {/* תמונת השער — הקשת והמדרגות נחשפות כמעט במלואן. שתי מסכות מקוננות:
          אנכית (נמוגה כלפי מעלה) ואופקית (נמוגה לכיוון עמודת הטקסט הימנית),
          כך שהמרכז נשאר דרמטי והטקסט נשאר קריא. שכבת רקע בלבד. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] md:h-[88%] pointer-events-none select-none"
        style={{
          zIndex: 0,
          opacity: 0.85,
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.3) 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.3) 78%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.3) 76%, rgba(0,0,0,0.08) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.3) 76%, rgba(0,0,0,0.08) 100%)",
          }}
        >
        {/* מובייל — גרסה לאורך */}
        <Image
          src="/portal-gate-mobile.png"
          alt=""
          fill
          quality={90}
          loading="eager"
          sizes="100vw"
          className="md:hidden"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
        />
        {/* דסקטופ — גרסה לרוחב */}
        <Image
          src="/portal-gate.png"
          alt=""
          fill
          quality={90}
          loading="eager"
          sizes="100vw"
          className="hidden md:block"
          style={{ objectFit: "cover", objectPosition: "center bottom" }}
        />
        </div>
      </div>

      {/* בוקאנד תנועה — כמו בפתיחה */}
      <SubtleParticles count={12} className="z-[1]" />
      <PortalEcho
        size={640}
        color="#DC5D46"
        baseOpacity={0.1}
        rings={5}
        className="z-0"
        style={{ top: "50%", right: "-280px", transform: "translateY(-50%)" }}
      />
      <AmbientGlow
        color="#6091B0"
        size={460}
        opacity={0.12}
        className="z-0"
        style={{ bottom: "-120px", left: "10%" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 items-center">
          {/* ── טקסט ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p
              className="font-display font-medium text-[11px] tracking-[0.2em] uppercase mb-6"
              style={{ color: "#6091B0" }}
            >
              הצעד הבא
            </p>
            <h2
              className="font-display font-black tracking-tighter leading-[1.05] mb-7"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", color: "#062340" }}
            >
              נשאר צעד אחד
              <br />
              <span style={{ color: "#DC5D46" }}>קטן.</span>
            </h2>
            <p
              className="font-body text-lg leading-relaxed max-w-md mb-6"
              style={{ color: "rgba(6, 35, 64, 0.65)" }}
            >
              שם וטלפון, ואנחנו חוזרים אליך לשיחת אבחון קצרה. מוצאים את
              הדבר האחד שהכי מכביד, ואיך מורידים אותו ממך כבר השבוע. מה
              שיוצא מהשיחה נשאר אצלך, גם אם לא נעבוד יחד.
            </p>
            <ul className="flex flex-col gap-2.5">
              {["בלי התחייבות", "עסק ישראלי רשום", "הפרטים לא עוברים לאף גורם אחר"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 font-body text-sm"
                    style={{ color: "rgba(6, 35, 64, 0.55)" }}
                  >
                    <ShieldCheck size={17} weight="fill" style={{ color: "#6091B0" }} />
                    {item}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* ── הטופס — Double-bezel ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            className="rounded-[2.5rem] p-2"
            style={{
              backgroundColor: "rgba(6, 35, 64, 0.05)",
              border: "1px solid rgba(6, 35, 64, 0.08)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[calc(2.5rem-0.5rem)] px-7 py-9 sm:px-9"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)",
              }}
            >
              {plan && (
                <p
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 font-display font-semibold text-xs"
                  style={{ backgroundColor: "rgba(220, 93, 70, 0.09)", color: "#C24A34" }}
                >
                  מהשאלון: {PLANS[plan].name}
                </p>
              )}

              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block mb-2 font-display font-semibold text-sm"
                    style={{ color: "#062340" }}
                  >
                    שם
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "lead-name-error" : undefined}
                    className={fieldClass}
                    style={fieldStyle}
                  />
                  {errors.name && (
                    <p
                      id="lead-name-error"
                      role="alert"
                      className="mt-1.5 text-sm font-body"
                      style={{ color: "#C0392B" }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block mb-2 font-display font-semibold text-sm"
                    style={{ color: "#062340" }}
                  >
                    טלפון
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    dir="ltr"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                    className={fieldClass}
                    style={fieldStyle}
                  />
                  {errors.phone && (
                    <p
                      id="lead-phone-error"
                      role="alert"
                      className="mt-1.5 text-sm font-body"
                      style={{ color: "#C0392B" }}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className="btn-glow w-full inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-display font-semibold text-white text-base active:scale-[0.98] disabled:opacity-70"
                    style={{ backgroundColor: status === "sent" ? "#1d7a43" : "#DC5D46" }}
                  >
                    {status === "idle" && "לקבל שיחה חוזרת"}
                    {status === "sending" && "שולחים…"}
                    {status === "sent" && "הפרטים אצלנו"}
                    {status === "fallback" && "לקבל שיחה חוזרת"}
                    {status !== "sent" && <PaperPlaneTilt size={18} weight="fill" />}
                  </button>
                </MagneticButton>

                {status === "sent" && (
                  <p className="font-body text-sm text-center" role="status" style={{ color: "#1d7a43" }}>
                    הפנייה נקלטה במערכת שלנו. נחזור אליך לשיחת אבחון קצרה.
                  </p>
                )}
                {status === "fallback" && (
                  <p className="font-body text-sm text-center" role="status" style={{ color: "#C24A34" }}>
                    נפתח לך וואטסאפ עם ההודעה מוכנה. נשאר רק ללחוץ שליחה.
                  </p>
                )}

                <div
                  className="flex items-center gap-3 pt-1"
                  style={{ color: "rgba(6, 35, 64, 0.35)" }}
                >
                  <span className="flex-1 h-px" style={{ backgroundColor: "rgba(6,35,64,0.1)" }} />
                  <span className="font-body text-xs">או</span>
                  <span className="flex-1 h-px" style={{ backgroundColor: "rgba(6,35,64,0.1)" }} />
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLpEvent("lp_whatsapp_click", { source: "lead" })}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 font-display font-semibold text-base active:scale-[0.98]"
                  style={{ color: "#062340", border: "1.5px solid rgba(6, 35, 64, 0.2)" }}
                >
                  <WhatsappLogo size={20} weight="fill" style={{ color: "#25D366" }} />
                  לכתוב לנו ישירות
                </a>

                <p className="font-body text-xs text-center leading-relaxed" style={{ color: "rgba(6,35,64,0.4)" }}>
                  שליחת הפרטים פותחת הודעת וואטסאפ מוכנה מראש. לפרטים על
                  שמירת מידע:{" "}
                  <Link href="/privacy" className="underline underline-offset-2">
                    מדיניות הפרטיות
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
