const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function buildAllBrandAssets() {
  console.log('--- Processing Official Cascade Brand Assets (Dark Theme Optimized) ---');

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

  // 2. Convert ink pixels:
  // Original black ink (luma < 120) -> Pure White to Electric Cyan gradient (#ffffff -> #00F2FE)
  // Original white paper (luma >= 120) -> Transparent
  const { data, info } = await sharp(trimmedEmblem.data).raw().toBuffer({ resolveWithObject: true });
  const outBuf = Buffer.alloc(data.length);

  for (let y = 0; y < info.height; y++) {
    const t = y / info.height; // 0 at top, 1 at bottom
    // Top is pure crisp white (#ffffff), bottom is electric cyan (#00F2FE = 0, 242, 254)
    const cr = Math.round(255 * (1 - t * 0.45)); // 255 -> 140
    const cg = Math.round(255 * (1 - t * 0.05)); // 255 -> 242
    const cb = 255; // 255

    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a < 30) {
        outBuf[idx] = 0;
        outBuf[idx + 1] = 0;
        outBuf[idx + 2] = 0;
        outBuf[idx + 3] = 0;
        continue;
      }

      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      if (luma < 130) {
        // Logo ink stroke
        // Smooth anti-aliasing edge falloff:
        const edgeAlpha = Math.min(255, Math.max(0, Math.round(a * (1 - luma / 130) * 1.15)));
        outBuf[idx] = cr;
        outBuf[idx + 1] = cg;
        outBuf[idx + 2] = cb;
        outBuf[idx + 3] = edgeAlpha;
      } else {
        // Cutout paper
        outBuf[idx] = 0;
        outBuf[idx + 1] = 0;
        outBuf[idx + 2] = 0;
        outBuf[idx + 3] = 0;
      }
    }
  }

  // 3. Create high-res 512x512 square centered emblem with 8% padding (fills 84% of box)
  const emblemProcessed = await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
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
        input: await sharp(emblemProcessed).resize(450, 450, { fit: 'inside' }).toBuffer(),
        gravity: 'center',
      },
    ])
    .png()
    .toBuffer();

  // Save official logo files
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  fs.writeFileSync(path.join(publicDir, 'cascade-logo.png'), square512);
  fs.writeFileSync(path.join(publicDir, 'cascade-emblem.png'), square512);
  console.log('Saved public/cascade-logo.png (512x512 high-res white/cyan emblem on transparent)');

  // 4. Generate multi-resolution Favicon
  // 32x32 and 48x48
  const fav32 = await sharp(square512).resize(32, 32).png().toBuffer();
  const fav48 = await sharp(square512).resize(48, 48).png().toBuffer();
  const fav192 = await sharp(square512).resize(192, 192).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), fav32);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), fav32);
  fs.writeFileSync(path.join(appDir, 'icon.png'), fav32);
  console.log('Saved favicons (32x32 & 48x48)');

  // 5. Apple Touch Icon (180x180 on dark squircle canvas)
  const appleTouchSvg = `
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#0a1835" />
          <stop offset="100%" stop-color="#03050a" />
        </radialGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2"/>
        </linearGradient>
      </defs>
      <rect width="180" height="180" rx="40" fill="url(#bgGlow)"/>
      <rect x="1.5" y="1.5" width="177" height="177" rx="38.5" fill="none" stroke="url(#ringGrad)" stroke-width="2"/>
    </svg>
  `;
  const appleTouchBg = await sharp(Buffer.from(appleTouchSvg)).png().toBuffer();
  const emblem130 = await sharp(square512).resize(130, 130).toBuffer();

  const appleTouchFinal = await sharp(appleTouchBg)
    .composite([{ input: emblem130, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchFinal);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleTouchFinal);
  console.log('Saved Apple Touch Icons (180x180)');

  // 6. 1200x630 Social Share Preview Banner (OpenGraph / Twitter)
  const emblem240 = await sharp(square512).resize(240, 240).toBuffer();
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
      <g transform="translate(420, 140)">
        <rect width="360" height="38" rx="19" fill="#022a3a" stroke="#00F2FE" stroke-opacity="0.4" stroke-width="1"/>
        <circle cx="22" cy="19" r="4.5" fill="#00F2FE"/>
        <text x="36" y="24" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#00F2FE" letter-spacing="1.5">NEXT-GEN TECHNOLOGY PARTNER</text>
      </g>

      <!-- Title -->
      <text x="420" y="245" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">CascadeTech <tspan fill="url(#textGrad)">Solutions</tspan></text>

      <!-- Tagline -->
      <text x="420" y="300" font-family="system-ui, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">
        Delivering Intelligent and Scalable Digital Solutions
      </text>

      <!-- Descriptions -->
      <text x="420" y="340" font-family="system-ui, sans-serif" font-size="16" font-weight="400" fill="#64748b">
        High-Performance Web Platforms • Enterprise Software • Applied AI Systems
      </text>

      <!-- Product Badges -->
      <g transform="translate(420, 390)">
        <rect width="210" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="18" y="27" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Educore ERP</text>
        <rect x="135" y="11" width="60" height="22" rx="6" fill="#0284c7" fill-opacity="0.25"/>
        <text x="144" y="26" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <g transform="translate(645, 390)">
        <rect width="210" height="44" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="18" y="27" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#ffffff">Nestora Hub</text>
        <rect x="135" y="11" width="60" height="22" rx="6" fill="#0284c7" fill-opacity="0.25"/>
        <text x="144" y="26" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">LIVE</text>
      </g>

      <!-- Footer Domain -->
      <text x="420" y="490" font-family="system-ui, sans-serif" font-size="17" font-weight="600" fill="#00F2FE">
        https://www.cascade-erp.in
      </text>
      <text x="730" y="490" font-family="system-ui, sans-serif" font-size="14" font-weight="400" fill="#475569">
        • Vidya-Nagar, Hubballi, Karnataka
      </text>
    </svg>
  `;

  const ogCard = await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: emblem240,
        left: 120,
        top: 170,
      },
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogCard);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogCard);
  console.log('Saved 1200x630 Social Preview Card');
}

buildAllBrandAssets().catch((err) => {
  console.error('Asset build error:', err);
  process.exit(1);
});
