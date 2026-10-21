import {Link} from 'react-router-dom';
import type {ReactNode} from 'react';

/** Glass Lens and Luminous Glow adaptations from Lemma-Template-Library. */
export function StudioLink({to,children,quiet=false}:{to:string;children:ReactNode;quiet?:boolean}){
 return <Link className={'studio-link'+(quiet?' studio-link-quiet':'')} to={to}>
  <span>{children}</span><span className="studio-link-orb" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
 </Link>;
}
