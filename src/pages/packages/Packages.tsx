import {Link} from 'react-router-dom';
import {Card} from '../../shared/components/Card';
import {Intro} from '../../shared/components/Intro';
export function Packages(){return <><Intro eyebrow="PACKAGES" title="A clear starting point." description="Choose a direction and we'll discuss the scope, deliverables and a tailored quote before any work begins."/><div className="section container card-grid">{['Creative Starter','Business Presence','Monthly Creative'].map((name,i)=><Card key={name} title={name} description={['A focused design project for an immediate business need.','A professional online presence for a growing business.','Ongoing creative support and consistent visual content.'][i]} href="/contact" tag="Request a quote"/>)}</div></>}
