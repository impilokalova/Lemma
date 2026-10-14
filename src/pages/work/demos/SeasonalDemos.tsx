import {useEffect,useRef,useState} from 'react';
import {useSearchParams} from 'react-router-dom';
const sneaker='/landing-pages/shared/assets/sneaker-drop.webp';
const audio='/landing-pages/shared/assets/soundwave.webp';
const home='/landing-pages/shared/assets/home-edit.webp';
const afterDark='/landing-pages/shared/assets/after-dark.webp';
const moth='/landing-pages/shared/assets/midnight-moth.webp';
const spectral='/landing-pages/shared/assets/spectral-sweets.webp';


export const seasonalDemos=[
 {slug:'sneaker-drop',group:'Black Friday',brand:'SOLE / SYSTEM',eyebrow:'THE BLACK FRIDAY EDIT',title:'MAKE YOUR NEXT MOVE.',subtitle:'A bold sneaker launch concept for the people who never stand still.',accent:'#C8FF43',background:'#0C0E0B',image:sneaker,cta:'EXPLORE THE DROP',tag:'FOOTWEAR',features:['Built for motion','Made to stand out','Everyday performance']},
 {slug:'soundwave',group:'Black Friday',brand:'SOUND / WAVE',eyebrow:'BLACK FRIDAY AUDIO',title:'HEAR WHAT MATTERS.',subtitle:'An immersive electronics campaign built around sound, clarity and design.',accent:'#63D7FF',background:'#07111F',image:audio,cta:'FEEL THE SOUND',tag:'AUDIO',features:['Immersive listening','Every detail matters','Designed to move']},
 {slug:'home-edit',group:'Black Friday',brand:'FORM / HOME',eyebrow:'THE SEASONAL HOME EDIT',title:'LIVE BEAUTIFULLY.',subtitle:'Quiet luxury meets an editorial homeware shopping experience.',accent:'#D8A97D',background:'#211A18',image:home,cta:'EXPLORE THE EDIT',tag:'INTERIORS',features:['Objects with purpose','Considered materials','A quieter kind of luxury']},
 {slug:'after-dark',group:'Halloween',brand:'AFTER / DARK',eyebrow:'HALLOWEEN EXPERIENCE',title:'THE NIGHT IS CALLING.',subtitle:'An atmospheric event concept for those drawn to the extraordinary.',accent:'#B16CFF',background:'#10071C',image:afterDark,cta:'DISCOVER THE NIGHT',tag:'EVENT',features:['Enter the unknown','Immersive atmosphere','An unforgettable night']},
 {slug:'midnight-moth',group:'Halloween',brand:'MIDNIGHT / MOTH',eyebrow:'THE DARK COLLECTION',title:'A LITTLE DARKNESS.',subtitle:'A mysterious fragrance-inspired seasonal editorial campaign.',accent:'#F3A3C8',background:'#1A0918',image:moth,cta:'MEET THE COLLECTION',tag:'BEAUTY',features:['A darker signature','A story in every detail','An alluring ritual']},
 {slug:'spectral-sweets',group:'Halloween',brand:'SPECTRAL / SWEETS',eyebrow:'A HAUNTINGLY SWEET SEASON',title:'SWEETLY SUPERNATURAL.',subtitle:'Playful seasonal confectionery creative with a spooky twist.',accent:'#FF8B3D',background:'#190B19',image:spectral,cta:'DISCOVER THE TREATS',tag:'CONFECTIONERY',features:['Made for mischief','Treat your imagination','A little magic inside']}
] as const;


