import {Link} from 'react-router-dom';
import {links} from '../../shared/navigation/links';
export function DesktopHero(){return <section className="lemma-editorial-hero" aria-labelledby="lemma-editorial-heading">
   <div className="lemma-editorial-art" data-protected-artwork aria-hidden="true"/>
   <Link className="lemma-editorial-logo" to={links.home} aria-label="Lemma Studio home">LEMMA<span>.</span></Link>
   <div className="lemma-editorial-services" aria-label="Our services">
    <Link to={links.creative}>BRAND STRATEGY</Link>
    <Link to={links.creative}>VISUAL IDENTITY</Link>
    <Link to={links.web}>DIGITAL EXPERIENCE</Link>
    <Link to={links.web}>WEB DEVELOPMENT</Link>
   </div>
   <div className="lemma-editorial-midline">
    <span>LEMMA STUDIO / SELECTED WORK</span>
    <nav aria-label="Hero navigation"><Link to={links.about}>ABOUT</Link><Link to={links.services}>SERVICES</Link><Link to={links.work}>PROJECTS</Link><Link to={links.contact}>CONTACT</Link></nav>
   </div>
   <div className="lemma-editorial-footer">
    <div><p className="lemma-editorial-location">INDEPENDENT CREATIVE STUDIO&nbsp; / &nbsp;CAPE TOWN · WORLDWIDE</p><p>Thoughtful identities, digital experiences and content<br/>for ambitious brands ready to stand apart.</p></div>
    <h1 id="lemma-editorial-heading">IDEAS SHAPED<br/>INTO IMPACT.</h1>
   </div>
  </section>
}
