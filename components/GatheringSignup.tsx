'use client'

import { useActionState } from 'react'
import { subscribe }      from '@/app/actions/subscribe'

const initialState = undefined as
  | undefined
  | { ok: true }
  | { ok: false; error: string }

export function GatheringSignup() {
  const [result, action, pending] = useActionState(subscribe, initialState)

  if (result?.ok) {
    return (
      <div className="signup-success">
        <span className="signup-success__icon" aria-hidden="true">✓</span>
        <p className="signup-success__msg">
          You&rsquo;re in the circle. We&rsquo;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form className="signup-form" action={action} noValidate>
      <div className="signup-form__row">
        <input
          className="signup-form__input"
          type="email"
          name="email"
          placeholder="Your email address"
          required
          autoComplete="email"
          disabled={pending}
          aria-label="Email address"
        />
        <button
          className="signup-form__btn btn btn--primary btn--lg"
          type="submit"
          disabled={pending}
        >
          {pending ? 'Joining…' : 'Join the Gathering'}
        </button>
      </div>

      {result?.ok === false && (
        <p className="signup-form__error" role="alert">
          {result.error}
        </p>
      )}

      <p className="signup-form__note">
        No spam. Just the circle. Unsubscribe any time.
      </p>
    </form>
  )
}
