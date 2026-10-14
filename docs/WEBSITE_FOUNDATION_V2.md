# Lemma Studio — Approved website foundation V2

## Authority
Preserve the bootstrap conversion-first mandate: **Lemma must earn before it expands**. No e-commerce, database, backend, invented testimonials or unverified client work.

## Navigation and routes
Primary navigation (six): Home `/`, Services `/services`, Work `/work`, Packages `/packages`, About `/about`, Contact `/contact`.

Services children: `/services/creative`, `/services/web`, `/services/social`.

Work children: `/work/projects`, `/work/projects/:slug`, `/work/templates`, `/work/templates/:slug`, `/work/demos`, `/work/demos/:slug`.

Templates are not a seventh primary page. The gallery includes three categories: website templates, **Canva poster samples**, **Canva flyer samples**. Add approved sample images and verified Canva share links to the typed registry; do not fabricate portfolio content or display unlicensed artwork. If a sample is not published, show an honest empty state. Future live demos are standalone experiences and should be labelled as concepts.

## Navigation behavior
Desktop ≥1200px: sticky horizontal navigation, Services and Work mega-menus, Get a Quote CTA. Tablet 768–1199px: Work shortcut and drawer. Mobile <768px: full-width immersive drawer with six primary links, expandable groups and Start a Project CTA. Keyboard Escape, focus trapping in drawer, return focus, touch targets ≥44px, aria-expanded and reduced motion are required.

## Brand tokens
Primary #B16CFF, secondary #E185FF, glow #DAB6FF, dark #140E20, light #F4EAFB. Balanced visual intensity: cinematic dark hero, light editorial sections. Space Grotesk headings, Inter body (system fallback until licensed font delivery is configured). The flat geometric illusion mark is separate from the future animated mathematical Earth artwork.

## Build gates
First implement routing, skeletons and menus. Test at 390px, 820px and 1440px; verify keyboard and deep-link reload. Do not build 3D hero yet. Do not publish contact form until submission method and official WhatsApp number are confirmed. Cloudflare Pages build `npm run build`, output `dist`; review branch preview before merging.
