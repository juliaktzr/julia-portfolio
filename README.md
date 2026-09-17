# Julia Kantzer, portfolio

Personal portfolio site. Vite + React + TypeScript, Tailwind CSS v4 with CSS-variable design tokens, Framer Motion. Static build, no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## Edit the content

Every word on the site lives in `src/content.ts`. Components never hard-code text, so you can change copy, reorder bullets, or add a role without touching JSX.

| Export | What it controls |
|---|---|
| `site` | Name, tagline, email, LinkedIn, GitHub, resume path, headshot, site URL |
| `hero` | The two typed terminal commands and the three buttons |
| `nav` | Header links and the command palette's Navigate group |
| `caseStudy` | Featured Pega work: sections, stack, before/after diagram steps |
| `experience` | Timeline roles, newest first. Each has `bullets` shown when expanded |
| `education` | Schools, degrees, and logo paths |
| `research`, `leadership`, `skills`, `interests`, `contact` | The remaining sections |

Search the file for `TODO` to find anything still waiting on you.

**Resume:** replace `public/resume.pdf`. The download button and the terminal `resume` command point at it.

**Headshot:** replace `public/headshot.jpg` with a square image, 800px or larger.

**Logos:** `public/logos/`. Vanderbilt V mark and UC3M seal are from Wikimedia Commons.

## Design tokens

Colors and fonts are CSS variables at the top of `src/index.css`. Light values live on `:root`, dark values under `[data-theme='dark']`. Tailwind reads them through the `@theme inline` block, so utilities like `bg-surface`, `text-muted`, and `text-accent-ink` update everywhere when you change a variable.

`--accent-ink` is a darker rose used for small text, because the spec rose fails WCAG AA contrast on cream. Use `--accent` for cursors, borders, and large elements only.

Theme defaults to the system preference. The toggle stores a choice in `localStorage` under `theme`.

## Interactive features

- **Cmd K / Ctrl K** opens the command palette. Commands are defined in `src/hooks/useCommands.ts`.
- **`~`** opens the terminal. Commands are in `src/components/Terminal.tsx`.
- Scroll reveal, counters, and the cursor glow all switch off under `prefers-reduced-motion`.

## Deploy to Vercel

The repo already has a `vercel.json` with the Vite framework preset, long-lived caching for hashed assets, and basic security headers.

1. Go to [vercel.com/new](https://vercel.com/new) and import `juliaktzr/julia-portfolio` from GitHub.
2. Accept the detected settings (framework Vite, build `npm run build`, output `dist`). Click Deploy.
3. Every push to `main` deploys automatically after that.

After the first deploy, replace `TODO.vercel.app` with your real URL in three places: `index.html` (canonical and Open Graph tags), `public/robots.txt`, and `site.siteUrl` in `src/content.ts`. Then commit and push.

Alternative from the terminal:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Open Graph image

`public/og.png` is a 1200x630 render of the hero. Regenerate it if you change your name or tagline. The source template is not in the repo; any 1200x630 PNG at that path works.
