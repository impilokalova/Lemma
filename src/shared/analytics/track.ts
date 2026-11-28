export type AnalyticsEventName =
  | 'page_view'
  | 'enquiry_submit'
  | 'enquiry_email_fallback'
  | 'enquiry_whatsapp_click'
  | 'enquiry_copy'
  | 'quote_add_item'
  | 'quote_submit';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventDetail = Record<string, string | number | boolean>;

export function sanitizeEventDetail(detail?: EventDetail): EventDetail {
  if (!detail) return {};
  const clean: EventDetail = {};
  for (const [key, value] of Object.entries(detail)) {
    if (!/^[a-zA-Z0-9_]{1,32}$/.test(key)) continue;
    if (typeof value === 'string') {
      clean[key] = value.slice(0, 80);
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      clean[key] = value;
    } else if (typeof value === 'boolean') {
      clean[key] = value;
    }
  }
  return clean;
}

export function trackEvent(name: AnalyticsEventName, detail?: EventDetail): void {
  if (typeof window === 'undefined') return;
  const safeDetail = sanitizeEventDetail(detail);

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, safeDetail);
    }
  } catch {
    // Ignore third-party tracker errors
  }

  const payload = JSON.stringify({
    name,
    path: window.location.pathname.slice(0, 160),
    detail: safeDetail,
  });

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      const sent = navigator.sendBeacon('/api/events', blob);
      if (sent) return;
    }
  } catch {
    // Fallback to fetch below
  }

  try {
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Analytics must never interrupt UX
  }
}
