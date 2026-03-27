'use server'

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string }

export async function subscribe(
  _prevState: SubscribeResult | undefined,
  formData:   FormData,
): Promise<SubscribeResult> {
  const firstName = (formData.get('firstName') as string | null)?.trim()
  const lastName  = (formData.get('lastName')  as string | null)?.trim()
  const email     = (formData.get('email')      as string | null)?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (!firstName) {
    return { ok: false, error: 'Please enter your first name.' }
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID ?? '7')

  if (!apiKey) {
    console.error('BREVO_API_KEY not set')
    return { ok: false, error: 'Configuration error — please try again later.' }
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method:  'POST',
      headers: {
        'api-key':      apiKey,
        'content-type': 'application/json',
        'accept':       'application/json',
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds:       [listId],
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME:  lastName ?? '',
          SOURCE:    'Afrika Ikalafe — Womb as Our First Ecology landing page',
        },
      }),
    })

    if (res.status === 201 || res.status === 204) return { ok: true }

    const body = await res.json().catch(() => ({}))
    console.error('Brevo error:', res.status, body)

    if (
      res.status === 400 &&
      (body as { code?: string }).code === 'duplicate_parameter'
    ) {
      return { ok: true }
    }

    return { ok: false, error: 'Something went wrong — please try again.' }

  } catch (err) {
    console.error('Brevo fetch error:', err)
    return { ok: false, error: 'Network error — please try again.' }
  }
}
