# Julia Kantzer, portfolio

I designed and specified this site and built it with Claude Code.

Personal portfolio site, live at https://juliakantzer.com. Vite + React + TypeScript, Tailwind CSS v4 with CSS-variable design tokens, Framer Motion. Static build, no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5175
npm run build      # production build in dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
npm run og         # re-render public/og-image.png
```

## Edit the content

Every word on the site lives in `src/content.ts`. Components never hard-code text, so you can change copy, reorder bullets, or add a role without touching JSX.

| Export | What it controls |
|---|---|
| `site` | Name, tagline, email, LinkedIn, GitHub, resume path, headshot, site URL |
| `hero` | The line above your name and the three buttons |
| `nav` | Header links and the command palette's Navigate group |
| `caseStudies` | Selected work: Pega (2x2 prose sections) and Witness to History (problem, file listing, decision cards, screenshots) |
| `pegaFlow`, `witnessPipeline` | Steps for the Pega before/after diagram and the Witness content pipeline |
| `experience` | Timeline roles in resume order. Each `summary` always shows; `bullets` show when expanded |
| `education` | Schools, degrees, and logo paths |
| `research`, `leadership`, `skills`, `interests`, `contact` | The remaining sections |

**Resume:** replace `public/JuliaKantzerResume.pdf` (keep the name, since it is what visitors save it as). The download button and the terminal `resume` command point at it.

**Headshot:** replace `public/headshot.jpg` with a square image, 800px or larger.

**Screenshots:** `public/work/`. Case study images, referenced from `screenshots` in `caseStudies`. Give each its real `width` and `height` so the page does not shift while it loads.

**Logos:** `public/logos/`. Vanderbilt V mark and UC3M seal are from Wikimedia Commons.

## Design tokens

Colors and fonts are CSS variables at the top of `src/index.css`. Light values live on `:root`, dark values under `[data-theme='dark']`. Tailwind reads them through the `@theme inline` block, so utilities like `bg-surface`, `text-muted`, and `text-accent-ink` update everywhere when you change a variable.

`--accent-ink` is a darker rose used for small text, because the spec rose fails WCAG AA contrast on cream. Use `--accent` for cursors, borders, and large elements only.

Theme defaults to the system preference. The toggle stores a choice in `localStorage` under `theme`.

## Interactive features

- **Cmd K / Ctrl K** opens the command palette. Commands are defined in `src/hooks/useCommands.ts`.
- **`~`** opens the terminal. Commands live in `src/terminal/commands.ts`, hangman in `src/terminal/games.ts`. Type `help` inside it.
- Scroll reveal and counters both switch off under `prefers-reduced-motion`.

## Deploy to Vercel

The repo already has a `vercel.json` with the Vite framework preset, long-lived caching for hashed assets, and basic security headers.

1. Go to [vercel.com/new](https://vercel.com/new) and import `juliaktzr/julia-portfolio` from GitHub.
2. Accept the detected settings (framework Vite, build `npm run build`, output `dist`). Click Deploy.
3. Every push to `main` deploys automatically after that.

The canonical and Open Graph URLs point at https://juliakantzer.com. In the Vercel project settings, add that domain and follow the DNS instructions. If the domain ever changes, update `index.html` and `site.siteUrl` in `src/content.ts`.

Alternative from the terminal:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 404 page

`404.html` is a second Vite entry (see `vite.config.ts`) rendered by `src/notFound.tsx`. Vercel serves it automatically for unknown paths on static deployments.

## Print

Cmd P produces a light, single-column document: nav, footer, and decoration hidden, every timeline card expanded, link URLs printed inline. Styles live under `@media print` in `src/index.css`.

## Open Graph image

`public/og-image.png` is the 1200x630 preview shown when the link is shared. Its source is `scripts/og-image.html`. Edit that file, then run `npm run og` to render it with Playwright. The first run on a new machine may need `npx playwright install chromium`.
