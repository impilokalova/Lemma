import {Link} from 'react-router-dom';
import {Card} from '../../shared/components/Card';
import {Intro} from '../../shared/components/Intro';
import {serviceDetails} from '../../shared/navigation/routes';
export function Services(){return <><Intro eyebrow="OUR SERVICES" title="Creative, web and social." description="Explore the three core services we build around your business goals."/><div className="section container card-grid">{Object.entries(serviceDetails).map(([slug,v])=><Card key={slug} title={v.title} description={v.description} href={'/services/'+slug}/>)}</div></>}
