import {Link} from 'react-router-dom';
import {GlobeCanvas} from '../../shared/components/GlobeCanvas';
import {links} from '../../shared/navigation/links';
export function TabletHero(){return <section className="galaxy-hero tablet-hero">
  <div className="galaxy-sky" aria-hidden="true"><div className="galaxy-nebula galaxy-nebula-left"/><div className="galaxy-nebula galaxy-nebula-right"/><div className="galaxy-stars galaxy-stars-a"/><div className="galaxy-stars galaxy-stars-b"/></div>
  <GlobeCanvas variant="tablet"/>
  <div className="galaxy-hero-bottom container">
   <div className="galaxy-hero-copy"><p className="eyebrow">CREATIVE · WEB · SOCIAL</p><h1>Ideas shaped into <em>impact.</em></h1><p>Websites, design and social creative for businesses ready to stand out.</p><div className="hero-actions"><Link className="btn btn-primary" to={links.work}>Explore Our Work ↗</Link><Link className="btn btn-outline" to={links.contact}>Start a Project</Link></div></div>
  </div>
 </section>
}
