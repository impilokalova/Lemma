import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {serviceDetails} from '../navigation/routes';
import {signatureArtworks} from '../../pages/work/gallery/artworks';

type Metadata = {title:string;description:string;robots?:string};
const pages:Record<string,Metadata>={
 '/':{title:'Web Design & Graphic Design South Africa | Lemma Studio',description:'Small business websites, landing page design, graphic design and social media content design by Lemma Studio. Creative services for South Africa and beyond.'},
 '/services':{title:'Website, Graphic & Social Media Design | Lemma Studio',description:'Explore web design, promotional poster and flyer design, and branded social media graphics for growing businesses.'},
 '/services/web':{title:'Small Business Website & Landing Page Design | Lemma Studio',description:'Responsive business websites and custom landing page design with clear navigation, mobile layouts and enquiry pathways.'},
 '/services/creative':{title:'Poster, Flyer & Graphic Design Services | Lemma Studio',description:'Original promotional posters, flyer designs, restaurant menus and campaign graphics for business marketing.'},
 '/services/social':{title:'Social Media Graphic & Content Design | Lemma Studio',description:'Branded social media posts, content graphics and campaign visual design for businesses.'},
 '/work':{title:'Graphic Design Portfolio & Website Concepts | Lemma Studio',description:'Original posters, promotional flyer samples, menu design concepts and interactive website demos by Lemma Studio.'},
 '/work/projects':{title:'Design Projects & Case Studies | Lemma Studio',description:'Discover Lemma Studio design concepts and verified client projects as they become available.',robots:'noindex,follow'},
 '/work/templates':{title:'Poster, Flyer & Menu Design Samples | Lemma Studio',description:'Browse twelve original promotional poster, restaurant menu and retail flyer design concepts.'},
 '/work/demos':{title:'Landing Page & Website Design Examples | Lemma Studio',description:'Explore six original fictional landing page and website design concepts.',robots:'noindex,follow'},
 '/packages':{title:'Web Design & Graphic Design Packages | Lemma Studio',description:'Discover starting points for business websites, promotional graphic design and ongoing social media content design.'},
 '/about':{title:'About Lemma Studio | Creative Design South Africa',description:'Learn about Lemma Studio and our focus on responsive websites, original graphic design and social media visuals.'},
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
  const artwork=path.startsWith('/work/templates/')?signatureArtworks.find(a=>a.slug===path.split('/')[3]):undefined;
  const artworkMeta=artwork?{title:artwork.title+' | '+artwork.type+' Design Concept | Lemma Studio',description:'Original '+artwork.category.toLowerCase()+' design concept by Lemma Studio. Fictional portfolio artwork.'}:undefined;
  const data=pages[path]??artworkMeta??(path.startsWith('/services/')&&serviceDetails[path.split('/')[2]]?{
   title:serviceDetails[path.split('/')[2]].title+' | Lemma Studio',
   description:serviceDetails[path.split('/')[2]].description
  }:undefined);
  const isPreview=location.hostname.endsWith('.pages.dev')||location.hostname==='localhost'||location.hostname==='127.0.0.1';
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
  meta('twitter:card','summary');
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
