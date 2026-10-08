import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {serviceDetails} from './routes';

type Metadata = {title:string;description:string;robots?:string};
const pages:Record<string,Metadata>={
 '/':{title:'Lemma Studio | Web Design & Creative Services South Africa',description:'Lemma Studio creates business websites, landing pages, graphic design and social media creative for businesses in South Africa and beyond.'},
 '/services':{title:'Creative, Web Design & Social Services | Lemma Studio',description:'Explore Lemma Studio web design, landing pages, graphic design and social creative services for growing businesses.'},
 '/services/web':{title:'Business Websites & Landing Page Design | Lemma Studio',description:'Mobile-first business websites and landing pages designed for clear communication and enquiries. Discuss a custom website with Lemma Studio.'},
 '/services/creative':{title:'Graphic Design, Posters & Flyers | Lemma Studio',description:'Original promotional graphics, posters, flyers and visual design for businesses. Explore creative design services from Lemma Studio.'},
 '/services/social':{title:'Social Media Creative & Campaign Design | Lemma Studio',description:'Branded social media graphics and campaign visuals for businesses looking for consistent creative communication.'},
 '/work':{title:'Design Work & Concepts | Lemma Studio',description:'Explore Lemma Studio concept projects, website templates, landing page examples and graphic design samples as they are published.'},
 '/work/projects':{title:'Design Projects & Case Studies | Lemma Studio',description:'Discover Lemma Studio design concepts and verified client projects as they become available.',robots:'noindex,follow'},
 '/work/templates':{title:'Website, Poster & Flyer Templates | Lemma Studio',description:'Browse original website, landing page, poster and flyer concepts from Lemma Studio as new samples are released.'},
 '/work/demos':{title:'Website Demo Gallery | Lemma Studio',description:'Explore interactive website demonstrations and landing page concepts as they are released.',robots:'noindex,follow'},
 '/packages':{title:'Web & Creative Design Packages | Lemma Studio',description:'Discover starting points for web design, graphic design and ongoing social creative projects. Request a tailored quote.'},
 '/about':{title:'About Lemma Studio | Creative & Web Design',description:'Learn about Lemma Studio, a creative and web design studio focused on thoughtful design and practical digital experiences.'},
 '/contact':{title:'Contact Lemma Studio | Request a Design Quote',description:'Get in touch with Lemma Studio to discuss a business website, landing page, graphic design or social media creative project.'}
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
  const data=pages[path]??(path.startsWith('/services/')&&serviceDetails[path.split('/')[2]]?{
   title:serviceDetails[path.split('/')[2]].title+' | Lemma Studio',
   description:serviceDetails[path.split('/')[2]].description
  }:undefined);
  const isPreview=location.hostname.endsWith('.pages.dev')||location.hostname==='localhost'||location.hostname==='127.0.0.1';
  const unknown=!data||path.startsWith('/work/templates/')||path.startsWith('/work/projects/')||path.startsWith('/work/demos/');
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
  meta('twitter:card','summary');
  // Do not publish a canonical pointing to the temporary pages.dev preview.
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
