import {useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {signatureArtworks,type SignatureArtwork} from './artworks';

const collections=[
 {id:'halloween',title:'After Hours',subtitle:'Halloween poster concepts',description:'Four cinematic visual directions for fictional seasonal campaigns.',items:signatureArtworks.slice(0,4)},
 {id:'menus',title:'The Table',subtitle:'Restaurant menu concepts',description:'Four original menu directions, balancing atmosphere with legibility.',items:signatureArtworks.slice(4,8)},
 {id:'retail',title:'The Drop',subtitle:'Black Friday campaign concepts',description:'Four promotional designs for fictional retail brands and offers.',items:signatureArtworks.slice(8,12)}
];

function ArtworkCard({artwork}:{artwork:SignatureArtwork}){
 return <article className="signature-card">
  <Link className="signature-card-image" to={'/work/templates/'+artwork.slug} aria-label={'View '+artwork.title}>
   <img src={artwork.image} alt={artwork.title+' — original '+artwork.category.toLowerCase()+' artwork by Lemma Studio'} loading="lazy" decoding="async"/>
  </Link>
  <div className="signature-card-info"><div><h3>{artwork.title}</h3><p>{artwork.category} · Concept</p></div><Link to={'/work/templates/'+artwork.slug} aria-label={'Explore '+artwork.title}>View design ↗</Link></div>
 </article>;
}
function Collection({collection}:{collection:typeof collections[number]}){
 const [page,setPage]=useState(0);
 const touchStart=useRef<{x:number;y:number}|null>(null);
 const total=collection.items.length;
 const previous=()=>setPage(v=>(v+total-1)%total);
 const next=()=>setPage(v=>(v+1)%total);
 const displayed=[collection.items[page],collection.items[(page+1)%total]];
 const onTouchStart=(event:React.TouchEvent)=>{const t=event.touches[0];touchStart.current={x:t.clientX,y:t.clientY};};
 const onTouchEnd=(event:React.TouchEvent)=>{const start=touchStart.current;touchStart.current=null;if(!start)return;const t=event.changedTouches[0];const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25){if(dx<0)next();else previous();}};
 return <section className="signature-collection" id={collection.id} aria-labelledby={'heading-'+collection.id}>
  <div className="signature-collection-top"><div><p className="signature-overline">LEMMA SIGNATURE / {collection.subtitle.toUpperCase()}</p><h2 id={'heading-'+collection.id}>{collection.title}</h2><p className="signature-collection-description">{collection.description}</p></div><span className="signature-count">{String(page+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
  <div className="signature-gallery" aria-live="polite" aria-atomic="true" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{displayed.map((art,i)=><ArtworkCard key={art.slug+'-'+i} artwork={art}/>)}</div>
  <div className="signature-controls"><span className="signature-swipe-hint">Swipe to explore designs</span><div className="signature-dots" aria-label={collection.title+' selection'}>{collection.items.map((art,i)=><button key={art.slug} type="button" className={page===i?'active':''} aria-label={'Show '+art.title} aria-pressed={page===i} onClick={()=>setPage(i)}/>)}</div><div className="signature-arrows"><button type="button" onClick={previous} aria-label={'Previous '+collection.title+' designs'}>←</button><button type="button" onClick={next} aria-label={'Next '+collection.title+' designs'}>→</button></div></div>
 </section>;
}
export function SignatureGallery(){return <div className="signature-showcase"><div className="signature-intro"><p className="signature-overline">WORK → ORIGINAL CREATIVE → THE SIGNATURE COLLECTION</p><h1>CURATED VISUALS</h1><p>Twelve original design concepts. Three creative directions. Made to show what Lemma can imagine for your brand.</p><span>12 ARTWORKS / 03 COLLECTIONS</span></div>{collections.map(c=><Collection key={c.id} collection={c}/>)}<div className="signature-outro"><p>All artwork is fictional concept work. Names, prices and offers shown in designs are illustrative, not live promotions.</p><Link to="/contact">Let's create something for your brand ↗</Link></div></div>}
