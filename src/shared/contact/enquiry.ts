export type EnquiryKind = 'general' | 'quote';

export type ReplyMethod = 'email' | 'whatsapp' | 'telegram' | 'phone';

export interface EnquiryQuoteItem {
  id: string;
  name: string;
  qty: number;
  speed: string;
  totalZar: number;
}

export interface ValidatedEnquiry {
  kind: EnquiryKind;
  name: string;
  email: string;
  business: string;
  country: string;
  phone: string;
  whatsapp: string;
  service: string;
  budget: string;
  deadline: string;
  style: string;
  description: string;
  links: string;
  contact: ReplyMethod;
  consent: true;
  reference: string;
  estimatedTotalZar: number | null;
  items: EnquiryQuoteItem[];
  brief: string;
  turnstileToken: string;
}

export type ValidationResult =
  | { ok: true; data: ValidatedEnquiry }
  | { ok: false; error: string; honeypotTriggered?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REPLY_METHODS = new Set<ReplyMethod>(['email', 'whatsapp', 'telegram', 'phone']);

export function sanitizeSingleLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultiLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatZarAmount(amount: number): string {
  return 'R' + Math.round(amount).toLocaleString('en-ZA');
}

export function validateEnquiryPayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Invalid enquiry payload.' };
  }

  const record = raw as Record<string, unknown>;
  const honey = sanitizeSingleLine(record._honey, 100);
  if (honey) {
    return {
      ok: false,
      error: 'Unable to process this submission.',
      honeypotTriggered: true,
    };
  }

  const kind: EnquiryKind = record.kind === 'quote' ? 'quote' : 'general';
  const name = sanitizeSingleLine(record.name, 120);
  const email = sanitizeSingleLine(record.email, 160).toLowerCase();
  const business = sanitizeSingleLine(record.business, 140);
  const country = sanitizeSingleLine(record.country, 100);
  const phone = sanitizeSingleLine(record.phone, 40);
  const whatsapp = sanitizeSingleLine(record.whatsapp, 40);
  const service = sanitizeSingleLine(record.service, 140);
  const budget = sanitizeSingleLine(record.budget, 80);
  const deadline = sanitizeSingleLine(record.deadline, 120);
  const style = sanitizeSingleLine(record.style, 140);
  const description = sanitizeMultiLine(record.description, 4000);
  const links = sanitizeMultiLine(record.links, 1000);
  const rawContact = sanitizeSingleLine(record.contact, 20).toLowerCase() as ReplyMethod;
  const contact: ReplyMethod = REPLY_METHODS.has(rawContact) ? rawContact : 'email';
  const consent = record.consent === true || record.consent === 'yes';
  const reference = sanitizeSingleLine(record.reference, 40);
  const brief = sanitizeMultiLine(record.brief, 8000);
  const turnstileToken = sanitizeSingleLine(record.turnstileToken, 2048);

  if (!name) {
    return { ok: false, error: 'Please provide your name.' };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please provide a valid email address.' };
  }
  if (!country) {
    return { ok: false, error: 'Please provide your country.' };
  }
  if (kind === 'general' && !service) {
    return { ok: false, error: 'Please select a service category.' };
  }
  if (!description || description.length < 4) {
    return { ok: false, error: 'Please describe your project (at least 4 characters).' };
  }
  if (!consent) {
    return { ok: false, error: 'Please confirm consent so Lemma Studio can reply.' };
  }

  const items: EnquiryQuoteItem[] = [];
  if (Array.isArray(record.items)) {
    for (const rawItem of record.items.slice(0, 40)) {
      if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) continue;
      const itemRecord = rawItem as Record<string, unknown>;
      const id = sanitizeSingleLine(itemRecord.id, 60);
      const itemName = sanitizeSingleLine(itemRecord.name, 140);
      const qtyRaw = Number(itemRecord.qty);
      const totalRaw = Number(itemRecord.totalZar);
      const speed = sanitizeSingleLine(itemRecord.speed, 30) || 'standard';
      if (!id || !itemName) continue;
      const qty = Number.isFinite(qtyRaw) ? Math.max(1, Math.min(100, Math.round(qtyRaw))) : 1;
      const totalZar = Number.isFinite(totalRaw) && totalRaw >= 0 ? Math.round(totalRaw) : 0;
      items.push({ id, name: itemName, qty, speed, totalZar });
    }
  }

  if (kind === 'quote' && items.length === 0) {
    return { ok: false, error: 'Please include at least one service in your bag.' };
  }

  const rawTotal = Number(record.estimatedTotalZar);
  const estimatedTotalZar =
    Number.isFinite(rawTotal) && rawTotal >= 0 ? Math.round(rawTotal) : null;

  return {
    ok: true,
    data: {
      kind,
      name,
      email,
      business,
      country,
      phone,
      whatsapp,
      service: kind === 'quote' ? service || 'Itemised Creative Bag' : service,
      budget,
      deadline,
      style,
      description,
      links,
      contact,
      consent: true,
      reference,
      estimatedTotalZar,
      items,
      brief,
      turnstileToken,
    },
  };
}

