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
 '/contact':{title:'Contact Lemma Studio | Web & Graphic Design',description:'Discuss a business website, landing page, promotional flyer or social media design project with Lemma Studio.'},[pathname]);
 return null;
}
