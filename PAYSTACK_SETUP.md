# Paystack Integration Requirements

To complete the Paystack integration for Afrika Ikalafe, ensure the following environment variables are set in your hosting provider (e.g., Vercel) and locally in `.env.local`:

## Environment Variables

```env
# Public Key from Paystack Dashboard (Settings -> API Keys & Webhooks)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=<your_paystack_public_key>

# Secret Key from Paystack Dashboard (Settings -> API Keys & Webhooks)
PAYSTACK_SECRET_KEY=<your_paystack_secret_key>

# Brevo (formerly Sendinblue) API Key for enrollment
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxx

# Brevo List ID where enrolled users will be added
BREVO_LIST_ID=13
```

## Paystack Dashboard Configuration

1. **Callback URL**: In your Paystack dashboard, you don't strictly need to set a global callback URL for the Inline integration as it's handled in code, but for safety, you can set it to `https://yourdomain.com/api/payment-verify`.
2. **Webhook URL**: Highly recommended to set up a Webhook URL pointing to `https://yourdomain.com/api/payment-verify` (or a dedicated webhook handler) to handle cases where the user closes the browser before the callback executes. *Note: Current implementation relies on the frontend callback.*
3. **API Keys**: Ensure you are using the **Live** keys for production and **Test** keys for development.

## Enrollment Flow

1. User selects a region and tier on the website.
2. User enters their Email, First Name, and Last Name.
3. User clicks "Continue to Payment" which opens the Paystack Secure Checkout.
4. After successful payment, the frontend calls `/api/payment-verify`.
5. The backend verifies the transaction with Paystack API.
6. Upon successful verification, the user is added to the specified Brevo list with their tier information.
7. User sees a success message and receives an automated email from Brevo (if configured).
