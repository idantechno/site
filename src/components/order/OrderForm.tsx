"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "@phosphor-icons/react";
import { PLANS, type PlanId } from "@/lib/constants";

type Errors = Partial<Record<"firstName" | "lastName" | "phone" | "email" | "terms", string>>;

const COUNTRIES = ["ישראל", "ארצות הברית", "בריטניה", "צרפת", "גרמניה", "אחר"];
const PLAN_IDS = Object.keys(PLANS) as PlanId[];

export default function OrderForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");
  const [planId, setPlanId] = useState<PlanId>(
    PLAN_IDS.includes(initialPlan as PlanId) ? (initialPlan as PlanId) : "art"
  );
  const plan = PLANS[planId];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("ישראל");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!firstName.trim()) e.firstName = "נא להזין שם פרטי";
    if (!lastName.trim()) e.lastName = "נא להזין שם משפחה";
    if (!/^[0-9+\-\s()]{7,}$/.test(phone.trim())) e.phone = "נא להזין מספר טלפון תקין";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "נא להזין כתובת אימייל תקינה";
    if (!terms) e.terms = "יש לאשר את התקנון ומדיניות הפרטיות כדי להמשיך";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(Object.keys(e)[0])?.focus();
      return;
    }
    setSubmitting(true);

    // הפניה לדף הסליקה המאובטח והמתארח של Grow/Morning.
    // הפרטים מצורפים כפרמטרים לטובת מילוי-מראש (במידה ש-Grow תומך בהם).
    const params = new URLSearchParams({
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      phone: phone.trim(),
      country,
      plan: plan.name,
    });
    const sep = plan.checkoutUrl.includes("?") ? "&" : "?";
    window.location.href = `${plan.checkoutUrl}${sep}${params.toString()}`;
  }

  const fieldClass =
    "w-full rounded-xl px-4 py-3 font-body text-base bg-white outline-none transition-shadow";
  const fieldStyle = { border: "1px solid rgba(6,35,64,0.18)", color: "#1a1a2e" } as const;

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
      {/* ─── Form ─── */}
      <form onSubmit={handleSubmit} noValidate className="order-2 lg:order-1">
        <fieldset className="border-0 p-0 m-0">
          <legend className="font-display text-xl font-bold mb-5" style={{ color: "#062340" }}>
            הפרטים שלך
          </legend>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="firstName" label="שם פרטי" value={firstName} onChange={setFirstName} error={errors.firstName} autoComplete="given-name" className={fieldClass} style={fieldStyle} />
            <Field id="lastName" label="שם משפחה" value={lastName} onChange={setLastName} error={errors.lastName} autoComplete="family-name" className={fieldClass} style={fieldStyle} />
            <Field id="phone" label="טלפון" type="tel" value={phone} onChange={setPhone} error={errors.phone} autoComplete="tel" dir="ltr" className={fieldClass} style={fieldStyle} />
            <Field id="email" label="אימייל" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" dir="ltr" className={fieldClass} style={fieldStyle} />
            <div className="sm:col-span-2">
              <label htmlFor="country" className="block mb-1.5 font-body font-medium" style={{ color: "#062340" }}>
                מדינה
              </label>
              <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" className={fieldClass} style={fieldStyle}>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="mt-6">
            <label htmlFor="terms" className="flex items-start gap-3 cursor-pointer">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                aria-invalid={!!errors.terms}
                aria-describedby={errors.terms ? "terms-error" : undefined}
                className="mt-1 w-5 h-5 flex-shrink-0 accent-[#DC5D46]"
              />
              <span className="font-body text-sm leading-relaxed" style={{ color: "#374151" }}>
                קראתי ואני מאשר/ת את{" "}
                <Link href="/terms" target="_blank" className="underline" style={{ color: "#C24A34" }}>
                  התקנון ותנאי השימוש
                </Link>{" "}
                ואת{" "}
                <Link href="/privacy" target="_blank" className="underline" style={{ color: "#C24A34" }}>
                  מדיניות הפרטיות
                </Link>
                , ואני מעל גיל 18.
              </span>
            </label>
            {errors.terms && (
              <p id="terms-error" role="alert" className="mt-2 text-sm font-body" style={{ color: "#C0392B" }}>
                {errors.terms}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-glow mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-semibold text-white text-base disabled:opacity-60"
            style={{ backgroundColor: "#DC5D46" }}
          >
            {submitting ? "מעבירים לתשלום…" : "המשך לתשלום מאובטח"}
            {!submitting && <ArrowLeft size={18} weight="bold" />}
          </button>

          <p className="mt-3 text-xs font-body text-center" style={{ color: "rgba(6,35,64,0.5)" }}>
            התשלום מתבצע בדף סליקה חיצוני ומאובטח. פרטי האשראי אינם נשמרים אצלנו.
          </p>
        </fieldset>
      </form>

      {/* ─── Order summary ─── */}
      <aside
        className="order-1 lg:order-2 p-6 rounded-2xl bg-white lg:sticky lg:top-24"
        style={{ border: "1px solid rgba(6,35,64,0.1)" }}
        aria-labelledby="summary-heading"
      >
        <h2 id="summary-heading" className="font-display text-lg font-bold mb-4" style={{ color: "#062340" }}>
          סיכום ההזמנה
        </h2>

        {/* Plan selector */}
        <div className="flex gap-2 mb-5" role="group" aria-label="בחירת חבילה">
          {PLAN_IDS.map((id) => {
            const selected = id === planId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPlanId(id)}
                aria-pressed={selected}
                className="flex-1 px-2 py-2 rounded-lg text-xs font-display font-semibold transition-colors"
                style={{
                  backgroundColor: selected ? "#062340" : "rgba(6,35,64,0.05)",
                  color: selected ? "#fff" : "rgba(6,35,64,0.6)",
                }}
              >
                {PLANS[id].name.replace("PORTAL ", "")}
              </button>
            );
          })}
        </div>

        <p className="font-display font-bold text-lg mb-2" style={{ color: "#062340" }}>
          {plan.name}
        </p>
        <p
          className="font-body text-sm mb-4 pb-4"
          style={{ color: "#374151", borderBottom: "1px solid rgba(6,35,64,0.1)" }}
        >
          חבילה בהתאמה אישית. המחיר נקבע לפי היקף העבודה ומוצג לך לאישור לפני התשלום.
        </p>

        <ul className="flex flex-col gap-2.5 font-body text-sm" style={{ color: "#374151" }}>
          {[
            "תיאום אישי של היקף החבילה והמחיר לפני כל חיוב",
            "תשלום בסביבה מאובטחת התואמת תקן PCI-DSS",
            'עוסק פטור — ללא מע"מ',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle size={18} weight="fill" style={{ color: "#6091B0" }} className="flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
  className: string;
  style: React.CSSProperties;
};

function Field({ id, label, value, onChange, error, type = "text", autoComplete, dir, className, style }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1.5 font-body font-medium" style={{ color: "#062340" }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        dir={dir}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        style={style}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-body" style={{ color: "#C0392B" }}>
          {error}
        </p>
      )}
    </div>
  );
}
