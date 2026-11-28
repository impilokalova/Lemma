import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {signatureArtworks} from './gallery/artworks';

export function WorkIndex(){
 const featured=signatureArtworks.slice(0,3);
 return <>
  <Intro eyebrow="WORK / ORIGINAL CONCEPTS" title="Concept case studies." description="Original portfolio explorations across hospitality and editorial design. These examples are conceptual work, not commissioned client projects."/>
  <section className="section container concept-case-grid">
   {featured.map(art=><article className="concept-case-card" key={art.slug}>
    <Link to={'/work/samples/'+art.slug}>
     <img src={art.image} alt={art.title+' original Lemma concept'} loading="lazy" decoding="async"/>
     <h2>{art.title}</h2>
     <p>{art.category} · Concept work</p>
     <span>Explore the concept ↗</span>
    </Link>
   </article>)}
  </section>
  <section className="section container">
   <Link className="btn btn-primary" to="/work/templates">View industry web concepts ↗</Link>
  </section>
 </>;
}
