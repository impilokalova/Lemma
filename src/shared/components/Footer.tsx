import {legalLinks} from '../../pages/legal/LegalPages';
import {Link} from 'react-router-dom';
import {nav} from '../navigation/routes';
import {StudioLink} from './StudioLink';

export function Footer(){return <footer className="footer"><div className="container footer-inner">
 <div className="footer-top"><div><Link className="wordmark" to="/">LEMMA<span className="wordmark-dot">.</span></Link><p className="footer-tagline">Creative thinking. Considered design.</p></div><StudioLink to="/contact" quiet>Let’s make something</StudioLink></div>
 <nav aria-label="Footer navigation">{nav.map(n=><Link key={n.href} to={n.href}>{n.label}</Link>)}<Link to="/shop">Shop</Link><Link to="/quote">Build a quote</Link></nav>
 <nav aria-label="Policies and legal information"><Link to="/legal">Policies</Link>{legalLinks.map(item=><Link key={item.href} to={item.href}>{item.label}</Link>)}</nav>
 <div className="footer-bottom"><p>© {new Date().getFullYear()} Lemma Studio</p><p>Creative · Web · Social / South Africa &amp; beyond</p></div>
 </div></footer>;}
