import {useMemo,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {CATEGORIES,SERVICES,priceLabel} from '../../lemma-quote/catalog';
import {addToDraft} from '../../lemma-quote/quote';

export function Shop(){
 const [category,setCategory]=useState('all'),[query,setQuery]=useState('');
 const navigate=useNavigate();
 const products=useMemo(()=>SERVICES.filter(s=>(category==='all'||s.category===category)&&s.name.toLowerCase().includes(query.trim().toLowerCase())),[category,query]);
 const add=(id:string)=>{addToDraft(id);navigate('/bag')};
 return <div className="section container" style={{maxWidth:1180}}>
 <p className="eyebrow">LEMMA STUDIO · CREATIVE SHOP</p><h1>Find your design. Add it to your bag.</h1><p>Browse our priced creative services and packages. No online payment: send your bag as a project enquiry and we'll confirm your brief, timing and final price.</p>
 <div style={{display:'flex',gap:12,flexWrap:'wrap',margin:'28px 0'}}>
 <label style={{flex:'1 1 230px'}}>Search services<input aria-label="Search services" type="search" placeholder="Poster, menu, logo, website…" value={query} onChange={e=>setQuery(e.target.value)} style={{display:'block',width:'100%',padding:12,borderRadius:9,marginTop:8}}/></label>
 <label style={{flex:'1 1 190px'}}>Category<select aria-label="Filter by category" value={category} onChange={e=>setCategory(e.target.value)} style={{display:'block',width:'100%',padding:12,borderRadius:9,marginTop:8}}><option value="all">All services</option>{Object.entries(CATEGORIES).map(([id,c])=><option key={id} value={id}>{c.label}</option>)}</select></label>
 </div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,245px),1fr))',gap:18}}>
 {products.map(s=><article key={s.id} style={{background:'#fff9ff',color:'#21142b',border:'1px solid #dacbe1',borderRadius:18,padding:22,display:'flex',flexDirection:'column',gap:12,minWidth:0}}>
 <span style={{fontSize:12,color:'#7541a0',fontWeight:700}}>{CATEGORIES[s.category].label}</span><h2 style={{fontSize:23,lineHeight:1.2,margin:0}}>{s.name}</h2><strong style={{fontSize:28,color:'#63219b'}}>{priceLabel(s)}</strong>
 <p style={{margin:0,fontSize:14}}>Typical delivery: {s.delivery}</p>{s.note&&<p style={{fontSize:13,margin:0}}>{s.note}</p>}
 <button className="btn btn-primary" type="button" style={{marginTop:'auto',width:'100%'}} onClick={()=>add(s.id)}>Add to bag +</button></article>)}
 </div>
 {products.length===0&&<p>No matching services. Try another search or category.</p>}
 <p style={{marginTop:30}}><Link className="btn btn-primary" to="/bag">View bag &amp; send enquiry ↗</Link></p>
 </div>;
}
