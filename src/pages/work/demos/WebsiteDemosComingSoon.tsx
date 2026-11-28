import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
type DemoInnerPage = 'home' | 'services' | 'about' | 'contact';

const fullDemos = [
 {
  slug:'clinic-portal',
  sector:'HEALTHCARE WEBSITE DEMO',
  brand:'AURA CLINIC',
  domain:'auraclinic.co.za',
  title:'Multi-page Medical Practice',
  summary:'Full multi-page website flow uniting practitioner bios, treatment directories, medical-aid clarity and patient intake.',
  pages:{
   home:{
    kicker:'HOME / PRACTICE OVERVIEW',
    heading:'Calm family medicine & dental care under one roof.',
    copy:'Clear clinic hours, same-week booking availability and direct medical-aid guidance on entry.',
    cta:'Book a visit',
    cards:['General & preventive care','Paediatrics & women’s health','In-house dental studio']
   },
   services:{
    kicker:'SERVICES / TREATMENTS',
    heading:'Structured consultation types and transparent tariffs.',
    copy:'Patients browse consultation fees, chronic care pathways and diagnostic check-ups before calling.',
    cta:'Check fee guide',
    cards:['30-min GP consultation','Chronic disease management','Preventive health screening']
   },
   about:{
    kicker:'ABOUT / PRACTITIONERS',
    heading:'Meet the doctors, nurses and practice coordinators.',
    copy:'HPCSA registration numbers, languages spoken and clinic accessibility information upfront.',
    cta:'View clinical team',
    cards:['Dr. N. Mokoena — GP','Dr. L. Van Wyk — Dental','Accessible ground-floor suite']
   },
   contact:{
    kicker:'CONTACT / APPOINTMENTS',
    heading:'Two-step appointment request & emergency hours.',
    copy:'Zoom-safe 16px intake form paired with clinic WhatsApp triage and Google Maps parking notes.',
    cta:'Confirm slot',
    cards:['Mon–Fri 07:30–17:30','Saturday morning clinic','Wheelchair & pram access']
   }
  }
 },
 {
  slug:'dining-collective',
  sector:'HOSPITALITY WEBSITE DEMO',
  brand:'FIRE & FORM',
  domain:'fireandform.co.za',
  title:'Restaurant & Private Dining Site',
  summary:'Multi-page restaurant demo combining live HTML food & wine menus, chef story, private events and table bookings.',
  pages:{
   home:{
    kicker:'HOME / DINING ROOM',
    heading:'Open-fire dining & cellar pairings in Cape Town.',
    copy:'Atmosphere, kitchen hours and direct table reservations without third-party booking commissions.',
    cta:'Reserve a table',
    cards:['A la carte dinner service','Curated cellar pairings','Weekend courtyard lunch']
   },
   services:{
    kicker:'MENUS / KITCHEN & BAR',
    heading:'Live HTML menus tailored for mobile reading.',
    copy:'No pinch-zooming PDFs — filter starters, mains, plant-based plates and wine flights cleanly.',
    cta:'Explore dinner menu',
    cards:['Wood-fired mains','Seasonal tasting flight','Dietary tags clearly marked']
   },
   about:{
    kicker:'ABOUT / KITCHEN & SPACE',
    heading:'Sourced daily from Western Cape farms & boats.',
    copy:'Behind the pass, local suppliers and private chef’s-table seating for up to 18 guests.',
    cta:'Meet the kitchen',
    cards:['Line-caught coastal fish','Local wood & coal hearth','18-seat private room']
   },
   contact:{
    kicker:'CONTACT / BOOKINGS & EVENTS',
    heading:'Group set menus, hours & directions.',
    copy:'Instant seating preference request alongside parking and corkage policy clarity.',
    cta:'Book dining room',
    cards:['Tue–Sun 12:00–22:30','Private dining enquiries','Valet & street parking']
   }
  }
 },
 {
  slug:'commerce-store',
  sector:'RETAIL WEBSITE DEMO',
  brand:'KLOOF GOODS',
  domain:'kloofgoods.co.za',
  title:'Boutique Retail Storefront',
  summary:'Multi-page retail architecture balancing fast product filtering, transparent SA courier rates and friction-free enquiries.',
  pages:{
   home:{
    kicker:'HOME / NEW RELEASE',
    heading:'Small-batch leather & canvas carry built to last.',
    copy:'Featured collection, transparent nationwide shipping cutoff and simple variant selection.',
    cta:'Shop collection',
    cards:['Weekender canvas bags','Everyday commuter totes','5-year stitch warranty']
   },
   services:{
    kicker:'CATALOGUE / CATEGORIES',
    heading:'Instant search & clear ZAR pricing across SKUs.',
    copy:'Size dimensions, care guides and stock notes surfaced cleanly above the fold.',
    cta:'Filter goods',
    cards:['Travel & weekenders','Work & laptop sleeves','Care & leather balm']
   },
   about:{
    kicker:'ABOUT / WORKSHOP',
    heading:'Crafted in small runs with traceable materials.',
    copy:'Honest workshop process, repair programme and local material sourcing.',
    cta:'Our workshop',
    cards:['Waxed cotton canvas','Solid brass hardware','Lifetime stitch repair']
   },
   contact:{
    kicker:'CONTACT / WHOLESALE & CARE',
    heading:'Courier timelines, returns & corporate orders.',
    copy:'Clear 30-day exchange policy and custom corporate gifting lead times.',
    cta:'Message studio',
    cards:['2–4 day SA courier','30-day unused returns','Custom corporate gifting']
   }
  }
 }
] as const;

