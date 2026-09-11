/**
 * מרנדר את card.html לכרטיס ברכה בכמה מידות.
 *
 *   node scripts/greeting/render-card.mjs
 *
 * הכרטיס מצויר ביחידות של הצלע הקצרה, ולכן הוא נכון בכל יחס וכל רזולוציה —
 * אותו קובץ מייצר גם ריבוע לפיד וגם קובץ בכפול רזולוציה להדפסה.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT  = path.join(ROOT, 'public', 'greetings');

const SIZES = [
  { name: 'shana-tova-5787-card-square',   w: 1080, h: 1080, type: 'jpeg' },  // פיד, וואטסאפ
  { name: 'shana-tova-5787-card-portrait', w: 1080, h: 1350, type: 'jpeg' },  // פיד אינסטגרם
  { name: 'shana-tova-5787-card-story',    w: 1080, h: 1920, type: 'jpeg' },  // סטורי, סטטוס
  { name: 'shana-tova-5787-card-master',   w: 2160, h: 2160, type: 'png'  },  // מאסטר להדפסה
];

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
  const file = rel.startsWith('public/') ? path.join(ROOT, rel) : path.join(HERE, rel || 'card.html');
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
const port = await new Promise(r => server.listen(0, '127.0.0.1', () => r(server.address().port)));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars'],
});
await mkdir(OUT, { recursive: true });

for (const s of SIZES) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/card.html?w=${s.w}&h=${s.h}`);
  await page.evaluate(() => window.__ready);
  const dataUrl = await page.evaluate(
    type => document.getElementById('c').toDataURL(`image/${type}`, 0.95),
    s.type,
  );
  const ext = s.type === 'jpeg' ? 'jpg' : 'png';
  const file = path.join(OUT, `${s.name}.${ext}`);
  await writeFile(file, Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64'));
  await page.close();
  process.stderr.write(`  ${s.w}x${s.h}  ->  ${path.relative(ROOT, file)}\n`);
}

await browser.close();
server.close();
process.stderr.write('\nהושלם.\n');
