import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';

const industries=[
 {code:'01 / HEALTHCARE',title:'Healthcare & clinics',summary:'Calm, patient-first websites for medical practices, dental studios, physiotherapy clinics and wellness providers with clear appointment pathways.',cta:'Request a healthcare site ↗'},
 {code:'02 / INSURANCE',title:'Insurance & cover',summary:'Trust-building landing pages for insurance brokers and policy providers focused on clarity, policy comparisons and fast quote capture.',cta:'Request an insurance site ↗'},
 {code:'03 / HOSPITALITY',title:'Hospitality & dining',summary:'Atmospheric websites and digital menus for boutique stays, restaurants, cafes and guest experiences built for mobile visitors.',cta:'Request a hospitality site ↗'},
 {code:'04 / FINANCE',title:'Finance & advisory',summary:'Credible, structured digital presence for accounting practices, financial advisors, tax consultants and modern finance teams.',cta:'Request a finance site ↗'}
] as const;

export function Templates(){
 return <>
  <Intro eyebrow="WORK / INDUSTRY TEMPLATES" title="Industry web concepts." description="We are building lightweight, sector-focused landing page and website samples across Healthcare, Insurance, Hospitality and Finance."/>
  <section className="section container">
   <div className="lemma-template-grid">
    {industries.map(item=><article className="lemma-template-card lemma-industry-card" key={item.code}>
     <div>
      <span>{item.code}</span>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <Link to="/contact"><strong>{item.cta}</strong></Link>
     </div>
    </article>)}
   </div>
  </section>
 </>;
}