export function formatEnquiryEmail(enquiry: ValidatedEnquiry): {
  subject: string;
  text: string;
  html: string;
} {
  const heading =
    enquiry.kind === 'quote'
      ? `Lemma Studio — Quote Enquiry${enquiry.reference ? ` (${enquiry.reference})` : ''}`
      : 'Lemma Studio — General Project Enquiry';

  const subjectTarget =
    enquiry.kind === 'quote'
      ? enquiry.reference || 'Creative Bag'
      : enquiry.service;

  const subject = sanitizeSingleLine(
    `Lemma Studio enquiry — ${enquiry.name} (${subjectTarget})`,
    180,
  );

  const rows: Array<[string, string]> = [
    ['Type', enquiry.kind === 'quote' ? 'Itemised bag quotation' : 'General project enquiry'],
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Business / Organisation', enquiry.business || '—'],
    ['Country', enquiry.country],
    ['Phone / Dial', enquiry.phone || '—'],
    ['WhatsApp', enquiry.whatsapp || '—'],
    ['Preferred Reply', enquiry.contact],
    ['Service', enquiry.service],
    ['Estimated Budget', enquiry.budget || 'Not specified'],
    ['Deadline', enquiry.deadline || 'Flexible'],
  ];

  if (enquiry.style) rows.push(['Design Style', enquiry.style]);
  if (enquiry.reference) rows.push(['Reference', enquiry.reference]);
  if (enquiry.estimatedTotalZar !== null) {
    rows.push(['Estimated Total (ZAR)', formatZarAmount(enquiry.estimatedTotalZar)]);
  }

  const textLines: string[] = [heading, '='.repeat(heading.length), ''];
  for (const [label, value] of rows) {
    textLines.push(`${label}: ${value}`);
  }
  if (enquiry.items.length > 0) {
    textLines.push('', 'Selected Services:');
    for (const item of enquiry.items) {
      textLines.push(
        `- ${item.qty}x ${item.name} (${item.speed}) — ${formatZarAmount(item.totalZar)}`,
      );
    }
  }
  textLines.push('', 'Project Description:', enquiry.description);
  if (enquiry.links) {
    textLines.push('', 'Reference Links / Inspiration:', enquiry.links);
  }
  if (enquiry.brief) {
    textLines.push('', 'Prepared Brief:', enquiry.brief);
  }

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e6dcf0;color:#5b4a69;font-size:13px;vertical-align:top;width:190px;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #e6dcf0;color:#1b1225;font-size:14px;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  const itemsHtml =
    enquiry.items.length > 0
      ? `<h3 style="margin:24px 0 10px;font-size:15px;color:#1b1225;">Selected Services</h3><ul style="margin:0;padding-left:20px;color:#2e203c;font-size:14px;line-height:1.6;">${enquiry.items
          .map(
            (item) =>
              `<li>${escapeHtml(`${item.qty}× ${item.name} (${item.speed}) — ${formatZarAmount(item.totalZar)}`)}</li>`,
          )
          .join('')}</ul>`
      : '';

  const linksHtml = enquiry.links
    ? `<h3 style="margin:20px 0 8px;font-size:15px;color:#1b1225;">Reference Links / Inspiration</h3><pre style="margin:0;padding:12px;background:#f7f3fa;border-radius:8px;white-space:pre-wrap;font-family:inherit;font-size:13px;color:#2e203c;">${escapeHtml(enquiry.links)}</pre>`
    : '';

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f7f4fa;font-family:Arial,sans-serif;color:#1b1225;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dcd3e5;border-radius:14px;padding:28px;">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#79558d;font-weight:700;">LEMMA STUDIO</p>
    <h2 style="margin:0 0 20px;font-size:22px;color:#140e20;">${escapeHtml(heading)}</h2>
    <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
    ${itemsHtml}
    <h3 style="margin:24px 0 8px;font-size:15px;color:#1b1225;">Project Description</h3>
    <pre style="margin:0;padding:14px;background:#f7f3fa;border-radius:8px;white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.55;color:#2e203c;">${escapeHtml(enquiry.description)}</pre>
    ${linksHtml}
  </div>
</body></html>`;

  return {
    subject,
    text: textLines.join('\n'),
    html,
  };
}

export function buildMailtoHref(
  toEmail: string,
  subject: string,
  body: string,
): string | null {
  const cleanTo = sanitizeSingleLine(toEmail, 160);
  if (!EMAIL_RE.test(cleanTo)) return null;
  const cleanSubject = sanitizeSingleLine(subject, 180);
  const cleanBody = sanitizeMultiLine(body, 6000);
  return `mailto:${cleanTo}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(cleanBody)}`;
}
