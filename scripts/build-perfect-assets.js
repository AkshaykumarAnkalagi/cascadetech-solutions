const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function buildAll() {
  const sourceFile = path.join(__dirname, '..', 'assets', 'Cascade_Logo-Photoroom.png');
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  const { data, info } = await sharp(sourceFile).raw().toBuffer({ resolveWithObject: true });

  // Content bounds in original 854x854:
  // x: 50 to 787 (w: 737)
  // y: 60 to 656 (h: 596)
  const minX = 50, maxX = 787, minY = 60, maxY = 656;
  const cropW = maxX - minX, cropH = maxY - minY;

  // 1. Build the High-Contrast Cyan-and-White Logo (Ideal for dark website theme)
  const logoBuf = Buffer.alloc(cropW * cropH * 4);

  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const srcIdx = (y * info.width + x) * 4;
      const dstIdx = ((y - minY) * cropW + (x - minX)) * 4;
      const a = data[srcIdx + 3];
      if (a < 15) continue;

      const r = data[srcIdx], g = data[srcIdx + 1], b = data[srcIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (y >= 505) {
        // --- CASCADE TEXT ---
        // Crisp, luminous pure white #FFFFFF
        logoBuf[dstIdx] = 255;
        logoBuf[dstIdx + 1] = 255;
        logoBuf[dstIdx + 2] = 255;
        logoBuf[dstIdx + 3] = a;
      } else {
        // --- TRIANGLE ---
        if (lum > 120) {
          // White stylized body / ribbon
          logoBuf[dstIdx] = 255;
          logoBuf[dstIdx + 1] = 255;
          logoBuf[dstIdx + 2] = 255;
          logoBuf[dstIdx + 3] = a;
        } else {
          // Outer contour, base line, and facet
          // Radiant cyan #00F2FE
          logoBuf[dstIdx] = 0;
          logoBuf[dstIdx + 1] = 242;
          logoBuf[dstIdx + 2] = 254;
          logoBuf[dstIdx + 3] = a;
        }
      }
    }
  }

  const finalLogo = await sharp(logoBuf, { raw: { width: cropW, height: cropH, channels: 4 } }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'cascade-logo.png'), finalLogo);
  console.log('Saved public/cascade-logo.png (737x596)');

  // 2. Build square icon for favicons (512x512)
  const squareIcon = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 5, g: 7, b: 14, alpha: 1 } // dark bg matching site
    }
  })
    .composite([
      {
        input: await sharp(finalLogo).resize(440, 440, { fit: 'inside' }).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon.png'), squareIcon);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), squareIcon);
  fs.writeFileSync(path.join(appDir, 'icon.png'), squareIcon);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), squareIcon);

  // Also create 32x32 favicon.ico
  const ico32 = await sharp(squareIcon).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), ico32);
  console.log('Saved favicons and app icons');

  // 3. Build WhatsApp / OpenGraph 1200x630 JPEG
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow1" cx="25%" cy="35%" r="55%">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#05070E" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="bgGlow2" cx="80%" cy="65%" r="60%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#05070E" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00F2FE"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="#05070E"/>
      <rect width="1200" height="630" fill="url(#bgGlow1)"/>
      <rect width="1200" height="630" fill="url(#bgGlow2)"/>

      <!-- Ambient grid -->
      <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
        <line x1="0" y1="105" x2="1200" y2="105"/>
        <line x1="0" y1="210" x2="1200" y2="210"/>
        <line x1="0" y1="315" x2="1200" y2="315"/>
        <line x1="0" y1="420" x2="1200" y2="420"/>
        <line x1="0" y1="525" x2="1200" y2="525"/>
        <line x1="200" y1="0" x2="200" y2="630"/>
        <line x1="400" y1="0" x2="400" y2="630"/>
        <line x1="600" y1="0" x2="600" y2="630"/>
        <line x1="800" y1="0" x2="800" y2="630"/>
        <line x1="1000" y1="0" x2="1000" y2="630"/>
      </g>

      <!-- Badge -->
      <g transform="translate(440, 135)">
        <rect width="360" height="38" rx="19" fill="#022a3a" stroke="#00F2FE" stroke-opacity="0.5" stroke-width="1.5"/>
        <circle cx="22" cy="19" r="4.5" fill="#00F2FE"/>
        <text x="36" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#00F2FE" letter-spacing="1.5">NEXT-GEN TECHNOLOGY PARTNER</text>
      </g>

      <!-- Brand Heading -->
      <text x="440" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">CascadeTech <tspan fill="url(#titleGrad)">Solutions</tspan></text>

      <!-- Tagline -->
      <text x="440" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#cbd5e1">
        Delivering Intelligent and Scalable Digital Solutions
      </text>

      <!-- Subtitle -->
      <text x="440" y="338" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#94a3b8">
        High-Performance Web Platforms • Enterprise Software • Applied AI Systems
      </text>

      <!-- Product badges -->
      <g transform="translate(440, 385)">
        <rect width="200" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="16" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Educore ERP</text>
        <rect x="130" y="11" width="55" height="22" rx="6" fill="#0284c7" fill-opacity="0.3"/>
        <text x="139" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <g transform="translate(655, 385)">
        <rect width="200" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="16" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Nestora Hub</text>
        <rect x="130" y="11" width="55" height="22" rx="6" fill="#0284c7" fill-opacity="0.3"/>
        <text x="139" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <g transform="translate(870, 385)">
        <rect width="180" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="16" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#ffffff">GovOS</text>
        <rect x="110" y="11" width="55" height="22" rx="6" fill="#059669" fill-opacity="0.3"/>
        <text x="119" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#34d399">LIVE</text>
      </g>

      <!-- Domain link -->
      <text x="440" y="485" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#00F2FE">
        https://www.cascade-erp.in
      </text>
      <text x="740" y="485" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#64748b">
        • Vidya-Nagar, Hubballi, Karnataka
      </text>
    </svg>
  `;

  // Place logo nicely in the left area of the 1200x630 card
  const logoResized = await sharp(finalLogo).resize(300, 245, { fit: 'inside' }).toBuffer();

  const ogJpg = await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: logoResized,
        left: 95,
        top: 190
      }
    ])
    .jpeg({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogJpg);
  console.log('Saved public/og-image.jpg, size:', (ogJpg.length / 1024).toFixed(1) + ' KB');
}

buildAll().catch(err => {
  console.error(err);
  process.exit(1);
});
