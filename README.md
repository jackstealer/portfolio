# Atul Raj Gautam: Portfolio

My personal portfolio: a dark, motion-heavy single page about my work in AI/ML and full-stack development.

**Live:** https://main.d3etp1e0iklzm8.amplifyapp.com

## Features

- **Animated intro.** A dot drops in and becomes the stem of a "!", the letters of my name spill out and tumble into place, and then the name flips letter by letter into **PORTFOLIO** before it settles into the hero. It plays on every visit. Any click, key press, scroll or touch skips it.
- **Interactive particle globe** behind the hero. It spins slowly and its particles move away from your pointer.
- **Custom cursor**: a dot with a trailing ring that grows when you hover something clickable (desktop only).
- **Magnetic links and buttons** that lean toward the pointer.
- **3D tilt project cards** with a highlight that follows the cursor.
- **Skills ticker**: two rows that scroll in opposite directions and pause when off-screen.
- **Section headings** that reveal letter by letter as you scroll.
- **Contact form** with toast feedback.
- Responsive. On touch devices the custom cursor is turned off.

## Tech stack

React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · Create React App (`react-scripts` 5) · hosted on AWS Amplify

## Run locally

Requires Node 18 or newer (see `.nvmrc`).

```bash
npm install
npm start        # http://localhost:3000
npm test         # runs the tests
npm run build    # production build into build/
```

`npm run build` uses Unix-style env syntax (`CI=false ...`). On Windows, run `npx react-scripts build` instead.

## Project structure

```
src/
  App.tsx                  page shell: mounts the cursor and the sections
  components/
    Hero.tsx               intro animation and hero
    ParticleField.tsx      canvas particle globe
    Navbar.tsx  About.tsx  Skills.tsx  Marquee.tsx
    Projects.tsx  Contact.tsx  Footer.tsx
    Cursor.tsx  Magnetic.tsx  SectionHeading.tsx
public/                    index.html, icons, manifest
amplify.yml                AWS Amplify build settings
```

## Deployment (AWS Amplify)

The site is static. AWS Amplify builds it using `amplify.yml` (`npm ci`, then `npm run build`, which serves `build/`).

1. In the AWS console, open **Amplify → Create new app → GitHub**, choose this repo and the `main` branch, and keep the detected build settings.
2. Every push to `main` redeploys automatically. Add custom domains under **Hosting → Custom domains**.

### Contact form

The form posts to `/api/contact` by default, and a static host does not serve that route. To make it work, deploy an endpoint for it, set `REACT_APP_CONTACT_API` to that endpoint's URL under **Hosting → Environment variables**, and redeploy.
