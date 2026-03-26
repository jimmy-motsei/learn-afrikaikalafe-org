# Client Context — Afrika Ikalafe Pluriversity
> Maintained by: Maru Online · hello@maruonline.com
> Last updated: 26 March 2026
> Stack: Next.js 15 · TypeScript · Tailwind CSS · Vercel

---

## 1. Project Overview

**Client:** Afrika Ikalafe Pluriversity
**Contact:** Dr Motsei (Convenor)
**Type:** Single-page landing site — literary gathering programme
**Status:** Build in progress · Not yet deployed to Vercel

**One-line description:**
A year-long literary gathering programme — 7 sessions, multiple presenters, pan-African and diaspora audience. Online, live + recorded. Community on Telegram.

---

## 2. Brand Identity

### Logo
- **File:** `/public/logos/AfrikaIkalafe-Full-colour.png` (800×822px, RGBA)
- **Format:** Stacked — geometric eye/face mark above wordmark
- **Wordmark:** "Afrika Ikalafe" line 1, "Pluriversity" line 2
- **Horizontal version:** `/public/logos/AfrikaIkalafe-horizontal.png` (generated via `/scripts/make-horizontal-logo.mjs`) — available but not currently in use
- **Reversed/white version:** Not yet available — needed for footer on dark background

### Colour System
| Token | Hex | Usage |
|---|---|---|
| `--color-earth` | `#1C1208` | Primary text, inverse bg |
| `--color-clay` | `#8B3A1E` | Primary action (buttons, CTA) |
| `--color-clay-light` | `#B05030` | Button hover state |
| `--color-ochre` | `#C8873A` | Accent, eyebrow text, highlights |
| `--color-sand` | `#F5EFE4` | Page base background |
| `--color-sand-deep` | `#EDE4D4` | Cards, callout backgrounds |
| `--color-ivory` | `#FAF7F2` | Hero and programme section bg |
| `--color-sage` | `#4A5C40` | Secondary accent, tier labels |
| `--color-muted` | `#6B5A48` | Secondary/muted text |

### Typography
**Two-font system** (Cormorant Garamond was removed — too delicate for screen):

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Lora | H1, H2, H3, H4 — matches logo wordmark |
| `--font-body` | DM Sans | Nav, UI, labels, captions, body copy |

**Type scale:**
- H1: `clamp(3rem, 6vw, 5.5rem)` · Lora light
- H2: `clamp(2rem, 4vw, 3.5rem)` · Lora light
- H3: `clamp(1.5rem, 2.5vw, 2.25rem)` · Lora regular
- H4: `1.5rem` · Lora regular
- Body lead: `1.125rem` · DM Sans
- Body: `1rem` · DM Sans
- Body small / captions: `0.875rem` · DM Sans
- Labels / pills: `0.75rem` · DM Sans

**Font loading:** Google Fonts `@import` in `app/globals.css` line 1 (must be first rule). No `<link>` in `layout.tsx`.

### Concept
**"Literary Sacred Space"** — warm, intentional, never cold or corporate.
- Eyebrow labels use Lora italic in `--color-ochre`
- Buttons use uppercase DM Sans with wide tracking
- All shadows are warm-tinted (never grey)
- Sections alternate: ivory → sand → sand-deep → inverse (earth)

---

## 3. Page Structure (Single Page — `app/page.tsx`)

| Section | ID | Status |
|---|---|---|
| Nav | — | ✅ Built — sticky, logo (stacked), Programme / Presenters links, CTA |
| Hero | — | ✅ Built — headline, tagline, stats (7 / 5 / Online), two CTAs |
| About | — | ✅ Built — programme description, Telegram mention |
| Programme | `#programme` | ✅ Built — 7 gathering cards (numbers, titles, presenters) |
| Presenters | `#presenters` | ⏳ Placeholder — portraits + names pending from Kgali (Google Drive) |
| Convenor | — | ⏳ Placeholder — Dr Motsei bio pending approval |
| Pricing | `#join` | ✅ Built — RegionSelector component, 5 regions × 3 tiers |
| Community | — | ✅ Built — Telegram CTA |
| Footer | — | ✅ Built — stacked logo, social links, copyright |

---

## 4. Programme Content

**7 Gatherings:**
| # | Title | Presenter |
|---|---|---|
| 01 | The Root — Origins & Belonging | TBC |
| 02 | The Story — Oral Tradition & Memory | TBC |
| 03 | The Body — Literature & the Physical Self | TBC |
| 04 | The Land — Place, Displacement & Home | TBC |
| 05 | The Voice — Language, Power & Identity | TBC |
| 06 | The Future — Afrofuturism & Imagination | TBC |
| 07 | The Return — Synthesis & Community | Dr Motsei (Convenor) |

All gathering dates are TBC.

---

## 5. Pricing — Region Tiers

Three tiers: **Seed** (access only) · **Root** (+ materials + community) · **Canopy** (+ mentorship + patron recognition)

| Region | Seed | Root | Canopy |
|---|---|---|---|
| South Africa | R 1,200 | R 2,400 | R 4,500 |
| Rest of Africa | $ 45 | $ 90 | $ 160 |
| UK & Europe | $ 75 | $ 150 | $ 280 |
| North America | $ 75 | $ 150 | $ 280 |
| Rest of World | $ 60 | $ 120 | $ 220 |

All instalment options (3×) available. Checkout via **Lemon Squeezy** — not yet set up.

---

## 6. Components

### `RegionSelector` (`components/RegionSelector.tsx`)
- Client component (`"use client"`)
- Tab-based region switcher → renders 3 pricing cards
- Middle tier (Root) is highlighted (clay bg, "Most popular" badge)
- All `checkoutUrl` values are `"#"` placeholders

---

## 7. Assets Pending

| Asset | Source | Blocking |
|---|---|---|
| Presenter portraits (×6) | Kgali — Google Drive | Presenters section |
| Presenter names/bios | Kgali | Presenters section |
| Dr Motsei bio copy | Dr Motsei approval | Convenor section |
| Logo — reversed/white version | Designer | Footer legibility on dark bg |
| Lemon Squeezy product URLs | Client setup | All checkout links |
| Gathering dates | Client | Programme cards |

---

## 8. Technical Notes

- **CSS `@import` order:** Google Fonts import MUST be line 1 of `globals.css`, before `@import "tailwindcss"`. PostCSS will error if reversed.
- **Image filenames:** Use lowercase only in `/public/`. macOS is case-insensitive; Vercel (Linux) is not.
- **Logo script:** `/scripts/make-horizontal-logo.mjs` — Node.js + sharp. Run with `node scripts/make-horizontal-logo.mjs` from project root to regenerate horizontal logo.
- **Font:** `--font-serif` variable was removed. Use `--font-display` for all serif headings.
- **No database** — static site, no backend required at this stage.

---

## 9. Social Links (Footer)

| Platform | URL |
|---|---|
| Instagram | https://www.instagram.com/afrikaikalafe/ |
| X / Twitter | https://x.com/AfrikaIkalafe |
| Facebook | https://facebook.com/afrikaikalafe |

---

## 10. Outstanding Build Tasks

1. Wire presenter portraits + names once received from Kgali
2. Add Dr Motsei bio copy to Convenor section
3. Replace `checkoutUrl: "#"` placeholders with Lemon Squeezy links
4. Add reversed logo to footer once available
5. Add gathering dates to programme cards once confirmed
6. Deploy to Vercel and confirm live URL
7. Run `npm run build` and confirm zero TypeScript errors before go-live
