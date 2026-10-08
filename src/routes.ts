export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export const nav: NavItem[] = [
  {label:'Home',href:'/'},
  {label:'Services',href:'/services',children:[{label:'Creative',href:'/services/creative'},{label:'Web',href:'/services/web'},{label:'Social',href:'/services/social'}]},
  {label:'Work',href:'/work',children:[{label:'Portfolio',href:'/work'},{label:'Templates',href:'/work/templates'},{label:'Website demos',href:'/work/demos'}]},
  {label:'Packages',href:'/packages'},
  {label:'About',href:'/about'},
  {label:'Contact',href:'/contact'}
];
export type Sample = {slug:string;title:string;type:'Poster'|'Flyer'|'Website'|'Landing Page';category:string;status:'Concept sample';canvaUrl?:string;previewUrl?:string};
// Only publish samples once rights, artwork and share URLs have been confirmed.
export const samples: Sample[] = [];
export const serviceDetails: Record<string,{title:string;description:string}> = {
 creative:{title:'Creative design',description:'Identity, posters, flyers and promotional visuals built to make a business memorable.'},
 web:{title:'Web design',description:'Mobile-first landing pages and business websites with clear paths to enquiry.'},
 social:{title:'Social creative',description:'Consistent social content and campaign visuals for growing brands.'}
};
