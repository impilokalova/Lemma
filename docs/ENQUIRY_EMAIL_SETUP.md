# Lemma enquiry email delivery

Cloudflare Pages Function: `functions/api/enquiry.ts`, POST `/api/enquiry`.

The general contact form submits to this function. It validates required fields and consent, rejects cross-origin browser submissions, checks a honeypot, and forwards the message through Resend to `contact.lemmastudio@gmail.com` with the client's email as Reply-To.

## Activation (required before merging / production)

1. In Resend, create an API key and verify a sending domain owned by Lemma. A Gmail address cannot be used as an unverified sending domain.
2. In Cloudflare dashboard → Workers & Pages → `lemma` → Settings → Variables and Secrets → Production, set **secret** `RESEND_API_KEY` and **variable** `LEMMA_FROM_EMAIL` to a sender at the verified domain (for example `Lemma Studio <hello@your-verified-domain.example>`).
3. Strongly recommended before production: create a Cloudflare Turnstile widget and add a token to the form, then set `TURNSTILE_SECRET_KEY`. The handler already verifies submitted tokens when that secret is present; **do not enable the secret until the widget is wired into the form**. Also configure Cloudflare rate limiting for `/api/enquiry` to deter abuse.
4. Deploy the branch to Pages, send a test enquiry, verify arrival in the business Gmail inbox and verify Reply-To, then merge to main.
5. Never put API keys in `VITE_*` environment variables or commit secrets.

Without the Resend configuration, the function returns HTTP 503 and the contact page displays the direct Gmail fallback. No success message is shown for a failed delivery.

Note: The quote builder's email action remains a client-side mailto link and is a separate flow.
