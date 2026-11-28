import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {industryTracks} from './industries';

export function Templates(){
 return <>
  <Intro eyebrow="WORK / INDUSTRY TEMPLATES" title="Industry web concepts." description="Lightweight, sector-focused landing page and website directions across Healthcare, Insurance, Hospitality, Finance, Retail, Entertainment and more."/>
  <section className="section container">
   <div className="lemma-template-grid">
    {industryTracks.map(item=><article className="lemma-template-card lemma-industry-card" key={item.slug}>
     <div>
      <span>{item.code}</span>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <Link to={'/work/templates/'+item.slug}><strong>{item.cta}</strong></Link>
     </div>
    </article>)}
   </div>
  </section>
 </>;
}
