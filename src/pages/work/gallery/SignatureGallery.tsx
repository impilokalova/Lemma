import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {signatureArtworks} from './artworks';

type SampleCategory = 'all' | 'menus' | 'infographics' | 'slides';

const slideSamples = [
 {
  id:'pitch-deck',
  tag:'PITCH & INVESTOR DECKS',
  title:'Narrative investor & funding deck',
  slides:'10–15 slides · from R600',
  summary:'Problem-solution framing, traction visuals, market sizing tables and clear ask slide structured for fast reading.',
  frames:[
   {index:'01 / 03 · COVER & THESIS',headline:'Clear problem, market timing and headline traction.',body:'High-contrast cover lockup paired with a 1-sentence value thesis.'},
   {index:'02 / 03 · DATA & ECONOMICS',headline:'Tabular cohort metrics & unit-cost clarity.',body:'Scannable metrics strip designed for investors reading on laptops or phones.'},
   {index:'03 / 03 · ROADMAP & ASK',headline:'Milestones, capital allocation and next steps.',body:'Clean quarter-by-quarter execution roadmap with unambiguous funding ask.'}
  ]
 },
 {
  id:'company-profile',
  tag:'COMPANY PROFILES',
  title:'B2B capability & tender profile',
  slides:'Full layout · R650',
  summary:'Credibility-led company deck showcasing core services, compliance credentials, leadership and project timeline.',
  frames:[
   {index:'01 / 03 · STUDIO CREDENTIALS',headline:'Company overview, registrations and footprint.',body:'Structured executive summary engineered for procurement and tender packs.'},
   {index:'02 / 03 · SECTOR CAPABILITIES',headline:'Three-column service matrix & past scope.',body:'Readable service summaries paired with sector delivery highlights.'},
   {index:'03 / 03 · COMPLIANCE & CONTACT',headline:'Statutory details, leadership and direct line.',body:'Print-ready closing page with clickable links for digital PDF sharing.'}
  ]
 },
 {
  id:'slide-master',
  tag:'SLIDE SYSTEMS',
  title:'Reusable PowerPoint & Keynote master',
  slides:'Master system · R500',
  summary:'Locked typographic hierarchy, grid masters, chart styles and cover slides built for internal teams to reuse.',
  frames:[
   {index:'01 / 03 · TITLE & DIVIDERS',headline:'Consistent cover and chapter divider masters.',body:'Pre-built grid locks keeping team presentations visually unified.'},
   {index:'02 / 03 · COMPARISON TABLES',headline:'Aligned pricing, tier and timeline templates.',body:'Tabular numeral grids and clean column rules ready for copy-paste edits.'},
   {index:'03 / 03 · CHART & CALLOUTS',headline:'Brand-palette charts and stat summary slides.',body:'Coordinated light and dark slide variants preventing messy overrides.'}
  ]
 }
] as const;

const filters: { id: SampleCategory; label: string }[] = [
 {id:'all',label:'All samples'},
 {id:'menus',label:'Menus & print'},
 {id:'infographics',label:'Infographics'},
 {id:'slides',label:'Slides & decks'}
];

