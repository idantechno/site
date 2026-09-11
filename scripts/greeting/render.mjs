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
import { mkdir, readFile, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
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

/* הרצת ffmpeg ואיסוף stderr */
function ff(args, { pipeStdin = false } = {}) {
  const p = spawn(FFMPEG, args, { stdio: [pipeStdin ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
  let err = '';
  p.stderr.on('data', d => { err += d.toString(); });
  const done = new Promise((resolve, reject) => {
    p.on('close', code => code === 0 ? resolve(err) : reject(new Error(`ffmpeg ${code}\n${err.slice(-2000)}`)));
    p.on('error', reject);
  });
  return { proc: p, done };
}

/**
 * מכין את רצועת האודיו: מסנתז אותה, ואז מנרמל עוצמה בשתי מעברות.
 *
 * שתי מעברות ולא אחת — כי נרמול חד־מעברי הוא דינמי, והוא היה מרים את
 * הפתיחה השקטה ומוחק את כל ההפרש בין החושך לרגע האור. `linear=true`
 * מפעיל הגברה קבועה ושומר על הדינמיקה.
 */
async function prepareAudio() {
  const wav = path.join(HERE, 'audio.wav');
  try {
    const gen = spawn('python3', [path.join(HERE, 'audio.py')], { stdio: ['ignore', 'ignore', 'pipe'] });
    let e = '';
    gen.stderr.on('data', d => { e += d.toString(); });
    await new Promise((res, rej) => {
      gen.on('close', c => c === 0 ? res() : rej(new Error(e.slice(-600))));
      gen.on('error', rej);
    });
  } catch (err) {
    process.stderr.write(`\nאזהרה: סינתזת האודיו נכשלה — מרנדר בלי סאונד.\n${err.message}\n`);
    return null;
  }

  const measured = await ff(['-hide_banner', '-i', wav, '-af',
    'loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']).done;
  const json = JSON.parse(measured.slice(measured.lastIndexOf('{'), measured.lastIndexOf('}') + 1));
  process.stderr.write(`\nאודיו: ${json.input_i} LUFS -> -16 LUFS, שיא אמיתי ${json.input_tp} dBTP\n`);

  const out = path.join(tmpdir(), 'portal-greeting-audio.m4a');
  await ff(['-y', '-i', wav, '-af',
    `loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=${json.input_i}:measured_TP=${json.input_tp}` +
    `:measured_LRA=${json.input_lra}:measured_thresh=${json.input_thresh}` +
    `:offset=${json.target_offset}:linear=true,aresample=48000`,
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', out]).done;
  return out;
}

const FORMATS = [
  { name: 'shana-tova-5787-square', w: 1080, h: 1080 },  // פיד / וואטסאפ
  { name: 'shana-tova-5787-story',  w: 1080, h: 1920 },  // סטורי / סטטוס / ריל
];

async function renderFormat(browser, fmt, origin, audio) {
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
  const silent  = audio ? path.join(tmpdir(), `${fmt.name}.silent.mp4`) : outFile;
  const enc = ff([
    '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
    '-movflags', '+faststart',
    '-r', String(FPS),
    silent,
  ], { pipeStdin: true });
  const { proc, done } = enc;

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
    if (!proc.stdin.write(buf)) await new Promise(r => proc.stdin.once('drain', r));
    if (i % 30 === 0 || i === total - 1) {
      process.stderr.write(`\r  ${String(i + 1).padStart(4)}/${total}  ${((i + 1) / total * 100).toFixed(0)}%   `);
    }
  }
  proc.stdin.end();
  await done;
  await page.close();

  if (audio) {
    // מיזוג ללא קידוד מחדש של הווידאו — העתקה בלבד
    await ff(['-y', '-i', silent, '-i', audio,
              '-c:v', 'copy', '-c:a', 'copy', '-shortest',
              '-movflags', '+faststart', outFile]).done;
    await rm(silent, { force: true });
  }
  process.stderr.write(`\n  → ${path.relative(ROOT, outFile)}\n`);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars'],
});
const { server, port } = await serve();
const origin = `http://127.0.0.1:${port}`;
await mkdir(OUT, { recursive: true });
const audio = await prepareAudio();
for (const fmt of FORMATS) await renderFormat(browser, fmt, origin, audio);
await browser.close();
server.close();
process.stderr.write('\nהושלם.\n');
