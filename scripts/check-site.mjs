import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(root,'public');
const distRoot=path.join(root,'dist');
const slugs=['sneaker-drop','soundwave','home-edit','after-dark','midnight-moth','spectral-sweets'];
const pages=['/','/services','/work','/work/samples','/work/templates','/work/projects','/work/demos','/packages','/about','/contact','/services/creative','/services/web','/services/social'];
const errors=[];
const warnings=[];
function validateHtml(p){
 const html=readFileSync(p,'utf8');
 const re=/\b(?:src|href)=["']([^"']+)["']/g;
 for(const m of html.matchAll(re)){
   const target=m[1];
   if(/^(?:https?:|mailto:|tel:|#|data:)/.test(target))continue;
   if(target.startsWith('/')){
     if(pages.includes(target)||target==='/landing-pages/')continue;
     if(target.startsWith('/landing-pages/')&&slugs.some(s=>target==='/landing-pages/'+s+'/'))continue;
     if(target.includes('#'))continue;
     const q=path.join(publicRoot,target.slice(1));
     if(!existsSync(q))errors.push(p+': missing absolute '+target);
   } else {
     const pathname=target.split('#')[0].split('?')[0];
     if(!pathname)continue;
     const resolved=path.resolve(path.dirname(p),decodeURIComponent(pathname));
     if(!existsSync(resolved))errors.push(p+': missing '+target);
   }
 }
 if(!html.includes('name="viewport"'))errors.push(p+': missing viewport');
}
const index=path.join(publicRoot,'landing-pages','index.html');
if(!existsSync(index))errors.push('Landing-page catalogue missing');
else validateHtml(index);
for(const slug of slugs){
 const p=path.join(publicRoot,'landing-pages',slug,'index.html');
 if(!existsSync(p)){errors.push(slug+': missing index.html');continue;}
 validateHtml(p);
}
for(const p of [path.join(publicRoot,'landing-pages','shared','style.css'),path.join(publicRoot,'landing-pages','shared','script.js')])if(!existsSync(p))errors.push('Missing shared asset '+p);
const registry=readFileSync(path.join(root,'src','pages','work','demos','SeasonalDemos.tsx'),'utf8');
for(const slug of slugs)if(!registry.includes("slug:'"+slug+"'"))errors.push('Demo registry missing '+slug);
const app=readFileSync(path.join(root,'src','site.tsx'),'utf8');
for(const route of ['/work/samples','/work/demos','/work/templates','/contact'])if(!app.includes('path="'+route+'"'))errors.push('Main SPA route missing '+route);
const navigation=readFileSync(path.join(root,'src','shared','navigation','routes.ts'),'utf8');
for(const route of ['/work/samples','/work/templates','/work/demos'])if(!navigation.includes("href:'"+route+"'"))errors.push('Work submenu missing '+route);
const templatePage=readFileSync(path.join(root,'src','pages','work','templates','Templates.tsx'),'utf8');
if(templatePage.includes('SignatureGallery'))errors.push('Templates must not render graphic design gallery');
const graphicSamples=readFileSync(path.join(root,'src','pages','work','gallery','SignatureGallery.tsx'),'utf8');
if(graphicSamples.includes("to={'/work/templates/'"))errors.push('Graphic artwork still links to old templates route');
const contact=readFileSync(path.join(root,'src','pages','contact','Contact.tsx'),'utf8');
if(contact.includes('No messages are collected'))warnings.push('Contact page exists, but no verified enquiry destination/form handler is configured.');
if(readdirSync(path.join(root,'src','pages','work','demos')).some(n=>n.endsWith('.html')))errors.push('Stale standalone HTML remains in src/pages/work/demos; publish static files under public/');
console.log('Site audit: '+slugs.length+' seasonal pages, '+pages.length+' known SPA destinations');
for(const w of warnings)console.warn('WARNING: '+w);
for(const e of errors)console.error('ERROR: '+e);
if(errors.length)process.exit(1);
console.log('PASS: all required local artwork/CSS/JS links resolve and all six concept routes exist');
