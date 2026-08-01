import { C, q, Stage, Panel, TitleBar, Chip } from "./kit";

// ─── 1. זרימת עבודה (flow) ───
function Flow() {
  const nodes = [
    { t: "פנייה חדשה", bg: C.steel, c: "#fff" },
    { t: "תיוג אוטומטי", bg: "#fff", c: C.navy },
    { t: "מענה + הצעה", bg: C.coral, c: "#fff" },
    { t: "תזכורת מעקב", bg: "#fff", c: C.navy },
  ];
  return (
    <Stage>
      <Panel style={{ padding: q(3.4), justifyContent: "center", gap: q(2.2) }}>
        <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.4), marginBottom: q(1) }}>
          זרימת עבודה אוטומטית
        </span>
        {nodes.map((n, i) => (
          <div key={n.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: q(1.4) }}>
            <div
              style={{
                width: "78%",
                background: n.bg,
                color: n.c,
                border: n.bg === "#fff" ? `${q(0.5)} solid ${C.line}` : "none",
                borderRadius: q(2.6),
                padding: `${q(2)} ${q(2.6)}`,
                fontSize: q(3.1),
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {n.t}
            </div>
            {i < nodes.length - 1 && (
              <div style={{ color: C.coral, fontSize: q(3.2), lineHeight: 0.6 }}>▼</div>
            )}
          </div>
        ))}
      </Panel>
    </Stage>
  );
}

// ─── 2. תזכורות היום ───
function Reminders() {
  const items = [
    { time: "10:00", t: "מעקב עם יוסי לוי", done: true },
    { time: "13:00", t: "שליחת הצעת מחיר", done: true },
    { time: "16:30", t: "תזכורת תשלום — דנה", done: false },
    { time: "18:00", t: "אישור תור למחר", done: false },
  ];
  return (
    <Stage>
      <Panel>
        <TitleBar title="תזכורות היום" badge="4" badgeBg={C.steel} />
        <div style={{ flex: 1, padding: q(2.6), display: "flex", flexDirection: "column", gap: q(1.8), justifyContent: "center" }}>
          {items.map((it) => (
            <div key={it.t} style={{ display: "flex", alignItems: "center", gap: q(2.4) }}>
              <div
                style={{
                  width: q(4.4),
                  height: q(4.4),
                  borderRadius: q(1.4),
                  background: it.done ? C.teal : "#fff",
                  border: it.done ? "none" : `${q(0.6)} solid ${C.steel}`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: q(2.6),
                  flexShrink: 0,
                }}
              >
                {it.done ? "✓" : ""}
              </div>
              <span style={{ color: C.coral, fontWeight: 700, fontSize: q(3), width: q(11) }}>
                {it.time}
              </span>
              <span style={{ color: C.navy, fontSize: q(3), opacity: it.done ? 0.5 : 1, textDecoration: it.done ? "line-through" : "none" }}>
                {it.t}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 3. מעקב חיובים ───
function Billing() {
  const rows = [
    { id: "1042", who: "מיכל א.", sum: "₪1,200", s: "שולם", sb: "#EAF6F2", sc: C.teal },
    { id: "1043", who: "יוסי ל.", sum: "₪850", s: "ממתין", sb: "#FBEDE3", sc: C.coral },
    { id: "1044", who: "רונית ב.", sum: "₪2,400", s: "שולם", sb: "#EAF6F2", sc: C.teal },
  ];
  return (
    <Stage>
      <Panel>
        <TitleBar title="חיובים ותשלומים" />
        <div style={{ flex: 1, padding: q(2.6), display: "flex", flexDirection: "column", gap: q(1.6), justifyContent: "center" }}>
          {rows.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: q(2), background: C.line, borderRadius: q(2.4), padding: `${q(1.8)} ${q(2.4)}` }}>
              <span style={{ color: C.mut, fontSize: q(2.7) }}>#{r.id}</span>
              <span style={{ flex: 1, color: C.navy, fontSize: q(3), fontWeight: 600 }}>{r.who}</span>
              <span style={{ color: C.navy, fontWeight: 800, fontSize: q(3.1) }}>{r.sum}</span>
              <Chip bg={r.sb} color={r.sc}>{r.s}</Chip>
            </div>
          ))}
        </div>
        <div style={{ padding: `${q(2)} ${q(3)}`, borderTop: `${q(0.3)} solid #eee`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: C.mut, fontSize: q(2.8) }}>סה״כ החודש</span>
          <span style={{ color: C.navy, fontWeight: 800, fontSize: q(4) }}>₪18,600</span>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 4. לפני / אחרי ───
function BeforeAfter() {
  return (
    <Stage>
      <div style={{ flex: 1, display: "flex", gap: q(2.6) }}>
        <Panel style={{ background: "#F4EDE6", padding: q(2.8) }}>
          <span style={{ color: C.mut, fontWeight: 700, fontSize: q(3), marginBottom: q(2) }}>לפני</span>
          {[[-6, 4], [8, -3], [-2, 6]].map(([rot, x], i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: `${q(0.4)} solid ${C.line}`,
                borderRadius: q(1.6),
                height: q(7),
                marginBottom: q(1.6),
                transform: `rotate(${rot}deg) translateX(${x}px)`,
                boxShadow: "0 1cqw 2cqw -1cqw rgba(0,0,0,.15)",
              }}
            />
          ))}
        </Panel>
        <Panel style={{ padding: q(2.8) }}>
          <span style={{ color: C.teal, fontWeight: 700, fontSize: q(3), marginBottom: q(2) }}>אחרי ✓</span>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: q(1.8), marginBottom: q(1.8) }}>
              <div style={{ width: q(3.4), height: q(3.4), borderRadius: q(1), background: C.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: q(2.2) }}>✓</div>
              <div style={{ flex: 1, height: q(2.2), borderRadius: q(1), background: C.line }} />
            </div>
          ))}
        </Panel>
      </div>
    </Stage>
  );
}

// ─── 5. לוח משימות ───
function Board() {
  const cols = [
    { t: "לביצוע", bg: C.line, n: 3 },
    { t: "בתהליך", bg: "#FBEDE3", n: 2 },
    { t: "הושלם", bg: "#EAF6F2", n: 4 },
  ];
  return (
    <Stage>
      <Panel style={{ padding: q(2.8) }}>
        <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.3), marginBottom: q(2) }}>לוח משימות</span>
        <div style={{ flex: 1, display: "flex", gap: q(2) }}>
          {cols.map((c) => (
            <div key={c.t} style={{ flex: 1, background: c.bg, borderRadius: q(2.2), padding: q(1.8), display: "flex", flexDirection: "column", gap: q(1.4) }}>
              <span style={{ color: C.navy, fontWeight: 700, fontSize: q(2.7) }}>{c.t}</span>
              {Array.from({ length: c.n }).map((_, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: q(1.4), height: q(5.5), boxShadow: "0 1cqw 2cqw -1cqw rgba(6,35,64,.2)" }} />
              ))}
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

export const automationMockups = [Flow, Reminders, Billing, BeforeAfter, Board];
