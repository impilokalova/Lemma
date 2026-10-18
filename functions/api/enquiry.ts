type Env = { RESEND_API_KEY?: string; LEMMA_FROM_EMAIL?: string; TURNSTILE_SECRET_KEY?: string };
type Context = { request: Request; env: Env };
const destination = 'contact.lemmastudio@gmail.com';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, limit: number) => typeof value === 'string' ? value.trim().slice(0, limit) : '';
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
export async function onRequestPost({request, env}: Context): Promise<Response> {
  const origin = request.headers.get('origin');
  const host = new URL(request.url).origin;
  if (origin && origin !== host) return json({error:'Invalid origin.'}, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({error:'JSON required.'},415);
  if (Number(request.headers.get('content-length') || 0) > 16000) return json({error:'Enquiry too long.'},413);
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; } catch { return json({error:'Invalid enquiry.'},400); }
  if (clean(body.website, 200)) return json({ok:true});
  const name = clean(body.name,120);
  const email = clean(body.email,254);
  const country = clean(body.country,100);
  const service = clean(body.service,120);
  const description = clean(body.description,5000);
  if (!name || !emailPattern.test(email) || !country || !service || !description || body.consent !== true) return json({error:'Please complete required fields and consent.'},400);
  if (!env.RESEND_API_KEY || !env.LEMMA_FROM_EMAIL) return json({error:'Email delivery is not configured yet. Please email us directly.'},503);
  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(body.turnstileToken,4096);
    if (!token) return json({error:'Please complete the anti-spam verification.'},400);
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token})});
    const verdict = await check.json() as {success?:boolean};
    if (!verdict.success) return json({error:'Anti-spam verification failed.'},403);
  }
  const fields: Array<[string,string]> = [
    ['Name',name],['Email',email],['Business',clean(body.business,150)],['Country',country],
    ['Phone',clean(body.phone,80)],['Service',service],['Budget',clean(body.budget,100)],
    ['Deadline',clean(body.deadline,100)],['Preferred reply',clean(body.contact,40)],
    ['Project',description],['Reference links',clean(body.links,1200)]
  ];
  const text = fields.map(([k,v])=>k+': '+(v||'—')).join('\n\n');
  try {
    const sent = await fetch('https://api.resend.com/emails',{
      method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({from:env.LEMMA_FROM_EMAIL,to:[destination],reply_to:email,subject:'Lemma Studio enquiry — '+service,text})
    });
    if (!sent.ok) return json({error:'Unable to deliver your enquiry right now. Please email us directly.'},502);
    return json({ok:true});
  } catch {
    return json({error:'Email service unavailable. Please email us directly.'},502);
  }
}
