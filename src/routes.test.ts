import {describe,expect,it} from 'vitest';
import {nav} from './shared/navigation/routes';
describe('navigation registry',()=>{
 it('has exactly six primary destinations',()=>expect(nav.map(x=>x.href)).toEqual(['/','/services','/work','/packages','/about','/contact']));
 it('has separate samples, templates and demo destinations',()=>{
  const children=nav.find(x=>x.href==='/work')?.children?.map(x=>x.href)||[];
  expect(children).toContain('/work/samples');
  expect(children).toContain('/work/templates');
  expect(children).toContain('/work/demos');
  expect(nav.find(x=>x.href==='/work')?.children?.find(x=>x.href==='/work/templates')?.label).toBe('Landing page templates');
  expect(new Set(children).size).toBe(children.length);
 });
 it('does not invent published client samples',()=>{
  expect(nav.find(x=>x.href==='/work')?.children?.find(x=>x.href==='/work/samples')?.label).toBe('Samples');
 });
});
