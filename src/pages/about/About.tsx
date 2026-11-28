import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {StudioLink} from '../../shared/components/StudioLink';

const pillars=[
 {num:'01',title:'Considered visual identity',body:'Every poster, menu, social carousel and website is designed from scratch around your brand voice—never forced into generic templates.'},
 {num:'02',title:'Mobile-first web craft',body:'Clean semantic markup, responsive breakpoints for phones, tablets and desktops, and direct enquiry pathways that convert visitors into conversations.'},
 {num:'03',title:'Transparent ZAR pricing',body:'Browse upfront starter rates in South African rand, add items to your creative bag, and confirm final scope and timelines before any payment.'}
];

export function About(){
 return <>
  <Intro eyebrow="ABOUT LEMMA" title="Clarity in every detail." description="Lemma Studio brings thoughtful graphic design, responsive web engineering and social creative together for growing businesses in South Africa and worldwide."/>
  <section className="section container about-overview">
   <div className="section-heading">
    <div><p className="eyebrow">WHO WE ARE</p><h2 className="section-title">Creative work<br/><em>with purpose.</em></h2></div>
    <p>We focus on clear communication, responsive design and practical digital outcomes—built for businesses ready to look sharp and be easy to reach.</p>
   </div>
   <div className="process-grid">
    {pillars.map(p=><article key={p.num}><span>{p.num}</span><h3>{p.title}</h3><p>{p.body}</p></article>)}
   </div>
  </section>
  <section className="section section-tint">
   <div className="container about-cta-row">
    <div>
     <p className="eyebrow">READY TO COLLABORATE</p>
     <h2 className="section-title">Start with a <em>clear brief.</em></h2>
     <p className="about-cta-copy">Explore our concept samples and landing page previews, or build an itemised quotation in under two minutes.</p>
    </div>
    <div className="about-cta-actions">
     <StudioLink to="/work">Explore our work</StudioLink>
     <Link className="btn enquiry-btn-secondary" to="/packages">View packages ↗</Link>
     <Link className="btn enquiry-btn-secondary" to="/contact">Start a project ↗</Link>
    </div>
   </div>
  </section>
 </>;
}
