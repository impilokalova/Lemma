import {Intro} from '../../shared/components/Intro';
import './industries.css';

export const industries = [
  {name:'Healthcare', description:'Clear, welcoming digital experiences for clinics and care providers.'},
  {name:'Insurance', description:'Straightforward journeys that help people understand cover and enquire.'},
  {name:'Hospitality', description:'Inviting experiences for hotels, restaurants and guest destinations.'},
  {name:'Finance', description:'Considered layouts that make complex services easier to navigate.'},
  {name:'Education', description:'Accessible information for prospective learners and their families.'},
  {name:'Sport', description:'Energetic digital experiences for clubs, events and communities.'},
] as const;

export function IndustryGrid(){
  return <div className="industry-grid">{industries.map(({name,description},index)=>
    <article className="industry-card" key={name}>
      <div className="industry-card-top"><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span>Coming soon</span></div>
      <h3>{name}</h3><p>{description}</p>
    </article>
  )}</div>;
}
export function Industries(){
  return <><Intro eyebrow="WORK / INDUSTRIES" title="Creative, with context." description="Explore the industries we are designing for. Original landing page samples are planned and will appear here when ready."/><section className="section container" aria-label="Planned industry samples"><IndustryGrid/></section></>;
}
