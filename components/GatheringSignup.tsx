'use client'

import { useState, useEffect } from 'react'

export function GatheringSignup() {
  const [open, setOpen]       = useState(false)
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  /* Auto-open when the page navigates to #register */
  useEffect(() => {
    if (window.location.hash === '#register') setOpen(true)

    const onHashChange = () => {
      if (window.location.hash === '#register') setOpen(true)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* ── Submit handler ───────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return

    const data      = new FormData(e.currentTarget)
    const firstName = (data.get('firstName') as string | null)?.trim() ?? ''
    const lastName  = (data.get('lastName')  as string | null)?.trim() ?? ''
    const email     = (data.get('email')     as string | null)?.trim().toLowerCase() ?? ''

    if (!firstName) {
      setError('Please enter your first name.')
      return
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setPending(true)
    setError(null)

    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'content-type': 'application/json' },
        body:    JSON.stringify({ firstName, lastName, email }),
      })
      const json = await res.json() as { success: boolean }

      if (json.success) {
        setSuccess(true)
      } else {
        setError('Something went wrong. Please try again or email hello@maruonline.com')
      }
    } catch {
      setError('Something went wrong. Please try again or email hello@maruonline.com')
    } finally {
      setPending(false)
    }
  }

  /* ── Success state ─────────────────────────────────────────── */
  if (success) {
    return (
      <div className="signup-success" aria-live="polite">
        <span className="signup-success__icon" aria-hidden="true">✓</span>
        <p className="signup-success__heading">Welcome to the circle.</p>
        <p className="signup-success__note">We&rsquo;ll be in touch soon.</p>
      </div>
    )
  }

  /* ── Closed — show single CTA button ──────────────────────── */
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

  /* ── Open — show full form ─────────────────────────────────── */
  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Join the gathering"
    >
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

      {error && (
        <p className="signup-form__error" role="alert">{error}</p>
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
