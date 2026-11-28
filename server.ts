import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  formatEnquiryEmail,
  sanitizeSingleLine,
  validateEnquiryPayload,
} from './src/shared/contact/enquiry.ts';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

const ALLOWED_EVENTS = new Set([
  'page_view',
  'enquiry_submit',
  'enquiry_email_fallback',
  'enquiry_whatsapp_click',
  'enquiry_copy',
  'quote_add_item',
  'quote_submit',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface RateBucket {
  timestamps: number[];
}

function createRateLimiter(windowMs: number, maxRequests: number) {
  const buckets = new Map<string, RateBucket>();

  return (req: Request, res: Response, next: NextFunction) => {
    const forwarded = req.headers['x-forwarded-for'];
    const rawIp =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const bucket = buckets.get(rawIp) ?? { timestamps: [] };
    bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < windowMs);

    if (bucket.timestamps.length >= maxRequests) {
      const oldest = bucket.timestamps[0] ?? now;
      const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
      res.setHeader('Retry-After', String(retryAfterSec));
      res.status(429).json({
        ok: false,
        fallbackReady: true,
        error: 'Too many submissions in a short time. Please wait a few minutes or use WhatsApp.',
      });
      return;
    }

    bucket.timestamps.push(now);
    buckets.set(rawIp, bucket);

    if (buckets.size > 2000) {
      for (const [key, entry] of buckets.entries()) {
        if (entry.timestamps.every((ts) => now - ts >= windowMs)) {
          buckets.delete(key);
        }
      }
    }

    next();
  };
}

function checkSameOrigin(req: Request, res: Response, next: NextFunction) {
  const originHeader = req.headers.origin;
  if (!originHeader) {
    next();
    return;
  }

  let originHost = '';
  try {
    originHost = new URL(originHeader).host.toLowerCase();
  } catch {
    res.status(403).json({ ok: false, error: 'Invalid request origin.' });
    return;
  }

  const rawHost =
    (typeof req.headers['x-forwarded-host'] === 'string'
      ? req.headers['x-forwarded-host'].split(',')[0].trim()
      : req.headers.host) || '';

  if (rawHost && originHost !== rawHost.toLowerCase()) {
    res.status(403).json({ ok: false, error: 'Cross-origin submissions are not permitted.' });
    return;
  }

  next();
}

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) return false;
  const parsed = (await response.json()) as { success?: boolean };
  return parsed.success === true;
}

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api', express.json({ limit: '32kb' }));

app.use('/api', (err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err && typeof err === 'object' && 'type' in err && err.type === 'entity.parse.failed') {
    res.status(400).json({ ok: false, error: 'Invalid JSON request body.' });
    return;
  }
  if (err && typeof err === 'object' && 'type' in err && err.type === 'entity.too.large') {
    res.status(413).json({ ok: false, error: 'Enquiry payload is too large.' });
    return;
  }
  next(err);
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

const enquiryRateLimit = createRateLimiter(10 * 60 * 1000, 5);
const eventRateLimit = createRateLimiter(60 * 1000, 60);

app.post('/api/enquiry', checkSameOrigin, enquiryRateLimit, async (req, res) => {
  const validation = validateEnquiryPayload(req.body);
  if (!validation.ok) {
    res.status(400).json({ ok: false, error: validation.error });
    return;
  }

  const enquiry = validation.data;
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : req.ip || req.socket.remoteAddress || '';

  try {
    const turnstileOk = await verifyTurnstile(enquiry.turnstileToken, clientIp);
    if (!turnstileOk) {
      res.status(403).json({
        ok: false,
        error: 'Human verification failed. Please refresh the check and try again.',
      });
      return;
    }
  } catch {
    res.status(502).json({
      ok: false,
      fallbackReady: true,
      error: 'Verification service could not be reached. Please try again or use WhatsApp.',
    });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim() || '';
  if (!resendApiKey) {
    res.status(503).json({
      ok: false,
      code: 'EMAIL_NOT_CONFIGURED',
      fallbackReady: true,
      error:
        'Direct email forwarding is awaiting server configuration. Use your email app, WhatsApp, or Copy details below.',
    });
    return;
  }

  const rawToEmail = (process.env.ENQUIRY_TO_EMAIL || 'contact.lemmastudio@gmail.com').trim();
  const toEmail = EMAIL_RE.test(rawToEmail) ? rawToEmail : 'contact.lemmastudio@gmail.com';
  const fromEmail =
    sanitizeSingleLine(process.env.RESEND_FROM_EMAIL, 160) ||
    'Lemma Studio <onboarding@resend.dev>';

  const formatted = formatEnquiryEmail(enquiry);

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
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
      signal: AbortSignal.timeout(8000),
    });

    if (!resendResponse.ok) {
      res.status(502).json({
        ok: false,
        fallbackReady: true,
        error:
          'We could not deliver your email right now. Use your email app, WhatsApp, or Copy details below.',
      });
      return;
    }

    const result = (await resendResponse.json()) as { id?: string };
    res.status(200).json({
      ok: true,
      mode: 'email',
      id: typeof result.id === 'string' ? result.id : undefined,
    });
  } catch {
    res.status(502).json({
      ok: false,
      fallbackReady: true,
      error:
        'Email delivery timed out. Use your email app, WhatsApp, or Copy details below.',
    });
  }
});

app.post('/api/events', checkSameOrigin, eventRateLimit, (req, res) => {
  const body = req.body as Record<string, unknown> | undefined;
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  if (!ALLOWED_EVENTS.has(name)) {
    res.status(400).end();
    return;
  }
  const eventPath = sanitizeSingleLine(body?.path, 160) || '/';
  console.info(JSON.stringify({ event: name, path: eventPath }));
  res.status(204).end();
});

const PUBLIC_DIR = path.join(ROOT, 'public');

function sendStaticSubdirIndex(baseDir: string, req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }
  if (req.path === '/' || req.path.startsWith('//') || req.path.startsWith('/api/')) {
    next();
    return;
  }

  const relativePath = req.path.replace(/^\/+/, '');
  if (!relativePath) {
    next();
    return;
  }

  const baseResolved = path.resolve(baseDir);
  const candidateDir = path.resolve(baseResolved, relativePath);
  if (!candidateDir.startsWith(baseResolved + path.sep)) {
    next();
    return;
  }

  const candidateIndex = path.join(candidateDir, 'index.html');
  if (!existsSync(candidateIndex)) {
    next();
    return;
  }

  if (!req.path.endsWith('/')) {
    const cleanTarget = '/' + relativePath.replace(/\/+$/, '') + '/';
    res.redirect(301, cleanTarget);
    return;
  }

  res.sendFile(candidateIndex);
}

async function startServer() {
  if (!IS_PROD) {
    app.use((req, res, next) => sendStaticSubdirIndex(PUBLIC_DIR, req, res, next));
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use((req, res, next) => sendStaticSubdirIndex(DIST_DIR, req, res, next));
    app.use(
      express.static(DIST_DIR, {
        index: false,
        maxAge: '1d',
      }),
    );
    app.use((req, res) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ ok: false, error: 'Not found' });
        return;
      }
      const indexHtml = path.join(DIST_DIR, 'index.html');
      if (existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lemma Studio server listening on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
