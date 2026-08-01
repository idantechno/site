import { C, q, Stage, Panel, TitleBar, Chip } from "./kit";

// ─── 1. מודולים מתחברים סביב הליבה ───
function Modular() {
  const mods = ["מענה", "תורים", "תשלומים", "דוחות"];
  return (
    <Stage>
      <Panel style={{ padding: q(3), justifyContent: "center", alignItems: "center", gap: q(2.4) }}>
        <div style={{ background: C.navy, color: "#fff", borderRadius: q(3), padding: `${q(2.4)} ${q(4)}`, fontSize: q(3.4), fontWeight: 800 }}>
          המערכת שלך
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: q(2), width: "82%" }}>
          {mods.map((m, i) => (
            <div key={m} style={{ background: i % 2 ? "#FBEDE3" : C.line, color: C.navy, fontSize: q(3), fontWeight: 700, padding: `${q(2)} ${q(2)}`, borderRadius: q(2.4), textAlign: "center", border: `${q(0.5)} dashed ${i % 2 ? C.coral : C.steel}` }}>
              + {m}
            </div>
          ))}
        </div>
        <span style={{ color: C.mut, fontSize: q(2.7) }}>מוסיפים רק מה שצריך</span>
      </Panel>
    </Stage>
  );
}

// ─── 2. בורר רכיבים ───
function Picker() {
  const items = [
    { t: "מענה אוטומטי", on: true },
    { t: "ניהול תורים", on: true },
    { t: "סליקה ותשלומים", on: true },
    { t: "דוחות וניתוח", on: false },
    { t: "ניוזלטר", on: true },
  ];
  return (
    <Stage>
      <Panel>
        <TitleBar title="בחירת רכיבים" badge="נבחרו 4/5" badgeBg={C.steel} />
        <div style={{ flex: 1, padding: q(2.6), display: "flex", flexDirection: "column", gap: q(1.5), justifyContent: "center" }}>
          {items.map((it) => (
            <div key={it.t} style={{ display: "flex", alignItems: "center", gap: q(2), padding: `${q(1.4)} ${q(2)}`, background: it.on ? "#EAF6F2" : C.line, borderRadius: q(2.2), border: it.on ? `${q(0.4)} solid ${C.teal}` : `${q(0.4)} solid transparent` }}>
              <div style={{ width: q(4), height: q(4), borderRadius: q(1.2), background: it.on ? C.teal : "#fff", border: it.on ? "none" : `${q(0.5)} solid ${C.steel}`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: q(2.4) }}>
                {it.on ? "✓" : ""}
              </div>
              <span style={{ flex: 1, color: C.navy, fontSize: q(3), fontWeight: 600 }}>{it.t}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 3. שרטוט / blueprint ───
function Blueprint() {
  return (
    <Stage>
      <Panel style={{ background: "#0d2b49", padding: q(3) }}>
        <span style={{ color: "#7fb0cf", fontWeight: 700, fontSize: q(3), marginBottom: q(2) }}>
          תכנון המערכת
        </span>
        <div style={{ flex: 1, position: "relative", borderRadius: q(2), backgroundImage: "linear-gradient(rgba(127,176,207,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(127,176,207,.18) 1px,transparent 1px)", backgroundSize: `${q(6)} ${q(6)}` }}>
          <div style={{ position: "absolute", top: "14%", right: "8%", width: "44%", height: "34%", border: `${q(0.5)} solid ${C.steel}`, borderRadius: q(1.6) }} />
          <div style={{ position: "absolute", top: "20%", left: "10%", width: "30%", height: "22%", border: `${q(0.5)} dashed ${C.coral}`, borderRadius: q(1.6) }} />
          <div style={{ position: "absolute", bottom: "16%", right: "16%", width: "60%", height: "26%", border: `${q(0.5)} solid ${C.steel}`, borderRadius: q(1.6) }} />
          <div style={{ position: "absolute", bottom: "8%", left: "12%", color: "#7fb0cf", fontSize: q(2.5) }}>שלב 1 · מיפוי צרכים</div>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 4. מרעיון למוצר ───
function SketchToProduct() {
  return (
    <Stage>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: q(2) }}>
        <Panel style={{ background: "#F4EDE6", padding: q(2.6), border: `${q(0.5)} dashed ${C.steel}` }}>
          <span style={{ color: C.mut, fontSize: q(2.7), fontWeight: 700, marginBottom: q(1.6) }}>רעיון</span>
          <div style={{ height: q(3), background: "rgba(96,145,176,.35)", borderRadius: q(1), marginBottom: q(1.4), width: "70%" }} />
          <div style={{ height: q(2), background: "rgba(96,145,176,.25)", borderRadius: q(1), marginBottom: q(1.2) }} />
          <div style={{ height: q(2), background: "rgba(96,145,176,.25)", borderRadius: q(1), width: "60%" }} />
        </Panel>
        <div style={{ color: C.coral, fontSize: q(4.5), fontWeight: 800 }}>←</div>
        <Panel style={{ padding: q(2.6) }}>
          <span style={{ color: C.teal, fontSize: q(2.7), fontWeight: 700, marginBottom: q(1.6) }}>מוצר ✓</span>
          <div style={{ height: q(3), background: C.navy, borderRadius: q(1), marginBottom: q(1.4), width: "70%" }} />
          <div style={{ height: q(2), background: C.line, borderRadius: q(1), marginBottom: q(1.2) }} />
          <div style={{ height: q(2), background: C.line, borderRadius: q(1), width: "60%", marginBottom: q(1.8) }} />
          <div style={{ alignSelf: "flex-start", background: C.coral, color: "#fff", fontSize: q(2.5), fontWeight: 700, padding: `${q(1)} ${q(2.4)}`, borderRadius: q(2) }}>שליחה</div>
        </Panel>
      </div>
    </Stage>
  );
}

// ─── 5. מפת צרכים ───
function NeedsMap() {
  const needs = [
    { t: "סדר", x: "8%", y: "12%", bg: C.steel },
    { t: "מענה מהיר", x: "62%", y: "8%", bg: C.coral },
    { t: "שיווק", x: "6%", y: "62%", bg: C.teal },
    { t: "מעקב", x: "60%", y: "64%", bg: C.navy },
  ];
  return (
    <Stage>
      <Panel style={{ position: "relative", padding: q(3) }}>
        <div style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%,-50%)", background: C.navy, color: "#fff", borderRadius: "50%", width: q(20), height: q(20), display: "flex", alignItems: "center", justifyContent: "center", fontSize: q(3), fontWeight: 800, textAlign: "center", boxShadow: `0 0 0 ${q(1.6)} rgba(96,145,176,.2)` }}>
          העסק<br />שלך
        </div>
        {needs.map((n) => (
          <div key={n.t} style={{ position: "absolute", top: n.y, right: n.x, background: n.bg, color: "#fff", fontSize: q(2.8), fontWeight: 700, padding: `${q(1.2)} ${q(2.2)}`, borderRadius: q(2.2) }}>
            {n.t}
          </div>
        ))}
        <div style={{ position: "absolute", bottom: q(2.4), left: "50%", transform: "translateX(-50%)" }}>
          <Chip>נבנה סביבך</Chip>
        </div>
      </Panel>
    </Stage>
  );
}

export const customMockups = [Modular, Picker, Blueprint, SketchToProduct, NeedsMap];
