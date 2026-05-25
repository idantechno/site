# PortalAIstudio — Session Handoff

## מה קיים עכשיו

האתר בנוי ועובד. Build עובר ללא שגיאות TypeScript.

**מיקום פרויקט:** `C:\Users\idant\portal-ai-site`

**הרצת dev server:**
```powershell
$env:PATH = "C:\Users\idant\node_portable\node-v22.15.1-win-x64;$env:PATH"
Set-Location "C:\Users\idant\portal-ai-site"
npm run dev
# → http://localhost:3000
```

> Node.js מותקן פורטבילי (ללא הרשאות admin): `C:\Users\idant\node_portable\node-v22.15.1-win-x64`
> חייבים להוסיף אותו ל-PATH בכל PowerShell חדש כמו שמוצג למעלה.

---

## טכנולוגיות

| כלי | גרסה |
|-----|------|
| Next.js | 16.2.6 (App Router, Turbopack) |
| TypeScript | latest |
| Tailwind CSS | v4 |
| Framer Motion | latest |
| @phosphor-icons/react | latest |
| Node.js | v22.15.1 (portable) |

---

## עיצוב — כללי ברזל

### צבעים
```
Navy:    #011427   ← רקע כהה, כותרות
Coral:   #DC5D46   ← CTA ראשי, accent
Steel:   #6091B0   ← secondary accent, אייקונים
White:   #FFFFFF   ← רקע סקציות בהירות
Surface: #F8F9FA   ← רקע סקציות משניות
Text:    #1a1a2e   ← טקסט ראשי
Muted:   #6b7280   ← טקסט משני
Border:  #e5e7eb   ← קווים, borders
```

### גופנים
- **Heebo** (`font-display`) — כותרות, כפתורים, תגיות
- **Alef** (`font-body`) — גוף טקסט, פסקאות

### כללים שאסור לשבור
- `min-h-[100dvh]` — לא `h-screen`
- CSS Grid בלבד — לא flexbox percentages
- לא 3 כרטיסים שווים אופקית — תמיד אסימטרי (Bento)
- Icons: `@phosphor-icons/react` בלבד — לא emojis
- Animations: `transform` + `opacity` בלבד
- Mobile: single-column מתחת ל-768px
- CTA אסור: "קנה עכשיו", "אוטומציה", "הרשמה"
- CTA מותר: "בואו נדבר", "לראות דוגמה", "שלחו הודעה"
- Ease cubic-bezier: תמיד `as [number, number, number, number]` (TypeScript requirement)

---

## מבנה קבצים

```
portal-ai-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # RTL, lang="he", metadata
│   │   ├── page.tsx            # הרכבת כל הסקציות
│   │   └── globals.css         # Google Fonts, CSS vars, RTL
│   ├── components/
│   │   ├── Nav.tsx             # Sticky navbar, mobile hamburger
│   │   ├── Hero.tsx            # Split-screen + phone mockup מונפש
│   │   ├── ForWho.tsx          # Bento grid — קהלי יעד
│   │   ├── PainSection.tsx     # Empathy quote section
│   │   ├── HowItWorks.tsx      # 3 שלבים עם stagger animation
│   │   ├── DemoSection.tsx     # MockChat WhatsApp מונפש
│   │   ├── Services.tsx        # 3 חבילות שירות (אסימטרי)
│   │   ├── FAQ.tsx             # Accordion עם AnimatePresence
│   │   ├── FinalCTA.tsx        # Bottom CTA → WhatsApp
│   │   └── Footer.tsx          # לוגו, ניווט, copyright
│   └── lib/
│       └── constants.ts        # WhatsApp URL, צבעים, nav links
├── .claude/
│   └── launch.json             # Preview server config (port 3000)
├── HANDOFF.md                  # המסמך הזה
└── package.json
```

---

## constants.ts — ערכים קריטיים

```ts
// src/lib/constants.ts
WHATSAPP_NUMBER = "972500000000"   // ← לשנות למספר אמיתי!
WHATSAPP_MESSAGE = "היי, אני רוצה לקבל אבחון קצר לעסק שלי"
```

**זה הדבר הראשון שצריך לעדכן לפני השקה.**

---

## page.tsx — סדר הסקציות

```tsx
<Nav />
<Hero />          // min-h-[100dvh]
<ForWho />
<PainSection />
<HowItWorks />
<DemoSection />   // id="demo" — MockChat מונפש
<Services />      // id="services"
<FAQ />
<FinalCTA />      // id="final-cta"
<Footer />
```

---

## מה שלם ✅

- [x] כל 10 הקומפוננטים בנויים
- [x] RTL מלא (`dir="rtl"`, `lang="he"`)
- [x] Framer Motion עם spring physics, stagger, AnimatePresence
- [x] MockChat WhatsApp מונפש (6 הודעות עם typing indicator)
- [x] Mobile responsive (hamburger menu, single column)
- [x] TypeScript build עובר ללא שגיאות
- [x] CSS Google Fonts (Heebo + Alef) מחובר

---

## מה עדיין חסר (לסשן הבא)

| משימה | עדיפות |
|-------|--------|
| **עדכון מספר WhatsApp אמיתי** ב-`constants.ts` | גבוהה מאוד |
| בדיקה ויזואלית בדפדפן — RTL, mobile 375px, אנימציות | גבוהה |
| לוגו/favicon אמיתי במקום ברירת מחדל | בינונית |
| עמוד `/services` נפרד | נמוכה |
| עמוד `/about` נפרד | נמוכה |
| Deployment (Vercel מומלץ) | לפי החלטה |
| SEO: Open Graph, og:image | לפני השקה |
| Analytics (Vercel Analytics / GA) | לפי החלטה |

---

## עצות ל-Claude בסשן הבא

1. **לפני כל עריכה של קומפוננט** — קרא את הקובץ קודם (Edit tool דורש קריאה מוקדמת).
2. **כל `ease: [a,b,c,d]`** בתוך Framer Motion חייב suffix: `as [number, number, number, number]`.
3. **כל `Variants` עם custom function** — יש לייבא ולהשתמש ב-`type Variants` מ-`framer-motion`.
4. **הפעלת server** — חובה להוסיף Node.js portable ל-PATH בכל session חדש.
5. **globals.css** — ה-`@import url(Google Fonts)` חייב להיות **לפני** `@import "tailwindcss"`.
6. **אל תשנה את הצבעים** — הם נבחרו מתמונת palette שהמשתמש סיפק.
7. **אל תוסיף emojis** — המשתמש לא ביקש.

---

## Business Context (בקצרה)

PortalAIstudio בונה סוכני WhatsApp לעסקים יצירתיים (צלמים, גלריות, מפיקים, סטודיות). הקהל מרגיש שעבודה אדמיניסטרטיבית חונקת את היצירה. הפתרון: סוכן שעונה 24/7, מסנן לידים, ועונה בשפה של העסק — בלי להישמע כמו רובוט.

**המסר המרכזי:** "היצירה שלך, המענה שלנו."
**האתר = מכונת דמו** — הלקוח מתנסה בסוכן חי (MockChat) ומבין את הערך מיד.
