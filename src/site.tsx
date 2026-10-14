import {SeoHead} from './shared/seo/SeoHead';
import {ContentProtection} from './shared/components/ContentProtection';
import {useEffect} from 'react';
import {Navigate,Route,Routes,useLocation} from 'react-router-dom';
import {Header} from './shared/components/Header';
import {Footer} from './shared/components/Footer';
import {Home} from './pages/home/Home';
import {Services} from './pages/services/Services';
import {ServiceDetail} from './pages/services/ServiceDetail';
import {Work} from './pages/work/Work';
import {Templates} from './pages/work/templates/Templates';
import {Samples} from './pages/work/samples/Samples';
import {TemplateDetail} from './pages/work/templates/TemplateDetail';
import {WorkIndex} from './pages/work/WorkIndex';
import {SeasonalDemoIndex} from './pages/work/demos/SeasonalDemos';
import {Packages} from './pages/packages/Packages';
import {About} from './pages/about/About';
import {Contact} from './pages/contact/Contact';
import {NotFound} from './pages/not-found/NotFound';
import {useParams} from 'react-router-dom';
import {seasonalDemos} from './pages/work/demos/SeasonalDemos';
function LegacyDemoRedirect(){const {slug}=useParams();const valid=!!slug&&seasonalDemos.some(d=>d.slug===slug);const url='/landing-pages/'+slug+'/';useEffect(()=>{if(valid)window.location.replace(url)},[valid,url]);return valid?<div className="section container"><p>Opening the landing-page demo…</p><a href={url}>Open the design ↗</a></div>:<Navigate to="/work/demos" replace/>;}
export function App(){const location=useLocation();useEffect(()=>{window.scrollTo(0,0)},[location.pathname]);return <><SeoHead/><ContentProtection/><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<ServiceDetail/>}/><Route path="/work" element={<Work/>}/><Route path="/work/samples" element={<Samples/>}/><Route path="/work/samples/:slug" element={<TemplateDetail/>}/><Route path="/work/templates" element={<Templates/>}/><Route path="/work/templates/:slug" element={<Navigate to="/work/samples" replace/>}/><Route path="/work/projects" element={<WorkIndex/>}/><Route path="/work/projects/:slug" element={<Navigate to="/work/projects" replace/>}/><Route path="/work/demos" element={<SeasonalDemoIndex/>}/><Route path="/work/demos/:slug" element={<LegacyDemoRedirect/>}/><Route path="/packages" element={<Packages/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>}
