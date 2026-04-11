//   - data/presenters.ts// ============================================================
// app/page.tsx — Afrika Ikalafe Landing Page
// Programme: Womb as Our First Ecology
// Maintained by: Maru Online · hello@maruonline.com
// Last updated: 27 March 2026
//
// SECTIONS:
//   1. Nav
//   2. Hero
//   3. About — The Concept
//   4. Programme — 7 Gatherings
//   5. Presenters
//   6. Pricing (RegionSelector stub)
//   7. Footer
//
// REQUIRES:
//   - globals.css with --color-*, --font-*, --space-*, --text-* tokens
//   - /public/images/presenters/[slug].jpg (see presenters.ts)
//   - components/PresenterCard.tsx

// ============================================================

import Image from 'next/image'
import Link from 'next/link'
import { presenters, convenor, guestPresenters, TRACK_LABELS } from '@/data/presenters'
import { RegionSelector }    from '@/components/RegionSelector'
import { GatheringSignup }   from '@/components/GatheringSignup'
import { FadeUp }            from '@/components/FadeUp'

// ── METADATA ──────────────────────────────────────────────────
export const metadata = {
  title: 'Womb as Our First Ecology · Afrika Ikalafe Pluriversity',
  description:
    'A global gathering of 7 monthly online sessions convened by Dr Mmatshilo Motsei. Healing, embodiment, and community across the African continent and diaspora.',
  openGraph: {
    title: 'Womb as Our First Ecology',
    description: 'A global gathering convened by Dr Mmatshilo Motsei · Afrika Ikalafe Pluriversity',
    url: 'https://www.afrikaikalafe.org',
    siteName: 'Afrika Ikalafe',
  },
}

// ── TRACK COLOURS (mirrors presenter-card.css) ─────────────────
const TRACK_COLOUR: Record<string, string> = {
  convenor:   'var(--color-earth)',
  healing:    'var(--color-clay)',
  embodiment: 'var(--color-ochre)',
  community:  'var(--color-sage)',
}

// ── GATHERING DATA ─────────────────────────────────────────────
// Ordered list for the programme section
const gatherings = [
  {
    number: 1,
    month: 'May 2026',
    presenter: 'Dr Mmatshilo Motsei',
    role: 'Convenor',
    topic: 'Womb as First Ecology — The Concept, The Call, The Gathering',
    track: 'convenor' as const,
  },
  {
    number: 2,
    month: 'June 2026',
    presenter: 'Liz Hall',
    role: 'Community',
    topic: 'To be announced',
    track: 'community' as const,
  },
  {
    number: 3,
    month: 'July 2026',
    presenter: 'Darlene Miller',
    role: 'Healing',
    topic: 'To be announced',
    track: 'healing' as const,
  },
  {
    number: 4,
    month: 'August 2026',
    presenter: 'Jessica Horn',
    role: 'Embodiment',
    topic: 'To be announced',
    track: 'embodiment' as const,
  },
  {
    number: 5,
    month: 'September 2026',
    presenter: 'Françoise Vergès',
    role: 'Healing',
    topic: 'To be announced',
    track: 'healing' as const,
  },
  {
    number: 6,
    month: 'October 2026',
    presenter: 'Lyn Ossome',
    role: 'Community',
    topic: 'To be announced',
    track: 'community' as const,
  },
  {
    number: 7,
    month: 'November 2026',
    presenter: 'Rochelle Webster-Nembhard',
    role: 'Embodiment',
    topic: 'To be announced',
    track: 'embodiment' as const,
  },
]

