import {Link} from 'react-router-dom';
import {legalLinks} from '../../pages/legal/LegalPages';
import {StudioLink} from './StudioLink';

const columns = [
 {
  heading:'Studio',
  links:[
   {label:'Home',to:'/'},
   {label:'About',to:'/about'},
   {label:'Contact',to:'/contact'},
   {label:'Site map',to:'/sitemap'}
  ]
 },
 {
  heading:'Services',
  links:[
   {label:'All services',to:'/services'},
   {label:'Web design',to:'/services/web'},
   {label:'Graphic design',to:'/services/creative'},
   {label:'Social media design',to:'/services/social'}
  ]
 },
 {
  heading:'Work',
  links:[
   {label:'Work overview',to:'/work'},
   {label:'Website demos',to:'/work/demos'},
   {label:'Landing page templates',to:'/work/templates'},
   {label:'Samples (menus, infographics & slides)',to:'/work/samples'}
  ]
 },
 {
  heading:'Pricing',
  links:[
   {label:'Starter packages',to:'/packages'},
   {label:'Service price list',to:'/shop'},
   {label:'Quote builder',to:'/quote'},
   {label:'Legal & policies',to:'/legal'}
  ]
 }
] as const;

export function Footer(){
 return <footer className="footer"><div className="container footer-inner">
  <div className="footer-top">
   <div>
    <Link className="wordmark" to="/">LEMMA<span className="wordmark-dot">.</span></Link>
    <p className="footer-tagline">Creative thinking. Considered design.</p>
   </div>
   <StudioLink to="/contact" quiet>Let’s make something</StudioLink>
  </div>

  <div className="footer-columns" aria-label="Footer sitemap">
   {columns.map(col=><div className="footer-col" key={col.heading}>
    <h2>{col.heading}</h2>
    <nav aria-label={col.heading+' links'}>
     {col.links.map(link=><Link key={link.to} to={link.to}>{link.label}</Link>)}
    </nav>
   </div>)}
  </div>

  <nav className="footer-legal" aria-label="Policies and legal information">
   {legalLinks.map(item=><Link key={item.href} to={item.href}>{item.label}</Link>)}
  </nav>

  <div className="footer-bottom">
   <p>© {new Date().getFullYear()} Lemma Studio</p>
   <p>Creative · Web · Social / South Africa &amp; beyond</p>
  </div>
 </div></footer>;
}
