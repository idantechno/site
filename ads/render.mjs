// Render an ad board HTML page to a numbered PNG frame sequence.
//
//   node ads/render.mjs mall-board
//
// Frames land in ads/out/<board>/frame-0000.png ... — ffmpeg turns them into the
// MP4 (see ads/README.md). Requires the ads preview server on :4321 and a local
// Chrome or Edge install.
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const board = process.argv[2] || 'mall-board';
const FPS = Number(process.env.FPS || 30);
const DURATION = Number(process.env.DURATION || 6);
const URL_ = process.env.AD_URL || `http://localhost:4321/${board}/`;
const OUT = path.resolve(process.env.OUT || `ads/out/${board}`);

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('No Chrome or Edge found.');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--font-render-hinting=none'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto(URL_, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 500));

const total = Math.round(FPS * DURATION);
for (let i = 0; i < total; i++) {
  const ms = (i / FPS) * 1000;
  await page.evaluate((t) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = t;
    }
  }, ms);
  await page.screenshot({ path: path.join(OUT, `frame-${String(i).padStart(4, '0')}.png`) });
  if (i % 30 === 0) console.log(`frame ${i}/${total}`);
}
await browser.close();
console.log(`done: ${total} frames at ${FPS}fps in ${OUT}`);
