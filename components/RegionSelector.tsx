'use client'

// ============================================================
// components/RegionSelector.tsx
// Afrika Ikalafe — Geographic Pricing Selector
// Maintained by: Maru Online · hello@maruonline.com
// Last updated: 27 March 2026
//
// ARCHITECTURE: 15-product model · 3 tiers × 5 regions
// Each region maps to separate Lemon Squeezy product URLs
//
// USAGE in app/page.tsx:
//   import { RegionSelector } from '@/components/RegionSelector'
//   <RegionSelector />
//
// TO UPDATE CHECKOUT URLS:
//   Replace all '#ls-pending' values below with real
//   Lemon Squeezy checkout URLs once products are created.
//   Format: https://afrikaikalafe.lemonsqueezy.com/checkout/buy/{product-id}
// ============================================================

import { useState } from 'react'
import Link from 'next/link'

// ── TYPES ──────────────────────────────────────────────────────

type RegionKey = 'za' | 'africa' | 'us' | 'uk' | 'global'
type TierKey   = 'seed' | 'gather' | 'root'

interface Region {
  key:      RegionKey
  label:    string
  flag:     string
  currency: string
}

interface TierPrice {
  display:      string        // e.g. "R 4,200" or "$397"
  instalment?:  string        // e.g. "3 × R 1,400"
  checkoutUrl:  string        // Lemon Squeezy URL — replace '#ls-pending'
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

// ── REGIONS ────────────────────────────────────────────────────

const REGIONS: Region[] = [
  { key: 'za',     label: 'South Africa',   flag: '🇿🇦', currency: 'ZAR' },
  { key: 'africa', label: 'Rest of Africa',  flag: '🌍', currency: 'USD' },
  { key: 'us',     label: 'USA & Canada',    flag: '🇺🇸', currency: 'USD' },
  { key: 'uk',     label: 'UK & Europe',     flag: '🇬🇧', currency: 'GBP' },
  { key: 'global', label: 'Global',          flag: '🌐', currency: 'USD' },
]

// ── TIERS ──────────────────────────────────────────────────────

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

// ── PRICING TABLE ──────────────────────────────────────────────
// 15 products: 3 tiers × 5 regions
// Replace '#ls-pending' with real Lemon Squeezy checkout URLs
// Naming convention: LS product name = "afrikaikalafe-{tier}-{region}"
// e.g. "afrikaikalafe-seed-za", "afrikaikalafe-root-us"

const PRICING: Record<RegionKey, Record<TierKey, TierPrice>> = {
  za: {
    seed:   { display: 'R 4,200',  instalment: '3 × R 1,400', checkoutUrl: '#ls-pending' },
    gather: { display: 'R 8,400',  instalment: '3 × R 2,800', checkoutUrl: '#ls-pending' },
    root:   { display: 'R 16,800', instalment: '3 × R 5,600', checkoutUrl: '#ls-pending' },
  },
  africa: {
    seed:   { display: '$175',  instalment: '3 × $58',   checkoutUrl: '#ls-pending' },
    gather: { display: '$350',  instalment: '3 × $117',  checkoutUrl: '#ls-pending' },
    root:   { display: '$700',  instalment: '3 × $233',  checkoutUrl: '#ls-pending' },
  },
  us: {
    seed:   { display: '$397',   instalment: '3 × $133',  checkoutUrl: '#ls-pending' },
    gather: { display: '$797',   instalment: '3 × $266',  checkoutUrl: '#ls-pending' },
    root:   { display: '$1,997', instalment: '3 × $666',  checkoutUrl: '#ls-pending' },
  },
  uk: {
    seed:   { display: '£297',   instalment: '3 × £99',   checkoutUrl: '#ls-pending' },
    gather: { display: '£597',   instalment: '3 × £199',  checkoutUrl: '#ls-pending' },
    root:   { display: '£1,497', instalment: '3 × £499',  checkoutUrl: '#ls-pending' },
  },
  global: {
    seed:   { display: '$297',   instalment: '3 × $99',   checkoutUrl: '#ls-pending' },
    gather: { display: '$597',   instalment: '3 × $199',  checkoutUrl: '#ls-pending' },
    root:   { display: '$1,497', instalment: '3 × $499',  checkoutUrl: '#ls-pending' },
  },
}

// ── COMPONENT ──────────────────────────────────────────────────

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
            aria-controls="pricing-grid"
            className={`region-tab ${activeRegion === region.key ? 'region-tab--active' : ''}`}
            onClick={() => setActiveRegion(region.key)}
          >
            <span className="region-tab__flag" aria-hidden="true">
              {region.flag}
            </span>
            <span className="region-tab__label">{region.label}</span>
          </button>
        ))}
      </div>

      {/* Pricing cards */}
      <div
        id="pricing-grid"
        role="tabpanel"
        className="pricing-grid"
        aria-label={`Pricing for ${REGIONS.find(r => r.key === activeRegion)?.label}`}
      >
        {TIERS.map((tier) => {
          const price = currentPricing[tier.key]
          const isPending = price.checkoutUrl === '#ls-pending'

          return (
            <div
              key={tier.key}
              className={`pricing-card ${tier.featured ? 'pricing-card--featured' : ''}`}
            >
              {tier.featured && (
                <span className="pricing-card__badge">Most popular</span>
              )}

              <div className="pricing-card__header">
                <span className="pricing-card__icon" aria-hidden="true">
                  {tier.icon}
                </span>
                <h3 className="pricing-card__name">{tier.name}</h3>
                <p className="pricing-card__subtitle">{tier.subtitle}</p>
              </div>

              {/* Price display */}
              <div className="pricing-card__price">
                <span className="pricing-card__amount">{price.display}</span>
                {price.instalment && (
                  <span className="pricing-card__instalment">
                    or {price.instalment}
                  </span>
                )}
              </div>

              <blockquote className="pricing-card__tagline">
                {tier.tagline}
              </blockquote>

              <ul
                className="pricing-card__includes"
                aria-label={`${tier.name} includes`}
              >
                {tier.includes.map((item) => (
                  <li key={item} className="pricing-card__include-item">
                    <span className="pricing-card__check" aria-hidden="true">
                      ✓
                    </span>
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

              <Link
                href={isPending ? '#pricing' : price.checkoutUrl}
                className={`btn btn--lg ${tier.featured ? 'btn--primary' : 'btn--outline'} pricing-card__cta`}
                aria-label={`Join at the ${tier.name} level — ${price.display}`}
                aria-disabled={isPending}
              >
                {isPending ? 'Opening Soon' : `Join — ${tier.name}`}
              </Link>

            </div>
          )
        })}
      </div>

      {/* Ubuntu note */}
      <div className="ubuntu-note">
        <p>
          <strong>Ubuntu Pricing:</strong> A small number of scholarship places
          are available at the South African rate for participants from
          lower-income African countries.{' '}
          <Link href="mailto:hello@afrikaikalafe.org" className="ubuntu-note__link">
            Write to us
          </Link>{' '}
          to enquire.
        </p>
      </div>

    </div>
  )
}
