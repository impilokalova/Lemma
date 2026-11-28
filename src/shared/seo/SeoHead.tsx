import {legalPages} from '../../pages/legal/LegalPages';
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
 '/work':{title:'Design Portfolio & Industry Concepts | Lemma Studio',description:'Hospitality menu concepts, interactive sports editorial archives and upcoming industry website concepts by Lemma Studio.'},
 '/work/projects':{title:'Design Projects & Case Studies | Lemma Studio',description:'Discover Lemma Studio design concepts and verified client projects as they become available.',robots:'noindex,follow'},
 '/work/samples':{title:'Hospitality & Design Samples | Lemma Studio',description:'Original hospitality menu design concepts and historical sports editorial infographic samples.'},
 '/work/templates':{title:'Industry Web Concepts | Lemma Studio',description:'Upcoming web design concepts across Healthcare, Insurance, Hospitality and Finance.'},
 '/work/landing-pages':{title:'Industry Web Concepts | Lemma Studio',description:'Upcoming web design concepts across Healthcare, Insurance, Hospitality and Finance.',robots:'noindex,follow'},
 '/work/demos':{title:'Website Demos Coming Soon | Lemma Studio',description:'Industry-specific website demonstrations by Lemma Studio are coming soon.',robots:'noindex,follow'},
 '/packages':{title:'Web Design & Graphic Design Packages | Lemma Studio',description:'Discover starting points for business websites, promotional graphic design and ongoing social media content design.'},
 '/shop':{title:'Creative Shop & Priced Design Services | Lemma Studio',description:'Browse priced graphic design, website, presentation and branding services from Lemma Studio and build a custom project bag.'},
 '/bag':{title:'Your Creative Bag | Lemma Studio',description:'Review your selected creative services and send an itemised project enquiry to Lemma Studio.',robots:'noindex,follow'},
 '/quote':{title:'Build a Quote | Lemma Studio',description:'Build an itemised ZAR quotation for graphic design, websites, presentations and branding.',robots:'noindex,follow'},
 '/about':{title:'About Lemma Studio | Creative Design South Africa',description:'Learn about Lemma Studio and our focus on responsive websites, original graphic design and social media visuals.'},
 '/legal':{title:'Policies & Legal Information | Lemma Studio',description:'Read Lemma Studio privacy, POPIA, refund, service and access to information policies.'},
 '/contact':{title:'Contact Lemma Studio | Web & Graphic Design',description:'Discuss a business website, landing page, promotional flyer or social media design project with Lemma Studio.'}
};

function meta(name:string,content:string,attr:'name'|'property'='name'){
 let el=document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
 if(!el){el=document.createElement('meta');el.setAttribute(attr,name);document.head.appendChild(el);}
 el.content=content;
}

const segmentLabels:Record<string,string>={
 services:'Services',
 web:'Web design',
 creative:'Graphic design',
 social:'Social media design',
 work:'Work',
 samples:'Samples',
 templates:'Landing page templates',
 projects:'Projects',
 packages:'Packages',
 shop:'Shop',
 bag:'Bag',
 quote:'Build a quote',
 about:'About',
 contact:'Contact',
 legal:'Policies'
};

export function SeoHead(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const path=pathname==='/'?'/':pathname.replace(/\/$/,'');
  const artwork=path.startsWith('/work/samples/')?signatureArtworks.find(a=>a.slug===path.split('/')[3]):undefined;
  const artworkMeta=artwork?{title:artwork.title+' | '+artwork.type+' Design Concept | Lemma Studio',description:'Original '+artwork.category.toLowerCase()+' design concept by Lemma Studio. Fictional portfolio artwork.'}:undefined;
  const policy=path.startsWith('/legal/')?legalPages.find(p=>'/legal/'+p.slug===path):undefined;
  const data=pages[path]??(policy?{title:policy.title+' | Lemma Studio',description:policy.intro,robots:'noindex,follow'}:undefined)??artworkMeta??(path.startsWith('/services/')&&serviceDetails[path.split('/')[2]]?{
   title:serviceDetails[path.split('/')[2]].title+' | Lemma Studio',
   description:serviceDetails[path.split('/')[2]].description
  }:undefined);
  const host=location.hostname;
  const isPreview=(host.endsWith('.pages.dev')&&host!=='lemma-3cz.pages.dev')||host.endsWith('.run.app')||host==='localhost'||host==='127.0.0.1';
  const unknown=!data||path.startsWith('/work/projects/')||path.startsWith('/work/demos/');
  const title=data?.title||'Page Not Found | Lemma Studio';
  const description=data?.description||'Explore creative design and web services from Lemma Studio.';
  const origin=location.origin;
  const pageUrl=origin+path;
  const shareImage=origin+'/desktop/assets/Neon%20Digital%20Atom%20Orbital%20Network.png';

  document.title=title;
  meta('description',description);
  meta('robots',isPreview||unknown?'noindex,follow':data?.robots||'index,follow');
  meta('og:title',title,'property');
  meta('og:description',description,'property');
  meta('og:type','website','property');
  meta('og:site_name','Lemma Studio','property');
  meta('og:url',pageUrl,'property');
  meta('og:image',shareImage,'property');
  meta('og:image:alt','Lemma Studio — Websites, graphic design and social creative','property');
  meta('og:locale','en_ZA','property');
  meta('twitter:card','summary_large_image');
  meta('twitter:title',title);
  meta('twitter:description',description);
  meta('twitter:image',shareImage);

  document.getElementById('lemma-jsonld')?.remove();
  if(!isPreview&&!unknown){
   const parts=path==='/'?[]:path.slice(1).split('/');
   const breadcrumbs=[
    {'@type':'ListItem',position:1,name:'Home',item:origin+'/'},
    ...parts.map((part,index)=>({
     '@type':'ListItem',
     position:index+2,
     name:index===parts.length-1&&artwork?artwork.title:segmentLabels[part]||part.replace(/-/g,' '),
     item:origin+'/'+parts.slice(0,index+1).join('/')
    }))
   ];
   const node=document.createElement('script');
   node.id='lemma-jsonld';node.type='application/ld+json';
   node.textContent=JSON.stringify({
    '@context':'https://schema.org',
    '@graph':[
     {
      '@type':'ProfessionalService',
      '@id':origin+'/#organization',
      name:'Lemma Studio',
      url:origin+'/',
      image:shareImage,
      email:'contact.lemmastudio@gmail.com',
      areaServed:['South Africa','Worldwide'],
      priceRange:'ZAR',
      serviceType:['Web Design','Graphic Design','Social Media Design']
     },
     {
      '@type':'WebSite',
      '@id':origin+'/#website',
      name:'Lemma Studio',
      url:origin+'/',
      publisher:{'@id':origin+'/#organization'}
     },
     {
      '@type':'WebPage',
      '@id':pageUrl+'#webpage',
      url:pageUrl,
      name:title,
      description,
      isPartOf:{'@id':origin+'/#website'},
      about:{'@id':origin+'/#organization'}
     },
     {
      '@type':'BreadcrumbList',
      itemListElement:breadcrumbs
     }
    ]
   });
   document.head.appendChild(node);
  }

  const existing=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if(isPreview){existing?.remove();}
  else {
   const canonical=existing||document.createElement('link');
   canonical.rel='canonical';
   canonical.href=pageUrl;
   if(!existing)document.head.appendChild(canonical);
  }
 },[pathname]);
 return null;
}
