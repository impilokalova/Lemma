import {legalPages} from '../../pages/legal/LegalPages';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {serviceDetails} from '../navigation/routes';

type Metadata = {title:string;description:string;robots?:string};
const pages:Record<string,Metadata>={
 '/':{title:'Web Design & Graphic Design South Africa | Lemma Studio',description:'Small business websites, landing page design, graphic design and social media content design by Lemma Studio. Creative services for South Africa and beyond.'},
 '/services':{title:'Website, Graphic & Social Media Design | Lemma Studio',description:'Explore web design, promotional poster and flyer design, and branded social media graphics for growing businesses.'},
 '/services/web':{title:'Small Business Website & Landing Page Design | Lemma Studio',description:'Responsive business websites and custom landing page design with clear navigation, mobile layouts and enquiry pathways.'},
 '/services/creative':{title:'Poster, Flyer & Graphic Design Services | Lemma Studio',description:'Original promotional posters, flyer designs, restaurant menus and campaign graphics for business marketing.'},
 '/services/social':{title:'Social Media Graphic & Content Design | Lemma Studio',description:'Branded social media posts, content graphics and campaign visual design for businesses.'},
 '/work':{title:'Graphic Design Portfolio & Website Concepts | Lemma Studio',description:'Original posters, promotional flyer samples, menu design concepts and interactive website demos by Lemma Studio.'},
 '/work/projects':{title:'Design Projects & Case Studies | Lemma Studio',description:'Discover Lemma Studio design concepts and verified client projects as they become available.',robots:'noindex,follow'},
 '/work/samples':{title:'Graphic Design & Business Samples | Lemma Studio',description:'Original posters, flyers, restaurant menus and historical sports infographic concepts. PowerPoint presentations coming soon.'},
 '/work/templates':{title:'Landing Page Templates | Lemma Studio',description:'Explore four completed landing page concepts and two coming-soon previews.'},
 '/work/landing-pages':{title:'Interactive Landing Page Previews | Lemma Studio',description:'Explore six original fictional landing-page concepts with interactive phone and desktop previews.',robots:'noindex,follow'},
 '/work/demos':{title:'Website Demos Coming Soon | Lemma Studio',description:'Full website demonstrations by Lemma Studio are coming soon.',robots:'noindex,follow'},
 '/packages':{title:'Web Design & Graphic Design Packages | Lemma Studio',description:'Discover starting points for business websites, promotional graphic design and ongoing social media content design.'},
 '/about':{title:'About Lemma Studio | Creative Design South Africa',description:'Learn about Lemma Studio and our focus on responsive websites, original graphic design and social media visuals.'},
 '/quote':{title:'Build a Quote | Lemma Studio',description:'Build an itemised ZAR quotation for graphic design, websites, presentations and branding.'},
 '/legal':{title:'Policies & Legal Information | Lemma Studio',description:'Read Lemma Studio privacy, POPIA, refund, service and access to information policies.'},
 '/contact':{title:'Contact Lemma Studio | Web & Graphic Design',description:'Discuss a business website, landing page, promotional flyer or social media design project with Lemma Studio.'}
};
function meta(name:string,content:string,attr:'name'|'property'='name'){
 let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
 if(!el){el=document.createElement('meta');el.setAttribute(attr,name);document.head.appendChild(el);}
 el.content=content;
}
export function SeoHead(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const path=pathname==='/'?'/':pathname.replace(/\/$/,'');
  const policy=path.startsWith('/legal/')?legalPages.find(p=>'/legal/'+p.slug===path):undefined;
  const data=pages[path]??(policy?{title:policy.title+' | Lemma Studio',description:policy.intro,robots:'noindex,follow'}:undefined)??(path.startsWith('/services/')&&serviceDetails[path.split('/')[2]]?{
   title:serviceDetails[path.split('/')[2]].title+' | Lemma Studio',
   description:serviceDetails[path.split('/')[2]].description
  }:undefined);
  const isPreview=(location.hostname.endsWith('.pages.dev')&&location.hostname!=='lemma-3cz.pages.dev')||location.hostname==='localhost'||location.hostname==='127.0.0.1';
  const unknown=!data||path.startsWith('/work/projects/')||path.startsWith('/work/demos/');
  const title=data?.title||'Page Not Found | Lemma Studio';
  const description=data?.description||'Explore creative design and web services from Lemma Studio.';
  document.title=title;
  meta('description',description);
  meta('robots',isPreview||unknown?'noindex,follow':data?.robots||'index,follow');
  meta('og:title',title,'property');
  meta('og:description',description,'property');
  meta('og:type','website','property');
  meta('og:site_name','Lemma Studio','property');
  meta('og:url',location.origin+path,'property');
  meta('twitter:card','summary_large_image');
  meta('twitter:title',title);
  meta('twitter:description',description);
  meta('og:locale','en_ZA','property');
  document.getElementById('lemma-jsonld')?.remove();
  if(!isPreview&&!unknown){
   const node=document.createElement('script');
   node.id='lemma-jsonld';node.type='application/ld+json';
   node.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:title,description,url:location.origin+path,isPartOf:{'@type':'WebSite',name:'Lemma Studio',url:location.origin+'/'},publisher:{'@type':'Organization',name:'Lemma Studio',url:location.origin+'/'}});
   document.head.appendChild(node);
  }
  const existing=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(isPreview){existing?.remove();}
  else {
   const canonical=existing||document.createElement('link');
   canonical.rel='canonical';
   canonical.href=location.origin+path;
   if(!existing)document.head.appendChild(canonical);
  }
 },[pathname]);
 return null;
}
