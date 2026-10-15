import {legalLinks} from '../../pages/legal/LegalPages';
import {Link} from 'react-router-dom';
import {nav} from '../navigation/routes';
export function Footer(){return <footer className="footer"><div className="container footer-inner"><div><Link className="wordmark" to="/">LEMMA<span className="wordmark-dot">.</span></Link><p>Creative · Web · Social</p></div><nav aria-label="Footer navigation">{nav.map(n=><Link key={n.href} to={n.href}>{n.label}</Link>)}</nav><nav aria-label="Policies and legal information" style={{display:"flex",flexWrap:"wrap",gap:"10px 18px",maxWidth:900}}><Link to="/legal">Policies</Link>{legalLinks.map(item=><Link key={item.href} to={item.href}>{item.label}</Link>)}</nav><p>© {new Date().getFullYear()} Lemma Studio</p></div></footer>}
