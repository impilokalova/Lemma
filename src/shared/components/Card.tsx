import {Link} from 'react-router-dom';
export function Card({title,description,href,tag}:{title:string;description:string;href:string;tag?:string}){return <Link className="feature-card" to={href}>{tag&&<span className="card-tag">{tag}</span>}<h2>{title}</h2><p>{description}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>}
