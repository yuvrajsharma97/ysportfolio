# Yuvraj Sharma, portfolio

Vite, React 19 and TypeScript, with GSAP scroll motion, an EmailJS contact form and a one-field `/admin` page for the CV link.
The page is prerendered to static HTML at build time, so it reads with scripting off and indexes well.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:5173, admin at /admin
npm run build && npm run preview
```

## Where things live

- Projects, experience and the tech stack come from Firestore (`projects`, `experience`, `techStack`, sorted by `order`).
  Each build bakes them into the HTML and every page load re-reads them, so an edit in Firestore shows on the next
  visit without a redeploy (`src/lib/live-content.ts`). The project with `order` 1 is the featured one.
  `src/data/content.ts` is only a fallback for when Firestore cannot be reached.
- `src/components/`: one file per section. `src/lib/motion.ts`: every animation.
- `src/styles/tokens.css` and `base.css`: the Hallmark Dusk theme tokens; `site.css`: the page.
- `public/`: portrait, project screenshots (WebP at 800 and 1600) and the hero photograph.

## The CV link

Stored in Firestore at `content/socials.resumeUrl`. Sign in at `/admin` with the admin Google account
(set in `VITE_ADMIN_EMAIL` and in `firestore.rules`) and paste the CDN link. The site picks it up on the
next page load; a build also bakes the current link into the prerendered HTML.

## Deploy (Vercel)

Add the variables from `.env.example` to the Vercel project, and add your domain to
Firebase Auth's authorised domains so Google sign-in works on `/admin`.
