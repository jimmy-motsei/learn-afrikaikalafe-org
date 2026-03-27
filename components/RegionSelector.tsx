'use client'

// ============================================================
// components/RegionSelector.tsx
// Afrika Ikalafe — Geographic Pricing + Payment Selector
// Maintained by: Maru Online · hello@maruonline.com
//
// PAYMENT PROCESSORS
//   ZA region  → PayFast (primary)  + PayPal (secondary)
//   All other  → Lemon Squeezy (primary) + PayPal (secondary)
//
// TO WIRE UP REAL URLS:
//   Search for '#payfast-pending', '#ls-pending', '#paypal-pending'
//   and replace with live URLs once accounts are configured.
//
//   PayFast  → https://www.payfast.co.za/eng/process?...
//   LS       → https://[store].lemonsqueezy.com/checkout/buy/[variant-id]
//   PayPal   → https://paypal.me/[username]/[amount][currency]
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
  paypalUrl:    string   // PayPal.me URL with pre-filled amount
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
// All regions   — PayPal secondary option
//
// Replace '#payfast-pending', '#ls-pending', '#paypal-pending'
// with live URLs when payment accounts are configured.

const PRICING: Record<RegionKey, Record<TierKey, TierPrice>> = {

  // ── 🇿🇦 South Africa — PayFast ────────────────────────────
  za: {
    seed: {
      display:    'R 4,200',
      instalment: '3 × R 1,400',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R4,200
      paypalUrl:  '#paypal-pending',   // TODO: paypal.me/afrikaikalafe/4200ZAR
    },
    gather: {
      display:    'R 8,400',
      instalment: '3 × R 2,800',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R8,400
      paypalUrl:  '#paypal-pending',   // TODO: paypal.me/afrikaikalafe/8400ZAR
    },
    root: {
      display:    'R 16,800',
      instalment: '3 × R 5,600',
      processor:  'payfast',
      primaryUrl: '#payfast-pending',  // TODO: PayFast URL — R16,800
      paypalUrl:  '#paypal-pending',   // TODO: paypal.me/afrikaikalafe/16800ZAR
    },
  },

  // ── 🌍 Rest of Africa — Lemon Squeezy (USD) ───────────────
  africa: {
    seed: {
      display:    '$175',
      instalment: '3 × $58',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-africa
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/175USD
    },
    gather: {
      display:    '$350',
      instalment: '3 × $117',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-africa
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/350USD
    },
    root: {
      display:    '$700',
      instalment: '3 × $233',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-africa
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/700USD
    },
  },

  // ── 🇺🇸 USA & Canada — Lemon Squeezy (USD) ───────────────
  us: {
    seed: {
      display:    '$397',
      instalment: '3 × $133',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-us
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/397USD
    },
    gather: {
      display:    '$797',
      instalment: '3 × $266',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-us
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/797USD
    },
    root: {
      display:    '$1,997',
      instalment: '3 × $666',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-us
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/1997USD
    },
  },

  // ── 🇬🇧 UK & Europe — Lemon Squeezy (GBP) ────────────────
  uk: {
    seed: {
      display:    '£297',
      instalment: '3 × £99',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-uk
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/297GBP
    },
    gather: {
      display:    '£597',
      instalment: '3 × £199',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-uk
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/597GBP
    },
    root: {
      display:    '£1,497',
      instalment: '3 × £499',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-uk
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/1497GBP
    },
  },

  // ── 🌐 Global — Lemon Squeezy (USD) ──────────────────────
  global: {
    seed: {
      display:    '$297',
      instalment: '3 × $99',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-seed-global
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/297USD
    },
    gather: {
      display:    '$597',
      instalment: '3 × $199',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-gather-global
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/597USD
    },
    root: {
      display:    '$1,497',
      instalment: '3 × $499',
      processor:  'lemonsqueezy',
      primaryUrl: '#ls-pending',      // TODO: LS variant — afrikaikalafe-root-global
      paypalUrl:  '#paypal-pending',  // TODO: paypal.me/afrikaikalafe/1497USD
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
          const price         = currentPricing[tier.key]
          const primaryPending = isPending(price.primaryUrl)
          const paypalPending  = isPending(price.paypalUrl)
          const meta          = PROCESSOR_META[price.processor]

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

              {/* ── CTAs ── */}
              <div className="pricing-card__ctas">

                {/* Primary — PayFast or Lemon Squeezy */}
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

                {/* Secondary — PayPal */}
                {paypalPending ? (
                  <span className="pricing-card__paypal pricing-card__paypal--pending">
                    PayPal coming soon
                  </span>
                ) : (
                  <Link
                    href={price.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pricing-card__paypal"
                    aria-label={`Pay with PayPal — ${tier.name} ${price.display}`}
                  >
                    <PayPalIcon /> Pay with PayPal
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

// ── PayPal SVG icon ───────────────────────────────────────────

function PayPalIcon() {
  return (
    <svg
      className="pricing-card__paypal-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
    </svg>
  )
}
