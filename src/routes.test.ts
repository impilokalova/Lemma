import { describe,expect,it } from 'vitest';
import {nav,samples} from './routes';
describe('navigation registry',()=>{it('has exactly six primary destinations',()=>expect(nav.map(x=>x.href)).toEqual(['/','/services','/work','/packages','/about','/contact']));it('nests templates under work',()=>expect(nav.find(x=>x.href==='/work')?.children?.some(x=>x.href==='/work/templates')).toBe(true));it('does not present unapproved Canva samples as client work',()=>expect(samples).toEqual([]));});
