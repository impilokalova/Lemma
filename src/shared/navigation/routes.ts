export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export const nav: NavItem[] = [
  {label:'Home',href:'/'},
  {label:'Services',href:'/services',children:[
    {label:'Web design',href:'/services/web'},
    {label:'Graphic design',href:'/services/creative'},
    {label:'Social media design',href:'/services/social'}
  ]},
  {label:'Work',href:'/work',children:[
    {label:'Website demos',href:'/work/demos'},
    {label:'Landing page templates',href:'/work/templates'},
    {label:'Samples',href:'/work/samples'}
  ]},
  {label:'Packages',href:'/packages',children:[
    {label:'Starter packages',href:'/packages'},
    {label:'Service price list',href:'/shop'},
    {label:'Quote builder',href:'/quote'}
  ]},
  {label:'About',href:'/about'},
  {label:'Contact',href:'/contact'}
];
export const serviceDetails: Record<string,{title:string;description:string}> = {
 creative:{title:'Graphic design',description:'Poster design, promotional flyers, restaurant menus and brand visuals created for businesses.'},
 web:{title:'Small business web design',description:'Responsive business websites and landing page design with clear navigation and paths to enquiry.'},
 social:{title:'Social media design',description:'Branded social media graphics, content design and campaign visuals for growing businesses.'}
};
