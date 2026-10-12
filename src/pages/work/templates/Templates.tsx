import {Link} from 'react-router-dom';
import {SignatureGallery} from '../gallery/SignatureGallery';
export function Templates(){return <><SignatureGallery/><section className="section container signature-website-note"><h2>Website concepts & interactive demos</h2><p>Exploring a website rather than campaign artwork? Browse the web design demonstrations or request a tailored concept.</p><Link className="btn btn-primary" to="/work/demos">Explore website demos ↗</Link></section></>}
