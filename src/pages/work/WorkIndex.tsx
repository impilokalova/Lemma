import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
export function WorkIndex({kind}:{kind:'projects'|'demos'}){return <><Intro eyebrow="WORK" title={kind==='projects'?'Case studies':'Interactive website demos'} description="Our curated concept collection is being prepared. Every future sample will be labelled accurately."/><section className="section container"><Link className="btn btn-primary" to="/contact">Discuss a project ↗</Link></section></>}
