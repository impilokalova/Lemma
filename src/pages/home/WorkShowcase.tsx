import {useState} from 'react';
import {Link} from 'react-router-dom';
import {StudioLink} from '../../shared/components/StudioLink';
import menuFire from '../work/gallery/assets/05-menu-fire.webp';
import menuCoffee from '../work/gallery/assets/06-menu-coffee.webp';
import menuGarden from '../work/gallery/assets/07-menu-garden.webp';

const projects=[
 {title:'Hospitality in print & web.',category:'Hospitality / menu & brand direction',image:menuFire,alt:'Fire & Form hospitality dining menu concept by Lemma Studio',to:'/work/samples/menu-fire',tone:'fire',description:'Warm, atmospheric dining direction with clear visual hierarchy and rich typography.'},
 {title:'Morning craft, refined.',category:'Hospitality / cafe brand concept',image:menuCoffee,alt:'Coffee Ritual hospitality menu concept by Lemma Studio',to:'/work/samples/menu-coffee',tone:'coffee',description:'Structured menu layout and tactile minimalism for specialty hospitality brands.'},
 {title:'Industry web tracks.',category:'Web design / Healthcare, Retail, Entertainment & more',image:menuGarden,alt:'The Garden Table hospitality editorial layout concept by Lemma Studio',to:'/work/templates',tone:'garden',description:'Clean, conversion-focused website directions tailored for trust-driven industries.'}
];

export function WorkShowcase(){
 const [active,setActive]=useState(0);
 const project=projects[active];
 const move=(direction:number)=>setActive(index=>(index+direction+projects.length)%projects.length);
 return <section className="showcase-section" aria-labelledby="showcase-title">
  <div className="container">
   <div className="section-heading"><div><p className="eyebrow">02. Selected directions</p><h2 id="showcase-title" className="section-title">A little of<br/><em>what’s possible.</em></h2></div><p>Original Lemma concepts.<br/>A glimpse of what we could create for you.</p></div>
   <div className={'work-showcase showcase-'+project.tone} aria-roledescription="carousel" aria-label="Selected design concepts">
    <div className="showcase-visual" key={project.to}><img src={project.image} alt={project.alt} loading="lazy" width="960" height="720"/><span className="concept-label">FICTIONAL CONCEPT / LEMMA STUDIO</span></div>
    <div className="showcase-copy" aria-live="polite" aria-atomic="true"><span className="showcase-index">0{active+1} <span>/ 0{projects.length}</span></span><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><Link className="showcase-open" to={project.to}>Explore this direction <span aria-hidden="true">↗</span></Link></div>
    <div className="showcase-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous concept">←</button><div className="showcase-dots">{projects.map((item,index)=><button key={item.to} type="button" aria-label={'Show '+item.title} aria-pressed={active===index} onClick={()=>setActive(index)}><span/></button>)}</div><button type="button" onClick={()=>move(1)} aria-label="Next concept">→</button></div>
   </div>
   <div className="showcase-bottom"><p>Concept work. Prepared as visual directions.</p><StudioLink to="/work" quiet>Explore our work</StudioLink></div>
  </div>
 </section>;
}
