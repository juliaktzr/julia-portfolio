# Portfolio Site Kickoff: Julia Kantzer

Drop this file (and your resume PDF, renamed `resume.pdf`) into an empty project folder, open a terminal there, run `claude`, and paste the prompt in Step 3.

---

## Step 1: One-time setup

```bash
mkdir julia-portfolio && cd julia-portfolio
# move KICKOFF.md and resume.pdf into this folder
git init
claude
```

Inside Claude Code, type `/model` and pick the most capable model available to you before starting. Big first builds benefit from it.

## Step 2: Things to have ready

- LinkedIn URL and GitHub URL
- A headshot (optional, `public/headshot.jpg`)
- Any screenshots you're allowed to share (Pega work is likely confidential, so plan on diagrams instead of screenshots)

## Step 3: Paste this prompt

```
Read KICKOFF.md and resume.pdf in this folder. Build my personal portfolio site following the spec in the "Build Spec" section of KICKOFF.md.

Work in this order and stop after each phase so I can review:
1. Scaffold the project, set up the design tokens, and show me the hero section running locally.
2. Build the remaining sections with real content from my resume.
3. Add the interactive features.
4. Accessibility, performance, and mobile pass, then deployment setup.

Ask me before making any major design decision not covered by the spec. Never invent metrics, employers, or projects; use only what is in my resume, and mark anything missing as a TODO for me to fill in. Commit to git at the end of each phase.
```

---

## Build Spec

### Positioning
I'm a CS + Applied Math student at Vanderbilt (May 2027) aiming for **product-focused engineering roles** (product engineer, technical PM, forward deployed engineering), with a strong interest in government and mission-driven tech. The site should read as: *builds real AI products, understands users, leads people.* Every resume item appears somewhere, but product thinking is the through line.

### Stack
- Vite + React + TypeScript
- Tailwind CSS with design tokens defined as CSS variables
- Framer Motion for animation
- Deploy to Vercel (static build)
- No backend. Content lives in a single `src/content.ts` file so I can edit text without touching components.

### Visual direction: "Techy interactive" in Espresso and Rose
Professional first, personality second. Warm, not cold-tech.

Color tokens:

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FAF6F1` warm cream | `#1A1310` espresso | page background |
| `--surface` | `#F1E8DF` | `#241A16` | cards |
| `--text` | `#2B1D17` espresso | `#F3EAE2` | body text |
| `--muted` | `#7A6358` | `#A89286` | secondary text |
| `--accent` | `#B86B77` dusty rose | `#D9939E` | links, highlights, cursor |
| `--accent-2` | `#8A5A44` mocha | `#C08B6E` | tags, dividers |
| `--pop` | `#6E4F7A` muted plum | `#A585B3` | rare: one detail per section max |

- Light and dark mode with a toggle, default to system preference.
- Typography: a clean sans for body (Inter or Geist), a monospace for techy accents (JetBrains Mono or Geist Mono), and a slightly characterful display font for the name (e.g. Fraunces).
- Rose is an accent, not a theme. Most of the page is cream and espresso.

### Sections
1. **Hero:** terminal-style intro that types out a short command, e.g. `whoami` then my name, then a one-line value statement about building AI products for real users. Buttons: View Work, Resume (PDF download), Contact.
2. **Featured case study: Pegasystems AI infrastructure modeling.** Problem (40-hour manual process), what I built (conversational guided experience; Python calc engine within 5% of legacy Excel logic), how I decided (evaluated 4 solution paths across product, UX, technical tradeoffs), stack (Python, React, Claude Code, MCP). Use a simple animated before/after or flow diagram instead of screenshots. Keep details high level; add a TODO noting I must confirm what's shareable.
3. **Experience:** interactive timeline of all roles (Pega, LEAR Lab, Handshake AI MOVE Fellow, CS1101 TA, Transmodal). Each card expands on click.
4. **Research and AI Evaluation:** LEAR Lab (25+ live deployments, prototype to institutional scale, website redesign) and Handshake AI eval work, framed as "I know how AI products fail and how to fix them."
5. **Leadership and Impact:** Read for Those in Need (3,000+ books, 5 schools, 4 years), ZTA Director of Fundraising ($12,000 in one semester), Incentive Spirometer project lead (clinical needs to engineering requirements). Use animated counters for the numbers.
6. **Skills:** grouped chips (Technical, AI, Product and Strategy, Languages: Spanish professional, Polish conversational).
7. **Interests:** a short line about gov and defense tech and mission-driven software.
8. **Contact:** email link, LinkedIn, GitHub. Do **not** put my phone number on the site.

### Interactive features
- **Command palette** (Cmd/Ctrl + K) to jump to sections, toggle theme, copy email, download resume.
- **Hidden terminal mode:** pressing `~` opens a small terminal overlay supporting `help`, `about`, `projects`, `resume`, `contact`, `theme`, `clear`. Fun easter egg, fully optional to use.
- Scroll-reveal animations and a subtle rose cursor glow on desktop.
- All motion respects `prefers-reduced-motion`.

### Quality bar
- Fully responsive, looks great at 375px wide.
- Lighthouse 95+ on performance and accessibility.
- Keyboard navigable, visible focus states, WCAG AA contrast (check rose on cream).
- SEO basics: title, meta description, Open Graph image, favicon.
- README explaining how to edit `content.ts` and deploy.

### Writing style for site copy
Direct, confident, no fluff. No em dashes anywhere. Short sentences. Lead with outcomes.
