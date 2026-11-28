import menuFire from './assets/05-menu-fire.webp';
import menuCoffee from './assets/06-menu-coffee.webp';
import menuGarden from './assets/07-menu-garden.webp';
import menuOcean from './assets/08-menu-ocean.webp';

/** Original fictional concept artwork, not commissioned client projects. */
export const signatureArtworks=[
 {slug:'menu-fire',title:'Fire & Form',category:'Hospitality menu concept',type:'Menu',image:menuFire},
 {slug:'menu-coffee',title:'Coffee Ritual',category:'Hospitality menu concept',type:'Menu',image:menuCoffee},
 {slug:'menu-garden',title:'The Garden Table',category:'Hospitality menu concept',type:'Menu',image:menuGarden},
 {slug:'menu-ocean',title:'Ocean Table',category:'Hospitality menu concept',type:'Menu',image:menuOcean}
] as const;
export type SignatureArtwork=(typeof signatureArtworks)[number];
