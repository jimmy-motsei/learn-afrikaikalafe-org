"""
Run 2 — Afrika Ikalafe: All 6 Presenter Carousels
Each carousel = 3 slides:
  [prefix]-01-cover.png       (cover PDF, no portrait)
  [prefix]-02-presenter.png   (session PDF + portrait composite)
  [prefix]-03-cta.png         (CTA PDF, no portrait)

Portrait compositing matches the website's PresenterCard reference treatment:
  - Centre-crop to 480×600px
  - Rounded rectangle mask, corner-radius 24px
  - Left-edge fade gradient (80px, transparent → opaque) — blends portrait
    into slide background
  - Bottom gradient overlay matching .presenter-card__photo-overlay:
      rgba(28,18,8, 0→0.25) over bottom 40% of portrait height
      Brand colour: --color-earth #1C1208
"""

from pathlib import Path
import fitz
from PIL import Image, ImageDraw
import numpy as np

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE        = Path("/Users/ramoloimotsei/learn-afrikaikalafe-org/public/images/Instagram")
PRESENTERS  = Path("/Users/ramoloimotsei/learn-afrikaikalafe-org/public/images/presenters")
OUT         = BASE / "output"
OUT.mkdir(parents=True, exist_ok=True)

TARGET_W, TARGET_H = 1080, 1350
DPI_MATRIX = fitz.Matrix(300 / 72, 300 / 72)

# Brand colour for bottom overlay — --color-earth
EARTH_R, EARTH_G, EARTH_B = 28, 18, 8

# ── Carousel definitions ──────────────────────────────────────────────────────
CAROUSELS = [
    {
        "prefix":   "carousel-motsei",
        "name":     "Dr Mmatshilo Motsei",
        "pdf":      "insta-session-1.pdf",
        "portrait": "mmatshilo-motsei.jpg",
    },
    {
        "prefix":   "carousel-liz-hall",
        "name":     "Liz Hall",
        "pdf":      "insta-session-2.pdf",
        "portrait": "liz-hall.jpg",
    },
    {
        "prefix":   "carousel-darlene-miller",
        "name":     "Darlene Miller",
        "pdf":      "insta-sessio-3.pdf",     # intentional typo in source filename
        "portrait": "darlene-miller.jpg",
    },
    {
        "prefix":   "carousel-jessica-horn",
        "name":     "Jessica Horn",
        "pdf":      "insta-session-4.pdf",
        "portrait": "jessica-horn.jpg",
    },
    {
        "prefix":   "carousel-francoise-verges",
        "name":     "Françoise Vergès",
        "pdf":      "insta-session-5.pdf",
        "portrait": "francoise-verges.jpg",
    },
    {
        "prefix":   "carousel-lyn-ossome",
        "name":     "Lyn Ossome",
        "pdf":      "insta-session-6.pdf",
        "portrait": "lyn-ossome.jpg",
    },
]

results = []
errors  = []

