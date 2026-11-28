import { describe, expect, it } from 'vitest';
import {
  buildMailtoHref,
  escapeHtml,
  formatEnquiryEmail,
  sanitizeSingleLine,
  validateEnquiryPayload,
} from './enquiry';

describe('enquiry validation and email formatting', () => {
  it('validates a complete general enquiry and strips control characters', () => {
    const result = validateEnquiryPayload({
      kind: 'general',
      name: '  Amina\r\nDlamini  ',
      email: 'AMINA@EXAMPLE.CO.ZA',
      country: 'South Africa',
      service: 'Website / landing page',
      description: 'Need a responsive studio website with portfolio.',
      consent: true,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.name).toBe('Amina Dlamini');
    expect(result.data.email).toBe('amina@example.co.za');

    const formatted = formatEnquiryEmail(result.data);
    expect(formatted.subject).not.toMatch(/[\r\n]/);
    expect(formatted.subject).toContain('Amina Dlamini');
  });

  it('rejects honeypot submissions cleanly', () => {
    const result = validateEnquiryPayload({
      name: 'Bot',
      email: 'bot@example.com',
      country: 'ZA',
      service: 'Graphic design',
      description: 'Automated test message',
      consent: true,
      _honey: 'https://spam.invalid',
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.honeypotTriggered).toBe(true);
  });

  it('requires items on quote submissions and escapes HTML payloads safely', () => {
    const missingItems = validateEnquiryPayload({
      kind: 'quote',
      name: 'Thabo',
      email: 'thabo@example.com',
      country: 'South Africa',
      description: 'Quote without services',
      consent: true,
      items: [],
    });
    expect(missingItems.ok).toBe(false);

    const validQuote = validateEnquiryPayload({
      kind: 'quote',
      name: '<script>alert(1)</script>',
      email: 'thabo@example.com',
      country: 'South Africa',
      description: 'Poster & website package <img src=x onerror=alert(1)>',
      consent: true,
      reference: 'LEMMA-1234',
      estimatedTotalZar: 1575,
      items: [
        { id: 'poster', name: 'Promotional Poster', qty: 2, speed: 'priority', totalZar: 375 },
        { id: 'web-starter', name: 'Starter Website', qty: 1, speed: 'standard', totalZar: 1200 },
      ],
    });

    expect(validQuote.ok).toBe(true);
    if (!validQuote.ok) return;

    const email = formatEnquiryEmail(validQuote.data);
    expect(email.html).not.toContain('<script>');
    expect(email.html).not.toContain('<img src=x');
    expect(email.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('builds safe mailto links and sanitizes single lines', () => {
    expect(sanitizeSingleLine('hello\r\nbcc:evil@x.com', 100)).toBe('hello bcc:evil@x.com');
    expect(buildMailtoHref('not-an-email', 'Subject', 'Body')).toBeNull();
    expect(buildMailtoHref('contact.lemmastudio@gmail.com', 'Hello\nWorld', 'Test')).toBe(
      'mailto:contact.lemmastudio@gmail.com?subject=Hello%20World&body=Test',
    );
  });
});
