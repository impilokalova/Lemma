import halloweenAfterDark from '../../packages/01-halloween-after-dark.png';
import halloweenMoth from '../../packages/02-halloween-moth.png';
import halloweenMask from '../../packages/03-halloween-mask.png';
import halloweenSpectral from '../../packages/04-halloween-spectral.png';
import menuFire from '../../packages/05-menu-fire.png';
import menuCoffee from '../../packages/06-menu-coffee.png';
import menuGarden from '../../packages/07-menu-garden.png';
import menuOcean from '../../packages/08-menu-ocean.png';
import sneaker from '../../packages/09-bf-sneaker.png';
import audio from '../../packages/10-bf-audio.png';
import fashion from '../../packages/11-bf-fashion.png';
import home from '../../packages/12-bf-home.png';

/** Original fictional concept artwork, not commissioned client projects. */
export const signatureArtworks=[
 {slug:'halloween-after-dark',title:'After Dark',category:'Halloween campaign',type:'Poster',image:halloweenAfterDark},
 {slug:'halloween-moth',title:'Midnight Moth',category:'Halloween campaign',type:'Poster',image:halloweenMoth},
 {slug:'halloween-mask',title:'The Mask',category:'Halloween campaign',type:'Poster',image:halloweenMask},
 {slug:'halloween-spectral',title:'Spectral',category:'Halloween campaign',type:'Poster',image:halloweenSpectral},
 {slug:'menu-fire',title:'Fire & Form',category:'Restaurant menu concept',type:'Menu',image:menuFire},
 {slug:'menu-coffee',title:'Coffee Ritual',category:'Restaurant menu concept',type:'Menu',image:menuCoffee},
 {slug:'menu-garden',title:'The Garden Table',category:'Restaurant menu concept',type:'Menu',image:menuGarden},
 {slug:'menu-ocean',title:'Ocean Table',category:'Restaurant menu concept',type:'Menu',image:menuOcean},
 {slug:'black-friday-sneaker',title:'Sneaker Drop',category:'Black Friday campaign',type:'Flyer',image:sneaker},
 {slug:'black-friday-audio',title:'Sound Sale',category:'Black Friday campaign',type:'Flyer',image:audio},
 {slug:'black-friday-fashion',title:'Fashion Edit',category:'Black Friday campaign',type:'Flyer',image:fashion},
 {slug:'black-friday-home',title:'Home Objects',category:'Black Friday campaign',type:'Flyer',image:home}
] as const;
export type SignatureArtwork=(typeof signatureArtworks)[number];
