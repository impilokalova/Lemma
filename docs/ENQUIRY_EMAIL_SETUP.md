# Free FormSubmit enquiry setup

Lemma Studio's general contact form at https://lemma-3cz.pages.dev/contact uses a standard HTML POST to `https://formsubmit.co/contact.lemmastudio@gmail.com`.

No custom domain, Resend account, API key, Cloudflare Pages Function or paid hosting is required.

## Activate and test

1. Once the new deployment is live, submit a test enquiry on the contact page with a real sender email address. The form redirects to FormSubmit's verification/thank-you flow, then to Lemma's contact page if accepted.
2. Open **contact.lemmastudio@gmail.com** and look for the **FormSubmit activation email** (check Spam). Click its confirmation link. FormSubmit may hold initial enquiries until this step is completed.
3. Submit a **second** test enquiry and confirm that the email arrives in the Lemma inbox with the submitted fields. Test the Reply action.
4. If mail does not arrive, check Spam and FormSubmit's activation instructions before advertising the form as operational.

FormSubmit handles spam filtering and CAPTCHA; the form also includes a honeypot. FormSubmit is a third-party processor of submitted enquiry data. Do not enter confidential information.

**Scope:** The `/contact` general enquiry form is connected. The `/quote` builder has its own separate mailto/WhatsApp workflow and is not automatically delivered by this change.
