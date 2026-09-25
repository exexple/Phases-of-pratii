# the little things

A small interactive site made for one person. Built with React + Vite +
Tailwind + Framer Motion. No backend, no database — it's a static site,
so it deploys anywhere that serves static files, GitHub + Vercel included.

## What's built vs. what's yours to add

This is a working, deployable Phase 1: the room, the interaction system,
the window's sky states, the constellation puzzle, and the particle name
reveal all function end to end right now, with clearly-marked placeholder
copy so you can click through the whole experience before touching
anything.

Before this is really "done," three things need you:

1. **The actual content** — open `src/data/content.js` and replace every
   `[bracketed placeholder]` with something real and specific. This is
   the part that can't be faked — it's the entire point of the project.
2. **A real audio file** — no music is bundled (deliberately: the
   background track is a copyrighted recording, and this project
   shouldn't ship an unauthorized copy of it). Add your own legally-owned
   file at `public/audio/black-beauty.mp3`, or point `src/data/music.js`
   at wherever you're hosting it.
3. **Photos**, if you want them — drop images into
   `public/images/pratiksha/` and wire them into the Polaroid slots in
   `src/components/Room.jsx` (currently plain placeholder rectangles).

## Extending the room

Only 8 of the ~15 objects the original brief described are built here
(desk, book, drawer, lamp, wall note, hidden star, polaroids, window).
Adding more — headphones, calendar, flower, cup, an empty frame — is just
adding an entry to `src/data/content.js` and a positioned object to the
`objects` array in `src/components/Room.jsx`. The interaction system,
reveal panel, and styling are already generic and reusable.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Deploying — GitHub + Vercel

```bash
git init
git add .
git commit -m "the little things"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Then on [vercel.com](https://vercel.com):

1. "Add New… → Project"
2. Import the GitHub repo you just pushed
3. Vercel auto-detects Vite — leave the defaults (build command
   `npm run build`, output directory `dist`)
4. Deploy

## A privacy note

This site includes real photos and personal details about a real person.
By default a Vercel deployment is a public URL — anyone with the link can
open it. `index.html` is set to `noindex, nofollow` so search engines
won't crawl it, but that's not the same as private.

The brief this was built from explicitly rules out a backend or
authentication, so there's no real access control baked in — that's a
deliberate simplicity trade-off, not an oversight. If you want an actual
gate, the honest options are: don't publish the link anywhere public, use
Vercel's built-in deployment protection if you're on a paid plan, or add
a lightweight client-side password check (worth knowing that anything
client-side is trivially bypassable by anyone who opens dev tools — it
deters casual stumbling-upon, not a determined visitor).