const innerPageOrder: { id: DemoInnerPage; label: string }[] = [
 {id:'home',label:'Home'},
 {id:'services',label:'Services / Offer'},
 {id:'about',label:'About'},
 {id:'contact',label:'Contact'}
];

export function WebsiteDemosComingSoon(){
 const [demoIdx,setDemoIdx]=useState(0);
 const [innerPage,setInnerPage]=useState<DemoInnerPage>('home');
 const [device,setDevice]=useState<PreviewDevice>('desktop');

 const demo=fullDemos[demoIdx];
 const page=demo.pages[innerPage];

 return <>
  <Intro eyebrow="WORK / WEBSITE DEMOS" title="Full multi-page website demos." description="Switch between complete business websites below, click inner site pages inside the frame, and compare Desktop, Tablet and Mobile layouts. Looking for 1-page concepts? Visit Landing page templates."/>

  <section className="section container">
   <div className="lemma-detail-topbar">
    <Link className="lemma-detail-back" to="/work">← Work overview</Link>
    <div className="lemma-sample-crosslinks">
     <Link to="/work/templates">12 single-page templates ↗</Link>
     <Link to="/work/samples">Menus, infographics &amp; slides ↗</Link>
    </div>
   </div>

   <div className="lemma-preview-controls" role="region" aria-label="Website demo selector and breakpoint toggle">
    <div className="lemma-concept-tabs" role="tablist" aria-label="Select multi-page demo">
     {fullDemos.map((item,idx)=><button
      key={item.slug}
      type="button"
      role="tab"
      aria-selected={demoIdx===idx}
      className={'lemma-tab-btn'+(demoIdx===idx?' is-active':'')}
      onClick={()=>{setDemoIdx(idx);setInnerPage('home')}}>
      0{idx+1}. {item.title}
     </button>)}
    </div>

    <div className="lemma-device-toggle" role="group" aria-label="Preview breakpoint">
     <button type="button" aria-pressed={device==='desktop'} className={'lemma-device-btn'+(device==='desktop'?' is-active':'')} onClick={()=>setDevice('desktop')}>Desktop</button>
     <button type="button" aria-pressed={device==='tablet'} className={'lemma-device-btn'+(device==='tablet'?' is-active':'')} onClick={()=>setDevice('tablet')}>Tablet</button>
     <button type="button" aria-pressed={device==='mobile'} className={'lemma-device-btn'+(device==='mobile'?' is-active':'')} onClick={()=>setDevice('mobile')}>Mobile</button>
    </div>
   </div>

   <div className={'lemma-preview-stage is-'+device}>
    <div className="lemma-browser-frame" aria-live="polite">
     <div className="lemma-browser-chrome">
      <div className="lemma-browser-dots" aria-hidden="true"><span/><span/><span/></div>
      <div className="lemma-browser-url">{demo.domain}/{innerPage==='home'?'':innerPage}</div>
      <span className="lemma-browser-mode">{device==='desktop'?'Desktop (>=1200px)':device==='tablet'?'Tablet (768px - 1199px)':'Mobile (<=599px)'}</span>
     </div>

     <div className="lemma-wireframe-body">
      <div className="lemma-wf-nav">
       <span className="lemma-wf-brand">{demo.brand}</span>
       <div className="lemma-demo-inner-nav" role="tablist" aria-label="Simulated site pages">
        {innerPageOrder.map(tab=><button
         key={tab.id}
         type="button"
         role="tab"
         aria-selected={innerPage===tab.id}
         className={'lemma-demo-nav-btn'+(innerPage===tab.id?' is-active':'')}
         onClick={()=>setInnerPage(tab.id)}>
         {tab.label}
        </button>)}
       </div>
      </div>

      <div className="lemma-wf-hero">
       <div className="lemma-wf-hero-copy">
        <span className="lemma-wf-kicker">{demo.sector} · {page.kicker}</span>
        <h2>{page.heading}</h2>
        <p>{page.copy}</p>
        <div className="lemma-wf-hero-actions">
         <span className="lemma-wf-primary-btn">{page.cta} ↗</span>
        </div>
       </div>
       <div className="lemma-wf-hero-media">
        <div className="lemma-wf-media-card">
         <span>Interactive multi-page demo</span>
         <strong>{demo.title}</strong>
         <p>{demo.summary}</p>
        </div>
       </div>
      </div>

      <div className="lemma-wf-sections">
       {page.cards.map((card,idx)=><article className="lemma-wf-block" key={card}>
        <span>0{idx+1} · SECTION</span>
        <h3>{card}</h3>
        <p>Modular block tailored cleanly across {device} screens.</p>
       </article>)}
      </div>
     </div>
    </div>
   </div>

   <div className="lemma-template-footer-cta">
    <div>
     <h2>Want a full multi-page website like this?</h2>
     <p>Explore our 12 industry landing page templates or start a custom 2–5 page website quote directly.</p>
    </div>
    <div className="lemma-detail-actions">
     <Link className="btn btn-primary" to="/quote">Build a website quote ↗</Link>
     <Link className="btn enquiry-btn-secondary" to="/work/templates">View 12 industry templates ↗</Link>
    </div>
   </div>
  </section>
 </>;
}
