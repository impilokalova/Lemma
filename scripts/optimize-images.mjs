import sharp from 'sharp';
import {existsSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const rawSource=path.join(root,'src/pages/packages');
const galleryAssets=path.join(root,'src/pages/work/gallery/assets');

const galleryMap=new Map([
 ['05-menu-fire.png','05-menu-fire.webp'],
 ['06-menu-coffee.png','06-menu-coffee.webp'],
 ['07-menu-garden.png','07-menu-garden.webp'],
 ['08-menu-ocean.png','08-menu-ocean.webp']
]);

await mkdir(galleryAssets,{recursive:true});

for(const [pngName,webpName] of galleryMap){
 const input=path.join(rawSource,pngName);
 const dest=path.join(galleryAssets,webpName);
 if(existsSync(input)){
  const info=await sharp(input).resize({width:1080,withoutEnlargement:true}).webp({quality:84,effort:5}).toFile(dest);
  console.log('Optimized '+pngName+' -> '+webpName+' ('+Math.round(info.size/1024)+' KB)');
 }
}
