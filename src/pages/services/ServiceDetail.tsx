import {Link,useParams} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {serviceDetails} from '../../shared/navigation/routes';
import {SERVICES,priceLabel} from '../../lemma-quote/catalog';
import {NotFound} from '../not-found/NotFound';

const serviceMeta:Record<string,{
 deliverables:string[];
 serviceIds:string[];
 showcaseHref:string;
 showcaseLabel:string;
}>={
 web:{
  deliverables:[
   'Mobile-first responsive layout across phone, tablet and desktop',
   'Clear enquiry flow via email, WhatsApp or quotation brief',
   'Foundational on-page SEO metadata, semantic headings and fast image delivery',
   'Clean source handover or deployment guidance'
  ],
  serviceIds:['pkg-business-presence','web-starter'],
  showcaseHref:'/work/templates',
  showcaseLabel:'Explore landing page templates ↗'
 },
 creative:{
  deliverables:[
   'Promotional posters, retail flyers, digital invitations and event graphics',
   'Print-ready and digital restaurant menus (1-page and multi-page)',
   'High-resolution export files ready for print or digital distribution',
   'Consistent typography, hierarchy and colour direction'
  ],
  serviceIds:['poster','flyer','menu-1','pkg-creative-starter'],
  showcaseHref:'/work/samples',
  showcaseLabel:'Browse graphic design samples ↗'
 },
 social:{
  deliverables:[
   'Scroll-stopping single posts, carousels (up to 5 slides) and campaign graphics',
   'Coordinated visual kits tailored to launches, seasonal sales and events',
   'Optional monthly content retainer bundles with predictable turnaround',
   'Consistent brand styling across Instagram, LinkedIn, Facebook and WhatsApp'
  ],
  serviceIds:['social-post','carousel','pkg-monthly-creative'],
  showcaseHref:'/packages',
  showcaseLabel:'See social & creative packages ↗'
 }
};

export function ServiceDetail(){
 const {slug}=useParams();
 const item=slug&&serviceDetails[slug];
 const extra=slug?serviceMeta[slug]:undefined;
 if(!item||!extra)return <NotFound/>;

 const featuredServices=extra.serviceIds
  .map(id=>SERVICES.find(s=>s.id===id))
  .filter((s):s is NonNullable<typeof s>=>Boolean(s));

 return <>
  <Intro eyebrow="SERVICES" title={item.title} description={item.description}/>
  <section className="section container service-detail-section">
   <div className="service-detail-grid">
    <div>
     <p className="eyebrow">WHAT IS INCLUDED</p>
     <h2 className="section-title">Designed to <em>ship cleanly.</em></h2>
     <ul className="service-deliverables">
      {extra.deliverables.map(d=><li key={d}>{d}</li>)}
     </ul>
     <div className="service-detail-actions">
      <Link className="btn btn-primary" to="/contact">Discuss your project ↗</Link>
      <Link className="btn enquiry-btn-secondary" to="/quote">Build a quote ↗</Link>
      <Link className="btn enquiry-btn-secondary" to={extra.showcaseHref}>{extra.showcaseLabel}</Link>
     </div>
    </div>

    <div className="service-pricing-card">
     <p className="eyebrow">TRANSPARENT STARTER RATES</p>
     <h3>Popular options</h3>
     <div className="service-pricing-list">
      {featuredServices.map(s=><div className="service-pricing-item" key={s.id}>
       <div><strong>{s.name}</strong><span>{s.delivery}</span></div>
       <span className="service-pricing-amount">{priceLabel(s)}</span>
      </div>)}
     </div>
     <Link className="btn btn-primary service-pricing-cta" to="/shop">Browse full shop &amp; add to bag ↗</Link>
    </div>
   </div>
  </section>
 </>;
}
