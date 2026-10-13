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
 creative:{title:'Graphic design',description:'Poster design, promotional flyers, restaurant menus and brand visuals created for businesses.'},
 web:{title:'Small business web design',description:'Responsive business websites and landing page design with clear navigation and paths to enquiry.'},
 social:{title:'Social media design',description:'Branded social media graphics, content design and campaign visuals for growing businesses.'}
};
