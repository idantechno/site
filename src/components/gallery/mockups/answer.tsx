import { C, q, Stage, Panel, TitleBar, Avatar, Chip } from "./kit";

// ─── 1. שיחת וואטסאפ חיה ───
function Chat() {
  const inBubble = {
    alignSelf: "flex-start" as const,
    maxWidth: "80%",
    background: C.line,
    color: C.navy,
    padding: `${q(1.6)} ${q(2.4)}`,
    borderRadius: q(3),
    fontSize: q(3.1),
    lineHeight: 1.35,
  };
  const outBubble = {
    ...inBubble,
    alignSelf: "flex-end" as const,
    background: C.coral,
    color: "#fff",
  };
  return (
    <Stage>
      <Panel>
        <div
          style={{
            background: C.navy,
            padding: `${q(2.4)} ${q(3)}`,
            display: "flex",
            alignItems: "center",
            gap: q(2.4),
          }}
        >
          <Avatar label="ע" bg={C.steel} size={7} />
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ color: "#fff", fontSize: q(3.3), fontWeight: 700 }}>
              העסק שלך
            </div>
            <div style={{ color: "#7fb0cf", fontSize: q(2.6) }}>● מחובר</div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: q(2.6),
            display: "flex",
            flexDirection: "column",
            gap: q(1.6),
            justifyContent: "center",
          }}
        >
          <div style={inBubble}>היי, אפשר לקבוע תור להשבוע?</div>
          <div style={outBubble}>
            בטח! פנוי ביום ג׳ ב-16:00 או ה׳ ב-10:00. מה מתאים?{" "}
            <span style={{ opacity: 0.7 }}>✓✓</span>
          </div>
          <div style={{ ...inBubble, maxWidth: "55%" }}>יום ג׳ מעולה</div>
          <div style={outBubble}>קבעתי ✓ שלחתי אישור ותזכורת. נתראה!</div>
        </div>
        <div
          style={{
            padding: `${q(2)} ${q(2.6)}`,
            borderTop: `${q(0.3)} solid #eee`,
            display: "flex",
            alignItems: "center",
            gap: q(2),
          }}
        >
          <div
            style={{
              flex: 1,
              background: C.cream,
              borderRadius: q(2.4),
              height: q(5),
            }}
          />
          <div
            style={{
              width: q(5),
              height: q(5),
              borderRadius: "50%",
              background: C.coral,
            }}
          />
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 2. תיבת פניות מנוהלת ───
function Inbox() {
  const rows = [
    { l: "י", bg: C.steel, n: "יוסי לוי", m: "מה המחיר לצילום?", s: "חדש", sb: C.teal, sc: "#fff", active: true },
    { l: "ד", bg: C.coral, n: "דנה כהן", m: "תודה רבה, נתראה!", s: "טופל", sb: C.cream, sc: "#8a6d55", active: false },
    { l: "ר", bg: C.navy, n: "רונית ב.", m: "נשמע מצוין", s: "ממתין", sb: "#FBEDE3", sc: "#c24a34", active: false },
  ];
  return (
    <Stage>
      <Panel>
        <TitleBar title="פניות נכנסות" badge="3 חדשות" />
        <div
          style={{
            flex: 1,
            padding: q(2.4),
            display: "flex",
            flexDirection: "column",
            gap: q(1.6),
            justifyContent: "center",
          }}
        >
          {rows.map((r) => (
            <div
              key={r.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: q(2.4),
                background: r.active ? C.line : "transparent",
                borderRadius: q(2.6),
                padding: `${q(1.8)} ${q(2.2)}`,
              }}
            >
              <Avatar label={r.l} bg={r.bg} size={6.5} />
              <div style={{ flex: 1, lineHeight: 1.25, minWidth: 0 }}>
                <div style={{ color: C.navy, fontWeight: 700, fontSize: q(3.1) }}>
                  {r.n}
                </div>
                <div style={{ color: C.mut, fontSize: q(2.9) }}>{r.m}</div>
              </div>
              <Chip bg={r.sb} color={r.sc}>
                {r.s}
              </Chip>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: `${q(2)} ${q(3)}`,
            borderTop: `${q(0.3)} solid #eee`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: C.mut, fontSize: q(2.8) }}>החודש</span>
          <span style={{ color: C.navy, fontWeight: 800, fontSize: q(4) }}>
            128 פניות
          </span>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 3. תמצית פנייה אוטומטית ───
function Summary() {
  const fields = [
    ["שם", "מיכל אברהם"],
    ["נושא", "צילום בר מצווה"],
    ["תאריך", "15.9, 18:00"],
  ];
  return (
    <Stage>
      <Panel style={{ padding: q(3.4), justifyContent: "center", gap: q(2.4) }}>
        <div style={{ display: "flex", alignItems: "center", gap: q(2.4) }}>
          <Avatar label="מ" bg={C.steel} size={7} />
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ color: C.navy, fontWeight: 700, fontSize: q(3.4) }}>
              סיכום פנייה
            </div>
            <div style={{ color: C.mut, fontSize: q(2.7) }}>נוצר אוטומטית</div>
          </div>
          <div
            style={{
              width: q(7),
              height: q(7),
              borderRadius: "50%",
              background: C.teal,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: q(4),
              fontWeight: 700,
            }}
          >
            ✓
          </div>
        </div>
        <div style={{ height: q(0.3), background: C.line }} />
        {fields.map(([k, v]) => (
          <div key={k}>
            <div style={{ color: C.coral, fontSize: q(2.7), fontWeight: 700 }}>
              {k}
            </div>
            <div style={{ color: C.navy, fontSize: q(3.2), opacity: 0.85 }}>
              {v}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: q(2), marginTop: q(1) }}>
          <Chip>ליד חם</Chip>
          <Chip>צילום</Chip>
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 4. מעקב לקוח — אף אחד לא נופל ───
function Followup() {
  const steps = [
    { t: "פנייה התקבלה", done: true },
    { t: "נשלחה הצעת מחיר", done: true },
    { t: "תזכורת — מחר 10:00", active: true },
    { t: "סגירת עסקה", done: false },
  ];
  return (
    <Stage>
      <Panel style={{ padding: q(3.4), justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: q(3),
          }}
        >
          <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.4) }}>
            מעקב לקוח
          </span>
          <span
            style={{
              color: C.teal,
              fontWeight: 800,
              fontSize: q(3.2),
              background: "#EAF6F2",
              padding: `${q(0.6)} ${q(2)}`,
              borderRadius: q(2),
            }}
          >
            2/4
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: q(2.4) }}>
          {steps.map((s) => (
            <div key={s.t} style={{ display: "flex", alignItems: "center", gap: q(2.4) }}>
              <div
                style={{
                  width: q(4.4),
                  height: q(4.4),
                  borderRadius: "50%",
                  background: s.done ? C.teal : s.active ? C.coral : "#fff",
                  border: s.done || s.active ? "none" : `${q(0.6)} solid ${C.steel}`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: q(2.6),
                  flexShrink: 0,
                  boxShadow: s.active ? `0 0 0 ${q(1.4)} rgba(220,93,70,.25)` : "none",
                }}
              >
                {s.done ? "✓" : ""}
              </div>
              <span
                style={{
                  color: C.navy,
                  fontSize: q(3.1),
                  fontWeight: s.active ? 700 : 400,
                  opacity: s.done ? 0.55 : 1,
                }}
              >
                {s.t}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  );
}

// ─── 5. טון מותאם מותג ───
function Tone() {
  const Slider = ({ label, pct }: { label: string; pct: number }) => (
    <div style={{ marginBottom: q(2.6) }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: C.mut,
          fontSize: q(2.7),
          marginBottom: q(1),
        }}
      >
        <span>{label.split("·")[0]}</span>
        <span>{label.split("·")[1]}</span>
      </div>
      <div style={{ position: "relative", height: q(1.6), background: C.line, borderRadius: q(1) }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct}%`,
            background: C.steel,
            borderRadius: q(1),
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: `${pct}%`,
            transform: "translate(50%,-50%)",
            width: q(3.6),
            height: q(3.6),
            borderRadius: "50%",
            background: C.coral,
          }}
        />
      </div>
    </div>
  );
  return (
    <Stage>
      <Panel style={{ padding: q(3.4), justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: q(2.2), marginBottom: q(3.4) }}>
          <Avatar label="ע" bg={C.coral} size={6.5} />
          <span style={{ color: C.navy, fontWeight: 700, fontSize: q(3.3) }}>
            טון מותאם לעסק
          </span>
        </div>
        <Slider label="חברי · רשמי" pct={64} />
        <Slider label="קצר · מפורט" pct={42} />
        <div
          style={{
            marginTop: q(1.6),
            background: C.line,
            color: C.navy,
            padding: `${q(2)} ${q(2.6)}`,
            borderRadius: q(3),
            fontSize: q(3),
            lineHeight: 1.4,
          }}
        >
          &ldquo;שמחנו לשמוע ממך! נדאג לחזור אליך עוד היום עם כל הפרטים 🙂&rdquo;
        </div>
      </Panel>
    </Stage>
  );
}

export const answerMockups = [Chat, Inbox, Summary, Followup, Tone];
