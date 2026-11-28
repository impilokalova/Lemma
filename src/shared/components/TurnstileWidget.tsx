import { useEffect, useRef } from 'react';

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark' | 'auto';
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim();
const VALID_SITE_KEY = /^[A-Za-z0-9_-]{8,100}$/.test(SITE_KEY) ? SITE_KEY : '';

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileScriptPromise) return turnstileScriptPromise;

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('lemma-turnstile-script') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')), {
        once: true,
      });
      return;
    }
    const script = document.createElement('script');
    script.id = 'lemma-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export function TurnstileWidget({
  resetNonce,
  onTokenChange,
}: {
  resetNonce: number;
  onTokenChange: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onTokenChange);
  onTokenRef.current = onTokenChange;

  useEffect(() => {
    if (!VALID_SITE_KEY || !containerRef.current) return;
    let active = true;

    void loadTurnstileScript()
      .then(() => {
        if (!active || !containerRef.current || !window.turnstile) return;
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: VALID_SITE_KEY,
          theme: 'light',
          callback: (token) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(''),
          'error-callback': () => onTokenRef.current(''),
        });
      })
      .catch(() => {
        onTokenRef.current('');
      });

    return () => {
      active = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore unmount cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!VALID_SITE_KEY || resetNonce === 0) return;
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // Ignore reset errors
      }
    }
    onTokenRef.current('');
  }, [resetNonce]);

  if (!VALID_SITE_KEY) return null;

  return <div className="enquiry-turnstile" ref={containerRef} />;
}
