import {useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {CATEGORIES,SERVICES,SPEEDS,formatZAR,type Speed} from './catalog';
import {buildBrief,emptyDraft,lineTotal,newReference,totals,type Draft} from './quote';
import {resolveContact,type ResolvedContact} from './contact-config';
import {buildWhatsAppUrl} from '../shared/contact/whatsapp';
import {buildMailtoHref} from '../shared/contact/enquiry';
import {TurnstileWidget} from '../shared/components/TurnstileWidget';
import {trackEvent} from '../shared/analytics/track';

const KEY='lemma-quote-draft';
const enquiryEmail=(import.meta.env.VITE_LEMMA_ENQUIRY_EMAIL||'contact.lemmastudio@gmail.com').trim();
const validEnquiryEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail);

export function QuotePage(){
 const [draft,setDraft]=useState<Draft>(()=>{try{const raw=localStorage.getItem(KEY);return raw?{...emptyDraft(),...JSON.parse(raw)}:emptyDraft()}catch{return emptyDraft()}});
 const [contact,setContact]=useState<ResolvedContact>({whatsappNumber:null,telegramUsername:null,isLocalOverride:false});
 const [filter,setFilter]=useState('all'),[search,setSearch]=useState(''),[copied,setCopied]=useState(false);
 const [honey,setHoney]=useState('');
 const [turnstileToken,setTurnstileToken]=useState('');
 const [turnstileReset,setTurnstileReset]=useState(0);
 const [submitting,setSubmitting]=useState(false);
 const [submittedRef,setSubmittedRef]=useState<string|null>(null);
 const [errorMsg,setErrorMsg]=useState('');
 const [fallbackMailto,setFallbackMailto]=useState<string|null>(null);

 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(draft))},[draft]);
 useEffect(()=>{setContact(resolveContact())},[]);

 const setDetails=(key:keyof Draft['details'],value:string|boolean)=>{
  setDraft(d=>({...d,details:{...d.details,[key]:value}}));
  setErrorMsg('');
  setFallbackMailto(null);
 };

 const add=(id:string)=>{
  setDraft(d=>({...d,items:d.items.some(x=>x.id===id)?d.items.map(x=>x.id===id?{...x,qty:x.qty+1}:x):[...d.items,{id,qty:1,speed:'standard'}]}));
  trackEvent('quote_add_item',{serviceId:id});
 };

 const visible=useMemo(()=>SERVICES.filter(s=>(filter==='all'||s.category===filter)&&(s.name.toLowerCase().includes(search.toLowerCase()))),[filter,search]);
 const t=totals(draft.items),details=draft.details;
 const valid=Boolean(draft.items.length>0&&details.fullName.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email)&&details.country.trim()&&details.description.trim().length>=4&&details.consent);
 const activeRef=draft.reference||'LEMMA-DRAFT';
 const brief=buildBrief({...draft,reference:activeRef});
 const ensureRef=()=>{if(draft.reference)return draft.reference;const ref=newReference();setDraft(d=>({...d,reference:ref}));return ref};

 const copy=async()=>{
  await navigator.clipboard.writeText(brief);
  setCopied(true);
  trackEvent('enquiry_copy',{kind:'quote'});
 };

 const sendEmail=async()=>{
  if(!valid||submitting)return;
  const ref=ensureRef();
  const fullBrief=buildBrief({...draft,reference:ref});
  const mailto=buildMailtoHref(enquiryEmail,'Lemma Studio order enquiry '+ref,fullBrief);

  setSubmitting(true);
  setSubmittedRef(null);
  setErrorMsg('');
  setFallbackMailto(null);

  const formattedItems=draft.items.map(item=>{
   const svc=SERVICES.find(x=>x.id===item.id);
   return {
    id:item.id,
    name:svc?.name||item.id,
    qty:item.qty,
    speed:item.speed,
    totalZar:lineTotal(item).total,
   };
  });

  const phoneMerged=[details.dialCode.trim(),details.phone.trim()].filter(Boolean).join(' ');

  try{
   const response=await fetch('/api/enquiry',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
     kind:'quote',
     name:details.fullName,
     email:details.email,
     business:details.business,
     country:details.country,
     phone:phoneMerged,
     whatsapp:details.whatsapp,
     service:'Itemised Creative Bag',
     deadline:details.deadline,
     style:details.style,
     description:details.description,
     links:details.assets,
     contact:details.channel||'email',
     consent:details.consent,
     reference:ref,
     estimatedTotalZar:t.total,
     items:formattedItems,
     brief:fullBrief,
     _honey:honey,
     turnstileToken,
    }),
   });
   const result=(await response.json().catch(()=>({}))) as {ok?:boolean,error?:string,fallbackReady?:boolean};
   if(response.ok&&result.ok){
    trackEvent('quote_submit',{items:formattedItems.length,totalZar:t.total});
    setSubmittedRef(ref);
    setTurnstileReset(n=>n+1);
    return;
   }
   setTurnstileReset(n=>n+1);
   setErrorMsg(result.error||'Could not deliver your quotation via email right now.');
   if(result.fallbackReady&&mailto){
    setFallbackMailto(mailto);
    trackEvent('enquiry_email_fallback',{kind:'quote'});
   }
  }catch{
   setErrorMsg('Connection issue while sending. You can open your email app, WhatsApp, or copy the brief below.');
   if(mailto){
    setFallbackMailto(mailto);
    trackEvent('enquiry_email_fallback',{kind:'quote'});
   }
  }finally{
   setSubmitting(false);
  }
 };

 const whatsappHref=valid?buildWhatsAppUrl(contact.whatsappNumber,brief):null;

 return <section className="section container quote-page studio-form">
  <p className="eyebrow">LEMMA STUDIO · WORLDWIDE</p>
  <h1 className="section-title">Your creative <em>bag.</em></h1>
  <p className="quote-intro">Review your bag, add more services, and send your project enquiry by WhatsApp or email. Prices are estimates in South African rand (ZAR); delivery and international payment terms are confirmed personally.</p>

  <div className="quote-split">
   <div>
    <h2>1. Add more services <Link className="quote-inline-link" to="/shop">← Shop</Link></h2>
    <input aria-label="Search services" placeholder="Search services" value={search} onChange={e=>setSearch(e.target.value)}/>
    <select aria-label="Category" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All categories</option>{Object.entries(CATEGORIES).map(([key,v])=><option key={key} value={key}>{v.label}</option>)}</select>
    <div className="quote-catalog-list">
     {visible.map(s=><div className="quote-card" key={s.id}><strong>{s.name}</strong><p>{s.from?'From ':''}{formatZAR(s.price)}{s.unit||''} · {s.delivery}</p><button className="btn btn-primary" type="button" onClick={()=>add(s.id)}>Add +</button></div>)}
    </div>
   </div>

   <div>
    <h2>2. Your bag</h2>
    {draft.items.length===0?<p className="empty-state">No services selected yet.</p>:draft.items.map(item=>{
     const s=SERVICES.find(x=>x.id===item.id);if(!s)return null;
     return <div className="quote-card" key={item.id}>
      <strong>{s.name}</strong>
      <label>Quantity<input aria-label={'Quantity for '+s.name} type="number" min="1" max="100" value={item.qty} onChange={e=>setDraft(d=>({...d,items:d.items.map(x=>x.id===item.id?{...x,qty:Math.max(1,Math.min(100,Number(e.target.value)||1))}:x)}))}/></label>
      <label>Delivery speed<select value={s.speeds.includes(item.speed)?item.speed:'standard'} onChange={e=>setDraft(d=>({...d,items:d.items.map(x=>x.id===item.id?{...x,speed:e.target.value as Speed}:x)}))}>{s.speeds.map(speed=><option key={speed} value={speed}>{SPEEDS[speed].label} (+{SPEEDS[speed].fee*100}%)</option>)}</select></label>
      <p className="quote-line-total">{formatZAR(lineTotal(item).total)}</p>
      <button className="btn enquiry-btn-secondary" type="button" onClick={()=>setDraft(d=>({...d,items:d.items.filter(x=>x.id!==item.id)}))}>Remove</button>
     </div>;
    })}
    <div className="quote-card quote-summary-card">
     <p>Services: {formatZAR(t.base)}</p>
     <p>Delivery surcharges: {formatZAR(t.fee)}</p>
     <h3>Estimated total: {formatZAR(t.total)}</h3>
     <small>From-prices and ongoing maintenance require a custom final quote. Express delivery subject to availability.</small>
    </div>
   </div>
  </div>

  <h2>3. Tell us about your project</h2>
  <input className="enquiry-honey" type="text" name="_honey" value={honey} onChange={e=>setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true"/>
  <div className="quote-form-grid">
   {([['fullName','Full name *'],['business','Business / organisation'],['email','Email *'],['country','Country *'],['dialCode','International dial code (e.g. +27)'],['phone','Phone number'],['whatsapp','WhatsApp number (optional)'],['style','Preferred design style'],['assets','Existing assets or reference links'],['deadline','Preferred deadline (date or description)']] as const).map(([key,label])=><label key={key}>{label}<input type={key==='email'?'email':'text'} value={details[key]} onChange={e=>setDetails(key,e.target.value)}/></label>)}
  </div>
  <label>Preferred contact method<select value={details.channel} onChange={e=>setDetails('channel',e.target.value)}><option value="">Select a channel</option><option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="email">Email</option><option value="phone">Phone</option></select></label>
  <label>What do you need? *<textarea className="enquiry-textarea-lg" value={details.description} onChange={e=>setDetails('description',e.target.value)} placeholder="Describe your project, audience, deliverables, and special requirements."/></label>
  <label className="enquiry-consent"><input type="checkbox" checked={details.consent} onChange={e=>setDetails('consent',e.target.checked)}/> I consent to including these details in the enquiry message I choose to send.</label>

  <TurnstileWidget resetNonce={turnstileReset} onTokenChange={setTurnstileToken}/>

  <div className="quote-card quote-send-card">
   <h2>4. Send your bag to Lemma</h2>
   <p>Estimated total: <strong>{formatZAR(t.total)}</strong> · ZAR. No payment is collected here.</p>
   <div className="enquiry-actions">
    <button className="btn btn-primary" type="button" disabled={!valid} onClick={()=>void copy()}>{copied?'Brief copied':'Copy detailed quotation'}</button>
    <button className="btn btn-primary" type="button" disabled={!valid||!validEnquiryEmail||submitting} onClick={()=>void sendEmail()}>{submitting?'Sending…':validEnquiryEmail?'Send via email':'Email · awaiting setup'}</button>
    <a className={'btn btn-primary'+(!whatsappHref?' is-disabled':'')} href={whatsappHref||undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!whatsappHref} tabIndex={whatsappHref?0:-1} onClick={e=>{if(!whatsappHref){e.preventDefault();return}ensureRef();trackEvent('enquiry_whatsapp_click',{kind:'quote'})}}>{contact.whatsappNumber?'Open WhatsApp with quote':'WhatsApp · coming soon'}</a>
    {contact.telegramUsername?<a className="btn btn-primary" target="_blank" rel="noopener noreferrer" href={'https://t.me/'+contact.telegramUsername} onClick={()=>{if(valid)void copy()}}>Open Telegram (copy brief first)</a>:<button className="btn enquiry-btn-secondary" disabled>Telegram · coming soon</button>}
   </div>

   {submittedRef&&<div className="enquiry-submitted" role="status" aria-live="polite">
    <div><strong>Quotation enquiry sent ({submittedRef})</strong><p>Thank you — your itemised bag was delivered to Lemma Studio. We will respond via your preferred contact method.</p></div>
   </div>}

   {errorMsg&&<div className="enquiry-feedback enquiry-feedback-error" role="alert">
    <p>{errorMsg}</p>
    {fallbackMailto&&<a className="btn enquiry-btn-secondary enquiry-fallback-link" href={fallbackMailto}>Open in your email app ↗</a>}
   </div>}

   {!valid&&<p>Please select a service and provide your name, valid email, country, project description and consent.</p>}
   <p><small>WhatsApp opens a prepared message; you must press Send. Telegram may not prefill messages, so copy the quotation first. Email submissions are validated and delivered securely to Lemma Studio. No order is placed until you send the message.</small></p>
  </div>
  <p className="quote-back"><Link to="/shop">← Continue shopping</Link></p>
 </section>;
}
