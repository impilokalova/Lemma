// Lemma Studio service catalogue. Prices are in ZAR (binding base currency).
export type Speed = "standard" | "priority" | "express" | "live";
export type Category = "design" | "sports" | "web" | "presentation" | "branding";

export interface Service {
  id: string;
  name: string;
  category: Category;
  price: number; // ZAR
  from?: boolean; // "from" pricing
  unit?: string; // e.g. "/month"
  delivery: string;
  note?: string;
  addon?: boolean;
  speeds: Speed[];
}

export const CATEGORIES: Record<Category, { label: string; blurb: string }> = {
  design: { label: "Creative design", blurb: "Posters, flyers, social and print-ready layouts." },
  sports: { label: "Sports matchday", blurb: "Fast-turnaround graphics for clubs and leagues." },
  web: { label: "Websites", blurb: "Clean, fast, mobile-first sites." },
  presentation: { label: "Presentations & docs", blurb: "Decks, profiles, CVs and reports." },
  branding: { label: "Branding", blurb: "Logos, palettes and brand systems." },
};

export const SPEEDS: Record<Speed, { label: string; fee: number; desc: string }> = {
  standard: { label: "Standard", fee: 0, desc: "Normal schedule" },
  priority: { label: "Priority", fee: 0.25, desc: "+25% · moved up the queue" },
  express: { label: "Express", fee: 0.5, desc: "+50% · fastest practical turnaround" },
  live: { label: "Live / immediate", fee: 1, desc: "+100% · during live events, where feasible" },
};

const QUICK: Speed[] = ["standard", "priority", "express"];
const LIVE: Speed[] = ["standard", "priority", "express", "live"];
const SLOW: Speed[] = ["standard", "priority"];
const NONE: Speed[] = ["standard"];

const s = (
  id: string, name: string, category: Category, price: number, delivery: string, speeds: Speed[],
  extra: Partial<Service> = {},
): Service => ({ id, name, category, price, delivery, speeds, ...extra });

export const SERVICES: Service[] = [
  s("poster", "Poster", "design", 150, "4–24 hours", QUICK),
  s("flyer", "Flyer", "design", 180, "4–24 hours", QUICK),
  s("social-post", "Social media post", "design", 120, "4–24 hours", QUICK),
  s("carousel", "Carousel (up to 5 slides)", "design", 300, "1 day", QUICK),
  s("biz-card", "Digital business card", "design", 150, "1 day", QUICK),
  s("invitation", "Invitation", "design", 150, "1 day", QUICK),
  s("certificate", "Certificate", "design", 180, "1 day", QUICK),
  s("brochure", "Brochure (2 pages)", "design", 350, "1–2 days", QUICK),
  s("menu-1", "Menu (1 page)", "design", 250, "1 day", QUICK),
  s("menu-3", "Menu (2–3 pages)", "design", 450, "1–2 days", QUICK),
  s("info-std", "Standard infographic", "design", 200, "4–24 hours", QUICK),
  s("info-complex", "Complex infographic", "design", 400, "1–2 days", QUICK),

  s("matchday", "Matchday poster", "sports", 150, "1–4 hours", LIVE),
  s("lineup", "Lineup graphic", "sports", 120, "30–90 minutes", LIVE),
  s("halftime", "Half-time score", "sports", 80, "15–30 minutes", LIVE),
  s("fulltime", "Full-time score", "sports", 100, "15–30 minutes", LIVE),
  s("scorer", "Goal scorer graphic", "sports", 80, "15–30 minutes", LIVE),
  s("potm", "Player of the match", "sports", 120, "1–2 hours", LIVE),
  s("stats", "Match stats graphic", "sports", 150, "30–90 minutes", LIVE),
  s("standings", "League standings", "sports", 180, "1–4 hours", LIVE),
  s("fixture", "Fixture graphic", "sports", 200, "1 day", QUICK),

  s("web-starter", "Starter one-page website", "web", 1200, "3–5 business days", SLOW),
  s("web-landing", "Landing page", "web", 1500, "3–5 business days", SLOW),
  s("web-3", "2–3 page website", "web", 2200, "5 business days", SLOW),
  s("web-5", "4–5 page website", "web", 3500, "5 business days", SLOW, { note: "Timeline conditional on content being ready" }),
  s("web-portfolio", "Portfolio website (up to 3 pages)", "web", 1800, "5 business days", SLOW),
  s("web-restaurant", "Restaurant website with menu", "web", 2200, "5 business days", SLOW),
  s("web-redesign", "Website redesign", "web", 800, "Scoped on request", NONE, { from: true }),
  s("web-page", "Extra page", "web", 400, "Adds to schedule", SLOW, { addon: true }),
  s("web-form", "Contact form", "web", 200, "Adds to schedule", SLOW, { addon: true }),
  s("web-seo", "Basic SEO setup", "web", 300, "Adds to schedule", SLOW, { addon: true }),
  s("web-revision", "Extra revision round", "web", 150, "As scheduled", SLOW, { addon: true }),
  s("web-maint", "Website maintenance", "web", 350, "Ongoing", NONE, { from: true, unit: "/month", addon: true }),

  s("deck-5", "Presentation (up to 5 slides)", "presentation", 350, "1 day", QUICK),
  s("deck-10", "Presentation (6–10 slides)", "presentation", 600, "1–2 days", QUICK),
  s("deck-15", "Presentation (11–15 slides)", "presentation", 900, "2–3 days", SLOW),
  s("deck-20", "Presentation (16–20 slides)", "presentation", 1200, "2–3 days", SLOW),
  s("slide-extra", "Extra slide", "presentation", 60, "Adds to schedule", QUICK, { addon: true }),
  s("slide-redesign", "Slide redesign (per slide)", "presentation", 60, "Per scope", QUICK),
  s("ppt-template", "PowerPoint template", "presentation", 500, "1–2 days", SLOW),
  s("company-profile", "Company profile", "presentation", 650, "2–3 days", SLOW),
  s("cv", "CV design", "presentation", 200, "1 day", QUICK),
  s("report", "Report layout", "presentation", 350, "1–2 days", QUICK),

  s("logo-simple", "Simple logo", "branding", 350, "1–2 days", SLOW),
  s("logo-custom", "Custom logo", "branding", 650, "2–3 days", SLOW),
  s("logo-refresh", "Logo refresh", "branding", 250, "1–2 days", SLOW),
  s("palette", "Colour palette", "branding", 200, "1 day", QUICK),
  s("typography", "Typography pairing", "branding", 150, "1 day", QUICK),
  s("brand-guide", "Brand guide", "branding", 600, "2–3 days", SLOW),
  s("profile-branding", "Social profile branding", "branding", 300, "1 day", QUICK),
  s("email-sig", "Email signature", "branding", 150, "1 day", QUICK),
];

export const getService = (id: string) => SERVICES.find((x) => x.id === id);

export const formatZAR = (n: number) =>
  "R" + Math.round(n).toLocaleString("en-ZA").replace(/,/g, " ");

export const priceLabel = (sv: Service) =>
  `${sv.from ? "from " : ""}${formatZAR(sv.price)}${sv.unit ?? ""}`;