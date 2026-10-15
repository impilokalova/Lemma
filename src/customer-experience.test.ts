import {describe,expect,it} from 'vitest';
import {SERVICES,getService} from './lemma-quote/catalog';
import {buildBrief,emptyDraft,lineTotal,totals} from './lemma-quote/quote';
import {legalLinks,legalPages} from './pages/legal/LegalPages';
describe('customer quotation integration',()=>{
 it('provides unique services with valid prices and delivery options',()=>{
  expect(SERVICES.length).toBeGreaterThan(40);
  expect(new Set(SERVICES.map(s=>s.id)).size).toBe(SERVICES.length);
  for(const s of SERVICES){expect(s.price).toBeGreaterThan(0);expect(s.delivery.length).toBeGreaterThan(0);expect(s.speeds).toContain('standard')}
 });
 it('calculates mixed-service totals and surcharges',()=>{
  const items=[{id:'poster',qty:2,speed:'priority' as const},{id:'web-starter',qty:1,speed:'standard' as const}];
  expect(lineTotal(items[0])).toEqual({base:300,fee:75,total:375});
  expect(totals(items)).toEqual({base:1500,fee:75,total:1575});
  const draft=emptyDraft();draft.items=items;draft.details.fullName='Sample Customer';draft.details.email='sample@example.com';
  expect(buildBrief(draft).replace(/\u00a0/g,' ')).toContain('R1 575');
  expect(buildBrief(draft)).toContain('Sample Customer');
 });
 it('makes all three package offers quotable at published prices',()=>{expect(getService('pkg-creative-starter')?.price).toBe(650);expect(getService('pkg-business-presence')?.price).toBe(1890);expect(getService('pkg-monthly-creative')?.price).toBe(1100);expect(getService('pkg-monthly-creative')?.unit).toBe('/month');});
 it('offers separate accessible policy URLs',()=>{
  expect(legalPages.length).toBeGreaterThanOrEqual(7);
  expect(new Set(legalPages.map(p=>p.slug)).size).toBe(legalPages.length);
  expect(legalLinks.every(l=>l.href.startsWith('/legal/'))).toBe(true);
 });
});
