import {Card} from '../../shared/components/Card';
import {StudioLink} from '../../shared/components/StudioLink';
import {serviceDetails} from '../../shared/navigation/routes';
import {PlanetHero} from '../../hero/PlanetHero';
import {WorkShowcase} from './WorkShowcase';

export function Home(){return <>
 <PlanetHero/>
 <div className="studio-ribbon" aria-label="Creative, web and social design"><div className="studio-ribbon-track">{[0,1,2,3].map(copy=><div key={copy} className="studio-ribbon-group" aria-hidden={copy>0||undefined}><span>CREATIVE THINKING</span><span aria-hidden="true">·</span><span>DIGITAL CRAFT</span><span aria-hidden="true">·</span><span>BUILT AROUND YOU</span><span aria-hidden="true">·</span></div>)}</div></div>
 <section className="section container studio-services" aria-labelledby="services-title">
  <div className="section-heading"><div><p className="eyebrow">01. What we do</p><h2 id="services-title" className="section-title">Good design.<br/><em>Real purpose.</em></h2></div><p>For the businesses finding their voice.<br/>The creators building something new.<br/>And the ideas ready for their next step.</p></div>
  <div className="card-grid">{Object.entries(serviceDetails).map(([slug,v],index)=><Card key={slug} title={v.title} description={v.description} tag={'0'+(index+1)+' · '+slug} href={'/services/'+slug}/>)}</div>
 </section>
 <WorkShowcase/>
 <section className="section container studio-process" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">03. How it comes together</p><h2 id="process-title" className="section-title">From “what if”<br/><em>to out there.</em></h2></div><StudioLink to="/shop" quiet>Find your starting point</StudioLink></div><div className="process-grid">{[
  ['01','Tell us the idea.','Share what you need, who it’s for, and what you want it to achieve.'],
  ['02','Shape the direction.','We agree on the scope, quote, and visual direction before the work begins.'],
  ['03','Make it yours.','Review the design, refine the details, and receive the agreed project files.']
 ].map(([number,title,description])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
 <section className="studio-invitation"><div className="container"><p className="eyebrow">Your next chapter starts here</p><h2>Something in mind?<br/><em>Let’s make it matter.</em></h2><div className="invitation-actions"><StudioLink to="/contact">Start a conversation</StudioLink><StudioLink to="/quote" quiet>Build your quote</StudioLink></div><p className="invitation-note">Websites · Graphic design · Social creative</p></div></section>
 </>;}
