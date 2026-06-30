# Jovin Sivakumar — portfolio

My personal site: a cinematic, scroll-driven portfolio. The landing opens on a framed Baroque painting that expands to fill the screen, then panels tilt and stack as you scroll — about, education, experience, projects, and contact — all in a dark, chiaroscuro style.

Live: _add your URL once it's deployed_

## Styles & tech

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** — custom palette, with Barlow Condensed + DM Sans fonts
- **GSAP** (ScrollTrigger + Flip) and **Lenis** — the expanding intro and the tilt-and-stack scrolling
- **Framer Motion** — the smaller animations
- Public-domain Baroque paintings (Caravaggio, Georges de La Tour) for the imagery

## Make it your own

Nearly all the writing lives in one file — **`data/portfolioData.ts`**. Edit the text there and the whole site updates:

- `profile` — name, headline, and links (GitHub, LinkedIn, email)
- `experience` — your roles (each one gets its own deep-dive page)
- `projects` — your projects
- `educationCards` — your schools

Then swap a few files in **`public/`**:

- `public/resume.pdf` — your résumé
- `public/nav/` — company and school logos
- `app/icon.svg` — the little browser-tab icon

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. To put it online, push to GitHub and import the repo into [Vercel](https://vercel.com) — it detects Next.js automatically, no setup needed.

## Credits

The scroll design and motion were inspired by **Anim Master** on GitHub. Imagery is public domain, courtesy of Wikimedia Commons.

## License

[MIT](LICENSE) © Jovin Sivakumar
