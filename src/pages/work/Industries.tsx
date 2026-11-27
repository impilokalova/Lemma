import {Intro} from '../../shared/components/Intro';
export const industries=['Healthcare','Insurance','Hospitality','Finance','Education','Sport'] as const;
export function IndustryGrid(){return <div className="card-grid">{industries.map(name=><article className="feature-card" key={name}><p className="eyebrow">INDUSTRY CONCEPT</p><h2>{name}</h2><p>Sample landing page in development.</p><span>Coming soon</span></article>)}</div>}
export function Industries(){return <><Intro eyebrow="WORK / INDUSTRIES" title="Industry-specific creative." description="We are preparing original landing page concepts for these industries. No samples are available yet."/><section className="section container"><IndustryGrid/></section></>}
