import sharp from "sharp";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../public/logos/AfrikaIkalafe-Full-colour.png");
const OUT = path.resolve(__dirname, "../public/logos/AfrikaIkalafe-horizontal.png");

// Original: 800 x 822
const SRC_W = 800;
const SRC_H = 822;

// Visual split points (pixels from top)
const ICON_BOTTOM = 570;   // bottom edge of the icon mark (generous)
const TEXT_TOP    = 555;   // top of the text zone
const TEXT_LEFT   = 100;   // tight horizontal crop on text
const TEXT_RIGHT  = 700;

const TARGET_H = 120; // output height in logical px (saved @2x)
const GAP = 24;

async function getTransparentRaw() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    if (px[i] > 238 && px[i + 1] > 238 && px[i + 2] > 238) {
      px[i + 3] = 0; // near-white → transparent
    }
  }
  return { raw: px, width: info.width, height: info.height };
}

async function main() {
  const { raw, width, height } = await getTransparentRaw();

  // Helper: extract a region from the raw RGBA buffer as a PNG buffer
  const extract = (left, top, w, h) =>
    sharp(raw, { raw: { width, height, channels: 4 } })
      .extract({ left, top, width: w, height: h })
      .png()
      .toBuffer();

  // 1. Icon region — full width, top portion; then auto-trim transparent edges
  const iconRaw = await extract(0, 0, SRC_W, ICON_BOTTOM);
  const iconTrimmed = await sharp(iconRaw).trim({ threshold: 10 }).png().toBuffer();
  const iconMeta = await sharp(iconTrimmed).metadata();
  const iconScale = TARGET_H / iconMeta.height;
  const iconW = Math.round(iconMeta.width * iconScale);
  const iconBuf = await sharp(iconTrimmed)
    .resize(iconW, TARGET_H, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 2. Text region — tight crop
  const txtW = TEXT_RIGHT - TEXT_LEFT;
  const txtH = SRC_H - TEXT_TOP;
  const textPng = await extract(TEXT_LEFT, TEXT_TOP, txtW, txtH);
  const textScale = TARGET_H / txtH;
  const textW = Math.round(txtW * textScale);
  const textBuf = await sharp(textPng)
    .resize(textW, TARGET_H, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // 3. Compose side by side
  const totalW = iconW + GAP + textW;

  const composed = await sharp({
    create: {
      width: totalW,
      height: TARGET_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: iconBuf, left: 0,           top: 0 },
      { input: textBuf, left: iconW + GAP, top: 0 },
    ])
    .png()
    .toBuffer();

  // Save @2x for retina
  const final = await sharp(composed)
    .resize(totalW * 2, TARGET_H * 2, { kernel: "lanczos3" })
    .png()
    .toBuffer();

  writeFileSync(OUT, final);
  console.log(`✓ Saved → ${OUT}`);
  console.log(`  Canvas: ${totalW * 2} × ${TARGET_H * 2}px (@2x, transparent bg)`);
}

main().catch(console.error);
