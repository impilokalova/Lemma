import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {signatureArtworks} from './artworks';

export function SignatureGallery(){
 return <div className="lemma-samples">
  <Intro eyebrow="WORK / DESIGN SAMPLES" title="Hospitality &amp; editorial samples." description="Original hospitality menu concepts and interactive sports editorial archives—while our new industry-specific web samples are being built."/>

  <section className="section container">
   <h2 className="section-title">Hospitality menu concepts</h2>
   <p className="lemma-samples-lead">Four original restaurant, cafe and hospitality print and digital menu concepts.</p>
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
  </section>

  <section className="section container">
   <h2 className="section-title">Sports intelligence &amp; editorial infographics</h2>
   <p className="lemma-samples-lead">Responsive match archives. Historical match data is sourced and dated; visualisations are labelled independent concepts.</p>
   <div className="lemma-samples-grid">
    <article className="lemma-sample-card">
     <a className="lemma-sample-image" href="/sports-archive/mtn8-2014/" aria-label="Open MTN8 2014 interactive infographic">
      <div className="lemma-sports-cover"><span>MTN8 / 2014</span><strong>DERBY<br/>ARCHIVE</strong><em>PIRATES 0 — 1 CHIEFS</em></div>
     </a>
     <div className="lemma-sample-caption">
      <h3>2014 MTN8 · The final</h3>
      <p>Interactive sports infographic · Historical data</p>
      <a href="/sports-archive/mtn8-2014/">Explore the live infographic ↗</a>
     </div>
    </article>
    <article className="lemma-sample-card">
     <a className="lemma-sample-image" href="/sports-archive/mtn8-2008/" aria-label="Open MTN8 2008 interactive infographic">
      <div className="lemma-sports-cover"><span>MTN8 / 2008</span><strong>THE<br/>SHOOTOUT</strong><em>CHIEFS 4 — 3 SUNDOWNS (PENS)</em></div>
     </a>
     <div className="lemma-sample-caption">
      <h3>2008 MTN8 · Penalty drama</h3>
      <p>Interactive sports infographic · Historical data</p>
      <a href="/sports-archive/mtn8-2008/">Explore the live infographic ↗</a>
     </div>
    </article>
   </div>
  </section>

  <section className="section container">
   <h2 className="section-title">Industry website concepts</h2>
   <p className="lemma-samples-lead">Dedicated web design samples for Healthcare, Insurance, Hospitality and Finance are being prepared.</p>
   <Link className="btn btn-primary" to="/work/templates">View industry roadmap ↗</Link>
  </section>

  <section className="section container">
   <h2 className="section-title">Presentation &amp; document design</h2>
   <p className="lemma-samples-lead">Pitch decks, company profiles, reports and slide templates are available to order through our creative shop.</p>
   <Link className="btn enquiry-btn-secondary" to="/shop">View presentation pricing ↗</Link>
  </section>

  <section className="section section-tint">
   <div className="container">
    <h2 className="section-title">Need original design for your brand?</h2>
    <p>Explore what we can create for your business.</p>
    <Link className="btn btn-primary" to="/contact">Discuss a project ↗</Link>
   </div>
  </section>
 </div>;
}
