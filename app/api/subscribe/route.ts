import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    )
  }

  const { firstName, lastName, email } = body as {
    firstName?: string
    lastName?: string
    email?: string
  }

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { success: false, error: 'All fields are required' },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Invalid email address' },
      { status: 400 },
    )
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set')
    return NextResponse.json(
      { success: false, error: 'Configuration error' },
      { status: 500 },
    )
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept:           'application/json',
        'content-type':   'application/json',
        'api-key':        apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME:  lastName,
        },
        listIds:       [13],
        updateEnabled: true,
      }),
    })

    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true })
    }

    const data = await res.json().catch(() => ({}))

    // Contact already exists — updateEnabled:true handles the merge; treat as success
    if (
      res.status === 400 &&
      (data as { message?: string }).message?.toLowerCase().includes('contact already exist')
    ) {
      return NextResponse.json({ success: true })
    }

    console.error('Brevo API error:', res.status, data)
    return NextResponse.json(
      { success: false, error: 'Upstream API error' },
      { status: 502 },
    )
  } catch (err) {
    console.error('Brevo fetch error:', err)
    return NextResponse.json(
      { success: false, error: 'Network error' },
      { status: 500 },
    )
  }
}
