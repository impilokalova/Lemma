import {useEffect,useState,type FormEvent} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {TurnstileWidget} from '../../shared/components/TurnstileWidget';
import {resolveContact} from '../../lemma-quote/contact-config';
import {buildWhatsAppUrl} from '../../shared/contact/whatsapp';
import {buildMailtoHref} from '../../shared/contact/enquiry';
import {trackEvent} from '../../shared/analytics/track';

type Enquiry={name:string,email:string,business:string,country:string,phone:string,service:string,budget:string,deadline:string,description:string,links:string,contact:string,consent:boolean};
const initial:Enquiry={name:'',email:'',business:'',country:'',phone:'',service:'',budget:'',deadline:'',description:'',links:'',contact:'email',consent:false};
const categories=['Graphic design','Sports graphics','Website / landing page','Presentation / documents','Branding / logo','Social media design','Multiple services','Something else'];
const enquiryEmail=(import.meta.env.VITE_LEMMA_ENQUIRY_EMAIL||'contact.lemmastudio@gmail.com').trim();

export function Contact(){
 const [data,setData]=useState<Enquiry>(initial);
 const [honey,setHoney]=useState('');
 const [turnstileToken,setTurnstileToken]=useState('');
 const [turnstileReset,setTurnstileReset]=useState(0);
 const [submitting,setSubmitting]=useState(false);
 const [copied,setCopied]=useState(false);
 const [status,setStatus]=useState('');
 const [errorMsg,setErrorMsg]=useState('');
 const [fallbackMailto,setFallbackMailto]=useState<string|null>(null);
 const [whatsappNumber,setWhatsappNumber]=useState<string|null>(null);
 const [searchParams,setSearchParams]=useSearchParams();
 const submitted=searchParams.get('submitted')==='1';

 useEffect(()=>{setWhatsappNumber(resolveContact().whatsappNumber)},[]);

 const update=(key:keyof Enquiry,value:string|boolean)=>{
  setData(d=>({...d,[key]:value}));
  setCopied(false);
  setStatus('');
  setErrorMsg('');
  setFallbackMailto(null);
 };

 const summary=()=>[
  'LEMMA STUDIO — GENERAL ENQUIRY',
  'Name: '+data.name,
  'Email: '+data.email,
  'Business: '+(data.business||'—'),
  'Country: '+data.country,
  'Phone: '+(data.phone||'—'),
  'Service: '+data.service,
  'Budget: '+(data.budget||'Not specified'),
  'Deadline: '+(data.deadline||'Flexible'),
  'Preferred reply: '+data.contact,
  'Project: '+data.description,
  'Reference links: '+(data.links||'—'),
 ].join('\n');

 const valid=Boolean(data.name.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)&&data.country.trim()&&data.service&&data.description.trim().length>=4&&data.consent);
 const whatsappHref=valid?buildWhatsAppUrl(whatsappNumber,summary()):null;

 const copy=async()=>{
  try{
   await navigator.clipboard.writeText(summary());
   setCopied(true);
   setStatus('Enquiry copied. Paste it into WhatsApp or email.');
   trackEvent('enquiry_copy',{kind:'general'});
  }catch{
   setStatus('Copy failed. Please select and copy your details manually.');
  }
 };

 const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(!valid||submitting)return;
  setSubmitting(true);
  setStatus('');
  setErrorMsg('');
  setFallbackMailto(null);

  const bodyText=summary();
  const mailto=buildMailtoHref(
   enquiryEmail,
   'Lemma Studio enquiry — '+data.name.trim()+' ('+data.service+')',
   bodyText,
  );

  try{
   const response=await fetch('/api/enquiry',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
     kind:'general',
     ...data,
     _honey:honey,
     turnstileToken,
    }),
   });
   const result=(await response.json().catch(()=>({}))) as {ok?:boolean,error?:string,fallbackReady?:boolean};

   if(response.ok&&result.ok){
    trackEvent('enquiry_submit',{kind:'general',service:data.service});
    setData(initial);
    setHoney('');
    setTurnstileReset(n=>n+1);
    setSearchParams({submitted:'1'},{replace:true});
    return;
   }

   setTurnstileReset(n=>n+1);
   setErrorMsg(result.error||'Could not send your email right now. Please try WhatsApp, your email app, or Copy details.');
   if(result.fallbackReady&&mailto){
    setFallbackMailto(mailto);
    trackEvent('enquiry_email_fallback',{kind:'general'});
   }
  }catch{
   setErrorMsg('Connection issue while sending. You can send right away using your email app, WhatsApp, or Copy details.');
   if(mailto){
    setFallbackMailto(mailto);
    trackEvent('enquiry_email_fallback',{kind:'general'});
   }
  }finally{
   setSubmitting(false);
  }
 };

 return <>
  <Intro eyebrow="START A PROJECT" title="Let's create something useful." description="Ask a question, describe a project, or prepare a detailed quotation — wherever you're based."/>
  <section className="section container contact-section">
   {submitted&&<div className="enquiry-submitted" role="status" aria-live="polite">
    <div><strong>Enquiry sent</strong><p>Thank you — your message was delivered to Lemma Studio. We will reply via your preferred contact method.</p></div>
    <button className="btn enquiry-btn-secondary" type="button" onClick={()=>setSearchParams({},{replace:true})}>Dismiss</button>
   </div>}
   <div className="contact-layout">
    <div className="enquiry-aside">
     <h2>General enquiry</h2>
     <p>Not ready to choose a package? Tell us about your idea using this form. Complete the fields, then send directly by email, open WhatsApp, or copy your summary.</p>
     <p><strong>Want an estimated price now?</strong></p>
     <Link className="btn btn-primary" to="/quote">Build a detailed quotation ↗</Link>
     <p className="enquiry-aside-note">We welcome clients worldwide. Quotation estimates are shown in ZAR; payment arrangements are agreed individually.</p>
     <p><a href={'mailto:'+enquiryEmail}>{enquiryEmail}</a></p>
     <p><small>Enquiries are validated and delivered securely to Lemma Studio. Please don't include confidential or sensitive information.</small></p>
    </div>

    <form className="enquiry-form" onSubmit={(e)=>void handleSubmit(e)} aria-label="General project enquiry form" noValidate>
     <h2>Tell us what you need</h2>
     <input className="enquiry-honey" type="text" name="_honey" value={honey} onChange={e=>setHoney(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true"/>

     <div className="enquiry-grid">
      <label>Full name *<input required name="name" autoComplete="name" maxLength={120} value={data.name} onChange={e=>update('name',e.target.value)}/></label>
      <label>Email address *<input name="email" type="email" required autoComplete="email" maxLength={160} value={data.email} onChange={e=>update('email',e.target.value)}/></label>
      <label>Business / organisation<input name="business" maxLength={140} value={data.business} onChange={e=>update('business',e.target.value)}/></label>
      <label>Country *<input required name="country" autoComplete="country-name" maxLength={100} placeholder="e.g. South Africa" value={data.country} onChange={e=>update('country',e.target.value)}/></label>
      <label>Phone / WhatsApp (with country code)<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+27…" value={data.phone} onChange={e=>update('phone',e.target.value)}/></label>
      <label>Service category *<select name="service" required value={data.service} onChange={e=>update('service',e.target.value)}><option value="">Select a service</option>{categories.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
      <label>Estimated budget (optional)<input name="budget" maxLength={80} placeholder="e.g. R1,500 or flexible" value={data.budget} onChange={e=>update('budget',e.target.value)}/></label>
      <label>Desired deadline<input name="deadline" maxLength={120} placeholder="e.g. next Friday" value={data.deadline} onChange={e=>update('deadline',e.target.value)}/></label>
     </div>

     <label>Project description *<textarea className="enquiry-textarea-lg" name="description" required maxLength={4000} value={data.description} onChange={e=>update('description',e.target.value)} placeholder="What are you creating, and what should it achieve?"/></label>
     <label>Reference links / inspiration<textarea className="enquiry-textarea-sm" name="links" maxLength={1000} value={data.links} onChange={e=>update('links',e.target.value)} placeholder="Links to brand assets or inspiration (optional)"/></label>
     <label>Preferred reply method<select name="contact" value={data.contact} onChange={e=>update('contact',e.target.value)}><option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="phone">Phone</option></select></label>
     <label className="enquiry-consent"><input name="consent" value="yes" type="checkbox" checked={data.consent} required onChange={e=>update('consent',e.target.checked)}/> I agree to Lemma using these details to respond to my enquiry.</label>

     <TurnstileWidget resetNonce={turnstileReset} onTokenChange={setTurnstileToken}/>

     <p className="enquiry-send-label">Choose how to send your enquiry:</p>
     <div className="enquiry-actions">
      <a className={'btn btn-primary'+(!whatsappHref?' is-disabled':'')} href={whatsappHref||undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!whatsappHref} tabIndex={whatsappHref?0:-1} onClick={e=>{if(!whatsappHref){e.preventDefault();return}trackEvent('enquiry_whatsapp_click',{kind:'general'})}}>Open WhatsApp with enquiry</a>
      <button className="btn enquiry-btn-secondary" type="submit" disabled={!valid||submitting}>{submitting?'Sending…':'Send via email'}</button>
      <button className="btn enquiry-btn-secondary" type="button" disabled={!valid} onClick={()=>void copy()}>{copied?'Copied ✓':'Copy details'}</button>
     </div>

     {errorMsg&&<div className="enquiry-feedback enquiry-feedback-error" role="alert">
      <p>{errorMsg}</p>
      {fallbackMailto&&<a className="btn enquiry-btn-secondary enquiry-fallback-link" href={fallbackMailto}>Open in your email app ↗</a>}
     </div>}

     <p><small>WhatsApp opens a prepared message to Lemma Studio. Press Send in WhatsApp to deliver it. Your preferred reply method tells us how you want us to respond.</small></p>
     {status&&<p className="enquiry-feedback" role="status" aria-live="polite"><small>{status}</small></p>}
    </form>
   </div>
  </section>
 </>;
}
