import {Link,useParams} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';
import {samples} from '../../../shared/navigation/routes';
import {NotFound} from '../../not-found/NotFound';
export function TemplateDetail(){const {slug}=useParams();const sample=samples.find(s=>s.slug===slug);return sample?<><Intro eyebrow={sample.status} title={sample.title} description={sample.category}/><section className="section container"><p>Request an adapted version of this design for your business.</p>{sample.previewUrl&&<a href={sample.previewUrl} target="_blank" rel="noopener noreferrer">View sample ↗</a>}<p><Link className="btn btn-primary" to="/contact">Request this design ↗</Link></p></section></>:<NotFound/>}
