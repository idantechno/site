// Render the /creation hero inside a browser-chrome frame at 1080x1350 (4:5) —
// the closing slide of the Instagram carousel.
//
//   node ads/shot-creation.mjs
//
// Requires the Next dev server on :3000 and a local Chrome or Edge install.
// The wrapper is written into public/ only for the duration of the shot and
// removed afterwards, so nothing extra ships with the site.
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const OUT = path.resolve(process.env.OUT || 'ads/out/creation-slide.png');
const WRAPPER = path.resolve('public/_shot.html');
const URL_ = 'http://localhost:3000/_shot.html';

const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error('No Chrome or Edge found.');

const WRAPPER_HTML = `<!DOCTYPE html>
<html lang="he"><head><meta charset="utf-8"><title>shot</title><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1350px;overflow:hidden;background:#F0E1D5}
  .bar{height:66px;width:1080px;background:#e9e3dc;
    border-bottom:1px solid rgba(0,0,0,.09);display:flex;align-items:center;
    gap:16px;padding:0 20px;font-family:-apple-system,"Segoe UI",system-ui,sans-serif}
  .dots{display:flex;gap:8px;flex:0 0 auto}
  .dots i{width:12px;height:12px;border-radius:50%;display:block}
  .dots i:nth-child(1){background:#ED6A5E}
  .dots i:nth-child(2){background:#F4BF4F}
  .dots i:nth-child(3){background:#61C454}
  .url{flex:1;height:38px;border-radius:19px;background:#fbf8f5;
    border:1px solid rgba(0,0,0,.07);display:flex;align-items:center;
    justify-content:center;gap:9px;font-size:15px;color:#4a4a52}
  .url svg{opacity:.45;flex:0 0 auto}
  .url b{font-weight:600;color:#1a1a2e}
  iframe{width:1080px;height:1284px;border:0;display:block}
</style></head><body>
  <div class="bar">
    <span class="dots"><i></i><i></i><i></i></span>
    <span class="url">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
        <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      </svg>
      portalstudio.co.il<b>/creation</b>
    </span>
  </div>
  <iframe id="f" src="/creation"></iframe>
</body></html>`;

fs.writeFileSync(WRAPPER, WRAPPER_HTML, 'utf8');
fs.mkdirSync(path.dirname(OUT), { recursive: true });

try {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.goto(URL_, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const frame = page.frames().find((f) => f.url().includes('/creation'));
  if (frame) {
    await frame.evaluate(() => document.fonts.ready);
    await frame.evaluate(async () => {
      await Promise.all(
        [...document.images].map((i) =>
          i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)),
        ),
      );
    });
  }

  // Widgets (chat bubble, accessibility, cookie bar) mount on the client a beat
  // after load — wait for them, then strip every floater except the site nav.
  await new Promise((r) => setTimeout(r, 3000));

  if (frame) {
    await frame.evaluate(() => {
      const nav = document.querySelector('header, nav');
      for (const el of document.querySelectorAll('body *')) {
        if (nav && (el === nav || nav.contains(el) || el.contains(nav))) continue;
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' || cs.position === 'sticky') {
          el.style.setProperty('display', 'none', 'important');
        }
      }
      for (const el of document.querySelectorAll('nextjs-portal')) el.remove();
      document.documentElement.style.scrollbarWidth = 'none';
    });
  }
  await new Promise((r) => setTimeout(r, 400));

  await page.screenshot({ path: OUT });
  await browser.close();
  console.log(`wrote ${OUT} (1080x1350 @2x)`);
} finally {
  fs.rmSync(WRAPPER, { force: true });
}
