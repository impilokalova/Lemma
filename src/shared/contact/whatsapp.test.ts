import {describe,expect,it} from 'vitest';
import {buildWhatsAppUrl} from './whatsapp';

describe('WhatsApp enquiry handoff',()=>{
 it('addresses Lemma and preserves the full multiline enquiry',()=>{
  const message='LEMMA STUDIO — GENERAL ENQUIRY\nName: Test Customer\nProject: Café & design #1?\nReference: https://example.com/?a=1&b=2';
  const url=new URL(buildWhatsAppUrl('+27 79 475 0556',message)!);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/27794750556');
  expect(url.searchParams.get('text')).toBe(message);
  expect([...url.searchParams.keys()]).toEqual(['text']);
  expect(url.hash).toBe('');
 });
 it('does not create a destination without a valid number or message',()=>{
  for(const number of [null,'','123','0000000000'])expect(buildWhatsAppUrl(number,'Enquiry')).toBeNull();
  expect(buildWhatsAppUrl('27794750556','  ')).toBeNull();
 });
});
