'use client'

// ============================================================
// components/RegionSelector.tsx
// Afrika Ikalafe — Geographic Pricing + Payment Selector
// Maintained by: Maru Online · hello@maruonline.com
//
// PAYMENT PROCESSORS
//   ZA region  → PayFast (ZAR)
//   All other  → Lemon Squeezy (USD / GBP)
//
// TO WIRE UP REAL URLS:
//   Search for '#payfast-pending' and '#ls-pending'
//   and replace with live URLs once accounts are configured.
//
//   PayFast  → https://www.payfast.co.za/eng/process?...
//   LS       → https://[store].lemonsqueezy.com/checkout/buy/[variant-id]
// ============================================================

import Link from 'next/link'
import { useState } from 'react'

// ── TYPES ─────────────────────────────────────────────────────

type RegionKey    = 'za' | 'africa' | 'us' | 'uk' | 'global'
type TierKey      = 'seed' | 'gather' | 'root'
type ProcessorKey = 'payfast' | 'lemonsqueezy'

interface TierPrice {
  display:      string   // e.g. "R 4,200" or "$397"
  instalment?:  string   // e.g. "3 × R 1,400"
  processor:    ProcessorKey
  primaryUrl:   string   // PayFast or Lemon Squeezy URL
}

interface Region {
  key:      RegionKey
  label:    string
  flag:     string
  currency: string
}

interface Tier {
  key:       TierKey
  icon:      string
  name:      string
  subtitle:  string
  tagline:   string
  includes:  string[]
  for:       string
  capacity?: string
  featured?: boolean
}

// ── REGIONS ───────────────────────────────────────────────────

const REGIONS: Region[] = [
  { key: 'za',     label: 'South Africa',  flag: '🇿🇦', currency: 'ZAR' },
  { key: 'africa', label: 'Rest of Africa', flag: '🌍', currency: 'USD' },
  { key: 'us',     label: 'USA & Canada',   flag: '🇺🇸', currency: 'USD' },
  { key: 'uk',     label: 'UK & Europe',    flag: '🇬🇧', currency: 'GBP' },
  { key: 'global', label: 'Global',         flag: '🌐', currency: 'USD' },
]

// ── TIERS ─────────────────────────────────────────────────────

const TIERS: Tier[] = [
  {
    key:      'seed',
    icon:     '🌱',
    name:     'Seed',
    subtitle: 'Enter the Archive',
    tagline:  'Learn at your own pace. Return as often as you need.',
    includes: [
      'Lifetime access to all 7 recorded gatherings',
      'Written reflection prompts per gathering',
      'Participant resource library',
    ],
    for: 'Women who learn best independently, or whose timezone or schedule doesn\'t allow live attendance. A complete, powerful entry point.',
  },
  {
    key:      'gather',
    icon:     '🌿',
    name:     'Gather',
    subtitle: 'Join the Circle',
    tagline:  'Come into the circle. Learn with others walking the same path.',
    featured: true,
    includes: [
      'Everything in Seed',
      'Access to all 7 monthly live gatherings',
      'Session replays within 48 hours',
      'Telegram community space',
    ],
    for: 'Women who want the relational, embodied dimension of learning — to be witnessed and to witness others.',
  },
  {
    key:      'root',
    icon:     '🌳',
    name:     'Root',
    subtitle: 'Walk with Mmatshilo',
    tagline:  'For those who are ready to go all the way in.',
    includes: [
      'Everything in Gather',
      '4 × private 1:1 sessions with Dr Motsei',
      'Personalised integration support',
      'Priority access to future programmes',
    ],
    for:      'Women ready for deep personal transformation with Dr Motsei\'s direct guidance.',
    capacity: 'Maximum 10–12 participants per intake',
  },
]

// ── PRICING TABLE ─────────────────────────────────────────────
// 15 products: 3 tiers × 5 regions
//
// South Africa — PayFast (ZAR)
// International — Lemon Squeezy (USD / GBP)
//
// Replace '#payfast-pending' and '#ls-pending'
// with live URLs when payment accounts are configured.

