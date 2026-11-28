import {useMemo,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {CATEGORIES,SERVICES,priceLabel} from '../../lemma-quote/catalog';
import {addToDraft} from '../../lemma-quote/quote';

export function Shop(){
 const [category,setCategory]=useState('all'),[query,setQuery]=useState('');
 const navigate=useNavigate();
 const products=useMemo(()=>SERVICES.filter(s=>(category==='all'||s.category===category)&&s.name.toLowerCase().includes(query.trim().toLowerCase())),[category,query]);
 const add=(id:string)=>{addToDraft(id);navigate('/bag')};

 return <div className="section container shop-page">
  <p className="eyebrow">LEMMA STUDIO · CREATIVE SHOP</p>
  <h1 className="section-title">Find your design. <em>Add it to your bag.</em></h1>
  <p className="shop-intro">Browse our priced creative services and packages. No online payment: send your bag as a project enquiry and we'll confirm your brief, timing and final price.</p>

  <div className="shop-filters studio-form">
   <label>Search services<input aria-label="Search services" type="search" placeholder="Poster, menu, logo, website…" value={query} onChange={e=>setQuery(e.target.value)}/></label>
   <label>Category<select aria-label="Filter by category" value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All services</option>{Object.entries(CATEGORIES).map(([id,c])=><option key={id} value={id}>{c.label}</option>)}</select></label>
  </div>

  <div className="shop-grid">
   {products.map(s=><article className="shop-card" key={s.id}>
    <span className="shop-card-cat">{CATEGORIES[s.category].label}</span>
    <h2>{s.name}</h2>
    <strong className="shop-card-price">{priceLabel(s)}</strong>
    <p className="shop-card-meta">Typical delivery: {s.delivery}</p>
    {s.note&&<p className="shop-card-note">{s.note}</p>}
    <button className="btn btn-primary shop-card-btn" type="button" onClick={()=>add(s.id)}>Add to bag +</button>
   </article>)}
  </div>

  {products.length===0&&<p className="empty-state">No matching services. Try another search or category.</p>}
  <p className="shop-footer-cta"><Link className="btn btn-primary" to="/bag">View bag &amp; send enquiry ↗</Link></p>
 </div>;
}