// ── PRICING DATA ───────────────────────────────────────────────
// RegionSelector will swap these URLs once Lemon Squeezy is live
const tiers = [
  {
    id: 'seed',
    icon: '🌱',
    name: 'Seed',
    subtitle: 'Enter the Archive',
    tagline: 'Learn at your own pace. Return as often as you need.',
    includes: [
      'Lifetime access to all 7 recorded gatherings',
      'Written reflection prompts per gathering',
      'Participant resource library',
    ],
    for: 'Women who learn best independently, or whose timezone or schedule doesn\'t allow live attendance.',
    checkoutUrl: '#', // TODO: Lemon Squeezy URL — SA ZAR
  },
  {
    id: 'gather',
    icon: '🌿',
    name: 'Gather',
    subtitle: 'Join the Circle',
    tagline: 'Come into the circle. Learn with others who are walking the same path.',
    featured: true,
    includes: [
      'Everything in Seed',
      'Access to all 7 monthly live gatherings',
      'Session replays within 48 hours',
      'Telegram community space',
    ],
    for: 'Women who want the relational, embodied dimension of learning — to be witnessed and to witness others.',
    checkoutUrl: '#', // TODO: Lemon Squeezy URL — SA ZAR
  },
  {
    id: 'root',
    icon: '🌳',
    name: 'Root',
    subtitle: 'Walk with Mmatshilo',
    tagline: 'For those who are ready to go all the way in.',
    includes: [
      'Everything in Gather',
      '4 × private 1:1 sessions with Dr Motsei',
      'Personalised integration support',
      'Priority access to future programmes',
    ],
    for: 'Women ready for deep personal transformation with Dr Motsei\'s direct guidance. Limited to 10–12 participants.',
    capacity: 'Maximum 10–12 participants',
    checkoutUrl: '#', // TODO: Lemon Squeezy URL — SA ZAR
  },
]

