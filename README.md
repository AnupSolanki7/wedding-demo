# Ananya & Rohan — Wedding Invitation (Demo)

A cinematic digital wedding invitation built with Next.js (App Router), Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing the details

Everything guests read — names, dates, times, venues, map links, themes, gallery captions — lives in
`src/data/wedding.ts`. Change it there and every section updates.

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL (e.g. `https://ananya-weds-rohan.vercel.app`) so the
WhatsApp/social preview image resolves to an absolute link.

## Replacing the placeholder illustrations with real photographs

The pictures in `public/assets/couple/` and `public/assets/events/` are illustrated placeholders.

1. Copy the original photos into those folders (JPG, PNG, WebP or AVIF).
2. Point the matching `src` in `src/data/wedding.ts` at the new file, e.g. `"/assets/couple/engagement.jpg"`.
3. Optionally set `position: "50% 25%"` on an image to keep faces inside arched frames.

Photos are shown untouched — no filters or retouching. `next/image` serves them as AVIF/WebP at the right size
and lazy-loads everything below the first screen.

## Music

The music toggle (muted by default) plays a synthesised tanpura drone with temple-bell chimes. To use a
recording instead, add it to `public/assets/audio/` and set `audio.src` in `src/data/wedding.ts`.

## Structure

- `src/components/EnvelopeIntro.tsx`, `WaxSeal.tsx` — opening envelope, seal break, 3D flap, card zoom
- `InvitationCard.tsx`, `ScratchCard.tsx`, `WeddingCountdown.tsx`, `CoupleGallery.tsx`
- `EventTimeline.tsx`, `EventCard.tsx` — Haldi, Vaidik Vivah, Varmala scenes
- `FinalInvitation.tsx` — closing section and replay
- `components/ornaments/` — hand-drawn SVG ornaments (toran, rangoli, diya, lamps, Paithani border…)
- `src/lib/ambience.ts` — audio; `src/lib/animations.ts` — shared motion presets
