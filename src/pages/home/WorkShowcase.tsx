import {useState} from 'react';
import {StudioLink} from '../../shared/components/StudioLink';

const projects=[
 {title:'Sound, with presence.',category:'Web design / retail concept',image:'/landing-pages/soundwave/assets/headphones-purple-neon.webp',alt:'Purple-lit headphones from the Soundwave concept',href:'/landing-pages/soundwave/',tone:'sound',description:'An immersive product story, built around bold imagery and a clear journey.'},
 {title:'A softer point of view.',category:'Web design / furniture concept',image:'/landing-pages/home-edit/assets/sofa-lifestyle-room.webp',alt:'Neutral living room from the Form Home furniture concept',href:'/landing-pages/home-edit/',tone:'home',description:'Thoughtful spacing, warm textures, and a calm approach to a retail experience.'},
 {title:'Made to move.',category:'Web design / sneaker concept',image:'/landing-pages/sneaker-drop/assets/hero-floating.webp',alt:'Floating sneaker from the Sneaker Drop concept',href:'/landing-pages/sneaker-drop/',tone:'sneaker',description:'A confident visual direction that puts a single product in the spotlight.'}
];

/** React adaptation of the library's Animated Image Slider (MDJAmin).
 * Manual controls replace DOM reordering; native images preserve alt text. */
export function WorkShowcase(){
 const [active,setActive]=useState(0);
 const project=projects[active];
 const move=(direction:number)=>setActive(index=>(index+direction+projects.length)%projects.length);
 return <section className="showcase-section" aria-labelledby="showcase-title">
  <div className="container">
   <div className="section-heading"><div><p className="eyebrow">02 / SELECTED DIRECTIONS</p><h2 id="showcase-title" className="section-title">A little of<br/><em>what’s possible.</em></h2></div><p>Original Lemma concepts.<br/>A glimpse of what we could create for you.</p></div>
   <div className={'work-showcase showcase-'+project.tone} aria-roledescription="carousel" aria-label="Selected website concepts">
    <div className="showcase-visual" key={project.href}><img src={project.image} alt={project.alt} loading="lazy" width="960" height="720"/><span className="concept-label">FICTIONAL CONCEPT / LEMMA STUDIO</span></div>
    <div className="showcase-copy" aria-live="polite" aria-atomic="true"><span className="showcase-index">0{active+1} <span>/ 0{projects.length}</span></span><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><a className="showcase-open" href={project.href}>Explore this concept <span aria-hidden="true">↗</span></a></div>
    <div className="showcase-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous concept">←</button><div className="showcase-dots">{projects.map((item,index)=><button key={item.href} type="button" aria-label={'Show '+item.title} aria-pressed={active===index} onClick={()=>setActive(index)}><span/></button>)}</div><button type="button" onClick={()=>move(1)} aria-label="Next concept">→</button></div>
   </div>
   <div className="showcase-bottom"><p>Concept work. No real products or purchases.</p><StudioLink to="/work" quiet>Explore our work</StudioLink></div>
  </div>
 </section>;
}
