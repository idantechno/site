// Regenerate the board's WhatsApp QR as a crisp SVG.
//
//   node ads/make-qr.mjs "היי, ראיתי אתכם בקניון"
//
// Error correction is deliberately 'L': the QR is shown on a clean, bright LED
// screen, never printed or damaged, so the redundancy of M/Q only buys fewer,
// smaller modules — which is exactly what hurts a scan from a few metres away.
import QR from 'qrcode';
import fs from 'node:fs';

const NUMBER = '972515223921';
const msg = process.argv[2] ?? 'היי, ראיתי אתכם בקניון';
const out = process.argv[3] ?? 'ads/mall-board/qr.svg';

const url = `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
const qr = QR.create(url, { errorCorrectionLevel: 'L' });
const { size, data } = qr.modules;

let d = '';
for (let y = 0; y < size; y++)
  for (let x = 0; x < size; x++) if (data[y * size + x]) d += `M${x} ${y}h1v1h-1z`;

const vb = size + 4; // 2-module quiet zone each side
fs.writeFileSync(
  out,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ${vb} ${vb}" shape-rendering="crispEdges">` +
    `<rect x="-2" y="-2" width="${vb}" height="${vb}" fill="#ffffff"/>` +
    `<path d="${d}" fill="#062340"/></svg>`,
);
console.log(`${out}: ${size}x${size} modules — ${url}`);
