import {existsSync,readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(root,'public');
const errors=[];

function validateHtml(p){
 const html=readFileSync(p,'utf8');
 if(!html.includes('name="viewport"'))errors.push(p+': missing viewport');
 const re=/\b(?:src|href)=["']([^"']+)["']/g;
 for(const m of html.matchAll(re)){
  const target=m[1];
  if(/^(?:https?:|mailto:|tel:|#|data:)/.test(target))continue;
  if(target.startsWith('/')){
   if(target.includes('#'))continue;
   const q=path.join(publicRoot,target.slice(1));
   if(!existsSync(q)&&!['/','/work','/work/samples','/work/templates','/work/demos','/contact'].includes(target)){
    errors.push(p+': missing absolute '+target);
   }
  }else{
   const pathname=target.split('#')[0].split('?')[0];
   if(!pathname)continue;
   const resolved=path.resolve(path.dirname(p),decodeURIComponent(pathname));
   if(!existsSync(resolved))errors.push(p+': missing '+target);
  }
 }
}

for(const archive of ['mtn8-2008','mtn8-2014']){
 const p=path.join(publicRoot,'sports-archive',archive,'index.html');
 if(!existsSync(p))errors.push(archive+': missing index.html');
 else validateHtml(p);
}

const app=readFileSync(path.join(root,'src','site.tsx'),'utf8');
for(const route of ['/work/samples','/work/demos','/work/templates','/contact']){
 if(!app.includes('path="'+route+'"'))errors.push('Main SPA route missing '+route);
}

const navigation=readFileSync(path.join(root,'src','shared','navigation','routes.ts'),'utf8');
for(const route of ['/work/samples','/work/templates','/work/demos']){
 if(!navigation.includes("href:'"+route+"'"))errors.push('Work submenu missing '+route);
}

const templatePage=readFileSync(path.join(root,'src','pages','work','templates','Templates.tsx'),'utf8');
if(templatePage.includes('SignatureGallery'))errors.push('Templates must not render graphic design gallery');

const graphicSamples=readFileSync(path.join(root,'src','pages','work','gallery','SignatureGallery.tsx'),'utf8');
if(graphicSamples.includes("to={'/work/templates/'"))errors.push('Graphic artwork still links to old templates route');

if(existsSync(path.join(publicRoot,'landing-pages'))){
 errors.push('Stale seasonal public/landing-pages directory still exists');
}

if(errors.length){
 for(const e of errors)console.error('ERROR: '+e);
 process.exit(1);
}

console.log('PASS: lightweight site audit verified routes, hospitality samples, and sports archives');
