import {useEffect,useState} from 'react';
import {Link,Navigate,useParams} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {signatureArtworks} from '../gallery/artworks';
import {getIndustryTrack} from './industries';

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

const deviceLabels: Record<PreviewDevice, string> = {
 desktop: 'Desktop (>=1200px)',
 tablet: 'Tablet (768px - 1199px)',
 mobile: 'Mobile (<=599px)'
};

export function IndustryTemplateDetail(){
 const {slug}=useParams();
 const track=getIndustryTrack(slug);
 const [conceptIndex,setConceptIndex]=useState(0);
 const [device,setDevice]=useState<PreviewDevice>('desktop');

 useEffect(()=>{
  setConceptIndex(0);
 },[slug]);

 if(!track){
  if(signatureArtworks.some(a=>a.slug===slug)){
   return <Navigate to={'/work/samples/'+slug} replace/>;
  }
  return <Navigate to="/work/templates" replace/>;
 }

 const concept=track.concepts[conceptIndex]??track.concepts[0];
 const displayName=track.title.toLowerCase();

 return <div className="lemma-industry-detail">
  <Intro eyebrow={'WORK / '+track.code} title={track.title} description={track.summary}/>

  <section className="section container">
   <div className="lemma-detail-topbar">
    <Link className="lemma-detail-back" to="/work/templates">← All 12 industry concepts</Link>
    <p className="lemma-sample-disclaimer">Placeholder preview calibrated to Lemma’s desktop, tablet and mobile breakpoints.</p>
   </div>

   <div className="lemma-preview-controls" role="region" aria-label="Sample concept and viewport controls">
    <div className="lemma-concept-tabs" role="tablist" aria-label={track.title+' website concepts'}>
     {track.concepts.map((item,idx)=><button
      key={item.id}
      type="button"
      role="tab"
      aria-selected={conceptIndex===idx}
      className={'lemma-tab-btn'+(conceptIndex===idx?' is-active':'')}
      onClick={()=>setConceptIndex(idx)}>
      {item.label}
     </button>)}
    </div>

    <div className="lemma-device-toggle" role="group" aria-label="Preview breakpoint">
     <button
      type="button"
      aria-pressed={device==='desktop'}
      className={'lemma-device-btn'+(device==='desktop'?' is-active':'')}
      onClick={()=>setDevice('desktop')}>
      Desktop
     </button>
     <button
      type="button"
      aria-pressed={device==='tablet'}
      className={'lemma-device-btn'+(device==='tablet'?' is-active':'')}
      onClick={()=>setDevice('tablet')}>
      Tablet
     </button>
     <button
      type="button"
      aria-pressed={device==='mobile'}
      className={'lemma-device-btn'+(device==='mobile'?' is-active':'')}
      onClick={()=>setDevice('mobile')}>
      Mobile
     </button>
    </div>
   </div>

   <div className={'lemma-preview-stage is-'+device}>
    <div className="lemma-browser-frame" aria-live="polite">
     <div className="lemma-browser-chrome">
      <div className="lemma-browser-dots" aria-hidden="true"><span/><span/><span/></div>
      <div className="lemma-browser-url">lemma.studio / {concept.routeSlug}</div>
      <span className="lemma-browser-mode">{deviceLabels[device]}</span>
     </div>

     <div className="lemma-wireframe-body">
      <div className="lemma-wf-nav">
       <span className="lemma-wf-brand">{track.shortName.toUpperCase()}.STUDIO</span>
       {device==='desktop'
        ? <div className="lemma-wf-links">{concept.navItems.map(link=><span key={link}>{link}</span>)}</div>
        : <span className="lemma-wf-menu">Menu</span>}
       {device==='desktop'&&<span className="lemma-wf-nav-cta">{concept.primaryCta}</span>}
      </div>

      <div className="lemma-wf-hero">
       <div className="lemma-wf-hero-copy">
        <span className="lemma-wf-kicker">{track.code} · SAMPLE CONCEPT</span>
        <h2>{concept.headline}</h2>
        <p>{concept.lead}</p>
        <div className="lemma-wf-hero-actions">
         <span className="lemma-wf-primary-btn">{concept.primaryCta} ↗</span>
         <span className="lemma-wf-secondary-btn">Learn more</span>
        </div>
       </div>
       <div className="lemma-wf-hero-media" aria-hidden="true">
        <div className="lemma-wf-media-card">
         <span>{device==='desktop'?'Desktop visual split':device==='tablet'?'Tablet portrait frame':'Mobile hero frame'}</span>
         <strong>{concept.label}</strong>
         <p>Placeholder showcase — live {displayName} template in development.</p>
        </div>
       </div>
      </div>

      <div className="lemma-wf-sections">
       {concept.blocks.map((block,idx)=><article className="lemma-wf-block" key={block.title}>
        <span>0{idx+1} · {block.tag}</span>
        <h3>{block.title}</h3>
        <p>{block.detail}</p>
       </article>)}
      </div>

      <div className="lemma-wf-footer">
       <span>Breakpoint note: {concept.mobileHighlight}</span>
      </div>
     </div>
    </div>
   </div>

   <div className="lemma-template-footer-cta">
    <div>
     <h2>Want a {displayName} website built around your business?</h2>
     <p>We tailor every layout to your services, content and enquiries rather than forcing your brand into a rigid template.</p>
    </div>
    <div className="lemma-detail-actions">
     <Link className="btn btn-primary" to="/contact">Request a {track.shortName} website ↗</Link>
     <Link className="btn enquiry-btn-secondary" to="/packages">View web packages ↗</Link>
    </div>
   </div>
  </section>
 </div>;
}
