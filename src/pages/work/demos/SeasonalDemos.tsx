import {Link} from 'react-router-dom';
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

export function SeasonalDemoIndex(){return <div className="seasonal-index"><div className="container"><p className="seasonal-kicker">LEMMA STUDIO / INTERACTIVE CONCEPTS</p><h1>Six worlds.<br/>One creative studio.</h1><p>Explore six original, fictional seasonal landing-page demonstrations. No products, discounts, tickets or promotions shown here are offered for sale.</p><div className="seasonal-index-grid">{seasonalDemos.map(d=><Link to={'/landing-pages/'+d.slug+'/'} className="seasonal-index-card" key={d.slug} style={{'--demo-accent':d.accent,'--demo-bg':d.background} as React.CSSProperties}><img src={d.image} alt={d.brand+' campaign concept artwork'} loading="lazy" decoding="async"/><div><span>{d.group} / {d.tag}</span><h2>{d.brand}</h2><strong>Explore concept ↗</strong></div></Link>)}</div></div></div>}
