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

  const { reference, email, firstName, lastName, tier, amount, currency } = body as {
    reference?: string
    email?: string
    firstName?: string
    lastName?: string
    tier?: string
    amount?: number
    currency?: string
  }

  if (!reference || !email) {
    return NextResponse.json(
      { success: false, error: 'Reference and email are required' },
      { status: 400 },
    )
  }

  // Verify payment with Paystack
  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY is not set')
    return NextResponse.json(
      { success: false, error: 'Configuration error' },
      { status: 500 },
    )
  }

  try {
    // Verify the transaction with Paystack
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    })

    const paystackData = await paystackRes.json()

    if (!paystackData.status || paystackData.data.status !== 'success') {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 },
      )
    }

    // Payment verified — add to Brevo
    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID

    if (brevoApiKey) {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': brevoApiKey,
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: firstName || '',
            LASTNAME: lastName || '',
            TIER: tier || '',
            AMOUNT: amount?.toString() || '',
            CURRENCY: currency || '',
            PAYMENT_REFERENCE: reference,
          },
          listIds: brevoListId ? [parseInt(brevoListId, 10)] : [13],
          updateEnabled: true,
        }),
      })

      if (!brevoRes.ok) {
        console.error('Brevo API error:', await brevoRes.text())
        // Don't fail the whole request if Brevo fails — payment already succeeded
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and contact added',
      data: {
        reference,
        amount: paystackData.data.amount,
        currency: paystackData.data.currency,
      },
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 },
    )
  }
}