const PRICING: Record<RegionKey, Record<TierKey, TierPrice>> = {

  // ── 🇿🇦 South Africa — PayFast ────────────────────────────
  za: {
    seed: {
      display:    'R 4,200',
      instalment: '3 × R 1,400',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R4,200
    },
    gather: {
      display:    'R 8,400',
      instalment: '3 × R 2,800',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R8,400
    },
    root: {
      display:    'R 16,800',
      instalment: '3 × R 5,600',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R16,800
    },
  },

  // ── 🌍 Rest of Africa — Lemon Squeezy (USD) ───────────────
  africa: {
    seed: {
      display:    '$175',
      instalment: '3 × $58',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-africa
    },
    gather: {
      display:    '$350',
      instalment: '3 × $117',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-africa
    },
    root: {
      display:    '$700',
      instalment: '3 × $233',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-africa
    },
  },

  // ── 🇺🇸 USA & Canada — Lemon Squeezy (USD) ───────────────
  us: {
    seed: {
      display:    '$397',
      instalment: '3 × $133',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-us
    },
    gather: {
      display:    '$797',
      instalment: '3 × $266',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-us
    },
    root: {
      display:    '$1,997',
      instalment: '3 × $666',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-us
    },
  },

  // ── 🇬🇧 UK & Europe — Lemon Squeezy (GBP) ────────────────
  uk: {
    seed: {
      display:    '£297',
      instalment: '3 × £99',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-uk
    },
    gather: {
      display:    '£597',
      instalment: '3 × £199',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-uk
    },
    root: {
      display:    '£1,497',
      instalment: '3 × £499',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-uk
    },
  },

  // ── 🌐 Global — Lemon Squeezy (USD) ──────────────────────
  global: {
    seed: {
      display:    '$297',
      instalment: '3 × $99',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-global
    },
    gather: {
      display:    '$597',
      instalment: '3 × $199',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-global
    },
    root: {
      display:    '$1,497',
      instalment: '3 × $499',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-global
    },
  },
}

// ── PROCESSOR LABELS & ICONS ──────────────────────────────────

const PROCESSOR_META: Record<ProcessorKey, { label: string; icon: string }> = {
  payfast:      { label: 'Pay with PayFast',  icon: '🔒' },
  lemonsqueezy: { label: 'Checkout',          icon: '🛒' },
}

function isPending(url: string) {
  return url.startsWith('#')
}

// ── COMPONENT ─────────────────────────────────────────────────

export function RegionSelector() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>('za')
  const currentPricing = PRICING[activeRegion]

  return (
    <div className="region-selector">

      {/* Region tab strip */}
      <div className="region-tabs" role="tablist" aria-label="Select your region">
        {REGIONS.map((region) => (
          <button
            key={region.key}
            role="tab"
            aria-selected={activeRegion === region.key}
            className={`region-tab ${activeRegion === region.key ? 'region-tab--active' : ''}`}
            onClick={() => setActiveRegion(region.key)}
          >
            <span className="region-tab__flag" aria-hidden="true">{region.flag}</span>
            <span className="region-tab__label">{region.label}</span>
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div className="pricing-grid" role="tabpanel">
        {TIERS.map((tier) => {
          const price          = currentPricing[tier.key]
          const primaryPending = isPending(price.primaryUrl)
          const meta           = PROCESSOR_META[price.processor]

          return (
            <div
              key={tier.key}
              className={`pricing-card ${tier.featured ? 'pricing-card--featured' : ''}`}
            >
              {tier.featured && (
                <span className="pricing-card__badge">Most popular</span>
              )}

              {/* Header */}
              <div className="pricing-card__header">
                <span className="pricing-card__icon" aria-hidden="true">{tier.icon}</span>
                <h3 className="pricing-card__name">{tier.name}</h3>
                <p className="pricing-card__subtitle">{tier.subtitle}</p>
              </div>

              {/* Price */}
              <div className="pricing-card__price">
                <span className="pricing-card__amount">{price.display}</span>
                {price.instalment && (
                  <span className="pricing-card__instalment">or {price.instalment}</span>
                )}
              </div>

              <blockquote className="pricing-card__tagline">{tier.tagline}</blockquote>

              {/* Includes */}
              <ul className="pricing-card__includes" aria-label={`${tier.name} includes`}>
                {tier.includes.map((item) => (
                  <li key={item} className="pricing-card__include-item">
                    <span className="pricing-card__check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="pricing-card__for">
                <strong>For you if:</strong> {tier.for}
              </p>

              {tier.capacity && (
                <p className="pricing-card__capacity">{tier.capacity}</p>
              )}

              {/* ── CTA ── */}
              <div className="pricing-card__ctas">

                {primaryPending ? (
                  <span
                    className={`btn btn--lg btn--cta-primary pricing-card__cta pricing-card__cta--disabled ${tier.featured ? 'btn--primary' : 'btn--outline'}`}
                    aria-disabled="true"
                  >
                    Opening Soon
                  </span>
                ) : (
                  <Link
                    href={price.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn--lg btn--cta-primary pricing-card__cta ${tier.featured ? 'btn--primary' : 'btn--outline'}`}
                    aria-label={`${meta.label} — ${tier.name} ${price.display}`}
                  >
                    {meta.icon} {meta.label}
                  </Link>
                )}

              </div>
            </div>
          )
        })}
      </div>

      {/* Ubuntu pricing note */}
      <div className="ubuntu-note">
        <p>
          <strong>Ubuntu Pricing:</strong> A small number of scholarship places
          are available at the South African rate for participants from
          lower-income African countries.{' '}
          <Link href="mailto:mmatshilomotsei@gmail.com" className="ubuntu-note__link">
            Write to us
          </Link>{' '}
          to enquire.
        </p>
      </div>

    </div>
  )
}

