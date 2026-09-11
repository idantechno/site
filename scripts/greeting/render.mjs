/**
 * מרנדר את scene.html לסרטון MP4.
 *
 *   node scripts/greeting/render.mjs
 *
 * כל פריים נלכד בנפרד דרך window.__render(t) — כך שהתוצאה זהה בכל הרצה
 * ואין נפילות פריימים. הפריימים מוזרמים ישירות ל-ffmpeg (H.264 / yuv420p).
 *
 * דרישות: playwright + ffmpeg-static (מותקנים מחוץ לפרויקט, ראו README.md).
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const FFMPEG = process.env.FFMPEG_PATH || require('ffmpeg-static');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT  = path.join(ROOT, 'public', 'greetings');
const FPS  = 30;

/* שרת סטטי זעיר — נדרש כדי שהקנבס יוכל לקרוא את פיקסלי הלוגו (file:// "מזהם" קנבס) */
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg' };
function serve() {
  const server = createServer(async (req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
    const file = rel.startsWith('public/')
      ? path.join(ROOT, rel)
      : path.join(HERE, rel || 'scene.html');
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port })));
}

const FORMATS = [
  { name: 'shana-tova-5787-square', w: 1080, h: 1080 },  // פיד / וואטסאפ
  { name: 'shana-tova-5787-story',  w: 1080, h: 1920 },  // סטורי / סטטוס / ריל
];

async function renderFormat(browser, fmt, origin) {
  const page = await browser.newPage({
    viewport: { width: fmt.w, height: fmt.h },
    deviceScaleFactor: 1,
  });
  const url = `${origin}/scene.html?w=${fmt.w}&h=${fmt.h}`;
  await page.goto(url);
  await page.waitForFunction(() => window.__ready !== undefined);
  await page.evaluate(() => window.__ready);

  const duration = await page.evaluate(() => window.__DURATION);
  const total = Math.round(duration * FPS);

  const outFile = path.join(OUT, `${fmt.name}.mp4`);
  const ff = spawn(FFMPEG, [
    '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
    '-movflags', '+faststart',
    '-r', String(FPS),
    outFile,
  ], { stdio: ['pipe', 'ignore', 'pipe'] });

  let ffErr = '';
  ff.stderr.on('data', d => { ffErr += d.toString(); });
  const done = new Promise((resolve, reject) => {
    ff.on('close', code => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}\n${ffErr.slice(-2000)}`)));
    ff.on('error', reject);
  });

  process.stderr.write(`\n${fmt.name} (${fmt.w}x${fmt.h}) — ${total} frames\n`);
  for (let i = 0; i < total; i++) {
    const t = i / FPS;
    // מציירים וקוראים את הקנבס ישירות — לכידת אלמנט דרך הקומפוזיטור
    // עלולה להחזיר פריים ישן, וזה חייב להיות מדויק פריים־פריים.
    const dataUrl = await page.evaluate(time => {
      window.__render(time);
      return document.getElementById('c').toDataURL('image/png');
    }, t);
    const buf = Buffer.from(dataUrl.slice('data:image/png;base64,'.length), 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 30 === 0 || i === total - 1) {
      process.stderr.write(`\r  ${String(i + 1).padStart(4)}/${total}  ${((i + 1) / total * 100).toFixed(0)}%   `);
    }
  }
  ff.stdin.end();
  await done;
  await page.close();
  process.stderr.write(`\n  → ${path.relative(ROOT, outFile)}\n`);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars'],
});
const { server, port } = await serve();
const origin = `http://127.0.0.1:${port}`;
await mkdir(OUT, { recursive: true });
for (const fmt of FORMATS) await renderFormat(browser, fmt, origin);
await browser.close();
server.close();
process.stderr.write('\nהושלם.\n');
