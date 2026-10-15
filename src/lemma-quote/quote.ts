import { useCallback, useEffect, useState } from "react";
import { SPEEDS, formatZAR, getService, type Speed } from "./catalog";

export interface CartItem { id: string; qty: number; speed: Speed }
export interface Details {
  fullName: string; business: string; email: string; country: string; dialCode: string;
  phone: string; whatsapp: string; channel: "whatsapp" | "telegram" | "email" | "phone" | "";
  currency: string; description: string; style: string; assets: string; deadline: string;
  consent: boolean;
}
export interface Draft { items: CartItem[]; details: Details; reference?: string; step: number }

export const emptyDraft = (): Draft => ({
  items: [], step: 0,
  details: {
    fullName: "", business: "", email: "", country: "", dialCode: "", phone: "", whatsapp: "",
    channel: "", currency: "ZAR", description: "", style: "", assets: "", deadline: "", consent: false,
  },
});

const KEY = "lemma-quote-draft";

export function useDraft() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw) as Draft;
        setDraft({ ...emptyDraft(), ...d, details: { ...emptyDraft().details, ...d.details },
          items: (d.items ?? []).filter((i) => getService(i.id)) });
      }
    } catch { /* ignore corrupt draft */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(draft));
  }, [draft, loaded]);
  const update = useCallback((fn: (d: Draft) => Draft) => setDraft((d) => fn(d)), []);
  const clear = useCallback(() => { localStorage.removeItem(KEY); setDraft(emptyDraft()); }, []);
  return { draft, update, loaded, clear };
}

export function addToDraft(id: string) {
  try {
    const raw = localStorage.getItem(KEY);
    const d: Draft = raw ? JSON.parse(raw) : emptyDraft();
    const ex = d.items.find((i) => i.id === id);
    if (ex) ex.qty += 1; else d.items.push({ id, qty: 1, speed: "standard" });
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch { /* ignore */ }
}

export function lineTotal(i: CartItem) {
  const sv = getService(i.id);
  if (!sv) return { base: 0, fee: 0, total: 0 };
  const speed = sv.speeds.includes(i.speed) ? i.speed : "standard";
  const base = sv.price * i.qty;
  const fee = base * SPEEDS[speed].fee;
  return { base, fee, total: base + fee };
}

export function totals(items: CartItem[]) {
  return items.reduce(
    (a, i) => { const l = lineTotal(i); return { base: a.base + l.base, fee: a.fee + l.fee, total: a.total + l.total }; },
    { base: 0, fee: 0, total: 0 },
  );
}

export function newReference() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3))).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  return `LEM-${ymd}-${rand}`;
}

export function buildBrief(d: Draft) {
  const t = totals(d.items);
  const x = d.details;
  const lines = [
    `LEMMA STUDIO — QUOTE REQUEST`,
    `Ref: ${d.reference ?? "—"}`,
    ``,
    `CLIENT`,
    `Name: ${x.fullName}`,
    (x.business || null) && `Business: ${x.business}`,
    `Email: ${x.email}`,
    `Country: ${x.country}`,
    `Phone: ${x.dialCode} ${x.phone}`,
    (x.whatsapp || null) && `WhatsApp: ${x.dialCode} ${x.whatsapp}`,
    `Preferred channel: ${x.channel}`,
    `Preferred currency (display only): ${x.currency}`,
    ``,
    `ITEMS`,
    ...d.items.map((i) => {
      const sv = getService(i.id)!;
      const l = lineTotal(i);
      return `• ${sv.name} ×${i.qty} — ${SPEEDS[i.speed].label} — ${sv.from ? "from " : ""}${formatZAR(l.total)}${sv.unit ?? ""}`;
    }),
    ``,
    `Subtotal: ${formatZAR(t.base)}`,
    `Speed fees: ${formatZAR(t.fee)}`,
    `ESTIMATED TOTAL: ${formatZAR(t.total)} (ZAR, binding base currency)`,
    ``,
    `BRIEF`,
    `Description: ${x.description}`,
    (x.style || null) && `Style: ${x.style}`,
    (x.assets || null) && `Assets/links: ${x.assets}`,
    `Deadline: ${x.deadline}`,
    ``,
    `Estimate only — availability and rush fees subject to Lemma Studio confirmation. International payment arrangements confirmed manually.`,
  ];
  return lines.filter((l) => l !== null).join("\n");
}