import {
  formatEnquiryEmail,
  sanitizeSingleLine,
  validateEnquiryPayload,
} from '../../src/shared/contact/enquiry';

interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  ENQUIRY_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return jsonResponse({ ok: false, error: 'Cross-origin submissions are not permitted.' }, 403);
      }
    } catch {
      return jsonResponse({ ok: false, error: 'Invalid request origin.' }, 403);
    }
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON request body.' }, 400);
  }

  const validation = validateEnquiryPayload(rawBody);
  if (!validation.ok) {
    return jsonResponse({ ok: false, error: validation.error }, 400);
  }

  const enquiry = validation.data;

  const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    if (!enquiry.turnstileToken) {
      return jsonResponse(
        { ok: false, error: 'Human verification failed. Please complete the check and try again.' },
        403,
      );
    }
    const clientIp = request.headers.get('CF-Connecting-IP') || '';
    const form = new URLSearchParams({
      secret: turnstileSecret,
      response: enquiry.turnstileToken,
      remoteip: clientIp,
    });
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    if (!verifyRes.ok) {
      return jsonResponse(
        { ok: false, fallbackReady: true, error: 'Verification service unavailable. Please try WhatsApp.' },
        502,
      );
    }
    const verifyJson = (await verifyRes.json()) as { success?: boolean };
    if (!verifyJson.success) {
      return jsonResponse(
        { ok: false, error: 'Human verification failed. Please refresh and try again.' },
        403,
      );
    }
  }

  const resendApiKey = env.RESEND_API_KEY?.trim();
  if (!resendApiKey) {
    return jsonResponse(
      {
        ok: false,
        code: 'EMAIL_NOT_CONFIGURED',
        fallbackReady: true,
        error:
          'Direct email forwarding is awaiting server configuration. Use your email app, WhatsApp, or Copy details below.',
      },
      503,
    );
  }

  const rawToEmail = (env.ENQUIRY_TO_EMAIL || 'contact.lemmastudio@gmail.com').trim();
  const toEmail = EMAIL_RE.test(rawToEmail) ? rawToEmail : 'contact.lemmastudio@gmail.com';
  const fromEmail =
    sanitizeSingleLine(env.RESEND_FROM_EMAIL, 160) ||
    'Lemma Studio <onboarding@resend.dev>';

  const formatted = formatEnquiryEmail(enquiry);

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: enquiry.email,
      subject: formatted.subject,
      text: formatted.text,
      html: formatted.html,
    }),
  });

  if (!resendRes.ok) {
    return jsonResponse(
      {
        ok: false,
        fallbackReady: true,
        error: 'We could not deliver your email right now. Use your email app, WhatsApp, or Copy details below.',
      },
      502,
    );
  }

  const resendData = (await resendRes.json()) as { id?: string };
  return jsonResponse(
    { ok: true, mode: 'email', id: typeof resendData.id === 'string' ? resendData.id : undefined },
    200,
  );
}
