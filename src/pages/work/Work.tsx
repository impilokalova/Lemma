import {Link} from 'react-router-dom';
import {Card} from '../../shared/components/Card';
import {Intro} from '../../shared/components/Intro';

export function Work(){
 return <>
  <Intro eyebrow="OUR WORK" title="Explore what Lemma can create." description="Discover hospitality design samples, sports editorial infographics and upcoming industry website concepts. Concepts are clearly labelled, never passed off as client commissions."/>
  <div className="section container card-grid">
   <Card title="Concept case studies" description="Original hospitality and editorial design explorations, clearly labelled as concept work." href="/work/projects" tag="Portfolio"/>
   <Card title="Hospitality &amp; design samples" description="Menu design concepts, sports infographics and links to our presentation design pricing." href="/work/samples" tag="Browse"/>
   <Card title="Industry web concepts" description="Upcoming web tracks for Healthcare, Insurance, Hospitality and Finance." href="/work/templates" tag="Roadmap"/>
  </div>
  <section className="section container">
   <Link className="btn btn-primary" to="/work/templates">View industry web roadmap ↗</Link>
  </section>
 </>;
}
