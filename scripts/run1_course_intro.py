"""
Run 1 — Afrika Ikalafe: Course Intro Carousel (3 slides)
  carousel-course-intro-01-cover.png   (cover PDF)
  carousel-course-intro-02-video.png   (video frame + play button)
  carousel-course-intro-02-video-SOURCE.mp4
  carousel-course-intro-03-cta.png     (CTA PDF)

No portrait compositing in this carousel.
"""

import sys, shutil
from pathlib import Path
import fitz                          # PyMuPDF
from PIL import Image, ImageDraw
import cv2
import numpy as np

# ── Paths ─────────────────────────────────────────────────────────────────────
BASE   = Path("/Users/ramoloimotsei/learn-afrikaikalafe-org/public/images/Instagram")
OUT    = BASE / "output"
OUT.mkdir(parents=True, exist_ok=True)

TARGET_W, TARGET_H = 1080, 1350
DPI_MATRIX = fitz.Matrix(300 / 72, 300 / 72)

results = []

# ── Helper: render PDF page → PIL Image (1080×1350, cover-crop) ───────────────
def render_pdf(pdf_path: Path) -> Image.Image:
    doc = fitz.open(str(pdf_path))
    if doc.page_count == 0:
        raise ValueError(f"No pages in {pdf_path.name}")
    page = doc[0]
    pix  = page.get_pixmap(matrix=DPI_MATRIX, alpha=False)
    img  = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    return cover_crop(img)

def cover_crop(img: Image.Image) -> Image.Image:
    """Scale so image fills 1080×1350, then centre-crop."""
    iw, ih = img.size
    scale  = max(TARGET_W / iw, TARGET_H / ih)
    nw     = int(iw * scale)
    nh     = int(ih * scale)
    img    = img.resize((nw, nh), Image.LANCZOS)
    left   = (nw - TARGET_W) // 2
    top    = (nh - TARGET_H) // 2
    return img.crop((left, top, left + TARGET_W, top + TARGET_H))

def log(path: Path, portrait=None):
    size_kb = path.stat().st_size // 1024
    w, h    = (TARGET_W, TARGET_H) if path.suffix == ".png" else ("—", "—")
    tag     = "" if portrait is None else f"  portrait={portrait}"
    results.append(f"  {path.name}  {w}×{h}px  {size_kb} KB{tag}")

# ── SLIDE 1 — cover.pdf ───────────────────────────────────────────────────────
print("Rendering slide 1 — cover PDF …")
try:
    img  = render_pdf(BASE / "insta-cover.pdf")
    out1 = OUT / "carousel-course-intro-01-cover.png"
    img.save(str(out1), "PNG")
    log(out1, portrait="no")
    print(f"  ✓ {out1.name}")
except Exception as e:
    print(f"  ✗ Slide 1 failed: {e}")

# ── SLIDE 2 — video frame + play button ──────────────────────────────────────
print("Extracting video frame at 3 s …")
try:
    video_path = BASE / "course-intro.mp4"
    cap = cv2.VideoCapture(str(video_path))
    cap.set(cv2.CAP_PROP_POS_MSEC, 3000)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        cap = cv2.VideoCapture(str(video_path))
        ret, frame = cap.read()
        cap.release()
        if not ret:
            raise RuntimeError("Could not read any frame from video")

    img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    img = cover_crop(img)

    # Play button overlay
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw    = ImageDraw.Draw(overlay)
    cx, cy  = TARGET_W // 2, TARGET_H // 2
    radius  = 90

    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=(0, 0, 0, 128)
    )
    tx   = cx + 12
    size = 48
    draw.polygon([
        (tx - int(size * 0.6),  cy - size),
        (tx - int(size * 0.6),  cy + size),
        (tx + int(size * 1.0),  cy),
    ], fill=(255, 255, 255, 255))

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

    out2 = OUT / "carousel-course-intro-02-video.png"
    img.save(str(out2), "PNG")
    log(out2, portrait="no")
    print(f"  ✓ {out2.name}")
except Exception as e:
    print(f"  ✗ Slide 2 (video) failed: {e}")

# ── Copy SOURCE video ─────────────────────────────────────────────────────────
print("Copying source video …")
try:
    dest_vid = OUT / "carousel-course-intro-02-video-SOURCE.mp4"
    shutil.copy2(str(BASE / "course-intro.mp4"), str(dest_vid))
    results.append(f"  {dest_vid.name}  (video)  {dest_vid.stat().st_size // 1024} KB")
    print(f"  ✓ {dest_vid.name}")
except Exception as e:
    print(f"  ✗ Video copy failed: {e}")

# ── SLIDE 3 — CTA PDF ────────────────────────────────────────────────────────
print("Rendering slide 3 — CTA PDF …")
try:
    img  = render_pdf(BASE / "insta-close-CTA.pdf")
    out3 = OUT / "carousel-course-intro-03-cta.png"
    img.save(str(out3), "PNG")
    log(out3, portrait="no")
    print(f"  ✓ {out3.name}")
except Exception as e:
    print(f"  ✗ Slide 3 failed: {e}")

# ── Summary ───────────────────────────────────────────────────────────────────
print()
print("=" * 60)
print(f"Output directory: {OUT}")
print("Files created:")
for r in results:
    print(r)
print("=" * 60)
