// ============================================================
// PresenterCard.tsx
// Afrika Ikalafe — Landing Page Component
// Maintained by: Maru Online
//
// USAGE:
//   import { PresenterCard } from '@/components/PresenterCard'
//   import { presenters } from '@/data/presenters'
//   <PresenterCard presenter={presenters[0]} />
//
// REQUIRES: globals.css token system (--color-*, --font-*, etc.)
// ============================================================

import Image from 'next/image'
import { Presenter, TRACK_LABELS } from '@/data/presenters'

// ── TRACK → CSS VARIABLE MAPPING ──────────────────────────────
const TRACK_COLOUR: Record<string, string> = {
  convenor:   'var(--color-earth)',
  healing:    'var(--color-clay)',
  embodiment: 'var(--color-ochre)',
  community:  'var(--color-sage)',
}

// ── COMPONENT ─────────────────────────────────────────────────

interface PresenterCardProps {
  presenter: Presenter
  variant?: 'default' | 'featured'   // featured = larger, used for Motsei
}

export function PresenterCard({
  presenter,
  variant = 'default',
}: PresenterCardProps) {
  const trackColour = TRACK_COLOUR[presenter.track]
  const isFeatured  = variant === 'featured' || presenter.isConvenor

  return (
    <article
      className={`presenter-card ${isFeatured ? 'presenter-card--featured' : ''}`}
      data-track={presenter.track}
    >
      {/* ── Photo ──────────────────────────────────────── */}
      <div className="presenter-card__photo-wrap">
        <Image
          src={presenter.imagePath}
          alt={presenter.name}
          fill
          sizes={
            isFeatured
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw'
          }
          className="presenter-card__photo"
          style={{ objectPosition: 'center top' }}
        />
        {/* Gradient overlay for text legibility on smaller viewports */}
        <div className="presenter-card__photo-overlay" />
      </div>

      {/* ── Content ────────────────────────────────────── */}
      <div className="presenter-card__content">

        {/* Track pill */}
        <span
          className="presenter-card__track-pill"
          style={{ backgroundColor: trackColour }}
        >
          {TRACK_LABELS[presenter.track]}
        </span>

        {/* Name */}
        <h3 className="presenter-card__name">
          {presenter.name}
        </h3>

        {/* Title + Institution */}
        <p className="presenter-card__title">
          {presenter.title}
          {presenter.institution && (
            <>,&nbsp;<em>{presenter.institution}</em></>
          )}
        </p>

        {/* Location */}
        <p className="presenter-card__location">
          {presenter.location}
        </p>

        {/* Bio — shown on hover / expanded state */}
        <p className="presenter-card__bio">
          {presenter.bio}
        </p>

        {/* Gathering badge — only if assigned */}
        {presenter.gathering && (
          <span className="presenter-card__gathering">
            Gathering {presenter.gathering}
          </span>
        )}
      </div>
    </article>
  )
}

// ── SECTION WRAPPER ───────────────────────────────────────────
// Drop-in section component for the landing page

interface PresentersSectionProps {
  presenters: Presenter[]
}

export function PresentersSection({ presenters }: PresentersSectionProps) {
  const convenor       = presenters.find(p => p.isConvenor)
  const guestPresenters = presenters.filter(p => !p.isConvenor)

  return (
    <section className="presenters-section" id="presenters">
      {/* Section eyebrow + heading */}
      <div className="presenters-section__header">
        <span className="eyebrow">The Women Holding This Space</span>
        <h2 className="presenters-section__heading">
          Meet the Hosts
        </h2>
        <p className="presenters-section__intro">
          Together, this team will guide participants through a powerful
          journey of remembering the womb as our first ecology.
        </p>
      </div>

      {/* Convenor — featured card */}
      {convenor && (
        <div className="presenters-section__convenor">
          <PresenterCard presenter={convenor} variant="featured" />
        </div>
      )}

      {/* Guest presenters — grid */}
      <div className="presenters-section__grid">
        {guestPresenters.map(presenter => (
          <PresenterCard
            key={presenter.id}
            presenter={presenter}
          />
        ))}
      </div>
    </section>
  )
}
