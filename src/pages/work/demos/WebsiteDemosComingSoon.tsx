import {Link} from 'react-router-dom';
import {Intro} from '../../../shared/components/Intro';

export function WebsiteDemosComingSoon(){
 return <>
  <Intro eyebrow="WORK / WEBSITE DEMOS" title="Coming soon." description="We are preparing industry-specific website demonstrations for Healthcare, Insurance, Hospitality and Finance."/>
  <section className="section container">
   <Link className="btn btn-primary" to="/work/templates">View industry web concepts ↗</Link>
  </section>
 </>;
}
