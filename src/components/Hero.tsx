import { hero, site } from '../content'
import { buttonStyles } from './buttonStyles'

const RING = 300
const RING_R = 124
// The ring path starts on the left and runs clockwise, so text reads along the top first.
const ringPath = `M${RING / 2},${RING / 2} m-${RING_R},0 a${RING_R},${RING_R} 0 1,1 ${RING_R * 2},0 a${RING_R},${RING_R} 0 1,1 -${RING_R * 2},0`

const btn = 'inline-flex h-12 items-center rounded-full px-6 font-medium transition-colors'

const socials = [
  { label: 'LinkedIn', href: site.linkedin, icon: <LinkedInIcon /> },
  { label: 'GitHub', href: site.github, icon: <GitHubIcon /> },
  { label: 'Email', href: `mailto:${site.email}`, icon: <MailIcon /> },
]

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="mx-4 mt-2 flex max-w-6xl flex-col items-center gap-5 rounded-[2.25rem] border border-transparent bg-surface px-4 pb-16 pt-14 sm:px-6 text-center sm:mx-6 sm:gap-6 xl:mx-auto print:mx-0 print:border-line print:py-6 dark:border-line"
      >
        <Portrait />

        <p className="-mb-3 mt-2 font-display text-[1.75rem] italic text-muted">{hero.greeting}</p>
        <h1 className="font-display text-[clamp(3.5rem,11.5vw,10.75rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          {site.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="font-display text-[1.625rem] italic leading-tight text-accent-ink sm:text-[2.125rem]">
          {site.tagline}
        </p>
        <p className="max-w-[36rem] text-lg leading-relaxed text-text/80">{hero.intro}</p>

        <div className="print-hidden mt-1 flex flex-wrap items-center justify-center gap-3">
          {hero.buttons.map((b) => (
            <a key={b.label} href={b.href} className={`${btn} ${buttonStyles[b.kind]}`}>
              {b.label}
            </a>
          ))}
          <span aria-hidden="true" className="mx-1.5 hidden h-7 w-px bg-text/25 sm:block" />
          <ul className="flex gap-3">
            {socials.map((s) => {
              const external = s.href.startsWith('http')
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={external ? `${s.label} (opens in a new tab)` : s.label}
                    title={s.label}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${buttonStyles.secondary}`}
                  >
                    {s.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 pb-8 pt-10 print:hidden">
        <p className="flex w-full items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted">
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          {hero.places.label}
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </p>
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3 font-display text-[1.375rem] text-muted">
          {hero.places.items.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

/** Headshot inside a slowly turning ring of words. Hovering pauses it. */
function Portrait() {
  return (
    <div className="hero-portrait group relative flex aspect-square w-full max-w-[300px] shrink-0 items-center justify-center overflow-hidden rounded-full print:hidden">
      <svg className="hero-dots absolute inset-0" viewBox={`0 0 ${RING} ${RING}`} aria-hidden="true">
        <circle
          cx={RING / 2}
          cy={RING / 2}
          r={146}
          fill="none"
          className="stroke-accent-ink"
          strokeWidth="1.5"
          strokeDasharray="1 9"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <svg className="hero-ring absolute inset-0" viewBox={`0 0 ${RING} ${RING}`} aria-hidden="true">
        <defs>
          <path id="hero-ring-path" d={ringPath} />
        </defs>
        <text className="fill-muted text-[13px] font-medium uppercase tracking-[4.4px] transition-[fill] duration-300 group-hover:fill-accent-ink">
          <textPath href="#hero-ring-path" textLength={2 * Math.PI * RING_R} lengthAdjust="spacing">
            {hero.ring.map((w) => (
              <tspan key={w}>
                {w} <tspan className="fill-accent-ink">✦</tspan>{' '}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
      <div className="absolute h-[70.7%] w-[70.7%] rounded-full bg-bg" />
      <img
        src={site.headshot}
        alt={site.headshotAlt}
        width={800}
        height={800}
        fetchPriority="high"
        className="relative h-2/3 w-2/3 rounded-full object-cover object-[50%_30%] shadow-[0_18px_40px_rgb(43_29_23/0.18)] dark:shadow-[0_18px_40px_rgb(0_0_0/0.45)]"
      />
    </div>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
