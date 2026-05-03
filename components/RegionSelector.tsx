'use client'

// ============================================================
// components/RegionSelector.tsx
// Afrika Ikalafe — Geographic Pricing + Payment Selector
// Maintained by: Maru Online · hello@maruonline.com
//
// PAYMENT PROCESSORS
//   All regions → Paystack
//
// TO WIRE UP REAL ACCOUNTS:
//   Ensure NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY and PAYSTACK_SECRET_KEY
//   are set in your environment variables.
// ============================================================

import Link from 'next/link'
import { useState, useEffect } from 'react'

// ── TYPES ─────────────────────────────────────────────────────

type RegionKey    = 'za' | 'africa' | 'us' | 'uk' | 'global'
type TierKey      = 'seed' | 'gather' | 'root'
type ProcessorKey = 'paystack'

interface TierPrice {
  display:      string   // e.g. "R 4,200" or "$397"
  instalment?:  string   // e.g. "3 × R 1,400"
  processor:    ProcessorKey
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
      '4 × private 1:1 sessions with Motsei',
      'Personalised integration support',
      'Priority access to future programmes',
    ],
    for:      'Women ready for deep personal transformation with Motsei\'s direct guidance.',
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
  za: {
    seed: {
      display:    'R 4,200',
      instalment: '3 × R 1,400',
      processor:  'paystack',
    },
    gather: {
      display:    'R 8,400',
      instalment: '3 × R 2,800',
      processor:  'paystack',
    },
    root: {
      display:    'R 12,800',
      instalment: '3 × R 4,267',
      processor:  'paystack',
    },
  },
  africa: {
    seed: {
      display:    '$175',
      instalment: '3 × $58',
      processor:  'paystack',
    },
    gather: {
      display:    '$350',
      instalment: '3 × $117',
      processor:  'paystack',
    },
    root: {
      display:    '$700',
      instalment: '3 × $233',
      processor:  'paystack',
    },
  },
  us: {
    seed: {
      display:    '$397',
      instalment: '3 × $133',
      processor:  'paystack',
    },
    gather: {
      display:    '$797',
      instalment: '3 × $266',
      processor:  'paystack',
    },
    root: {
      display:    '$1,997',
      instalment: '3 × $666',
      processor:  'paystack',
    },
  },
  uk: {
    seed: {
      display:    '£297',
      instalment: '3 × £99',
      processor:  'paystack',
    },
    gather: {
      display:    '£597',
      instalment: '3 × £199',
      processor:  'paystack',
    },
    root: {
      display:    '£1,497',
      instalment: '3 × £499',
      processor:  'paystack',
    },
  },
  global: {
    seed: {
      display:    '$297',
      instalment: '3 × $99',
      processor:  'paystack',
    },
    gather: {
      display:    '$597',
      instalment: '3 × $199',
      processor:  'paystack',
    },
    root: {
      display:    '$1,497',
      instalment: '3 × $499',
      processor:  'paystack',
    },
  },
}

// ── PROCESSOR LABELS & ICONS ──────────────────────────────────

const PROCESSOR_META: Record<ProcessorKey, { label: string; icon: string }> = {
  paystack: { label: 'Pay with Paystack', icon: '💳' },
}

// ── PAYSTACK + BREVO HANDLER ─────────────────────────────────

declare global {
  interface Window {
    PaystackPop?: any
  }
}

function loadPaystackScript() {
  if (typeof window === 'undefined') return
  if (window.PaystackPop) return
  const script = document.createElement('script')
  script.src = 'https://js.paystack.co/v1/inline.js'
  script.async = true
  document.body.appendChild(script)
}

// ── COMPONENT ─────────────────────────────────────────────────

export function RegionSelector() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>('za')
  const [checkoutTier, setCheckoutTier] = useState<{ tier: Tier; price: TierPrice } | null>(null)
  
  const currentPricing = PRICING[activeRegion]

  function openPaymentModal(tier: Tier, price: TierPrice, email: string, firstName: string, lastName: string) {
    loadPaystackScript()

    const amount = parseInt(price.display.replace(/[^\d]/g, '')) * 100 // kobo/cents
    const currency = price.display.startsWith('R') ? 'ZAR' 
      : price.display.startsWith('$') ? 'USD' 
      : price.display.startsWith('£') ? 'GBP' 
      : 'USD'

    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      email,
      amount,
      currency,
      label: `${tier.name} — ${price.display}`,
      metadata: {
        firstName,
        lastName,
        tier: tier.name,
      },
      callback: async function(response: any) {
        try {
          const res = await fetch('/api/payment-verify', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              email,
              firstName,
              lastName,
              tier: tier.name,
              amount: amount / 100,
              currency,
            }),
          })

          const data = await res.json()
          if (data.success) {
            alert('Payment successful! You have been enrolled. Check your email for confirmation.')
            setCheckoutTier(null)
          } else {
            alert('Payment received but enrolment failed. Please contact us at admin@afrikaikalafe.org')
          }
        } catch (err) {
          alert('Payment complete! There was an issue with enrolment. Please contact us.')
        }
      },
      onClose: function() {
        // User closed the modal
      },
    })

    if (handler) {
      handler.openIframe()
    } else {
      // Script might not be loaded yet, try again in a bit or alert
      alert('Payment system is loading. Please try again in a moment.')
    }
  }

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
          const price = currentPricing[tier.key]
          const meta  = PROCESSOR_META[price.processor]
          const isCheckingOut = checkoutTier?.tier.key === tier.key

          return (
            <div
              key={tier.key}
              className={`pricing-card ${tier.featured ? 'pricing-card--featured' : ''} ${isCheckingOut ? 'pricing-card--checkout' : ''}`}
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

              {!isCheckingOut && (
                <>
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
                </>
              )}

              {/* ── CTA / Checkout Form ── */}
              <div className="pricing-card__ctas">
                {!isCheckingOut ? (
                  <button
                    className={`btn btn--lg btn--cta-primary pricing-card__cta ${tier.featured ? 'btn--primary' : 'btn--outline'}`}
                    aria-label={`${meta.label} — ${tier.name} ${price.display}`}
                    onClick={() => {
                      setCheckoutTier({ tier, price })
                      loadPaystackScript()
                    }}
                  >
                    {meta.icon} {meta.label}
                  </button>
                ) : (
                  <form 
                    className="signup-form checkout-form" 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      const email = formData.get('email') as string
                      const firstName = formData.get('firstName') as string
                      const lastName = formData.get('lastName') as string
                      openPaymentModal(tier, price, email, firstName, lastName)
                    }}
                  >
                    <div className="signup-form__fields">
                      <div className="signup-form__row signup-form__row--names">
                        <div className="signup-form__field">
                          <label className="signup-form__label" htmlFor={`first-${tier.key}`}>First name</label>
                          <input id={`first-${tier.key}`} className="signup-form__input" type="text" name="firstName" required />
                        </div>
                        <div className="signup-form__field">
                          <label className="signup-form__label" htmlFor={`last-${tier.key}`}>Last name</label>
                          <input id={`last-${tier.key}`} className="signup-form__input" type="text" name="lastName" />
                        </div>
                      </div>
                      <div className="signup-form__field">
                        <label className="signup-form__label" htmlFor={`email-${tier.key}`}>Email address</label>
                        <input id={`email-${tier.key}`} className="signup-form__input" type="email" name="email" required />
                      </div>
                    </div>
                    <div className="signup-form__actions">
                      <button className="btn btn--primary btn--lg signup-form__submit" type="submit">
                        Continue to Payment
                      </button>
                      <button className="signup-form__cancel" type="button" onClick={() => setCheckoutTier(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
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