// ══════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      {/* ── 1. NAV ───────────────────────────────────────────── */}
      <header className="site-nav">
        <div className="site-nav__inner">
          <Link href="/" className="site-nav__logo" aria-label="Afrika Ikalafe home">
            {/* Logo placeholder — replace with <Image> once SVG received from Kgali */}
            <span className="site-nav__logo-text">Afrika Ikalafe</span>
          </Link>

          <nav className="site-nav__links" aria-label="Primary navigation">
            <Link href="#about">The Gathering</Link>
            <Link href="#programme">Programme</Link>
            <Link href="#presenters">Hosts</Link>
            <Link href="#pricing">Join</Link>
          </nav>

          <Link href="#register" className="btn btn--primary btn--sm">
            Register
          </Link>
        </div>
      </header>

      <main>

        {/* ── 2. HERO ─────────────────────────────────────────── */}
        <section className="hero" id="top">
          <div className="hero__inner">

            {/* Left — text */}
            <div className="hero__text">
              <span className="eyebrow hero__eyebrow">
                A Global Gathering · 7 Monthly Sessions
              </span>

              <h1 className="hero__heading">
                Womb as Our<br />
                First Ecology
              </h1>

              <p className="hero__lead">
                Convened by Dr Mmatshilo Motsei, this programme brings together
                seven scholar-practitioners across the African continent and diaspora
                to remember, reclaim, and re-root.
              </p>

              <div className="hero__actions">
                <Link href="#register" className="btn btn--primary btn--lg">
                  Join the Gathering
                </Link>
                <Link href="#about" className="btn btn--ghost btn--lg">
                  Learn more
                </Link>
              </div>

              <p className="hero__meta">
                afrikaikalafe.org · Open to women globally
              </p>
            </div>

            {/* Right — Dr Motsei image */}
            <div className="hero__image-wrap">
              <div className="hero__image-frame">
                <Image
                  src="/images/presenters/mmatshilo-motsei.jpg"
                  alt="Dr Mmatshilo Motsei — Convenor, Womb as Our First Ecology"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="hero__image"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              {/* Decorative caption */}
              <p className="hero__image-caption">
                Dr Mmatshilo Motsei · Convenor
              </p>
            </div>

          </div>

          {/* Decorative divider — mimics the Adinkra band from brand cards */}
          <div className="hero__band" aria-hidden="true" />
        </section>

        {/* ── 3. ABOUT — THE CONCEPT ──────────────────────────── */}
        <section className="about-section" id="about">
          <div className="about-section__inner">

            <FadeUp>
              <div className="about-section__header">
                <span className="eyebrow">The Work</span>
                <h2 className="section-heading">
                  What We Are Gathering For
                </h2>
              </div>
            </FadeUp>

            <div className="about-section__body">
              <FadeUp delay={100}>
                <div className="about-section__text">
                  <p className="lead-text">
                    The womb is not only a body part. It is a living archive — the
                    first ecology every human being has ever known. To remember it
                    is to remember ourselves.
                  </p>
                  <p>
                    Afrika Ikalafe Pluriversity is a centre for land-based healing,
                    learning and living. Founded by Dr Mmatshilo Motsei — nurse, midwife,
                    author, and healing justice pioneer — it is the only African-led,
                    African-origin, land-based womb healing Pluriversity with global reach.
                  </p>
                  <p>
                    <em>Womb as Our First Ecology</em> is a seven-gathering global
                    programme. Each session is held by a different scholar, artist,
                    or practitioner — women who carry this knowledge from the ground
                    of their own lived and studied experience.
                  </p>
                  <p>
                    This is not a course. It is a circle.
                  </p>
                </div>
              </FadeUp>

              {/* Stat callouts */}
              <div className="about-section__stats">
                {[
                  { number: '7', label: 'Monthly Gatherings' },
                  { number: '7', label: 'Scholars & Artists' },
                  { number: '5', label: 'Continents Represented' },
                  { number: '3', label: 'Pathways to Join' },
                ].map((stat, i) => (
                  <FadeUp key={stat.label} delay={i * 80}>
                    <div className="stat-card">
                      <span className="stat-card__number">{stat.number}</span>
                      <span className="stat-card__label">{stat.label}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. PROGRAMME — 7 GATHERINGS ─────────────────────── */}
        <section className="programme-section" id="programme">
          <div className="programme-section__inner">

            <FadeUp>
              <div className="programme-section__header">
                <span className="eyebrow">The Journey</span>
                <h2 className="section-heading">
                  Seven Gatherings
                </h2>
                <p className="section-intro">
                  Each gathering is led by a different presenter. Dr Motsei opens
                  the series and convenes the space throughout. Sessions are held
                  online monthly, with replays available within 48 hours.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={120}>
              <ol className="gathering-list" aria-label="Programme gatherings">
                {gatherings.map((g) => (
                  <li key={g.number} className="gathering-item">
                    <span
                      className="gathering-item__number"
                      style={{ color: TRACK_COLOUR[g.track] }}
                    >
                      {String(g.number).padStart(2, '0')}
                    </span>

                    <div className="gathering-item__body">
                      <span
                        className="gathering-item__track"
                        style={{ color: TRACK_COLOUR[g.track] }}
                      >
                        {TRACK_LABELS[g.track]}
                      </span>
                      <h3 className="gathering-item__presenter">{g.presenter}</h3>
                      <p className="gathering-item__topic">{g.topic}</p>
                    </div>

                    <span className="gathering-item__month">{g.month}</span>
                  </li>
                ))}
              </ol>
            </FadeUp>

          </div>
        </section>

        {/* ── 5. PRESENTERS ───────────────────────────────────── */}
        <section className="presenters-section" id="presenters">
          <div className="presenters-section__inner">

            <FadeUp>
              <div className="presenters-section__header">
                <span className="eyebrow">The Women Holding This Space</span>
                <h2 className="section-heading">
                  Meet the Hosts
                </h2>
                <p className="section-intro">
                  Together, this team will guide participants through a powerful
                  journey of remembering the womb as our first ecology.
                </p>
              </div>
            </FadeUp>

            {/* Convenor — featured */}
            {convenor && (
              <FadeUp delay={100}>
              <div className="presenter-featured">
                <div className="presenter-featured__photo-wrap">
                  <Image
                    src={convenor.imagePath}
                    alt={convenor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="presenter-featured__photo"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <div className="presenter-featured__content">
                  <span className="presenter-featured__track eyebrow">
                    {TRACK_LABELS[convenor.track]}
                  </span>
                  <h3 className="presenter-featured__name">
                    {convenor.name}
                  </h3>
                  <p className="presenter-featured__title">
                    {convenor.title}
                  </p>
                  <p className="presenter-featured__location">
                    {convenor.location}
                  </p>
                  <p className="presenter-featured__bio">
                    {convenor.bio}
                  </p>
                  <span className="gathering-badge">Gathering 1 · Convenor</span>
                </div>
              </div>
              </FadeUp>
            )}

            {/* Group poster — add back when group photo is available
            <div className="group-poster-wrap">
              <Image
                src="/images/group-poster.jpg"
                alt="All hosts of Womb as Our First Ecology"
                width={900}
                height={1100}
                className="group-poster"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            */}

            {/* Guest presenter grid */}
            <div className="presenter-grid">
              {guestPresenters.map((p, i) => (
                <FadeUp key={p.id} delay={i * 80}>
                <article className="presenter-card" data-track={p.track}>
                  <div className="presenter-card__photo-wrap">
                    <Image
                      src={p.imagePath}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="presenter-card__photo"
                      style={{ objectPosition: 'center top' }}
                    />
                    <div className="presenter-card__overlay" />
                  </div>
                  <div className="presenter-card__content">
                    <span
                      className="presenter-card__track"
                      style={{ backgroundColor: TRACK_COLOUR[p.track] }}
                    >
                      {TRACK_LABELS[p.track]}
                    </span>
                    <h3 className="presenter-card__name">{p.name}</h3>
                    <p className="presenter-card__title">{p.title}</p>
                    {p.institution && (
                      <p className="presenter-card__institution">{p.institution}</p>
                    )}
                    <p className="presenter-card__location">{p.location}</p>
                    <p className="presenter-card__bio">{p.bio}</p>
                    {p.gathering && (
                      <span className="gathering-badge">
                        Gathering {p.gathering}
                      </span>
                    )}
                  </div>
                </article>
                </FadeUp>
              ))}
            </div>

          </div>
        </section>

        {/* ── 6. PRICING ──────────────────────────────────────── */}
        <section className="pricing-section" id="pricing">
          <div className="pricing-section__inner">

            <FadeUp>
              <div className="pricing-section__header">
                <span className="eyebrow pricing-section__eyebrow">
                  Three Pathways
                </span>
                <h2 className="section-heading pricing-section__heading">
                  How to Join
                </h2>
                <p className="section-intro pricing-section__intro">
                  These are not feature bundles. They are levels of relationship
                  with the work — and with Dr Motsei. Select your region to see
                  pricing in your currency.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={120}>
              <RegionSelector />
            </FadeUp>

          </div>
        </section>

        {/* ── 7. COMMUNITY CTA ────────────────────────────────── */}
        <section className="community-section" id="register">
          <FadeUp>
            <div className="community-section__inner">
              <span className="eyebrow">Between Gatherings</span>
              <h2 className="section-heading">
                A Space of Ongoing Belonging
              </h2>
              <p className="lead-text">
                Participants connect through a private Telegram community between
                sessions — continuing the conversation, supporting one another,
                and staying rooted in the work.
              </p>
              <GatheringSignup />
            </div>
          </FadeUp>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__inner">

          <div className="site-footer__brand">
            <span className="site-footer__name">Afrika Ikalafe Pluriversity</span>
            <p className="site-footer__tagline">
              Centre for land-based healing, learning and living.
            </p>
          </div>

          <nav className="site-footer__links" aria-label="Footer navigation">
            <Link href="https://www.instagram.com/afrikaikalafe/" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
            <Link href="https://x.com/AfrikaIkalafe" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </Link>
            <Link href="https://www.facebook.com/afrikaikalafe" target="_blank" rel="noopener noreferrer">
              Facebook
            </Link>
            <Link href="mailto:mmatshilomotsei@gmail.com">
              Contact
            </Link>
          </nav>

          <p className="site-footer__legal">
            © {new Date().getFullYear()} Afrika Ikalafe Pluriversity.
            Website by{' '}
            <Link href="https://maruonline.com" target="_blank" rel="noopener noreferrer">
              Maru Online
            </Link>.
          </p>

        </div>
      </footer>
    </>
  )
}
