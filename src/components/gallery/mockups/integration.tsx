import { C, q, Stage, Panel, TitleBar, Chip } from "./kit";

// ─── 1. מרכזייה (hub) — Portal במרכז, כלים סביב ───
function Hub() {
  const tools = ["יומן", "גיליונות", "CRM", "סליקה", "וואטסאפ", "מייל"];
  return (
    <Stage>
      <Panel style={{ padding: q(3), justifyContent: "center", alignItems: "center" }}>
        <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.2), marginBottom: q(2.4) }}>
          הכל מחובר למקום אחד
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: q(2.4), width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: q(1.6) }}>
            {tools.slice(0, 3).map((t) => (
              <div key={t} style={{ background: C.line, color: C.navy, fontSize: q(2.9), fontWeight: 600, padding: `${q(1.4)} ${q(2)}`, borderRadius: q(2), textAlign: "center" }}>{t}</div>
            ))}
          </div>
          <div style={{ width: q(15), height: q(15), borderRadius: "50%", background: C.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: q(3), fontWeight: 800, boxShadow: `0 0 0 ${q(1.6)} rgba(96,145,176,.25)` }}>Portal</div>
          <div style={{ display: "flex", flexDirection: "column", gap: q(1.6) }}>
            {tools.slice(3).map((t) => (
              <div key={t} style={{ background: C.line, color: C.navy, fontSize: q(2.9), fontWeight: 600, padding: `${q(1.4)} ${q(2)}`, borderRadius: q(2), textAlign: "center" }}>{t}</div>
            ))}
          </div>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 2. דשבורד מאוחד ───
function Dashboard() {
  return (
    <Stage>
      <Panel>
        <TitleBar title="לוח בקרה" />
        <div style={{ flex: 1, padding: q(2.4), display: "grid", gridTemplateColumns: "1fr 1fr", gap: q(2) }}>
          <div style={{ background: C.line, borderRadius: q(2.2), padding: q(2), display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: C.steel, fontSize: q(2.6), fontWeight: 700 }}>פניות</span>
            <span style={{ color: C.navy, fontSize: q(5), fontWeight: 800 }}>128</span>
          </div>
          <div style={{ background: "#EAF6F2", borderRadius: q(2.2), padding: q(2), display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: C.teal, fontSize: q(2.6), fontWeight: 700 }}>נסגרו</span>
            <span style={{ color: C.navy, fontSize: q(5), fontWeight: 800 }}>37</span>
          </div>
          <div style={{ gridColumn: "1 / -1", background: "#fff", border: `${q(0.4)} solid ${C.line}`, borderRadius: q(2.2), padding: q(2), display: "flex", alignItems: "flex-end", gap: q(1.4), height: q(20) }}>
            {[40, 62, 48, 78, 90, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 4 ? C.coral : C.steel, borderRadius: q(0.8), opacity: i === 4 ? 1 : 0.55 }} />
            ))}
          </div>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 3. סנכרון דו-כיווני ───
function Sync() {
  const Side = ({ t, sub }: { t: string; sub: string }) => (
    <div style={{ flex: 1, background: "#fff", border: `${q(0.5)} solid ${C.line}`, borderRadius: q(2.6), padding: q(2.4), textAlign: "center" }}>
      <div style={{ color: C.navy, fontWeight: 700, fontSize: q(3.2) }}>{t}</div>
      <div style={{ color: C.mut, fontSize: q(2.6), marginTop: q(0.6) }}>{sub}</div>
    </div>
  );
  return (
    <Stage>
      <Panel style={{ padding: q(3), justifyContent: "center", gap: q(2.6) }}>
        <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.3), textAlign: "center" }}>סנכרון אוטומטי</span>
        <div style={{ display: "flex", alignItems: "center", gap: q(2) }}>
          <Side t="וואטסאפ" sub="פניות" />
          <div style={{ color: C.coral, fontSize: q(5), fontWeight: 800 }}>⇄</div>
          <Side t="יומן" sub="תורים" />
        </div>
        <div style={{ alignSelf: "center" }}>
          <Chip bg="#EAF6F2" color={C.teal}>● מסונכרן עכשיו</Chip>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 4. ריכוז ערוצים ───
function Channels() {
  const ch = [
    { t: "וואטסאפ", bg: C.teal },
    { t: "מייל", bg: C.steel },
    { t: "טלפון", bg: C.navy },
    { t: "אינסטגרם", bg: C.coral },
  ];
  return (
    <Stage>
      <Panel style={{ padding: q(3), justifyContent: "center", alignItems: "center", gap: q(2.2) }}>
        <div style={{ display: "flex", gap: q(2), flexWrap: "wrap", justifyContent: "center" }}>
          {ch.map((c) => (
            <div key={c.t} style={{ background: c.bg, color: "#fff", fontSize: q(2.8), fontWeight: 700, padding: `${q(1.4)} ${q(2.4)}`, borderRadius: q(2.4) }}>{c.t}</div>
          ))}
        </div>
        <div style={{ color: C.coral, fontSize: q(4), lineHeight: 0.8 }}>▼</div>
        <div style={{ width: "88%", background: C.navy, color: "#fff", borderRadius: q(2.8), padding: `${q(2.4)} ${q(2)}`, textAlign: "center", fontSize: q(3.2), fontWeight: 700 }}>
          תיבה אחת מאוחדת
        </div>
        <span style={{ color: C.mut, fontSize: q(2.7) }}>כל הפניות במקום אחד</span>
      </Panel>
    </Stage>
  );
}

// ─── 5. מחברים ───
function Connectors() {
  const rows = [
    { t: "Google Calendar", on: true },
    { t: "חשבונית ירוקה", on: true },
    { t: "Google Sheets", on: true },
    { t: "Meta Business", on: false },
  ];
  const Toggle = ({ on }: { on: boolean }) => (
    <div style={{ width: q(8), height: q(4.4), borderRadius: q(2.4), background: on ? C.teal : "#d3d1c7", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", [on ? "left" : "right"]: q(0.6), transform: "translateY(-50%)", width: q(3.2), height: q(3.2), borderRadius: "50%", background: "#fff" }} />
    </div>
  );
  return (
    <Stage>
      <Panel>
        <TitleBar title="חיבורים" />
        <div style={{ flex: 1, padding: q(2.6), display: "flex", flexDirection: "column", gap: q(1.6), justifyContent: "center" }}>
          {rows.map((r) => (
            <div key={r.t} style={{ display: "flex", alignItems: "center", gap: q(2), padding: `${q(1.4)} ${q(2)}`, background: C.line, borderRadius: q(2.2) }}>
              <div style={{ width: q(5), height: q(5), borderRadius: q(1.4), background: "#fff", border: `${q(0.4)} solid #ddd` }} />
              <span style={{ flex: 1, color: C.navy, fontSize: q(3), fontWeight: 600 }}>{r.t}</span>
              <Toggle on={r.on} />
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

export const integrationMockups = [Hub, Dashboard, Sync, Channels, Connectors];
