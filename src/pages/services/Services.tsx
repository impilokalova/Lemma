import {Link} from 'react-router-dom';
import {Card} from '../../shared/components/Card';
import {Intro} from '../../shared/components/Intro';
import {serviceDetails} from '../../shared/navigation/routes';
export function Services(){return <><Intro eyebrow="OUR SERVICES" title="Creative, web and social." description="Explore the three core services we build around your business goals."/><div className="section container card-grid">{Object.entries(serviceDetails).map(([slug,v])=><Card key={slug} title={v.title} description={v.description} href={'/services/'+slug}/>)}</div><div className="section container"><h2>Transparent starter pricing</h2><p>Single posters from R150, one-page websites from R1,200, and custom multi-service estimates for clients worldwide.</p><Link className="btn btn-primary" to="/shop">Shop services &amp; add to bag ↗</Link></div></>}
