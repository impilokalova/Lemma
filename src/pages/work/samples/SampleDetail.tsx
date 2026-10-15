import {Link,useParams} from 'react-router-dom';
import {NotFound} from '../../not-found/NotFound';
import {signatureArtworks} from '../gallery/artworks';
export function SampleDetail(){
 const {slug}=useParams();
 const artwork=signatureArtworks.find(a=>a.slug===slug);
 if(artwork)return <div className="lemma-sample-detail"><div className="container"><Link className="lemma-detail-back" to="/work/samples">← Back to the collection</Link><p className="eyebrow">LEMMA ORIGINAL / {artwork.type.toUpperCase()} CONCEPT</p><h1>{artwork.title}</h1><p>{artwork.category} — an original, fictional portfolio concept. Not commissioned client work.</p><div className="lemma-detail-art" aria-label="Artwork fitted to screen"><img src={artwork.image} alt={artwork.title+' — Lemma original concept artwork'} decoding="async"/></div><p style={{textAlign:"center",fontSize:13,opacity:.75}}>Artwork scaled to fit your screen. Open the original image for full-resolution details.</p><p style={{textAlign:"center"}}><a href={artwork.image} target="_blank" rel="noopener noreferrer">View full-resolution artwork ↗</a></p><div className="lemma-detail-actions"><Link className="btn btn-primary" to="/quote">Request a custom design ↗</Link><Link to="/work/samples">View more concepts</Link></div></div></div>;
 return <NotFound/>;
}