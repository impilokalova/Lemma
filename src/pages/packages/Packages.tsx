import {Link,useNavigate} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {addToDraft} from '../../lemma-quote/quote';
import {formatZAR,getService} from '../../lemma-quote/catalog';

const packages=[
 {id:'pkg-creative-starter',name:'Creative Starter',summary:'A coordinated promotional kit for your next launch, event or campaign.',includes:['1 poster','1 flyer','1 social media post','1 carousel (up to 5 slides)','One revision round'],comparison:'Individual services R750 · save R100'},
 {id:'pkg-business-presence',name:'Business Presence',summary:'A conversion-focused online starting point for your business.',includes:['1 mobile-responsive landing page','1 contact enquiry form','Basic on-page SEO setup','1 matching social media post','One revision round'],comparison:'Individual services R2 120 · save R230'},
 {id:'pkg-monthly-creative',name:'Monthly Creative',summary:'A dependable monthly stream of branded social content.',includes:['6 social media posts each month','2 carousels (up to 5 slides each)','One revision round per deliverable','Monthly content schedule by agreement'],comparison:'Individual services R1 320/month · save R220/month'}
];
export function Packages(){
 const navigate=useNavigate();
 const select=(id:string)=>{addToDraft(id);navigate('/quote')};
 return <div className="packages-page">
 <Intro eyebrow="SERVICES & PACKAGES" title="Choose your next creative move." description="Three ready-to-enquire packages with clear deliverables and transparent ZAR pricing. Choose a package to add it to your quotation; availability and final scope are confirmed before payment."/>
 <div className="container"><div className="packages-notice" role="note"><strong>Now available for enquiries</strong><span>Choose a package below to build a quote. No payment is taken online; we confirm timelines, content and availability with you first.</span></div>
 <div className="packages-grid">{packages.map(p=>{const service=getService(p.id);return <article className="packages-card" key={p.id}><span className="packages-status">Available to enquire</span><h2>{p.name}</h2><p className="packages-summary">{p.summary}</p><h3>What's included</h3><ul>{p.includes.map(item=><li key={item}>{item}</li>)}</ul><div className="packages-pricing"><strong style={{fontSize:28}}>{service?formatZAR(service.price):'Price on request'}{service?.unit||''}</strong><p>{p.comparison}</p><p>{service?.delivery} · Standard turnaround. Extra work, revisions and rush delivery are quoted separately.</p><button className="btn btn-primary" type="button" style={{width:'100%',marginTop:12}} onClick={()=>select(p.id)}>Choose package ↗</button></div></article>})}</div>
 <section className="packages-future"><h2>Need something more tailored?</h2><p>Build your own quote from individual services or combine a package with add-ons. Ecommerce, advanced booking systems, CRM automation and organic-reach software are not part of these offers.</p><Link className="btn btn-primary" to="/quote">Build a custom quotation ↗</Link></section>
 <section className="packages-feedback"><h2>Questions before you start?</h2><p>Tell us about your project and we'll help you select the right scope. Package prices are in ZAR; international payment arrangements are confirmed manually.</p><div className="packages-actions"><Link className="btn btn-primary" to="/contact">Send a general enquiry ↗</Link><Link className="btn" to="/work">Explore our work ↗</Link></div><p className="packages-disclaimer">A package selection prepares an enquiry; it does not place an order or guarantee immediate delivery.</p></section></div>
 </div>
}
