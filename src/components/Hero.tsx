import { m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { hero, site } from '../content'
import { buttonStyles } from './buttonStyles'

const RING = 300
const RING_R = 124
// The ring path starts on the left and runs clockwise, so text reads along the top first.
const ringPath = `M${RING / 2},${RING / 2} m-${RING_R},0 a${RING_R},${RING_R} 0 1,1 ${RING_R * 2},0 a${RING_R},${RING_R} 0 1,1 -${RING_R * 2},0`

const btn = 'inline-flex h-12 items-center rounded-full px-6 font-medium transition-colors'

const socials: { label: string; href: string; icon: ReactNode; download?: string; ariaLabel?: string }[] = [
  { label: 'LinkedIn', href: site.linkedin, icon: <LinkedInIcon /> },
  { label: 'GitHub', href: site.github, icon: <GitHubIcon /> },
  { label: 'Email', href: `mailto:${site.email}`, icon: <MailIcon /> },
  {
    label: 'Resume',
    href: site.resumeUrl,
    icon: <DownloadIcon />,
    download: site.resumeFilename,
    ariaLabel: 'Download resume (PDF)',
  },
]

const ease = [0.22, 1, 0.36, 1] as const
/** When the text starts fading up, after the ring around the portrait has drawn in. */
const TEXT_START = 1.7
const TEXT_STEP = 0.16

/** Fade-up entrance for the i-th line of hero text. Reduced motion shows everything at once. */
function useEnter() {
  const reduce = useReducedMotion() ?? false
  return (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: TEXT_START + i * TEXT_STEP, ease },
        }
}

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const enter = useEnter()
  return (
    <>
      <section
        id="top"
        className="mx-4 mt-4 flex min-h-[calc(100svh-2rem)] max-w-6xl flex-col items-center justify-center gap-[clamp(0.75rem,2.2svh,1.5rem)] rounded-[2.25rem] border border-transparent bg-surface px-4 py-[clamp(1rem,4svh,3.5rem)] text-center sm:mx-6 sm:mt-6 sm:min-h-[calc(100svh-3rem)] sm:px-6 sm:py-[clamp(1.25rem,5svh,3.5rem)] xl:mx-auto print:mx-0 print:min-h-0 print:border-line print:py-6 dark:border-line"
      >
        <Portrait />

        <m.p {...enter(0)} className="-mb-3 mt-2 font-display text-[1.75rem] italic text-muted">
          {hero.greeting}
        </m.p>
        <m.h1
          {...enter(1)}
          className="font-display text-[clamp(3.5rem,min(11.5vw,15.5svh),10.75rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
        >
          {site.name}
          {/* Pops in with a bounce once the name has settled. */}
          <m.span
            className="inline-block text-accent"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 10, delay: TEXT_START + 0.95 }}
          >
            .
          </m.span>
        </m.h1>
        <m.p
          {...enter(2)}
          className="font-display text-[1.625rem] italic leading-tight text-accent-ink sm:text-[2.125rem]"
        >
          {site.tagline}
        </m.p>
        <m.p {...enter(3)} className="max-w-[36rem] text-lg leading-relaxed text-text/80">
          {hero.intro}
        </m.p>

        <m.div {...enter(4)} className="print-hidden mt-1 flex flex-wrap items-center justify-center gap-3">
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
                    aria-label={s.ariaLabel ?? (external ? `${s.label} (opens in a new tab)` : s.label)}
                    title={s.label}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    download={s.download}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${buttonStyles.secondary}`}
                  >
                    {s.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </m.div>
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

/**
 * Headshot inside a slowly turning ring of words. Hovering pauses it.
 * On load a line draws around the photo, then the dotted ring and the words fade in.
 */
function Portrait() {
  const reduce = useReducedMotion() ?? false
  const intro = (props: object) => (reduce ? {} : props)
  return (
    <div className="hero-portrait group relative flex aspect-square w-full max-w-[clamp(110px,calc(50svh_-_225px),300px)] sm:max-w-[clamp(150px,calc(45svh_-_130px),300px)] shrink-0 items-center justify-center overflow-hidden rounded-full print:hidden">
      {!reduce && (
        <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${RING} ${RING}`} aria-hidden="true">
          <m.circle
            cx={RING / 2}
            cy={RING / 2}
            r={146}
            fill="none"
            className="stroke-accent-ink"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 1.3, ease }, opacity: { duration: 0.6, delay: 1.2 } }}
          />
        </svg>
      )}
      {/* Wrappers carry the entrance so it doesn't fight the CSS spin on the svgs. */}
      <m.div
        className="absolute inset-0"
        {...intro({
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 1.1 },
        })}
      >
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
      </m.div>
      <m.div
        className="absolute inset-0"
        {...intro({
          initial: { opacity: 0, rotate: -40 },
          animate: { opacity: 1, rotate: 0 },
          transition: { duration: 1.4, delay: 0.8, ease },
        })}
      >
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
      </m.div>
      <div className="absolute h-[70.7%] w-[70.7%] rounded-full bg-bg" />
      <m.img
        {...intro({
          initial: { opacity: 0, scale: 0.85 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.9, delay: 0.2, ease },
        })}
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

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12M7 10l5 5 5-5M5 21h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
