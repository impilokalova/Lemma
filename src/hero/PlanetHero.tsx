import {Link} from 'react-router-dom';
import {links} from '../shared/navigation/links';
import mobileArtwork from './breakpoints/mobile/image_6287963c.jpg';

export function PlanetHero(){
 return <section className="studio-hero" aria-labelledby="studio-hero-heading">
  <picture className="studio-hero-art" aria-hidden="true">
   <source media="(min-width: 1024px)" srcSet="/desktop/assets/Neon%20Digital%20Atom%20Orbital%20Network.png"/>
   <img src={mobileArtwork} alt="" fetchPriority="high" decoding="async"/>
  </picture>
  <div className="studio-hero-inner container">
   <div className="studio-hero-copy">
    <p className="studio-kicker"><span/> INDEPENDENT CREATIVE STUDIO</p>
    <h1 id="studio-hero-heading">Your next<br/>big idea.<br/><em>Made real.</em></h1>
    <p className="studio-hero-description">Websites, design and social creative that turn a first impression into a lasting connection.</p>
    <div className="studio-hero-actions">
     <Link className="btn studio-primary" to={links.contact}>Start a Project <span aria-hidden="true">↗</span></Link>
     <Link className="btn studio-secondary" to={links.work}>View Our Work <span aria-hidden="true">→</span></Link>
    </div>
    <Link className="studio-services-link" to={links.services}>Explore our services <span aria-hidden="true">↓</span></Link>
   </div>
   <div className="studio-hero-foot"><span>CREATIVE · WEB · SOCIAL</span><span>Small studio. Big possibilities.</span></div>
  </div>
 </section>;
}