export function SignatureGallery(){
 const [filter,setFilter]=useState<SampleCategory>('all');
 const [slideIndexes,setSlideIndexes]=useState<Record<string,number>>({});
 const showMenus=filter==='all'||filter==='menus';
 const showInfographics=filter==='all'||filter==='infographics';
 const showSlides=filter==='all'||filter==='slides';

 const stepSlide=(id:string,total:number,delta:number)=>{
  setSlideIndexes(prev=>({...prev,[id]:((prev[id]??0)+delta+total)%total}));
 };

 return <div className="lemma-samples">
  <Intro eyebrow="WORK / SAMPLES" title="Menus, infographics &amp; slides." description="Explore Lemma’s visual work by format: print &amp; digital hospitality menus, interactive sports infographics and interactive slide deck samples."/>

  <div className="section container lemma-samples-toolbar">
   <div className="lemma-sample-filters" role="group" aria-label="Filter design samples by format">
    {filters.map(item=><button
     key={item.id}
     type="button"
     aria-pressed={filter===item.id}
     className={'lemma-tab-btn'+(filter===item.id?' is-active':'')}
     onClick={()=>setFilter(item.id)}>
     {item.label}
    </button>)}
   </div>
   <div className="lemma-sample-crosslinks">
    <Link to="/work/demos">Website demos ↗</Link>
    <Link to="/work/templates">12 landing page templates ↗</Link>
   </div>
  </div>

  {showMenus&&<section id="menus" className="section container">
   <h2 className="section-title">01. Menus &amp; hospitality print</h2>
   <p className="lemma-samples-lead">Four original restaurant, cafe and dining menu concepts demonstrating editorial layout and typography.</p>
   <div className="lemma-samples-grid">
    {signatureArtworks.map(a=><article className="lemma-sample-card" key={a.slug}>
     <Link to={'/work/samples/'+a.slug} className="lemma-sample-image" aria-label={'View '+a.title}>
      <img src={a.image} alt={a.title+' — original '+a.category.toLowerCase()+' design concept by Lemma Studio'} loading="lazy" decoding="async"/>
     </Link>
     <div className="lemma-sample-caption">
      <h3>{a.title}</h3>
      <p>{a.category} · Concept sample</p>
      <Link to={'/work/samples/'+a.slug}>View sample ↗</Link>
     </div>
    </article>)}
   </div>
  </section>}

  {showInfographics&&<section id="infographics" className="section container">
   <h2 className="section-title">02. Infographics &amp; data stories</h2>
   <p className="lemma-samples-lead">Interactive match archives and structured information design. Historical match figures are sourced and dated; custom infographics start from R200.</p>
   <div className="lemma-samples-grid">
    <article className="lemma-sample-card">
     <a className="lemma-sample-image" href="/sports-archive/mtn8-2014/" aria-label="Open MTN8 2014 interactive infographic">
      <div className="lemma-sports-cover"><span>MTN8 / 2014</span><strong>DERBY<br/>ARCHIVE</strong><em>PIRATES 0 — 1 CHIEFS</em></div>
     </a>
     <div className="lemma-sample-caption">
      <h3>2014 MTN8 · The final</h3>
      <p>Interactive sports infographic · Historical data</p>
      <a href="/sports-archive/mtn8-2014/">Explore infographic ↗</a>
     </div>
    </article>
    <article className="lemma-sample-card">
     <a className="lemma-sample-image" href="/sports-archive/mtn8-2008/" aria-label="Open MTN8 2008 interactive infographic">
      <div className="lemma-sports-cover"><span>MTN8 / 2008</span><strong>THE<br/>SHOOTOUT</strong><em>CHIEFS 4 — 3 SUNDOWNS (PENS)</em></div>
     </a>
     <div className="lemma-sample-caption">
      <h3>2008 MTN8 · Penalty drama</h3>
      <p>Interactive sports infographic · Historical data</p>
      <a href="/sports-archive/mtn8-2008/">Explore infographic ↗</a>
     </div>
    </article>
   </div>
  </section>}

  {showSlides&&<section id="slides" className="section container">
   <h2 className="section-title">03. Slides &amp; presentation decks</h2>
   <p className="lemma-samples-lead">Step through sample slide layouts for pitch decks, company profiles and reusable master templates.</p>
   <div className="lemma-slide-grid">
    {slideSamples.map(item=>{
     const currentIdx=slideIndexes[item.id]??0;
     const frame=item.frames[currentIdx];
     return <article className="lemma-slide-card" key={item.id}>
      <span className="lemma-slide-tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <strong className="lemma-slide-price">{item.slides}</strong>
      <p>{item.summary}</p>
      <div className="lemma-slide-viewer" aria-live="polite">
       <div className="lemma-slide-screen">
        <span>{frame.index}</span>
        <strong>{frame.headline}</strong>
        <p>{frame.body}</p>
       </div>
       <div className="lemma-slide-controls">
        <button type="button" onClick={()=>stepSlide(item.id,item.frames.length,-1)} aria-label={'Previous slide for '+item.title}>← Prev</button>
        <button type="button" onClick={()=>stepSlide(item.id,item.frames.length,1)} aria-label={'Next slide for '+item.title}>Next →</button>
       </div>
      </div>
      <Link to="/quote">Add slides to quote ↗</Link>
     </article>;
    })}
   </div>
  </section>}

  <section className="section section-tint">
   <div className="container">
    <h2 className="section-title">Explore website demos &amp; templates</h2>
    <p>Inspect multi-page business website demos or browse single-page landing templates across 12 industries.</p>
    <div className="lemma-detail-actions">
     <Link className="btn btn-primary" to="/work/demos">Open website demos ↗</Link>
     <Link className="btn enquiry-btn-secondary" to="/work/templates">View 12 landing page templates ↗</Link>
    </div>
   </div>
  </section>
 </div>;
}
