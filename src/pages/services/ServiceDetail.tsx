import {Link,useParams} from 'react-router-dom';
import {Intro} from '../../shared/components/Intro';
import {serviceDetails} from '../../shared/navigation/routes';
import {NotFound} from '../not-found/NotFound';
export function ServiceDetail(){const {slug}=useParams();const item=slug&&serviceDetails[slug];return item?<><Intro eyebrow="SERVICES" title={item.title} description={item.description}/><section className="section container"><Link className="btn btn-primary" to="/contact">Discuss your project ↗</Link></section></>:<NotFound/>}
