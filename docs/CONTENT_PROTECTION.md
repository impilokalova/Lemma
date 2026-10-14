# Lemma artwork protection

This website is publicly viewable. It is technically impossible for ordinary web
code, GitHub or Cloudflare Pages to make a captured screenshot go blank, reliably
detect screen capture, or prevent visitors from downloading assets delivered to
their browsers. JavaScript keyboard traps, developer-tools blocking and fake
screenshot detection are ineffective, harm accessibility and are not implemented.

## Implemented
- Disable the native context menu and dragging **only on image elements and
  explicitly marked decorative artwork**. Browser menus remain available on
  text, links, forms and navigation.
- Security-related HTTP headers through `public/_headers`.
- Existing mobile and desktop navigation, keyboard use and text selection remain intact.

## How to opt artwork into the casual-copy deterrent
Add `data-protected-artwork` on the decorative container. The image is still
available through browser network requests or page assets.

## If strong protection is required
Do not publish the original full-resolution asset. Publish resized, compressed,
watermarked preview versions instead; keep master files private. For private
client previews, use authenticated access (e.g., Cloudflare Access); note that
authorized viewers can still capture images. Consider visible attribution and
copyright notices.
