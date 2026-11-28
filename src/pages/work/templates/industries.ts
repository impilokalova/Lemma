export type IndustryConcept = {
 id: string;
 label: string;
 routeSlug: string;
 headline: string;
 lead: string;
 primaryCta: string;
 navItems: readonly [string, string, string];
 blocks: readonly {
  tag: string;
  title: string;
  detail: string;
 }[];
 mobileHighlight: string;
};

export type IndustryTrack = {
 slug: string;
 code: string;
 title: string;
 shortName: string;
 summary: string;
 cta: string;
 concepts: readonly IndustryConcept[];
};

export const industryTracks: readonly IndustryTrack[] = [
 {
  slug: 'healthcare',
  code: '01 / HEALTHCARE',
  title: 'Healthcare & clinics',
  shortName: 'healthcare',
  summary:
   'Calm, patient-first websites for medical practices, dental studios, physiotherapy clinics and wellness providers with clear appointment pathways.',
  cta: 'View healthcare samples ↗',
  concepts: [
   {
    id: 'medical-practice',
    label: '01. Medical & Dental Clinic',
    routeSlug: 'healthcare-clinic',
    headline: 'Trusted family care, booked in two taps.',
    lead: 'Calm clinical architecture designed for nervous patients to check practitioner hours, medical aid acceptance and book consultations effortlessly.',
    primaryCta: 'Book appointment',
    navItems: ['Treatments', 'Practitioners', 'Medical aid'],
    blocks: [
     {
      tag: 'Navigation & intake',
      title: 'Instant booking & emergency hours',
      detail: 'Always-visible clinic hours, WhatsApp triage link and clear online appointment requests.'
     },
     {
      tag: 'Clinical trust',
      title: 'Practitioner profiles & credentials',
      detail: 'HPCSA-aligned bios, languages spoken and clear fee-schedule transparency.'
     },
     {
      tag: 'Accessibility',
      title: 'WCAG AA contrast & calm typography',
      detail: 'High-legibility headings and 48px mobile tap targets for every age group.'
     }
    ],
    mobileHighlight: 'Sticky click-to-call bar and thumb-ready Book Appointment action above the fold.'
   },
   {
    id: 'physio-specialist',
    label: '02. Specialist & Physio Studio',
    routeSlug: 'specialist-studio',
    headline: 'Guided recovery built around clarity.',
    lead: 'Structured service pathways covering sports rehabilitation, pain assessment and first-visit preparation checklists.',
    primaryCta: 'Schedule assessment',
    navItems: ['Conditions', 'Rehab plans', 'Locations'],
    blocks: [
     {
      tag: 'Triage pathway',
      title: 'Condition-by-condition guide',
      detail: 'Organised symptom cards that route visitors directly to the right specialist.'
     },
     {
      tag: 'Preparation',
      title: 'First-visit checklist & forms',
      detail: 'Digital intake instructions so reception bottlenecks drop before arrival.'
     },
     {
      tag: 'Local SEO',
      title: 'Practice map & parking access',
      detail: 'Suburb landing details, wheelchair access notes and direct directions.'
     }
    ],
    mobileHighlight: 'Single-column condition accordion with immediate mobile booking drawer.'
   }
  ]
 },
 {
  slug: 'insurance',
  code: '02 / INSURANCE',
  title: 'Insurance & cover',
  shortName: 'insurance',
  summary:
   'Trust-building landing pages for insurance brokers and policy providers focused on clarity, policy comparisons and fast quote capture.',
  cta: 'View insurance samples ↗',
  concepts: [
   {
    id: 'broker-landing',
    label: '01. Broker & Short-Term Cover',
    routeSlug: 'insurance-broker',
    headline: 'Plain-English cover without fine-print surprises.',
    lead: 'Conversion-focused landing architecture comparing personal, vehicle and business cover tiers side by side with an inline callback request.',
    primaryCta: 'Compare cover tiers',
    navItems: ['Personal cover', 'Business cover', 'Claims'],
    blocks: [
     {
      tag: 'Clarity',
      title: 'Side-by-side policy comparison',
      detail: 'Clean, scannable excess and benefit rows with zero jargon or clutter.'
     },
     {
      tag: 'Lead capture',
      title: 'Two-step quote qualification',
      detail: 'Short form capturing cover type and callback window without overwhelming visitors.'
     },
     {
      tag: 'Assurance',
      title: 'Claims turnaround & FSP footer',
      detail: 'Dedicated claims contact strip and regulatory notice placement.'
     }
    ],
    mobileHighlight: 'Swipeless stacked comparison cards and 16px zoom-safe quote form inputs.'
   },
   {
    id: 'life-underwriter',
    label: '02. Life & Advisory Hub',
    routeSlug: 'life-cover-hub',
    headline: 'Structured protection for growing families.',
    lead: 'Editorial advisory website pairing life-stage cover scenarios with advisor callback scheduling.',
    primaryCta: 'Request cover review',
    navItems: ['Life cover', 'Income cover', 'Advisors'],
    blocks: [
     {
      tag: 'Scenarios',
      title: 'Life-stage protection breakdowns',
      detail: 'Clear pathways for homebuyers, parents and business key-person cover.'
     },
     {
      tag: 'Credibility',
      title: 'Documented claims payout transparency',
      detail: 'Structured claims FAQ and policy guide downloads.'
     },
     {
      tag: 'Compliance',
      title: 'Clean POPIA & FSP disclosure bar',
      detail: 'Legible footer disclosures built to pass regulatory review.'
     }
    ],
    mobileHighlight: 'Compact mobile tier selector with direct WhatsApp advisor handoff.'
   }
  ]
 },
 {
  slug: 'hospitality',
  code: '03 / HOSPITALITY',
  title: 'Hospitality & dining',
  shortName: 'hospitality',
  summary:
   'Atmospheric websites and digital menus for boutique stays, restaurants, cafes and guest experiences built for mobile visitors.',
  cta: 'View hospitality samples ↗',
  concepts: [
   {
    id: 'restaurant-web',
    label: '01. Restaurant & Digital Menu',
    routeSlug: 'dining-room',
    headline: 'Seasonal kitchen, effortless table reservations.',
    lead: 'Fast-loading dining website pairing live HTML menus (no PDF downloads) with direct reservation and private-dining enquiries.',
    primaryCta: 'Reserve a table',
    navItems: ['Menus', 'Private dining', 'Visit us'],
    blocks: [
     {
      tag: 'Mobile first',
      title: 'Live HTML food & drinks menu',
      detail: 'Instant dietary filters and readable mobile typography without pinch-zooming PDFs.'
     },
     {
      tag: 'Hospitality',
      title: 'Opening hours & walk-in notes',
      detail: 'Clear kitchen last-order times, parking details and dress code.'
     },
     {
      tag: 'Events',
      title: 'Group bookings & chef’s table',
      detail: 'Structured capacity notes and set-menu enquiry form.'
     }
    ],
    mobileHighlight: 'One-tap Google Maps directions, hours and Reserve action pinned in thumb reach.'
   },
   {
    id: 'boutique-stay',
    label: '02. Boutique Guest House',
    routeSlug: 'boutique-stay',
    headline: 'Quiet coastal & winelands hospitality.',
    lead: 'Visual suite showcase focused on direct commission-free room enquiries, local experiences and check-in clarity.',
    primaryCta: 'Check suite availability',
    navItems: ['Suites', 'Experiences', 'Location'],
    blocks: [
     {
      tag: 'Direct bookings',
      title: 'Commission-free suite enquiries',
      detail: 'Room breakdowns with seasonal rates and direct WhatsApp concierge link.'
     },
     {
      tag: 'Atmosphere',
      title: 'Curated neighbourhood guide',
      detail: 'Walking-distance dining, wine estates and transfer options.'
     },
     {
      tag: 'Trust',
      title: 'Amenities & house policies',
      detail: 'Solar backup power, fibre Wi-Fi and check-in windows stated clearly.'
     }
    ],
    mobileHighlight: 'Fast-loading WebP suite cards and uncluttered single-column rate table.'
   }
  ]
 },
 {
  slug: 'finance',
  code: '04 / FINANCE',
  title: 'Finance & advisory',
  shortName: 'finance',
  summary:
   'Credible, structured digital presence for accounting practices, financial advisors, tax consultants and modern finance teams.',
  cta: 'View finance samples ↗',
  concepts: [
   {
    id: 'accounting-practice',
    label: '01. Accounting & Tax Firm',
    routeSlug: 'accounting-firm',
    headline: 'Clear numbers and proactive tax guidance.',
    lead: 'Authority-led firm website separating SME monthly retainers, CIPC compliance and annual tax audits into clean client tiers.',
    primaryCta: 'Book consultation',
    navItems: ['Tax & audit', 'Retainers', 'Client portal'],
    blocks: [
     {
      tag: 'Services',
      title: 'SME retainer & compliance matrix',
      detail: 'Monthly bookkeeping, payroll and SARS filing bundles explained transparently.'
     },
     {
      tag: 'Authority',
      title: 'Partner credentials & SAICA badges',
      detail: 'Quiet, credible trust strip positioning partner qualifications cleanly.'
     },
     {
      tag: 'Workflow',
      title: 'Document onboarding checklist',
      detail: 'Clear list of handover requirements for switching accountants smoothly.'
     }
    ],
    mobileHighlight: 'Tabular numerals for retainer pricing and compact expandable service rows.'
   },
   {
    id: 'wealth-advisory',
    label: '02. Wealth & Corporate Advisory',
    routeSlug: 'wealth-advisory',
    headline: 'Disciplined capital planning for founders.',
    lead: 'Minimal editorial website for independent financial planners and boutique corporate advisory practices.',
    primaryCta: 'Request advisory call',
    navItems: ['Private wealth', 'Business exit', 'Insights'],
    blocks: [
     {
      tag: 'Positioning',
      title: 'Fee-only advisory clarity',
      detail: 'Plain-language breakdown of fiduciary structure and onboarding scope.'
     },
     {
      tag: 'Proof',
      title: 'Sector briefings & quarterly notes',
      detail: 'Readable editorial articles structured with clean pull-quotes.'
     },
     {
      tag: 'Security',
      title: 'Encrypted intake & POPIA notice',
      detail: 'Minimal private callback request without intrusive tracking.'
     }
    ],
    mobileHighlight: 'Generous mobile line height and distraction-free reading width.'
   }
  ]
 },
 {
  slug: 'retail',
  code: '05 / RETAIL',
  title: 'Retail & e-commerce',
  shortName: 'retail',
  summary:
   'High-converting online storefronts, boutique catalogues and product launch pages designed for fast mobile browsing and checkout.',
  cta: 'View retail samples ↗',
  concepts: [
   {
    id: 'boutique-storefront',
    label: '01. Curated Storefront',
    routeSlug: 'retail-storefront',
    headline: 'Considered goods, built for mobile checkout.',
    lead: 'Clean catalogue website pairing fast category filters, transparent courier timelines and one-tap bag summary.',
    primaryCta: 'Browse collection',
    navItems: ['Shop all', 'New arrivals', 'Delivery'],
    blocks: [
     {
      tag: 'Merchandising',
      title: 'Category filter & quick-add cards',
      detail: 'Clean product tiles highlighting ZAR pricing, stock state and variant clarity.'
     },
     {
      tag: 'Conversion',
      title: 'Transparent shipping & returns bar',
      detail: 'Same-day dispatch cutoffs and nationwide courier rates upfront.'
     },
     {
      tag: 'Checkout',
      title: 'Uncluttered cart & PayFast/EFT readiness',
      detail: 'Zero popup clutter during checkout to protect conversion rates.'
     }
    ],
    mobileHighlight: '2-column mobile catalogue grid with 48px touch-friendly variant buttons.'
   },
   {
    id: 'product-launch',
    label: '02. Flagship Product Drop',
    routeSlug: 'product-launch',
    headline: 'One signature release, told cleanly.',
    lead: 'Focused single-product landing page highlighting materials, sizing specs and pre-order reservations.',
    primaryCta: 'Reserve yours',
    navItems: ['Overview', 'Materials', 'Sizing'],
    blocks: [
     {
      tag: 'Storytelling',
      title: 'Detail breakdown & craft callouts',
      detail: 'Crisp feature grid highlighting durability, dimensions and warranty.'
     },
     {
      tag: 'Fit & spec',
      title: 'Interactive size & variant guide',
      detail: 'Clean measurement table avoiding returns and customer hesitation.'
     },
     {
      tag: 'Pre-order',
      title: 'Batch dispatch tracker',
      detail: 'Clear shipping window dates and immediate email confirmation.'
     }
    ],
    mobileHighlight: 'Full-width above-the-fold product showcase with clear Reserve button.'
   }
  ]
 },
 {
  slug: 'entertainment',
  code: '06 / ENTERTAINMENT',
  title: 'Entertainment, events & sports',
  shortName: 'entertainment',
  summary:
   'Ticket-ready event showcases, sports hubs, venue calendars and artist or media campaign sites built for high-energy launches.',
  cta: 'View entertainment samples ↗',
  concepts: [
   {
    id: 'festival-venue',
    label: '01. Live Event & Ticket Hub',
    routeSlug: 'live-event-hub',
    headline: 'Lineup, stage times and tickets in one place.',
    lead: 'High-contrast mobile-first event site built to handle heavy social-link traffic cleanly on launch day.',
    primaryCta: 'Get passes',
    navItems: ['Lineup', 'Schedule', 'Venue info'],
    blocks: [
     {
      tag: 'Schedule',
      title: 'Day-by-day stage timetable',
      detail: 'Scannable set times designed for quick mobile checks on site.'
     },
     {
      tag: 'Ticketing',
      title: 'Pass tiers & VIP inclusions',
      detail: 'Clear pricing tiers with direct external or native ticket handoff.'
     },
     {
      tag: 'Logistics',
      title: 'Gates, cashless FAQ & rideshare drop',
      detail: 'Practical arrival info cutting down pre-event support messages.'
     }
    ],
    mobileHighlight: 'Fast-loading dark venue theme with lightweight timetable tabs.'
   },
   {
    id: 'sports-club',
    label: '02. Sports Club & Fixture Portal',
    routeSlug: 'sports-portal',
    headline: 'Fixtures, results and supporter memberships.',
    lead: 'Editorial sports club platform pairing matchday previews, standings tables and season pass registration.',
    primaryCta: 'View fixtures',
    navItems: ['Fixtures', 'Squad', 'Membership'],
    blocks: [
     {
      tag: 'Matchday',
      title: 'Upcoming fixtures & score archive',
      detail: 'Tabular match timelines built for crisp legibility on narrow screens.'
     },
     {
      tag: 'Supporters',
      title: 'Membership & merch storefront link',
      detail: 'Clear supporter tiers and kit release notices.'
     },
     {
      tag: 'Media',
      title: 'Press accreditation & sponsor deck',
      detail: 'Direct contact pathway for broadcasters and commercial partners.'
     }
    ],
    mobileHighlight: 'Compact match ticker layout and 1-column squad cards on phones.'
   }
  ]
 },
 {
  slug: 'real-estate',
  code: '07 / REAL ESTATE',
  title: 'Real estate & property',
  shortName: 'property',
  summary:
   'Editorial property listings, residential developments and estate agency sites with clean neighbourhood guides and viewing requests.',
  cta: 'View property samples ↗',
  concepts: [
   {
    id: 'development-showcase',
    label: '01. New Residential Development',
    routeSlug: 'property-development',
    headline: 'Architectural living, transparently priced.',
    lead: 'Showcase website for new residential builds featuring floorplan comparisons, levy estimates and private viewing bookings.',
    primaryCta: 'Book private viewing',
    navItems: ['Residences', 'Floorplans', 'Neighbourhood'],
    blocks: [
     {
      tag: 'Inventory',
      title: 'Unit types & transfer-duty breakdown',
      detail: 'Clear square-metre specs, levies and bond repayment estimates.'
     },
     {
      tag: 'Context',
      title: 'Walkability & school-zone guide',
      detail: 'Practical neighbourhood distances rather than generic lifestyle hype.'
     },
     {
      tag: 'Enquiry',
      title: 'Investor pack & floorplan download',
      detail: 'Focused lead capture routing straight to the sales agent.'
     }
    ],
    mobileHighlight: 'Single-column unit cards with readable tabular pricing and viewing CTA.'
   },
   {
    id: 'boutique-agency',
    label: '02. Boutique Estate Agency',
    routeSlug: 'estate-agency',
    headline: 'Curated homes across sought-after suburbs.',
    lead: 'Clean agency site highlighting featured mandates, free valuation requests and verified agent profiles.',
    primaryCta: 'Request valuation',
    navItems: ['Listings', 'Sell with us', 'Agents'],
    blocks: [
     {
      tag: 'Mandates',
      title: 'Filterable suburb & price listings',
      detail: 'Fast bedroom, suburb and price-band filtering without clunky portals.'
     },
     {
      tag: 'Sellers',
      title: 'Transparent marketing process',
      detail: 'Step-by-step mandate timeline for homeowners comparing agencies.'
     },
     {
      tag: 'Direct contact',
      title: 'WhatsApp viewing scheduler',
      detail: 'Direct agent connection on each listing card.'
     }
    ],
    mobileHighlight: 'Full-bleed 4:3 mobile property cards with direct tap-to-enquire.'
   }
  ]
 },
 {
  slug: 'legal',
  code: '08 / LEGAL',
  title: 'Legal & professional services',
  shortName: 'legal',
  summary:
   'Authoritative websites for law firms, architecture practices and specialist consultancies focused on trust and clear client intake.',
  cta: 'View legal samples ↗',
  concepts: [
   {
    id: 'law-practice',
    label: '01. Commercial & Conveyancing Firm',
    routeSlug: 'law-practice',
    headline: 'Decisive counsel for business and property.',
    lead: 'Restrained editorial law firm website outlining practice areas, partner admissions and confidential consultation intake.',
    primaryCta: 'Schedule consultation',
    navItems: ['Practice areas', 'Partners', 'Publications'],
    blocks: [
     {
      tag: 'Practice areas',
      title: 'Commercial, labour & conveyancing',
      detail: 'Structured scope pages helping clients identify the right director quickly.'
     },
     {
      tag: 'Leadership',
      title: 'Partner biographies & admissions',
      detail: 'High Court admission dates, LLB credentials and direct email access.'
     },
     {
      tag: 'Trust',
      title: 'PAIA manual & fee clarity',
      detail: 'Accessible statutory notices and initial consult turnaround times.'
     }
    ],
    mobileHighlight: 'Clean 1-column practice list and distraction-free intake form.'
   },
   {
    id: 'architecture-consultancy',
    label: '02. Architecture & Specialist Consultancy',
    routeSlug: 'consultancy-studio',
    headline: 'Spatial rigour from brief to handover.',
    lead: 'Minimal grid website balancing technical feasibility studies with built project dossiers and RFQ intake.',
    primaryCta: 'Start a brief',
    navItems: ['Projects', 'Methodology', 'Studio'],
    blocks: [
     {
      tag: 'Portfolio',
      title: 'Case dossiers with brief & outcome',
      detail: 'Structured project summaries showing timeline, floor area and constraints.'
     },
     {
      tag: 'Process',
      title: 'SACAP-aligned 6-stage roadmap',
      detail: 'Clear phase expectations from concept feasibility through site sign-off.'
     },
     {
      tag: 'RFQ',
      title: 'Project budget & site scope intake',
      detail: 'Pre-qualifies residential vs commercial briefs cleanly.'
     }
    ],
    mobileHighlight: 'Edge-to-edge dossier imagery and concise 1-tap phase breakdown.'
   }
  ]
 },
 {
  slug: 'construction',
  code: '09 / CONSTRUCTION',
  title: 'Construction, trades & engineering',
  shortName: 'trades',
  summary:
   'Structured capability sites for builders, solar installers, logistics operators and commercial service teams built for project enquiries.',
  cta: 'View trades samples ↗',
  concepts: [
   {
    id: 'solar-engineering',
    label: '01. Solar & Backup Power Installer',
    routeSlug: 'solar-engineering',
    headline: 'Engineered solar systems sized for uptime.',
    lead: 'Practical technical landing page detailing kVA tiers, COC compliance and site-assessment quote requests.',
    primaryCta: 'Book site assessment',
    navItems: ['Systems', 'Commercial', 'Warranty'],
    blocks: [
     {
      tag: 'Sizing tiers',
      title: '5kVA, 8kVA & commercial hybrid specs',
      detail: 'Honest inverter, battery kWh and panel counts with clear installation timelines.'
     },
     {
      tag: 'Compliance',
      title: 'COC sign-off & SSEG registration',
      detail: 'Municipal registration support explained clearly to build buyer confidence.'
     },
     {
      tag: 'Warranty',
      title: 'Manufacturer & workmanship backing',
      detail: 'Direct support hotline and annual maintenance schedule.'
     }
    ],
    mobileHighlight: 'Quick load-calculator intake and sticky Call/Quote trigger.'
   },
   {
    id: 'commercial-builder',
    label: '02. Construction & Civil Contractor',
    routeSlug: 'civil-contractor',
    headline: 'On-schedule commercial & industrial builds.',
    lead: 'Credibility-driven contractor site displaying CIDB grading, safety records and tender dossier downloads.',
    primaryCta: 'Request tender pack',
    navItems: ['Capabilities', 'Completed builds', 'Safety & CIDB'],
    blocks: [
     {
      tag: 'Credentials',
      title: 'CIDB grading & NHBRC compliance',
      detail: 'Upfront verification numbers and downloadable company capability profile.'
     },
     {
      tag: 'Track record',
      title: 'Sector build gallery',
      detail: 'Warehouses, retail fit-outs and civil works documented with project values.'
     },
     {
      tag: 'Tenders',
      title: 'Direct QS & estimating contact',
      detail: 'Streamlined BOQ upload or email link for procurement teams.'
     }
    ],
    mobileHighlight: 'Readable capability rows tailored for site managers on phones.'
   }
  ]
 },
 {
  slug: 'education',
  code: '10 / EDUCATION',
  title: 'Education & training',
  shortName: 'education',
  summary:
   'Clear course catalogues, private academy portals and workshop enrolment pages structured to guide students and parents.',
  cta: 'View education samples ↗',
  concepts: [
   {
    id: 'training-academy',
    label: '01. Skills & Short-Course Academy',
    routeSlug: 'skills-academy',
    headline: 'Practical cohorts built for real careers.',
    lead: 'Structured academy website showcasing upcoming intake dates, syllabus modules and bursary or employer sponsorship options.',
    primaryCta: 'Apply for next cohort',
    navItems: ['Courses', 'Admissions', 'For employers'],
    blocks: [
     {
      tag: 'Curriculum',
      title: 'Week-by-week module outlines',
      detail: 'Clear learning outcomes, credit values and accredited certificate details.'
     },
     {
      tag: 'Fees & dates',
      title: 'Upcoming intake & payment plans',
      detail: 'Transparent tuition breakdown with early-bird and instalment choices.'
     },
     {
      tag: 'Support',
      title: 'Student advisor Q&A pathway',
      detail: 'Low-friction application form and WhatsApp admissions desk.'
     }
    ],
    mobileHighlight: 'Compact cohort date selector and full-width Apply button.'
   },
   {
    id: 'independent-school',
    label: '02. Independent School Hub',
    routeSlug: 'independent-school',
    headline: 'Focused learning, open admissions.',
    lead: 'Parent-friendly school website prioritising term dates, open-day bookings, fee schedules and admissions checklists.',
    primaryCta: 'Book open day',
    navItems: ['Academics', 'Admissions', 'Term dates'],
    blocks: [
     {
      tag: 'Parents',
      title: 'Grade phases & fee schedule',
      detail: 'Pre-primary through matric pathways with downloadable fee PDF.'
     },
     {
      tag: 'Campus visits',
      title: 'Open-day & tour registration',
      detail: 'Quick date selector for prospective families.'
     },
     {
      tag: 'Community',
      title: 'Calendar & uniform announcements',
      detail: 'Clean term noticeboard accessible without app logins.'
     }
    ],
    mobileHighlight: 'Quick Term Dates & Admissions links surfaced immediately at the top.'
   }
  ]
 },
 {
  slug: 'automotive',
  code: '11 / AUTOMOTIVE',
  title: 'Automotive & mobility',
  shortName: 'automotive',
  summary:
   'Clean showroom showcases, vehicle rental platforms, fleet providers and detailing studios built for booking enquiries.',
  cta: 'View automotive samples ↗',
  concepts: [
   {
    id: 'specialist-showroom',
    label: '01. Independent Showroom & Dealership',
    routeSlug: 'auto-showroom',
    headline: 'Inspected stock with full service history.',
    lead: 'Fast-filtering pre-owned showroom site highlighting mileage, finance estimates and instant test-drive scheduling.',
    primaryCta: 'Book test drive',
    navItems: ['Showroom', 'Finance', 'Sell your car'],
    blocks: [
     {
      tag: 'Stock cards',
      title: 'Mileage, year & monthly estimate',
      detail: 'Consistent vehicle cards with verified 101-point inspection summaries.'
     },
     {
      tag: 'Trade-in',
      title: '2-minute trade-in valuation form',
      detail: 'Captures registration, mileage and photos cleanly on mobile.'
     },
     {
      tag: 'Finance',
      title: 'F&I approval checklist',
      detail: 'Clear list of ID, payslip and bank statement requirements.'
     }
    ],
    mobileHighlight: 'Touch-friendly stock filters and sticky WhatsApp sales contact.'
   },
   {
    id: 'detailing-workshop',
    label: '02. Detailing & Service Workshop',
    routeSlug: 'detailing-studio',
    headline: 'Paint protection & specialist servicing.',
    lead: 'Clean service-menu site detailing ceramic coatings, PPF packages and turnaround times with bay booking.',
    primaryCta: 'Book workshop bay',
    navItems: ['Packages', 'Before & after', 'Workshop'],
    blocks: [
     {
      tag: 'Packages',
      title: 'Tiered PPF & ceramic pricing',
      detail: 'Sedans, SUVs and double-cab tiers clearly separated.'
     },
     {
      tag: 'Proof',
      title: 'Workshop bay standards & products',
      detail: 'Spec sheets for authorised films and warranties.'
     },
     {
      tag: 'Drop-off',
      title: 'Bay slot availability request',
      detail: 'Clean date & vehicle make selector.'
     }
    ],
    mobileHighlight: 'Vehicle-size tier toggle and instant bay enquiry form.'
   }
  ]
 },
 {
  slug: 'wellness',
  code: '12 / WELLNESS',
  title: 'Beauty, wellness & fitness',
  shortName: 'wellness',
  summary:
   'Booking-first digital experiences for salons, spas, gyms and personal training studios with transparent treatment menus.',
  cta: 'View wellness samples ↗',
  concepts: [
   {
    id: 'salon-spa',
    label: '01. Day Spa & Aesthetic Studio',
    routeSlug: 'wellness-studio',
    headline: 'Unhurried treatments, booked in seconds.',
    lead: 'Tactile, calm booking site displaying treatment durations, clear pricing menus and gift-voucher enquiries.',
    primaryCta: 'Book treatment',
    navItems: ['Treatments', 'Packages', 'Gift cards'],
    blocks: [
     {
      tag: 'Menu',
      title: 'Duration & price treatment guide',
      detail: 'Scannable facial, massage and aesthetic categories with zero broken PDFs.'
     },
     {
      tag: 'Booking',
      title: 'Direct therapist slot request',
      detail: 'Fast mobile booking flow respecting preferred times.'
     },
     {
      tag: 'Gifting',
      title: 'Digital & studio gift vouchers',
      detail: 'Dedicated corporate and seasonal gifting enquiry option.'
     }
    ],
    mobileHighlight: 'Clean collapsible treatment list and 48px Book Now button.'
   },
   {
    id: 'training-club',
    label: '02. Boutique Gym & Pilates Studio',
    routeSlug: 'fitness-club',
    headline: 'Small-group coaching built for consistency.',
    lead: 'High-clarity studio site showcasing class timetables, starter passes and coaching introductions.',
    primaryCta: 'Claim starter pass',
    navItems: ['Timetable', 'Memberships', 'Coaches'],
    blocks: [
     {
      tag: 'Schedule',
      title: 'Live weekly class timetable',
      detail: 'Morning and evening slot filter for busy members.'
     },
     {
      tag: 'Intro offer',
      title: 'Transparent drop-in & monthly passes',
      detail: 'Zero hidden cancellation clauses or confusing contract tiers.'
     },
     {
      tag: 'Coaches',
      title: 'Coach specialties & studio location',
      detail: 'Parking notes, shower facilities and first-class etiquette.'
     }
    ],
    mobileHighlight: 'Day-tab class filter tuned for one-handed mobile browsing.'
   }
  ]
 }
];

export function getIndustryTrack(slug: string | undefined): IndustryTrack | undefined {
 return industryTracks.find((item) => item.slug === slug);
}
