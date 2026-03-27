/**
 * process-presenters.mjs
 * Afrika Ikalafe — Presenter portrait batch processor
 *
 * Downloads images from a local staging folder (populated from G-Drive),
 * crops them to 600×750px (4:5) using Sharp's attention-based auto-crop,
 * and writes the results to /public/images/presenters/.
 *
 * Usage:
 *   node scripts/process-presenters.mjs             — process all
 *   node scripts/process-presenters.mjs --preview   — log what would happen, no writes
 *   node scripts/process-presenters.mjs liz-hall    — process one presenter by id
 *
 * Source folder:  scripts/presenter-raw/
 * Output folder:  public/images/presenters/
 *
 * Naming convention: file in presenter-raw/ must match the presenter id
 * from data/presenters.ts (e.g. liz-hall.jpg, francoise-verges.jpg)
 */

import sharp from 'sharp'
import fs    from 'fs'
import path  from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const ROOT       = path.resolve(__dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'scripts', 'presenter-raw')
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'presenters')

// ── Target dimensions ─────────────────────────────────────────
const OUTPUT_WIDTH   = 600
const OUTPUT_HEIGHT  = 750   // 4:5 ratio — matches .presenter-card__photo-wrap
const JPEG_QUALITY   = 92

// ── Known presenter IDs (matches data/presenters.ts) ─────────
const PRESENTER_IDS = [
  'mmatshilo-motsei',
  'liz-hall',
  'darlene-miller',
  'jessica-horn',
  'francoise-verges',
  'lyn-ossome',
  'rochelle-webster-nembhard',
]

// ── CLI args ──────────────────────────────────────────────────
const args      = process.argv.slice(2)
const preview   = args.includes('--preview')
const filterArg = args.find(a => !a.startsWith('--'))
const targets   = filterArg
  ? PRESENTER_IDS.filter(id => id === filterArg)
  : PRESENTER_IDS

// ── Helpers ───────────────────────────────────────────────────
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.heic']

function findSourceFile(id) {
  for (const ext of SUPPORTED_EXTS) {
    const p = path.join(SOURCE_DIR, `${id}${ext}`)
    if (fs.existsSync(p)) return p
  }
  return null
}

function formatBytes(bytes) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`
}

// ── Main ──────────────────────────────────────────────────────
async function run() {
  // Ensure directories exist
  fs.mkdirSync(SOURCE_DIR, { recursive: true })
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log(`\nAfrika Ikalafe — Presenter Image Processor`)
  console.log(`${'─'.repeat(48)}`)
  console.log(`Source : ${SOURCE_DIR}`)
  console.log(`Output : ${OUTPUT_DIR}`)
  console.log(`Mode   : ${preview ? 'PREVIEW (no writes)' : 'WRITE'}`)
  console.log(`${'─'.repeat(48)}\n`)

  if (filterArg && targets.length === 0) {
    console.error(`✗  Unknown presenter id: "${filterArg}"`)
    console.error(`   Valid ids: ${PRESENTER_IDS.join(', ')}`)
    process.exit(1)
  }

  const results = { ok: [], missing: [], error: [] }

  for (const id of targets) {
    const src = findSourceFile(id)
    const out = path.join(OUTPUT_DIR, `${id}.jpg`)

    if (!src) {
      console.log(`⚪  ${id.padEnd(36)} — no source file in presenter-raw/`)
      results.missing.push(id)
      continue
    }

    // Get source metadata
    const meta     = await sharp(src).metadata()
    const srcSize  = fs.statSync(src).size
    const srcLabel = `${meta.width}×${meta.height} (${formatBytes(srcSize)})`

    if (preview) {
      console.log(`🔍  ${id.padEnd(36)} ${srcLabel} → ${OUTPUT_WIDTH}×${OUTPUT_HEIGHT} JPEG ${JPEG_QUALITY}%`)
      results.ok.push(id)
      continue
    }

    try {
      const info = await sharp(src)
        .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, {
          fit:      'cover',
          position: 'attention', // Smart crop — finds the most visually significant region
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(out)

      const outSize = formatBytes(info.size)
      console.log(`✓   ${id.padEnd(36)} ${srcLabel} → ${info.width}×${info.height} ${outSize}`)
      results.ok.push(id)

    } catch (err) {
      console.error(`✗   ${id.padEnd(36)} ERROR: ${err.message}`)
      results.error.push(id)
    }
  }

  // ── Summary ──────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(48)}`)
  console.log(`Processed : ${results.ok.length}`)
  if (results.missing.length) {
    console.log(`Missing   : ${results.missing.length} — ${results.missing.join(', ')}`)
  }
  if (results.error.length) {
    console.log(`Errors    : ${results.error.length} — ${results.error.join(', ')}`)
  }

  if (!preview && results.ok.length > 0) {
    console.log(`\nNext steps:`)
    console.log(`  1. Review output in public/images/presenters/`)
    console.log(`  2. git add public/images/presenters/ && git commit -m "Add presenter portraits"`)
    console.log(`  3. git push  →  Vercel auto-deploys`)
  }

  console.log('')
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
