import {Link,useParams} from 'react-router-dom';
type Section={heading:string;paragraphs:string[]};
type Policy={slug:string;title:string;intro:string;sections:Section[]};
const s=(heading:string,...paragraphs:string[]):Section=>({heading,paragraphs});
export const legalPages:Policy[]=[
{slug:'privacy',title:'Privacy Policy',intro:'How Lemma Studio handles information shared by visitors and prospective customers.',sections:[
s('What we collect','When you choose to prepare an enquiry, you may provide your name, business, email, country, phone number, project brief, deadline and reference links. Do not include sensitive personal information unless specifically required and agreed.','Our current preview enquiry forms do not transmit details to a Lemma server. Quote drafts may be stored in your own browser local storage; copied text or WhatsApp/Telegram messages are only shared when you take that action.'),
s('Why we use information','If you contact us through a third-party messaging service, we use the information to answer enquiries, prepare quotations, deliver agreed work, manage payments and resolve disputes. We do not sell your personal information.'),
s('Sharing and international enquiries','Messaging services, hosting providers and other tools you choose to use may process information under their own policies, potentially outside South Africa. Please review their privacy notices before sharing.'),
s('Storage, retention and security','Browser-stored draft data remains on your device until cleared. Records of actual enquiries and projects are retained only for appropriate business, contractual or legal purposes. No online service can guarantee absolute security.'),
s('Your choices','You may request access to, correction of or deletion of personal information where applicable law permits. Use the official contact details once published; the contact form currently does not send requests.'),
s('Contact and updates','Lemmas privacy contact address and responsible business identity must be verified and published before this policy is considered final. This page is a pre-launch draft, not confirmation of regulatory compliance.')
]},
{slug:'popia',title:'POPIA & Personal Information Rights',intro:'A practical explanation of personal-information rights under South Africa’s Protection of Personal Information Act, 2013.',sections:[
s('Our approach','Lemma Studio intends to process personal information lawfully, for specific purposes, with appropriate security and minimal collection. This statement does not itself establish POPIA compliance.'),
s('Information and purpose','Information may include contact details, business details, project requirements and billing information provided during an enquiry or project. Its intended purposes are communication, quotations, agreed service delivery and record keeping.'),
s('Your rights','Subject to applicable law, data subjects may ask what personal information is held, request correction or deletion, object to certain processing and complain to the Information Regulator. Requests may require identity verification.'),
s('Information Officer','The responsible business entity, Information Officer, their contact details and applicable registration information must be confirmed before launch. A working privacy-rights request channel must also be supplied.'),
s('Third-party and cross-border services','International messaging and cloud services may process data outside South Africa. Cross-border transfers and supplier arrangements must be assessed under applicable POPIA requirements.'),
s('Regulator','For independent guidance or complaints, visit the Information Regulator at https://inforegulator.org.za. This is an external website.')
]},
{slug:'refunds',title:'Refunds & Cancellation Policy',intro:'How project cancellations, deposits, changes and refund requests are handled.',sections:[
s('Before a project begins','A quote request is not a paid order. We confirm the scope, final price, timeline and payment arrangements with you before work begins. Please review these before accepting.'),
s('Deposits and progress','For smaller projects, full advance payment may be requested. Larger projects may require a deposit and a balance before final handover. Any agreed cancellation charges should reflect work already performed and lawful, reasonable costs; deposits are not automatically non-refundable.'),
s('Cancellation requests','Contact Lemma as soon as possible if you wish to cancel. We will review the stage of work, agreed scope, documented expenses and applicable consumer rights before confirming any refund or amount due.'),
s('Consumer rights take priority','Nothing in this policy limits rights under the Consumer Protection Act, Electronic Communications and Transactions Act or other applicable law. Certain electronic service transactions may carry a seven-day cooling-off right, subject to statutory exclusions, including where services begin with consumer consent before the cooling-off period ends.'),
s('Incorrect or undelivered work','If work does not match the agreed scope, contact us with details so we can assess correction, redelivery, cancellation or a refund where required by law. We do not impose a blanket no-refunds rule.'),
s('Refund process','Where a refund is due, we will explain the amount and payment method and process it within the legally required period. Please keep proof of payment and the agreed quotation.'),
s('Custom and rush projects','Customised work and urgent bookings require clear written confirmation of scope and cancellation implications. Statutory rights remain unaffected.')
]},
{slug:'terms',title:'Terms of Service',intro:'General terms for design, website, presentation and branding services.',sections:[
s('Scope and acceptance','Website prices are indicative and in South African rand (ZAR). A binding project agreement arises only after Lemma confirms the scope, price, schedule and acceptance terms. A quote form is not checkout or automatic acceptance.'),
s('Client responsibilities','Clients should provide accurate briefs, assets they are entitled to use, timely feedback and necessary approvals. Delays in receiving content or feedback may affect delivery estimates.'),
s('Pricing and payment','Third-party domains, hosting, paid fonts, plugins, advertising and other externally purchased services are not included unless expressly quoted. International payment arrangements and currency conversion must be confirmed separately.'),
s('Delivery and revisions','One reasonable revision round is generally included unless a written quote states otherwise. Additional revisions, changed scope or urgent work may attract agreed fees. Delivery dates and live sports slots are subject to confirmation and capacity.'),
s('Intellectual property','Ownership, licence rights, editable source files and third-party assets must be stated in the project agreement. Until agreed payment conditions are satisfied, delivery of previews does not automatically grant unrestricted commercial rights. Lemma will not claim ownership of client-supplied materials.'),
s('Portfolio and confidentiality','Concept portfolio work is labelled as such. Client work will only be shown publicly where permission and confidentiality commitments allow.'),
s('Liability and law','We aim to provide services with reasonable care and skill. Nothing here excludes rights or remedies that cannot lawfully be excluded. Disputes should first be raised directly for resolution. Applicable law and jurisdiction will be confirmed in the final client agreement.')
]},
{slug:'cookies',title:'Cookies & Local Storage',intro:'What the website may store in your browser.',sections:[
s('Current website behaviour','The quotation builder uses browser local storage to remember your draft and selected services. It is not a customer account and does not itself submit your information to Lemma.'),
s('Cookies and analytics','We have not represented that optional advertising, tracking or analytics cookies are active. If such tools are introduced, this notice and any required consent mechanism must be updated before activation.'),
s('Managing stored data','You can clear browser site data or local storage to remove a saved draft. Clearing this data may reset unfinished enquiries.'),
s('Third-party links','WhatsApp, Telegram and other linked websites may set their own cookies or collect data under separate notices.')
]},
{slug:'paia',title:'PAIA — Access to Information',intro:'Information about requests under the Promotion of Access to Information Act, 2000.',sections:[
s('About PAIA','PAIA provides a framework for requesting access to records where the legal requirements are met. Requests are assessed under the Act, including applicable grounds for refusal and any lawful fees.'),
s('Formal PAIA manual required','This webpage is NOT a completed PAIA section 51 manual. Lemma must identify its legal entity, Information Officer, record categories, request process, fees and contact details and prepare a compliant manual before claiming full compliance.'),
s('Making a request','Once official business and Information Officer contact details are published, requests can be directed to that channel. A formal request may need the prescribed form, enough detail to identify records and evidence of authority when acting for another person.'),
s('Independent guidance','The Information Regulator provides PAIA guidance and prescribed forms: https://inforegulator.org.za. Applicable statutory rights remain in effect even while Lemma finalises its manual.')
]},
{slug:'copyright',title:'Copyright & Acceptable Use',intro:'Responsible use of Lemma’s creative work and customer-provided assets.',sections:[
s('Portfolio material','Portfolio concepts, mock brands and fictional campaigns are examples of Lemma’s design capabilities, not claims of client commissions or endorsements.'),
s('Using our work','Do not reproduce, resell or falsely attribute Lemma-owned artwork or website materials without permission or an applicable legal right. Project-specific commercial rights are set out in the client agreement.'),
s('Client materials','Customers must have permission to provide logos, photographs, text, fonts and other assets for use in a project. Lemma may decline unlawful, infringing, deceptive or harmful requests.'),
s('Third-party rights','Stock media, templates, fonts, plugins and platforms may carry separate licence restrictions. We will identify material restrictions where they apply.')
]},
{slug:'accessibility',title:'Accessibility Statement',intro:'Our commitment to a usable website for a wide range of visitors.',sections:[
s('Our aim','We aim for responsive layouts, keyboard-accessible navigation, clear form labels, readable text and helpful validation messages. This is a design commitment, not a claim of independent WCAG certification.'),
s('Known limitations','Some interactive portfolio demonstrations or external platforms may not meet every accessibility need. We intend to improve issues identified during testing.'),
s('Feedback','If you encounter an accessibility barrier, please use our official contact channel when it becomes available and describe the page and problem.')
]}
];
export const legalLinks=legalPages.map(p=>({label:p.title,href:'/legal/'+p.slug}));
export function LegalIndex(){return <section className="section container" style={{maxWidth:980}}><p className="eyebrow">LEMMA STUDIO</p><h1>Policies & legal information</h1><p>Explore our customer terms, privacy practices and regulatory information. These documents are pre-launch drafts requiring business-identity and legal review before publication.</p><div className="card-grid">{legalPages.map(p=><article key={p.slug} style={{border:'1px solid #8885',padding:20,borderRadius:12}}><h2 style={{fontSize:'1.2rem'}}><Link to={'/legal/'+p.slug}>{p.title} ↗</Link></h2><p>{p.intro}</p></article>)}</div></section>}
export function LegalPage(){const {slug}=useParams();const p=legalPages.find(x=>x.slug===slug);if(!p)return <section className="section container"><h1>Policy not found</h1><Link to="/legal">Browse policies</Link></section>;return <article className="section container" style={{maxWidth:880}}><p className="eyebrow">LEMMA STUDIO · LEGAL INFORMATION</p><h1>{p.title}</h1><p>{p.intro}</p><p><small>Draft prepared 15 October 2026 · Subject to verification and legal review before production publication.</small></p><hr style={{opacity:.25,margin:'25px 0'}}/>{p.sections.map(sec=><section key={sec.heading} style={{marginBottom:28}}><h2>{sec.heading}</h2>{sec.paragraphs.map((v,i)=><p key={i}>{v.startsWith('https://')?<a href={v}>{v}</a>:v.includes('https://inforegulator.org.za')?<>{v.split('https://inforegulator.org.za')[0]}<a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">Information Regulator</a>{v.split('https://inforegulator.org.za')[1]}</>:v}</p>)}</section>)}<p><Link to="/legal">← All policies</Link> · <Link to="/contact">Contact</Link></p></article>}
