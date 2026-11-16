const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateAssets() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const appDir = path.join(__dirname, '..', 'src', 'app');

  const srcLogo = path.join(__dirname, '..', 'assets', 'Cascade_Logo-Photoroom.png');
  
  if (!fs.existsSync(srcLogo)) {
    throw new Error('Source logo not found at: ' + srcLogo);
  }

  // 1. Copy & optimize main logo
  await sharp(srcLogo)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'cascade-logo.png'));
  console.log('Created public/cascade-logo.png');

  // 2. Icon 32x32 for tab
  await sharp(srcLogo)
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, 'icon.png'));
  await sharp(srcLogo)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('Created icon.png (32x32)');

  // 3. Apple Touch Icon 180x180
  await sharp(srcLogo)
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));
  await sharp(srcLogo)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-icon.png (180x180)');

  // 4. Favicon
  await sharp(srcLogo)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(srcLogo)
    .resize(32, 32)
    .toFile(path.join(appDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  // 5. 1200x630 High-Impact Social Preview (OpenGraph / Twitter Card)
  const logoResized = await sharp(srcLogo).resize(280, 280).png().toBuffer();
  const logoB64 = 'data:image/png;base64,' + logoResized.toString('base64');

  const svgBanner = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="20%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#05070E" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="85%" cy="80%" r="50%">
          <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#05070E" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="70%" stop-color="#E0F2FE"/>
          <stop offset="100%" stop-color="#00F2FE"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="#05070E"/>
      <rect width="1200" height="630" fill="url(#glow1)"/>
      <rect width="1200" height="630" fill="url(#glow2)"/>

      <!-- Grid lines subtle -->
      <g stroke="rgba(255,255,255,0.05)" stroke-width="1">
        <line x1="0" y1="120" x2="1200" y2="120"/>
        <line x1="0" y1="240" x2="1200" y2="240"/>
        <line x1="0" y1="360" x2="1200" y2="360"/>
        <line x1="0" y1="480" x2="1200" y2="480"/>
        <line x1="200" y1="0" x2="200" y2="630"/>
        <line x1="400" y1="0" x2="400" y2="630"/>
        <line x1="600" y1="0" x2="600" y2="630"/>
        <line x1="800" y1="0" x2="800" y2="630"/>
        <line x1="1000" y1="0" x2="1000" y2="630"/>
      </g>

      <!-- Outer border frame -->
      <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="rgba(0, 242, 254, 0.3)" stroke-width="2"/>

      <!-- Category Pill -->
      <g transform="translate(80, 95)">
        <rect width="280" height="36" rx="18" fill="rgba(0, 242, 254, 0.12)" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1"/>
        <text x="140" y="23" fill="#00F2FE" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" text-anchor="middle">ENTERPRISE DIGITAL SOLUTIONS</text>
      </g>

      <!-- Main Headline -->
      <text x="80" y="200" fill="url(#titleGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="800" letter-spacing="-0.5">CascadeTech Solutions</text>
      <text x="80" y="260" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500">Delivering Intelligent and Scalable Digital Solutions</text>

      <!-- Value Proposition / Badges -->
      <g transform="translate(80, 340)">
        <!-- Badge 1: Educore ERP -->
        <g transform="translate(0, 0)">
          <rect width="260" height="54" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1.5"/>
          <circle cx="28" cy="27" r="7" fill="#00F2FE"/>
          <text x="48" y="33" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Educore ERP</text>
          <text x="160" y="33" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="600">LIVE ERP</text>
        </g>

        <!-- Badge 2: Nestora Hub -->
        <g transform="translate(280, 0)">
          <rect width="260" height="54" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1.5"/>
          <circle cx="28" cy="27" r="7" fill="#3B82F6"/>
          <text x="48" y="33" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Nestora Hub</text>
          <text x="160" y="33" fill="#60A5FA" font-family="monospace" font-size="11" font-weight="600">LIVE PORTAL</text>
        </g>
      </g>

      <!-- Footer Info -->
      <g transform="translate(80, 520)">
        <text x="0" y="0" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="15" font-weight="600">Vidya-Nagar, Hubballi, Karnataka</text>
        <text x="0" y="26" fill="#38BDF8" font-family="system-ui, sans-serif" font-size="16" font-weight="700">www.cascade-erp.in</text>
      </g>

      <!-- Logo on Right side with halo glow -->
      <circle cx="950" cy="315" r="160" fill="rgba(0, 242, 254, 0.12)"/>
      <image href="${logoB64}" x="810" y="175" width="280" height="280"/>
    </svg>
  `;

  await sharp(Buffer.from(svgBanner))
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.png'));
  
  await sharp(Buffer.from(svgBanner))
    .png({ quality: 95 })
    .toFile(path.join(appDir, 'opengraph-image.png'));

  console.log('Created og-image.png and opengraph-image.png (1200x630)');
}

generateAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