# ── Helpers ───────────────────────────────────────────────────────────────────
def cover_crop(img: Image.Image) -> Image.Image:
    iw, ih = img.size
    scale  = max(TARGET_W / iw, TARGET_H / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img    = img.resize((nw, nh), Image.LANCZOS)
    left   = (nw - TARGET_W) // 2
    top    = (nh - TARGET_H) // 2
    return img.crop((left, top, left + TARGET_W, top + TARGET_H))

def render_pdf(pdf_path: Path) -> Image.Image:
    doc = fitz.open(str(pdf_path))
    if doc.page_count == 0:
        raise ValueError(f"No pages: {pdf_path.name}")
    page = doc[0]
    pix  = page.get_pixmap(matrix=DPI_MATRIX, alpha=False)
    img  = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return cover_crop(img)

def composite_portrait(slide_img: Image.Image, portrait_path: Path) -> Image.Image:
    """
    Composite presenter portrait onto slide — right side.
    Matches the website PresenterCard reference treatment:
      1. Centre-crop portrait to 480×600
      2. Apply bottom gradient overlay (brand earth tone, 40% height, 0→0.25 opacity)
         — mirrors .presenter-card__photo-overlay
      3. Apply rounded-rect mask (radius 24) + left-edge fade (80px)
         — blends portrait into slide background naturally
      4. Paste onto slide at x=600, y=100
    """
    pw, ph = 480, 600
    px, py = 600, 100

    # ── 1. Load + centre-crop portrait ───────────────────────────────────────
    portrait = Image.open(str(portrait_path)).convert("RGBA")
    pr, tr   = portrait.width / portrait.height, pw / ph
    if pr > tr:
        new_w = int(portrait.height * tr)
        left  = (portrait.width - new_w) // 2
        portrait = portrait.crop((left, 0, left + new_w, portrait.height))
    else:
        new_h = int(portrait.width / tr)
        top   = (portrait.height - new_h) // 2
        portrait = portrait.crop((0, top, portrait.width, top + new_h))
    portrait = portrait.resize((pw, ph), Image.LANCZOS)

    # ── 2. Bottom gradient overlay — .presenter-card__photo-overlay ──────────
    #   Reference: rgba(28,18,8, 0) → rgba(28,18,8, 0.25) over bottom 40%
    fade_h   = int(ph * 0.40)          # 240px
    overlay  = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
    ov_arr   = np.zeros((ph, pw, 4), dtype=np.uint8)
    max_alpha = int(255 * 0.25)        # 64 — matches card's 0.25 opacity
    for row in range(fade_h):
        alpha = int(max_alpha * (row / (fade_h - 1)))
        y     = ph - fade_h + row
        ov_arr[y, :] = [EARTH_R, EARTH_G, EARTH_B, alpha]
    overlay  = Image.fromarray(ov_arr, "RGBA")
    portrait = Image.alpha_composite(portrait, overlay)

    # ── 3a. Rounded rectangle mask (24px radius) ─────────────────────────────
    mask = Image.new("L", (pw, ph), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([0, 0, pw - 1, ph - 1], radius=24, fill=255)

    # ── 3b. Left-edge fade gradient (80px, fully transparent → fully opaque) ─
    #   Vectorised via numpy — no slow per-pixel loop
    fade_w  = 80
    m_arr   = np.array(mask, dtype=np.float32)
    ramp    = np.linspace(0.0, 1.0, fade_w, dtype=np.float32)  # 0→1
    m_arr[:, :fade_w] = np.minimum(m_arr[:, :fade_w], ramp[np.newaxis, :] * 255)
    mask    = Image.fromarray(m_arr.astype(np.uint8))

    portrait.putalpha(mask)

    # ── 4. Composite onto slide ───────────────────────────────────────────────
    base = slide_img.convert("RGBA")
    base.paste(portrait, (px, py), portrait)
    return base.convert("RGB")

def save_png(img: Image.Image, path: Path, portrait_applied: bool):
    img.save(str(path), "PNG")
    kb = path.stat().st_size // 1024
    results.append({
        "file":     path.name,
        "dims":     f"{TARGET_W}×{TARGET_H}px",
        "size":     f"{kb} KB",
        "portrait": "yes" if portrait_applied else "no",
    })

# ── Pre-render shared assets once ────────────────────────────────────────────
print("Pre-rendering shared assets …")
try:
    cover_img = render_pdf(BASE / "insta-cover.pdf")
    print("  ✓ Cover slide")
except Exception as e:
    cover_img = None
    errors.append(f"Cover PDF failed: {e}")
    print(f"  ✗ Cover: {e}")

try:
    cta_img = render_pdf(BASE / "insta-close-CTA.pdf")
    print("  ✓ CTA slide")
except Exception as e:
    cta_img = None
    errors.append(f"CTA PDF failed: {e}")
    print(f"  ✗ CTA: {e}")

# ── Process each carousel ─────────────────────────────────────────────────────
for c in CAROUSELS:
    prefix   = c["prefix"]
    name     = c["name"]
    pdf_path = BASE / c["pdf"]
    por_path = PRESENTERS / c["portrait"]

    print(f"\n── {name} ({prefix}) ──")

    # Slide 1 — cover (shared)
    out1 = OUT / f"{prefix}-01-cover.png"
    if cover_img:
        try:
            save_png(cover_img.copy(), out1, portrait_applied=False)
            print(f"  ✓ {out1.name}")
        except Exception as e:
            errors.append(f"{out1.name}: {e}")
            print(f"  ✗ {out1.name}: {e}")
    else:
        print(f"  ✗ {out1.name}: cover_img unavailable")

    # Slide 2 — session PDF + portrait composite
    out2 = OUT / f"{prefix}-02-presenter.png"
    try:
        slide = render_pdf(pdf_path)
        slide = composite_portrait(slide, por_path)
        save_png(slide, out2, portrait_applied=True)
        print(f"  ✓ {out2.name}  (portrait + bottom overlay composited)")
    except Exception as e:
        errors.append(f"{out2.name}: {e}")
        print(f"  ✗ {out2.name}: {e}")

    # Slide 3 — CTA (shared)
    out3 = OUT / f"{prefix}-03-cta.png"
    if cta_img:
        try:
            save_png(cta_img.copy(), out3, portrait_applied=False)
            print(f"  ✓ {out3.name}")
        except Exception as e:
            errors.append(f"{out3.name}: {e}")
            print(f"  ✗ {out3.name}: {e}")
    else:
        print(f"  ✗ {out3.name}: cta_img unavailable")

# ── Summary ───────────────────────────────────────────────────────────────────
print()
print("=" * 72)
print(f"Output directory: {OUT}")
print(f"\n{'File':<52} {'Dims':<15} {'Size':<10} {'Portrait'}")
print("-" * 72)
for r in results:
    print(f"{r['file']:<52} {r['dims']:<15} {r['size']:<10} {r['portrait']}")

if errors:
    print("\nERRORS:")
    for e in errors:
        print(f"  ✗ {e}")
else:
    print("\nNo errors.")
print("=" * 72)