type Device='phone'|'desktop';
function LivePreview({slug,device}:{slug:string;device:Device}){
 const host=useRef<HTMLDivElement>(null);
 const [width,setWidth]=useState(800);
 useEffect(()=>{const el=host.current;if(!el)return;const update=()=>setWidth(el.clientWidth);update();const obs=new ResizeObserver(update);obs.observe(el);return()=>obs.disconnect()},[device]);
 const desktop=device==='desktop';
 const viewport=desktop?1200:390;
 const scale=Math.min(1,Math.max(0.1,(width-(desktop?0:16))/viewport));
 const height=desktop?650:610;
 return <div className={'demo-device '+(desktop?'demo-device-desktop':'demo-device-phone')} ref={host}>
  <div className="demo-device-shell" style={{width:viewport*scale,height:(height+(!desktop?42:34))*scale}}>
   <div className="demo-device-body" style={{width:viewport,height:height+(!desktop?42:34),transform:'scale('+scale+')',transformOrigin:'top left'}}>
    <div className="demo-device-chrome" aria-hidden="true">{desktop?<><span className="demo-browser-dots">● ● ●</span><span className="demo-browser-address">lemma.studio / {slug}</span></>:<><span className="demo-phone-speaker"/><span className="demo-phone-label">LEMMA / LIVE PREVIEW</span></>}</div>
    <iframe key={slug+'-'+device} title={slug.replace(/-/g,' ')+' interactive '+device+' preview'} src={'/landing-pages/'+slug+'/'} loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" style={{width:viewport,height,border:0,display:'block',background:'#140e20'}}/>
   </div>
  </div>
 </div>;
}
export function SeasonalDemoIndex(){
 const [params,setParams]=useSearchParams();
 const requested=params.get('concept');
 const [selected,setSelectedState]=useState<string>(requested && seasonalDemos.some(d=>d.slug===requested)?requested:seasonalDemos[0].slug);
 const setSelected=(slug:string)=>{setSelectedState(slug);setParams({concept:slug},{replace:true});};
 const [device,setDevice]=useState<Device>('phone');
 useEffect(()=>{const requested=params.get('concept');if(requested && seasonalDemos.some(d=>d.slug===requested))setSelectedState(requested)},[params]);
 const active=seasonalDemos.find(d=>d.slug===selected)??seasonalDemos[0];
 return <div className="demo-showcase"><div className="container">
  <div className="demo-showcase-intro"><p className="eyebrow">LEMMA STUDIO / INTERACTIVE WEBSITE CONCEPTS</p><h1>Six worlds.<br/>One creative studio.</h1><p>Explore six fully built landing-page concepts. Switch between phone and desktop, then scroll and interact inside the preview. All brands and promotions are fictional.</p></div>
  <section className="demo-preview-section" aria-label="Interactive website preview">
   <div className="demo-preview-heading"><div><p className="eyebrow">{active.group} / {active.tag}</p><h2>{active.brand}</h2><p>{active.subtitle}</p></div><div className="demo-device-switch" role="group" aria-label="Preview device"><button type="button" className={device==='phone'?'is-active':''} aria-pressed={device==='phone'} onClick={()=>setDevice('phone')}>▯ Phone</button><button type="button" className={device==='desktop'?'is-active':''} aria-pressed={device==='desktop'} onClick={()=>setDevice('desktop')}>▣ Desktop</button></div></div>
   <LivePreview slug={active.slug} device={device}/>
   <div className="demo-preview-actions"><p>Scroll inside the frame to explore the actual landing page.</p><a className="btn btn-primary" href={'/landing-pages/'+active.slug+'/'}>Open full demo ↗</a></div>
  </section>
  <section className="demo-picker" aria-label="Choose a landing page"><h2 className="section-title">Choose a concept.</h2><div className="demo-picker-grid">{seasonalDemos.map((d,i)=><button type="button" key={d.slug} className={'demo-picker-card '+(selected===d.slug?'is-selected':'')} onClick={()=>{setSelected(d.slug);document.querySelector('.demo-preview-section')?.scrollIntoView({behavior:'smooth',block:'start'})}} aria-pressed={selected===d.slug}><span className="demo-picker-number">{String(i+1).padStart(2,'0')} / {d.group}</span><img src={d.image} alt={d.brand+' concept cover artwork'} loading="lazy" decoding="async"/><span className="demo-picker-copy"><strong>{d.brand}</strong><span>Preview website ↗</span></span></button>)}</div></section>
  <p className="demo-fiction-note">These six websites are original fictional portfolio concepts. No depicted products, offers or tickets are available for purchase.</p>
 </div></div>;
}
