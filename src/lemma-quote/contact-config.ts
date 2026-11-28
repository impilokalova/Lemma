/**
 * CONTACT_CONFIG — owner setup
 * ---------------------------------------------------------------
 * WhatsApp Business: +27 79 475 0556 (public customer enquiry number).
 * These PUBLIC environment variables can override the defaults at deploy time:
 *
 *   VITE_LEMMA_WHATSAPP_NUMBER=27XXXXXXXXX   (international digits, no + or spaces)
 *   VITE_LEMMA_TELEGRAM_USERNAME=yourhandle  (no @)
 *
 * WhatsApp is enabled by default. Telegram stays disabled until configured.
 */
export const CONTACT_CONFIG: { whatsappNumber: string | null; telegramUsername: string | null } = {
  whatsappNumber: cleanDigits(import.meta.env['VITE_LEMMA_WHATSAPP_NUMBER']) || '27794750556',
  telegramUsername: cleanTg(import.meta.env['VITE_LEMMA_TELEGRAM_USERNAME']) || null,
};

export const OVERRIDE_KEY = "lemma-contact-override";

export function cleanDigits(v: unknown): string {
  return typeof v === "string" ? v.replace(/\D/g, "") : "";
}
export function cleanTg(v: unknown): string {
  return typeof v === "string" ? v.trim().replace(/^@/, "") : "";
}
export const validWhatsApp = (d: string) => /^[1-9]\d{7,14}$/.test(d);
export const validTelegram = (u: string) => /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(u);

export interface ResolvedContact {
  whatsappNumber: string | null;
  telegramUsername: string | null;
  isLocalOverride: boolean;
}

/** Call only in effects/handlers (reads localStorage). */
export function resolveContact(): ResolvedContact {
  let wa = CONTACT_CONFIG.whatsappNumber;
  let tg = CONTACT_CONFIG.telegramUsername;
  let isLocalOverride = false;
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    if (raw) {
      const o = JSON.parse(raw);
      const w = cleanDigits(o.whatsappNumber);
      const t = cleanTg(o.telegramUsername);
      if (w && validWhatsApp(w)) { wa = w; isLocalOverride = true; }
      if (t && validTelegram(t)) { tg = t; isLocalOverride = true; }
    }
  } catch { /* ignore */ }
  return {
    whatsappNumber: wa && validWhatsApp(wa) ? wa : null,
    telegramUsername: tg && validTelegram(tg) ? tg : null,
    isLocalOverride,
  };
}