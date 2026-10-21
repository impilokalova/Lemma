import {Link} from 'react-router-dom';
import {StudioLink} from '../shared/components/StudioLink';
import mobileArtwork from '../mobile/assets/image_6287963c.jpg';

export function PlanetHero(){
 return <section className="studio-hero" aria-labelledby="studio-hero-heading">
  <picture className="studio-hero-art" aria-hidden="true"><source media="(min-width: 1024px)" srcSet="/desktop/assets/Neon%20Digital%20Atom%20Orbital%20Network.png"/><img src={mobileArtwork} alt="" fetchPriority="high" decoding="async"/></picture>
  <div className="studio-hero-inner container">
   <div className="studio-hero-copy">
    <p className="studio-kicker"><span/> INDEPENDENT CREATIVE STUDIO / SOUTH AFRICA</p>
    <h1 id="studio-hero-heading">Your next{' '}<br/>big idea.<br/><em>Made real.</em></h1>
    <p className="studio-hero-description">Distinctive websites, graphic design and social creative. Thoughtfully made for businesses ready to be seen.</p>
    <div className="studio-hero-actions"><StudioLink to="/contact">Start a project</StudioLink><StudioLink to="/work" quiet>Explore our work</StudioLink></div>
    <Link className="studio-services-link" to="/services">A small studio for your next big step <span aria-hidden="true">↓</span></Link>
   </div>
   <div className="studio-art-caption" aria-hidden="true"><span>LEMMA / THE CONNECTED IDEA</span><span>CREATIVITY IN ORBIT</span></div>
   <div className="studio-hero-foot"><span>CREATIVE · WEB · SOCIAL</span><span>Built around your next chapter.</span></div>
  </div>
 </section>;
}
