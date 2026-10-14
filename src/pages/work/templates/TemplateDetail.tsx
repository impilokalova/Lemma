import {Link,useParams} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {samples} from '../../../shared/navigation/routes';
import {NotFound} from '../../not-found/NotFound';
import {signatureArtworks} from '../gallery/artworks';
export function TemplateDetail(){
 const {slug}=useParams();
 const artwork=signatureArtworks.find(a=>a.slug===slug);
 if(artwork)return <div className="lemma-sample-detail"><div className="container"><Link className="lemma-detail-back" to="/work/samples">← Back to the collection</Link><p className="eyebrow">LEMMA ORIGINAL / {artwork.type.toUpperCase()} CONCEPT</p><h1>{artwork.title}</h1><p>{artwork.category} — an original, fictional portfolio concept. Not commissioned client work.</p><div className="lemma-detail-art"><img src={artwork.image} alt={artwork.title+' — Lemma original concept artwork'} decoding="async"/></div><div className="lemma-detail-actions"><Link className="btn btn-primary" to="/contact">Request a custom design ↗</Link><Link to="/work/samples">View more concepts</Link></div></div></div>;
 const sample=samples.find(s=>s.slug===slug);
 return sample?<><Intro eyebrow={sample.status} title={sample.title} description={sample.category}/><section className="section container"><p>Request an adapted version of this design for your business.</p>{sample.previewUrl&&<a href={sample.previewUrl} target="_blank" rel="noopener noreferrer">View sample ↗</a>}<p><Link className="btn btn-primary" to="/contact">Request this design ↗</Link></p></section></>:<NotFound/>;
}
