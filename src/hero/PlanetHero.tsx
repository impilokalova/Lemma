import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {StudioLink} from '../shared/components/StudioLink';
import mobileArtwork from '../mobile/assets/image_6287963c.jpg';

export function PlanetHero(){
 const sectionRef=useRef<HTMLElement>(null);

 useEffect(()=>{
  const node=sectionRef.current;
  if(!node||typeof window==='undefined')return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  let raf=0;
  let targetX=0.68;
  let targetY=0.48;
  let currentX=0.68;
  let currentY=0.48;

  const tick=()=>{
   currentX+=(targetX-currentX)*0.1;
   currentY+=(targetY-currentY)*0.1;
   node.style.setProperty('--mx',`${(currentX*100).toFixed(2)}%`);
   node.style.setProperty('--my',`${(currentY*100).toFixed(2)}%`);
   node.style.setProperty('--px',((currentX-0.5)*2).toFixed(4));
   node.style.setProperty('--py',((currentY-0.5)*2).toFixed(4));
   if(Math.abs(targetX-currentX)>0.001||Math.abs(targetY-currentY)>0.001){
    raf=window.requestAnimationFrame(tick);
   }else{
    raf=0;
   }
  };

  const onPointerMove=(event:PointerEvent)=>{
   if(event.pointerType==='touch')return;
   const rect=node.getBoundingClientRect();
   if(!rect.width||!rect.height)return;
   targetX=Math.min(1,Math.max(0,(event.clientX-rect.left)/rect.width));
   targetY=Math.min(1,Math.max(0,(event.clientY-rect.top)/rect.height));
   if(!raf)raf=window.requestAnimationFrame(tick);
  };

  const onPointerLeave=()=>{
   targetX=0.68;
   targetY=0.48;
   if(!raf)raf=window.requestAnimationFrame(tick);
  };

  node.addEventListener('pointermove',onPointerMove,{passive:true});
  node.addEventListener('pointerleave',onPointerLeave,{passive:true});
  return()=>{
   node.removeEventListener('pointermove',onPointerMove);
   node.removeEventListener('pointerleave',onPointerLeave);
   if(raf)window.cancelAnimationFrame(raf);
  };
 },[]);

 return <section ref={sectionRef} className="studio-hero" aria-labelledby="studio-hero-heading">
  <div className="studio-hero-aura" aria-hidden="true"/>
  <picture className="studio-hero-art" aria-hidden="true">
   <source media="(min-width: 1024px)" srcSet="/desktop/assets/Neon%20Digital%20Atom%20Orbital%20Network.png"/>
   <img src={mobileArtwork} alt="" {...({fetchpriority:'high'} as Record<string,string>)} decoding="async"/>
  </picture>
  <div className="studio-hero-spotlight" aria-hidden="true"/>

  <div className="studio-hero-inner container">
   <div className="studio-hero-copy">
    <h1 id="studio-hero-heading">
     <span className="hero-line"><span>Your next{' '}</span></span>
     <span className="hero-line"><span>big idea.</span></span>
     <span className="hero-line"><span><em>Made real.</em></span></span>
    </h1>
    <p className="studio-hero-description">Distinctive websites, graphic design and social creative. Thoughtfully made for businesses ready to be seen.</p>
    <div className="studio-hero-actions">
     <StudioLink to="/contact">Start a project</StudioLink>
     <StudioLink to="/work" quiet>Explore our work</StudioLink>
    </div>
    <Link className="studio-services-link" to="/services">A small studio for your next big step <span aria-hidden="true">↓</span></Link>
   </div>
   <div className="studio-art-caption" aria-hidden="true"><span>LEMMA / THE CONNECTED IDEA</span><span>CREATIVITY IN ORBIT</span></div>
   <div className="studio-hero-foot"><span>Creative · Web · Social</span><span>Built around your next chapter.</span></div>
  </div>
 </section>;
}
