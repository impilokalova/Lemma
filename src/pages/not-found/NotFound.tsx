import {Link} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
export function NotFound(){return <><Intro eyebrow="404" title="That page isn't here." description="The link may be outdated or the sample isn't published yet."/><section className="section container"><Link className="btn btn-primary" to="/">Return home ↗</Link></section></>}
