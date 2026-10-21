import {cleanDigits,validWhatsApp} from '../../lemma-quote/contact-config';

/** Native click-to-chat URL; opening it prepares a message, never sends it. */
export function buildWhatsAppUrl(number:string|null,message:string):string|null{
 const digits=cleanDigits(number);
 if(!validWhatsApp(digits)||!message.trim())return null;
 return 'https://wa.me/'+digits+'?text='+encodeURIComponent(message);
}
