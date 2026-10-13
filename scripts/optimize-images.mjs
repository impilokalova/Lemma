import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'src/pages/packages');
const output=path.join(root,'public/landing-pages/shared/assets');
const names=new Map([
 ['09-bf-sneaker.png','sneaker-drop.webp'],
 ['10-bf-audio.png','soundwave.webp'],
 ['12-bf-home.png','home-edit.webp'],
 ['01-halloween-after-dark.png','after-dark.webp'],
 ['02-halloween-moth.png','midnight-moth.webp'],
 ['04-halloween-spectral.png','spectral-sweets.webp']
]);
await mkdir(output,{recursive:true});
for(const [original,optimized] of names){
 const input=path.join(source,original),dest=path.join(output,optimized);
 const info=await sharp(input).resize({width:840,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(dest);
 console.log('Optimized '+original+' -> '+optimized+' ('+Math.round(info.size/1024)+' KB)');
}
