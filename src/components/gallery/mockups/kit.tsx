import type { CSSProperties, ReactNode } from "react";

// פלטת המותג
export const C = {
  navy: "#062340",
  coral: "#DC5D46",
  steel: "#6091B0",
  cream: "#F0E1D5",
  teal: "#2FB7A4",
  amber: "#F2A541",
  ink: "#1a1a2e",
  mut: "#6b7280",
  line: "#EAF1F6",
};

// כל היחידות ב-cqw => המוקאפ מתכווץ/מתרחב כמו צילום מסך יחד עם הכרטיסייה.
export function q(n: number) {
  return `${n}cqw`;
}

/** רקע הקרם + ריפוד — העוטף החיצוני של כל מוקאפ. */
export function Stage({
  children,
  pad = 6,
  style,
}: {
  children: ReactNode;
  pad?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg,#FBF4EE,#EFDFD2)",
        display: "flex",
        padding: q(pad),
        fontFamily: "'Heebo','Alef',system-ui,sans-serif",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** חלון לבן עם פינות מעוגלות וצל — גוף המוקאפ. */
export function Panel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: q(3.5),
        boxShadow: "0 2cqw 5cqw -2.5cqw rgba(6,35,64,.32)",
        overflow: "hidden",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** פס כותרת כהה עם כותרת ואופציונלי תג. */
export function TitleBar({
  title,
  badge,
  badgeBg = C.coral,
}: {
  title: string;
  badge?: string;
  badgeBg?: string;
}) {
  return (
    <div
      style={{
        background: C.navy,
        padding: `${q(2.6)} ${q(3.2)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: q(2),
      }}
    >
      <span style={{ color: "#fff", fontSize: q(3.5), fontWeight: 700 }}>
        {title}
      </span>
      {badge && (
        <span
          style={{
            background: badgeBg,
            color: "#fff",
            fontSize: q(2.7),
            fontWeight: 700,
            padding: `${q(0.8)} ${q(2.2)}`,
            borderRadius: q(2.4),
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/** עיגול ראשי-תיבות (אווטר). */
export function Avatar({
  label,
  bg = C.steel,
  size = 6,
}: {
  label: string;
  bg?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: q(size),
        height: q(size),
        borderRadius: "50%",
        background: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: q(size * 0.5),
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}

/** צ'יפ/תווית קטנה. */
export function Chip({
  children,
  bg = C.line,
  color = C.steel,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: q(2.6),
        fontWeight: 700,
        padding: `${q(0.7)} ${q(2)}`,
        borderRadius: q(2),
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
