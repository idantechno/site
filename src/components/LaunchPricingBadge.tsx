// LaunchPricingBadge — תג עדין "מחירי השקה" (מקור אמת: LAUNCH_PRICING).
// המידע מועבר בטקסט, לא בצבע בלבד (נגישות). רכיב פרזנטציה בלבד — עובד
// גם ב-Server וגם ב-Client Components.

import { LAUNCH_PRICING, launchPricingShort } from "@/lib/constants";

export default function LaunchPricingBadge({
  className = "",
  tone = "coral",
}: {
  className?: string;
  tone?: "coral" | "steel";
}) {
  if (!LAUNCH_PRICING.active) return null;

  const color = tone === "steel" ? "#6091B0" : "#DC5D46";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-display font-semibold text-[11px] tracking-wide ${className}`}
      style={{
        color,
        backgroundColor: `${color}14`,
        border: `1px solid ${color}40`,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {LAUNCH_PRICING.badge} · {launchPricingShort()}
    </span>
  );
}
