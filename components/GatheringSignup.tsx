'use client'

import { useState, useActionState } from 'react'
import { subscribe } from '@/app/actions/subscribe'

export function GatheringSignup() {
  const [open, setOpen]         = useState(false)
  const [result, action, pending] = useActionState(subscribe, undefined)

  /* ── Success state ─────────────────────────────────────── */
  if (result?.ok) {
    return (
      <div className="signup-success" aria-live="polite">
        <span className="signup-success__icon" aria-hidden="true">✓</span>
        <p className="signup-success__heading">You&rsquo;re in the circle.</p>
        <p className="signup-success__note">
          The Community Platform will be activated at the start of the programme.
          We&rsquo;ll be in touch.
        </p>
      </div>
    )
  }

  /* ── Closed — show single CTA button ──────────────────── */
  if (!open) {
    return (
      <button
        className="btn btn--primary btn--lg signup-trigger"
        onClick={() => setOpen(true)}
        type="button"
      >
        Join the Gathering
      </button>
    )
  }

  /* ── Open — show full form ─────────────────────────────── */
  return (
    <form className="signup-form" action={action} noValidate aria-label="Join the gathering">
      <div className="signup-form__fields">

        <div className="signup-form__row signup-form__row--names">
          <div className="signup-form__field">
            <label className="signup-form__label" htmlFor="signup-firstName">
              First name
            </label>
            <input
              id="signup-firstName"
              className="signup-form__input"
              type="text"
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
              required
              disabled={pending}
            />
          </div>

          <div className="signup-form__field">
            <label className="signup-form__label" htmlFor="signup-lastName">
              Last name
            </label>
            <input
              id="signup-lastName"
              className="signup-form__input"
              type="text"
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
              disabled={pending}
            />
          </div>
        </div>

        <div className="signup-form__field">
          <label className="signup-form__label" htmlFor="signup-email">
            Email address
          </label>
          <input
            id="signup-email"
            className="signup-form__input"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            disabled={pending}
          />
        </div>

      </div>

      <p className="signup-form__activation-note">
        The Community Platform will be activated at the start of the programme.
      </p>

      {result?.ok === false && (
        <p className="signup-form__error" role="alert">
          {result.error}
        </p>
      )}

      <div className="signup-form__actions">
        <button
          className="btn btn--primary btn--lg signup-form__submit"
          type="submit"
          disabled={pending}
        >
          {pending ? 'Joining…' : 'Join the Gathering'}
        </button>
        <button
          className="signup-form__cancel"
          type="button"
          onClick={() => setOpen(false)}
          disabled={pending}
        >
          Cancel
        </button>
      </div>

      <p className="signup-form__note">
        No spam. Just the circle. Unsubscribe any time.
      </p>
    </form>
  )
}
