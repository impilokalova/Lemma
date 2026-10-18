import {useState,type CSSProperties,type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';

const field:CSSProperties={display:'block',width:'100%',padding:'12px 14px',marginTop:6,marginBottom:16,border:'1px solid #858585',borderRadius:8,background:'transparent',color:'inherit',font:'inherit'};
const group:CSSProperties={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:'0 20px'};
type Enquiry={name:string,email:string,business:string,country:string,phone:string,service:string,budget:string,deadline:string,description:string,links:string,contact:string,consent:boolean};
const initial:Enquiry={name:'',email:'',business:'',country:'',phone:'',service:'',budget:'',deadline:'',description:'',links:'',contact:'email',consent:false};
const categories=['Graphic design','Sports graphics','Website / landing page','Presentation / documents','Branding / logo','Social media design','Multiple services','Something else'];
export function Contact(){
 const [data,setData]=useState<Enquiry>(initial);
 const [copied,setCopied]=useState(false);
 const [sending,setSending]=useState(false);
 const [status,setStatus]=useState('');
 const [website,setWebsite]=useState('');
 const update=(key:keyof Enquiry,value:string|boolean)=>{setData(d=>({...d,[key]:value}));setCopied(false);setStatus('')};
 const summary=()=>['LEMMA STUDIO — GENERAL ENQUIRY','Name: '+data.name,'Email: '+data.email,'Business: '+(data.business||'—'),'Country: '+data.country,'Phone: '+(data.phone||'—'),'Service: '+data.service,'Budget: '+(data.budget||'Not specified'),'Deadline: '+(data.deadline||'Flexible'),'Preferred reply: '+data.contact,'Project: '+data.description,'Reference links: '+(data.links||'—')].join('\n');
 const valid=data.name.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)&&data.country.trim()&&data.service&&data.description.trim()&&data.consent;
 const copy=async()=>{try{await navigator.clipboard.writeText(summary());setCopied(true);setStatus('Enquiry copied. You can email it to us directly.')}catch{setStatus('Copy failed. Please select and copy your details manually.')}};\n const send=async(e:FormEvent)=>{e.preventDefault();if(!valid||sending)return;setSending(true);setStatus('Sending…');try{const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,website})});const result=await response.json() as {ok?:boolean;error?:string};if(!response.ok||!result.ok)throw new Error(result.error||'Delivery failed.');setStatus('Your enquiry was sent successfully. We will reply by email.');setData(initial)}catch(error){setStatus((error instanceof Error?error.message:'Delivery failed.')+' You can also email contact.lemmastudio@gmail.com directly.')}finally{setSending(false)}};
 return <><Intro eyebrow="START A PROJECT" title="Let's create something useful." description="Ask a question, describe a project, or prepare a detailed quotation — wherever you're based."/>
 <section className="section container" style={{maxWidth:1050}}>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:32}}>
 <div><h2>General enquiry</h2><p>Not ready to choose a package? Tell us about your idea using this form. Submit your enquiry directly to Lemma Studio, or email us if you prefer.</p>
 <p><strong>Want an estimated price now?</strong></p><Link className="btn btn-primary" to="/quote">Build a detailed quotation ↗</Link>
 <p style={{marginTop:20}}>We welcome clients worldwide. Quotation estimates are shown in ZAR; payment arrangements are agreed individually.</p>
 <p><a href="mailto:contact.lemmastudio@gmail.com">contact.lemmastudio@gmail.com</a></p><p><small>Submitting sends your details securely to our email delivery service. Please don't include confidential or sensitive information.</small></p></div>
 <form onSubmit={send} aria-label="General project enquiry form" style={{padding:24,border:'1px solid #8886',borderRadius:16}}>
 <h2>Tell us what you need</h2>
 <div style={group}><label>Full name *<input style={field} required autoComplete="name" value={data.name} onChange={e=>update('name',e.target.value)}/></label>
 <label>Email address *<input style={field} type="email" required autoComplete="email" value={data.email} onChange={e=>update('email',e.target.value)}/></label>
 <label>Business / organisation<input style={field} value={data.business} onChange={e=>update('business',e.target.value)}/></label>
 <label>Country *<input style={field} required autoComplete="country-name" placeholder="e.g. South Africa" value={data.country} onChange={e=>update('country',e.target.value)}/></label>
 <label>Phone / WhatsApp (with country code)<input style={field} type="tel" autoComplete="tel" placeholder="+27…" value={data.phone} onChange={e=>update('phone',e.target.value)}/></label>
 <label>Service category *<select style={field} required value={data.service} onChange={e=>update('service',e.target.value)}><option value="">Select a service</option>{categories.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
 <label>Estimated budget (optional)<input style={field} placeholder="e.g. R1,500 or flexible" value={data.budget} onChange={e=>update('budget',e.target.value)}/></label>
 <label>Desired deadline<input style={field} placeholder="e.g. next Friday" value={data.deadline} onChange={e=>update('deadline',e.target.value)}/></label></div>
 <label>Project description *<textarea style={{...field,minHeight:125}} required value={data.description} onChange={e=>update('description',e.target.value)} placeholder="What are you creating, and what should it achieve?"/></label>
 <label>Reference links / inspiration<textarea style={{...field,minHeight:75}} value={data.links} onChange={e=>update('links',e.target.value)} placeholder="Links to brand assets or inspiration (optional)"/></label>
 <label>Preferred reply method<select style={field} value={data.contact} onChange={e=>update('contact',e.target.value)}><option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="telegram">Telegram</option><option value="phone">Phone</option></select></label>
 <div aria-hidden="true" style={{position:"absolute",left:"-9999px"}}><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label></div>\n <label style={{display:'flex',gap:10,alignItems:'start',marginBottom:20}}><input type="checkbox" checked={data.consent} required onChange={e=>update('consent',e.target.checked)}/> I agree to Lemma using these details to respond to my enquiry.</label>
 <button className="btn btn-primary" type="submit" disabled={!valid||sending}>{sending?'Sending…':'Send enquiry'}</button>{' '}<button className="btn" type="button" disabled={!valid} onClick={()=>void copy()}>{copied?'Copied ✓':'Copy details'}</button>
 <p role="status" aria-live="polite"><small>{status}</small></p>
 </form></div></section></>;
}
