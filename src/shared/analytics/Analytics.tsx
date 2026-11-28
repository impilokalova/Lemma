import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from './track';

const CF_TOKEN_RE = /^[A-Za-z0-9_-]{8,128}$/;

export function Analytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    const token = (import.meta.env.VITE_CF_ANALYTICS_TOKEN || '').trim();
    if (!token || !CF_TOKEN_RE.test(token)) return;
    if (document.getElementById('lemma-cf-analytics')) return;

    const script = document.createElement('script');
    script.id = 'lemma-cf-analytics';
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    trackEvent('page_view');
  }, [pathname]);

  return null;
}
