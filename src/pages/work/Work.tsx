import {Link} from 'react-router-dom';
import {Card} from '../../shared/components/Card';
import {Intro} from '../../shared/components/Intro';

export function Work(){
 return <>
  <Intro eyebrow="OUR WORK" title="Organized by format." description="Three clear tracks across everything Lemma builds: full multi-page website demos, 12 single-page industry templates, and visual samples spanning menus, infographics and slide decks."/>
  <div className="section container card-grid">
   <Card title="Website demos" description="Interactive multi-page site prototypes (Home, Services, About, Contact) across Desktop, Tablet and Mobile." href="/work/demos" tag="01 / Multi-page sites"/>
   <Card title="Landing page templates" description="12 industry-specific single-page website directions with Desktop, Tablet and Mobile layout previews." href="/work/templates" tag="02 / 12 Industries"/>
   <Card title="Design samples" description="Hospitality menus, interactive sports infographics and multi-slide presentation deck concepts." href="/work/samples" tag="03 / Menus, Infographics & Slides"/>
  </div>
  <section className="section container">
   <div className="lemma-detail-actions">
    <Link className="btn btn-primary" to="/work/demos">Launch website demos ↗</Link>
    <Link className="btn enquiry-btn-secondary" to="/sitemap">View full site map ↗</Link>
   </div>
  </section>
 </>;
}
