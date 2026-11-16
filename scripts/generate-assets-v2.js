const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function buildAllBrandAssets() {
  console.log('--- Processing Authentic Brand Assets (Original Colors #140605 & #fefaf7) ---');

  const sourceFile = path.join(__dirname, '..', 'assets', 'Cascade_Logo-Photoroom.png');
  if (!fs.existsSync(sourceFile)) {
    throw new Error('Source file not found at ' + sourceFile);
  }

  // 1. Extract emblem mark (rows 50 to 470)
  const emblemRaw = await sharp(sourceFile)
    .extract({ left: 40, top: 50, width: 770, height: 425 })
    .toBuffer();

  const trimmedEmblem = await sharp(emblemRaw).trim().toBuffer({ resolveWithObject: true });
  console.log(`Trimmed emblem: ${trimmedEmblem.info.width}x${trimmedEmblem.info.height}`);

  // 2. Preserve 100% authentic original pixel colors:
  // The emblem from PhotoRoom has:
  // - Dark strokes: #140605 (deep charcoal/black)
  // - Inner triangle fill: #fefaf7 (warm white)
  // - Outer background: Transparent (a < 30)
  // We keep the original pixel colors EXACTLY as designed!
  const { data, info } = await sharp(trimmedEmblem.data).raw().toBuffer({ resolveWithObject: true });
  const outBuf = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 25) {
      // Outer transparent area
      outBuf[i] = 0;
      outBuf[i + 1] = 0;
      outBuf[i + 2] = 0;
      outBuf[i + 3] = 0;
    } else {
      // Keep authentic brand colors exactly
      outBuf[i] = r;
      outBuf[i + 1] = g;
      outBuf[i + 2] = b;
      outBuf[i + 3] = a;
    }
  }

  // 3. Create high-res 512x512 square centered emblem with 6% balanced padding (fills 88% of container)
  const emblemOriginal = await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();

  const square512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(emblemOriginal).resize(460, 460, { fit: 'inside' }).toBuffer(),
        gravity: 'center',
      },
    ])
    .png()
    .toBuffer();

  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  fs.writeFileSync(path.join(publicDir, 'cascade-logo.png'), square512);
  fs.writeFileSync(path.join(publicDir, 'cascade-emblem.png'), square512);
  console.log('Saved public/cascade-logo.png (512x512 authentic logo on transparent)');

  // 4. Generate Favicons:
  // For browser tabs (which can be dark or light mode):
  // Put the original emblem on a clean, rounded white squircle badge so it pops in all browser tabs!
  const makeFaviconCanvas = async (size) => {
    const padding = Math.round(size * 0.12);
    const innerSize = size - padding * 2;
    const rx = Math.round(size * 0.22);

    const bgSvg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${rx}" fill="#ffffff"/>
      </svg>
    `;
    const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();
    const emblemResized = await sharp(square512).resize(innerSize, innerSize, { fit: 'inside' }).toBuffer();

    return await sharp(bg)
      .composite([{ input: emblemResized, gravity: 'center' }])
      .png()
      .toBuffer();
  };

  const fav32 = await makeFaviconCanvas(32);
  const fav48 = await makeFaviconCanvas(48);
  const fav192 = await makeFaviconCanvas(192);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), fav32);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), fav32);
  fs.writeFileSync(path.join(appDir, 'icon.png'), fav32);
  console.log('Saved favicons with crisp white squircle backing (32x32 & 48x48)');

  // 5. Apple Touch Icon (180x180 on crisp white rounded squircle canvas)
  const appleTouch = await makeFaviconCanvas(180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleTouch);
  console.log('Saved Apple Touch Icons (180x180)');

  // 6. Universal 1200x630 Social Share Preview Banner (OpenGraph / WhatsApp / Twitter)
  // Put the authentic logo inside a prominent white rounded card on the left side of the banner!
  const whiteCardSvg = `
    <svg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#00F2FE" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="260" height="260" rx="36" fill="#ffffff" filter="url(#cardShadow)"/>
    </svg>
  `;
  const whiteCardBg = await sharp(Buffer.from(whiteCardSvg)).png().toBuffer();
  const emblemInCard = await sharp(square512).resize(220, 220, { fit: 'inside' }).toBuffer();
  const logoCard = await sharp(whiteCardBg)
    .composite([{ input: emblemInCard, gravity: 'center' }])
    .png()
    .toBuffer();

  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="25%" cy="35%" r="50%">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#05070E" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="80%" cy="65%" r="55%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#05070E" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00F2FE"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="#05070E"/>
      <rect width="1200" height="630" fill="url(#glow1)"/>
      <rect width="1200" height="630" fill="url(#glow2)"/>

      <!-- Grid lines -->
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
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
      <g transform="translate(430, 140)">
        <rect width="360" height="38" rx="19" fill="#022a3a" stroke="#00F2FE" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="22" cy="19" r="4.5" fill="#00F2FE"/>
        <text x="36" y="24" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#00F2FE" letter-spacing="1.5">NEXT-GEN TECHNOLOGY PARTNER</text>
      </g>

      <!-- Title -->
      <text x="430" y="245" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">CascadeTech <tspan fill="url(#textGrad)">Solutions</tspan></text>

      <!-- Tagline -->
      <text x="430" y="300" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">
        Delivering Intelligent and Scalable Digital Solutions
      </text>

      <!-- Descriptions -->
      <text x="430" y="340" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#64748b">
        High-Performance Web Platforms • Enterprise Software • Applied AI Systems
      </text>

      <!-- Product Badges -->
      <g transform="translate(430, 390)">
        <rect width="210" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="18" y="27" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Educore ERP</text>
        <rect x="135" y="11" width="60" height="22" rx="6" fill="#0284c7" fill-opacity="0.25"/>
        <text x="144" y="26" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <g transform="translate(655, 390)">
        <rect width="210" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="18" y="27" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Nestora Hub</text>
        <rect x="135" y="11" width="60" height="22" rx="6" fill="#0284c7" fill-opacity="0.25"/>
        <text x="144" y="26" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <!-- Footer Domain -->
      <text x="430" y="490" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="600" fill="#00F2FE">
        https://www.cascade-erp.in
      </text>
      <text x="740" y="490" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="400" fill="#475569">
        • Vidya-Nagar, Hubballi, Karnataka
      </text>
    </svg>
  `;

  const ogCard = await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: logoCard,
        left: 110,
        top: 160,
      },
    ])
    .png()
    .toBuffer();

  // Save both PNG and highly-optimized JPEG (optimal for WhatsApp Web / Android / iOS)
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogCard);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogCard);

  const ogJpeg = await sharp(ogCard)
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogJpeg);
  console.log(`Saved 1200x630 Social Preview Cards: PNG (${ogCard.length} bytes), JPEG (${ogJpeg.length} bytes)`);
}

buildAllBrandAssets().catch((err) => {
  console.error('Asset build error:', err);
  process.exit(1);
});
