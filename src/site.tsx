import {Shop} from './pages/shop/Shop';
import {LegalIndex,LegalPage} from './pages/legal/LegalPages';
import {QuotePage} from './lemma-quote/QuotePage';
import {SeoHead} from './shared/seo/SeoHead';
import {Analytics} from './shared/analytics/Analytics';
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
import {IndustryTemplateDetail} from './pages/work/templates/IndustryTemplateDetail';
import {Samples} from './pages/work/samples/Samples';
import {SampleDetail} from './pages/work/samples/SampleDetail';
import {WebsiteDemosComingSoon} from './pages/work/demos/WebsiteDemosComingSoon';
import {Packages} from './pages/packages/Packages';
import {About} from './pages/about/About';
import {Contact} from './pages/contact/Contact';
import {SitemapPage} from './pages/sitemap/SitemapPage';
import {NotFound} from './pages/not-found/NotFound';

export function App(){
 const location=useLocation();
 useEffect(()=>{window.scrollTo(0,0)},[location.pathname]);
 return <>
  <SeoHead/>
  <Analytics/>
  <ContentProtection/>
  <a href="#main" className="skip-link">Skip to content</a>
  <Header/>
  <main id="main">
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/quote" element={<QuotePage/>}/>
    <Route path="/bag" element={<QuotePage/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/quote/review" element={<Navigate to="/quote" replace/>}/>
    <Route path="/services/:slug" element={<ServiceDetail/>}/>
    <Route path="/work" element={<Work/>}/>
    <Route path="/work/samples" element={<Samples/>}/>
    <Route path="/work/samples/:slug" element={<SampleDetail/>}/>
    <Route path="/work/templates" element={<Templates/>}/>
    <Route path="/work/templates/:slug" element={<IndustryTemplateDetail/>}/>
    <Route path="/work/projects" element={<Navigate to="/work/samples" replace/>}/>
    <Route path="/work/projects/:slug" element={<Navigate to="/work/samples" replace/>}/>
    <Route path="/work/landing-pages" element={<Navigate to="/work/templates" replace/>}/>
    <Route path="/work/landing-pages/:slug" element={<Navigate to="/work/templates" replace/>}/>
    <Route path="/work/demos" element={<WebsiteDemosComingSoon/>}/>
    <Route path="/work/demos/:slug" element={<Navigate to="/work/demos" replace/>}/>
    <Route path="/packages" element={<Packages/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/sitemap" element={<SitemapPage/>}/>
    <Route path="/legal" element={<LegalIndex/>}/>
    <Route path="/legal/:slug" element={<LegalPage/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
  </main>
  <Footer/>
 </>;
}
