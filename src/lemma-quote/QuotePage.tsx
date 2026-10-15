import {useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {CATEGORIES,SERVICES,SPEEDS,formatZAR,type Speed} from './catalog';
import {buildBrief,emptyDraft,lineTotal,newReference,totals,type Draft} from './quote';
import {resolveContact,type ResolvedContact} from './contact-config';
const KEY='lemma-quote-draft';
const enquiryEmail=(import.meta.env.VITE_LEMMA_ENQUIRY_EMAIL||'').trim();
const validEnquiryEmail=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(enquiryEmail);
const inputStyle:React.CSSProperties={display:'block',width:'100%',padding:12,margin:'6px 0 15px',borderRadius:8,border:'1px solid #777',background:'transparent',color:'inherit'};
const cardStyle:React.CSSProperties={padding:18,border:'1px solid #7775',borderRadius:12,marginBottom:12};
export function QuotePage(){
 const [draft,setDraft]=useState<Draft>(()=>{try{const raw=localStorage.getItem(KEY);return raw?{...emptyDraft(),...JSON.parse(raw)}:emptyDraft()}catch{return emptyDraft()}});
 const [contact,setContact]=useState<ResolvedContact>({whatsappNumber:null,telegramUsername:null,isLocalOverride:false});
 const [filter,setFilter]=useState('all'),[search,setSearch]=useState(''),[copied,setCopied]=useState(false);
 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(draft))},[draft]);
 useEffect(()=>{setContact(resolveContact())},[]);
 const setDetails=(key:keyof Draft['details'],value:string|boolean)=>setDraft(d=>({...d,details:{...d.details,[key]:value}}));
 const add=(id:string)=>setDraft(d=>({...d,items:d.items.some(x=>x.id===id)?d.items.map(x=>x.id===id?{...x,qty:x.qty+1}:x):[...d.items,{id,qty:1,speed:'standard'}]}));
 const visible=useMemo(()=>SERVICES.filter(s=>(filter==='all'||s.category===filter)&&(s.name.toLowerCase().includes(search.toLowerCase()))),[filter,search]);
 const t=totals(draft.items),details=draft.details;
 const valid=draft.items.length>0&&details.fullName.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)&&details.country.trim()&&details.description.trim()&&details.consent;
 const ready={...draft,reference:draft.reference||'LEMMA-DRAFT'};
 const brief=buildBrief(ready);
 const copy=async()=>{await navigator.clipboard.writeText(brief);setCopied(true)};
 const email=()=>{if(!valid||!validEnquiryEmail)return;const ref=draft.reference||newReference();setDraft(d=>({...d,reference:ref}));const subject='Lemma Studio order enquiry '+ref;const body=buildBrief({...draft,reference:ref});window.location.href='mailto:'+enquiryEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)};
 const whatsapp=()=>{if(!valid||!contact.whatsappNumber)return;const ref=draft.reference||newReference();const message=buildBrief({...draft,reference:ref});setDraft(d=>({...d,reference:ref}));window.open('https://wa.me/'+contact.whatsappNumber+'?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')};
 return <section className="section container" style={{maxWidth:1100}}>
 <p className="eyebrow">LEMMA STUDIO · WORLDWIDE</p><h1>Your creative bag.</h1><p>Review your bag, add more services, and send your project enquiry by WhatsApp or email. Prices are estimates in South African rand (ZAR); delivery and international payment terms are confirmed personally.</p>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:24,alignItems:'start'}}>
 <div><h2>1. Add more services <Link to="/shop" style={{fontSize:14}}>← Shop</Link></h2><input aria-label="Search services" placeholder="Search services" style={inputStyle} value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="Category" style={inputStyle} value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All categories</option>{Object.entries(CATEGORIES).map(([key,v])=><option key={key} value={key}>{v.label}</option>)}</select>
 <div style={{maxHeight:640,overflowY:'auto'}}>{visible.map(s=><div key={s.id} style={cardStyle}><strong>{s.name}</strong><p>{s.from?'From ':''}{formatZAR(s.price)}{s.unit||''} · {s.delivery}</p><button className="btn btn-primary" type="button" onClick={()=>add(s.id)}>Add +</button></div>)}</div></div>
 <div><h2>2. Your bag</h2>{draft.items.length===0?<p>No services selected yet.</p>:draft.items.map(item=>{const s=SERVICES.find(x=>x.id===item.id);if(!s)return null;return <div key={item.id} style={cardStyle}><strong>{s.name}</strong><label>Quantity<input aria-label={'Quantity for '+s.name} type="number" min="1" max="100" style={inputStyle} value={item.qty} onChange={e=>setDraft(d=>({...d,items:d.items.map(x=>x.id===item.id?{...x,qty:Math.max(1,Math.min(100,Number(e.target.value)||1))}:x)}))}/></label><label>Delivery speed<select style={inputStyle} value={s.speeds.includes(item.speed)?item.speed:'standard'} onChange={e=>setDraft(d=>({...d,items:d.items.map(x=>x.id===item.id?{...x,speed:e.target.value as Speed}:x)}))}>{s.speeds.map(speed=><option key={speed} value={speed}>{SPEEDS[speed].label} (+{SPEEDS[speed].fee*100}%)</option>)}</select></label><p>{formatZAR(lineTotal(item).total)}</p><button type="button" onClick={()=>setDraft(d=>({...d,items:d.items.filter(x=>x.id!==item.id)}))}>Remove</button></div>})}<div style={cardStyle}><p>Services: {formatZAR(t.base)}</p><p>Delivery surcharges: {formatZAR(t.fee)}</p><h3>Estimated total: {formatZAR(t.total)}</h3><small>From-prices and ongoing maintenance require a custom final quote. Express delivery subject to availability.</small></div></div></div>
 <h2>3. Tell us about your project</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'0 20px'}}>{([['fullName','Full name *'],['business','Business / organisation'],['email','Email *'],['country','Country *'],['dialCode','International dial code (e.g. +27)'],['phone','Phone number'],['whatsapp','WhatsApp number (optional)'],['style','Preferred design style'],['assets','Existing assets or reference links'],['deadline','Preferred deadline (date or description)']] as const).map(([key,label])=><label key={key}>{label}<input style={inputStyle} type={key==='email'?'email':'text'} value={details[key]} onChange={e=>setDetails(key,e.target.value)}/></label>)}</div>
 <label>Preferred contact method<select style={inputStyle} value={details.channel} onChange={e=>setDetails('channel',e.target.value)}><option value="">Select a channel</option><option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="email">Email</option><option value="phone">Phone</option></select></label>
 <label>What do you need? *<textarea style={{...inputStyle,minHeight:120}} value={details.description} onChange={e=>setDetails('description',e.target.value)} placeholder="Describe your project, audience, deliverables, and special requirements."/></label>
 <label style={{display:'flex',gap:12,alignItems:'start'}}><input type="checkbox" checked={details.consent} onChange={e=>setDetails('consent',e.target.checked)}/> I consent to including these details in the enquiry message I choose to send.</label>
 <div style={{...cardStyle,marginTop:24}}><h2>4. Send your bag to Lemma</h2><p>Estimated total: <strong>{formatZAR(t.total)}</strong> · ZAR. No payment is collected here.</p><button className="btn btn-primary" type="button" disabled={!valid} onClick={copy}>{copied?'Brief copied':'Copy detailed quotation'}</button>{' '}
 <button className="btn btn-primary" type="button" disabled={!valid||!validEnquiryEmail} onClick={email}>{validEnquiryEmail?"Send via email":"Email · awaiting setup"}</button>{" "}<button className="btn btn-primary" type="button" disabled={!valid||!contact.whatsappNumber} onClick={whatsapp}>{contact.whatsappNumber?'Open WhatsApp with quote':'WhatsApp · coming soon'}</button>{' '}
 {contact.telegramUsername?<a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={'https://t.me/'+contact.telegramUsername} onClick={()=>{if(valid)void copy()}}>Open Telegram (copy brief first)</a>:<button className="btn" disabled>Telegram · coming soon</button>}
 {!valid&&<p>Please select a service and provide your name, valid email, country, project description and consent.</p>}
 <p><small>WhatsApp opens a prepared message; you must press Send. Telegram may not prefill messages, so copy the quotation first. Email and WhatsApp require verified Lemma contact destinations in site settings. No order is placed until you send the message.</small></p></div>
 <p><Link to="/shop">← Continue shopping</Link></p></section>
}
