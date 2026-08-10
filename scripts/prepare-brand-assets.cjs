// One-off asset pipeline: derives web-ready brand assets from /brand source files.
// Run with: node scripts/prepare-brand-assets.cjs
const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'brand');
const OUT = path.join(__dirname, '..', 'apps', 'web', 'public', 'brand');

const NAVY = { r: 0x13, g: 0x1f, b: 0x48 };

async function chromaKeyToTransparent(inputPath, bg, tolerance = 40) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const dr = data[i] - bg.r;
    const dg = data[i + 1] - bg.g;
    const db = data[i + 2] - bg.b;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < tolerance) {
      data[i + 3] = 0;
    } else if (dist < tolerance * 2.2) {
      // soften edge
      const t = (dist - tolerance) / (tolerance * 1.2);
      data[i + 3] = Math.round(255 * Math.min(1, Math.max(0, t)));
    }
  }
  return sharp(data, { raw: { width, height, channels } }).png();
}

async function main() {
  // 1. Header wordmark (light background) — trim the flat red/gold logo.
  await sharp(path.join(SRC, 'terra-nexus-flat.png'))
    .trim()
    .resize({ height: 240 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'logo-wordmark.png'));

  // 2. Footer wordmark (dark navy background) — key out the navy fill so it's
  //    a transparent white wordmark that sits flush on the site's navy footer.
  const darkKeyed = await chromaKeyToTransparent(
    path.join(SRC, 'TerraNexus-DarkLogo-Crop.png'),
    NAVY,
    36
  );
  await darkKeyed
    .trim()
    .resize({ height: 240 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'logo-wordmark-dark.png'));

  // 3. Star mark alone (trimmed, transparent) for small inline uses.
  await sharp(path.join(SRC, 'star_favicon.png'))
    .trim()
    .resize({ height: 480 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'star-mark.png'));

  // 4. Favicon source: navy square with the gold star centered, generous padding.
  const starTrimmed = await sharp(path.join(SRC, 'star_favicon.png')).trim().toBuffer();
  const starMeta = await sharp(starTrimmed).metadata();
  const CANVAS = 512;
  const PAD = 0.72; // star occupies ~72% of canvas
  const starTargetH = Math.round(CANVAS * PAD);
  const starResized = await sharp(starTrimmed)
    .resize({ height: starTargetH })
    .toBuffer();
  const starResizedMeta = await sharp(starResized).metadata();

  const faviconMaster = sharp({
    create: {
      width: CANVAS,
      height: CANVAS,
      channels: 4,
      background: { r: NAVY.r, g: NAVY.g, b: NAVY.b, alpha: 1 },
    },
  }).composite([
    {
      input: starResized,
      left: Math.round((CANVAS - starResizedMeta.width) / 2),
      top: Math.round((CANVAS - starResizedMeta.height) / 2),
    },
  ]);

  const faviconBuf = await faviconMaster.png().toBuffer();

  const sizes = [16, 32, 48, 180, 192, 512];
  for (const size of sizes) {
    await sharp(faviconBuf)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `favicon-${size}.png`));
  }
  // apple-touch-icon convention
  await sharp(faviconBuf)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'apple-touch-icon.png'));

  // 5. Social share image (og:image) — 1200x630, navy bg, logo centered.
  const wordmarkForOg = await sharp(path.join(SRC, 'terra-nexus-flat.png')).trim().toBuffer();
  const wordmarkOgResized = await sharp(wordmarkForOg).resize({ width: 900 }).toBuffer();
  const wordmarkOgMeta = await sharp(wordmarkOgResized).metadata();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: NAVY.r, g: NAVY.g, b: NAVY.b, alpha: 1 },
    },
  })
    .composite([
      {
        input: wordmarkOgResized,
        left: Math.round((1200 - wordmarkOgMeta.width) / 2),
        top: Math.round((630 - wordmarkOgMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'og-image.png'));

  console.log('Brand assets written to', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
