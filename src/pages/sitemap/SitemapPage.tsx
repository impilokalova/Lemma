import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {legalLinks} from '../legal/LegalPages';
import {industryTracks} from '../work/templates/industries';

const sections = [
 {
  code:'01 / STUDIO',
  title:'Core pages',
  links:[
   {label:'Home',to:'/',note:'Overview, services & featured work'},
   {label:'About Lemma Studio',to:'/about',note:'How we design & build'},
   {label:'Contact & enquiries',to:'/contact',note:'Start a project brief'},
   {label:'Site map',to:'/sitemap',note:'Complete route directory'}
  ]
 },
 {
  code:'02 / SERVICES',
  title:'Design & development',
  links:[
   {label:'All services',to:'/services',note:'Core capabilities overview'},
   {label:'Web design & landing pages',to:'/services/web',note:'Responsive desktop & mobile builds'},
   {label:'Graphic & print design',to:'/services/creative',note:'Posters, menus, infographics & slides'},
   {label:'Social media design',to:'/services/social',note:'Campaign posts & carousels'}
  ]
 },
 {
  code:'03 / WORK',
  title:'Demos, templates & samples',
  links:[
   {label:'Work overview',to:'/work',note:'Navigate demos, templates & samples'},
   {label:'Website demos',to:'/work/demos',note:'Multi-page website prototypes'},
   {label:'Landing page templates',to:'/work/templates',note:'12 single-page industry concepts'},
   {label:'Design samples',to:'/work/samples',note:'Menus, infographics & slide decks'},
   {label:'Sample: Menus & print',to:'/work/samples#menus',note:'Hospitality menu artworks'},
   {label:'Sample: Infographics',to:'/work/samples#infographics',note:'Interactive sports match archives'},
   {label:'Sample: Slides & decks',to:'/work/samples#slides',note:'Interactive deck & profile previews'}
  ]
 },
 {
  code:'04 / PRICING & POLICIES',
  title:'Packages, quotes & legal',
  links:[
   {label:'Starter packages',to:'/packages',note:'Creative Starter, Business & Monthly bundles'},
   {label:'Service price list',to:'/shop',note:'Individual ZAR rates across 5 categories'},
   {label:'Quote builder',to:'/quote',note:'Build and submit a custom project estimate'},
   {label:'Legal & policies',to:'/legal',note:'Privacy, POPIA, refunds & terms'}
  ]
 }
] as const;

export function SitemapPage(){
 return <>
  <Intro eyebrow="SITE ARCHITECTURE" title="Site map." description="Every page on Lemma Studio organized cleanly into four pillars: Studio, Services, Work (demos, templates and samples), and Pricing."/>

  <section className="section container">
   <div className="lemma-sitemap-grid">
    {sections.map(group=><article className="lemma-sitemap-card" key={group.code}>
     <span>{group.code}</span>
     <h2>{group.title}</h2>
     <ul>
      {group.links.map(item=><li key={item.to}>
       <Link to={item.to}>
        <strong>{item.label}</strong>
        <small>{item.note}</small>
       </Link>
      </li>)}
     </ul>
    </article>)}
   </div>

   <div className="lemma-sitemap-subgrid">
    <div className="lemma-sitemap-block">
     <span>05 / INDUSTRY TEMPLATES ({industryTracks.length})</span>
     <h2>Direct landing page previews</h2>
     <div className="lemma-sitemap-pills">
      {industryTracks.map(item=><Link key={item.slug} to={'/work/templates/'+item.slug}>{item.title} ↗</Link>)}
     </div>
    </div>

    <div className="lemma-sitemap-block">
     <span>06 / LEGAL &amp; COMPLIANCE ({legalLinks.length})</span>
     <h2>Published policy documents</h2>
     <div className="lemma-sitemap-pills">
      {legalLinks.map(item=><Link key={item.href} to={item.href}>{item.label} ↗</Link>)}
     </div>
    </div>
   </div>
  </section>
 </>;
}
