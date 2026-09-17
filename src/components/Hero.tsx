import { motion, useReducedMotion } from 'framer-motion'
import { hero, site } from '../content'
import { useTypedSequence } from '../hooks/useTypedSequence'

const buttonStyles = {
  primary: 'bg-text text-bg hover:bg-accent-ink hover:text-bg',
  secondary: 'border border-text/30 text-text hover:border-accent hover:text-accent-ink',
  ghost: 'text-muted hover:text-accent-ink',
} as const

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const state = useTypedSequence(hero.commands, { instant: reduceMotion })

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-5xl flex-col justify-center px-4 py-16 sm:px-6"
    >
      {/* Decorative grid: the one "techy" flourish in this section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />

      <div
        className="w-full max-w-3xl rounded-xl border border-line bg-surface/70 shadow-[0_20px_60px_-30px_var(--glow)]"
        role="group"
        aria-label="Introduction"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-accent/80" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-accent-2/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-muted/50" aria-hidden="true" />
          <span className="ml-3 font-mono text-xs text-muted">julia@vanderbilt ~ zsh</span>
        </div>

        <div className="space-y-5 px-4 py-6 sm:px-6 sm:py-8">
          {hero.commands.map((line, i) => {
            const active = i === state.index
            const visible = i < state.index || active
            if (!visible) return null
            const typedCmd = i < state.index ? line.cmd : line.cmd.slice(0, state.typed)
            const showOut = i < state.index || (active && state.outShown)
            const showCursor = active && !state.done

            return (
              <div key={line.cmd}>
                <p className="font-mono text-sm text-muted sm:text-base">
                  <span className="text-accent-ink" aria-hidden="true">
                    ❯{' '}
                  </span>
                  <span className="sr-only">Command: </span>
                  {typedCmd}
                  {showCursor && !showOut && <Cursor />}
                </p>
                {showOut && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2"
                  >
                    {i === 0 ? (
                      <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                        {line.out}
                      </h1>
                    ) : (
                      <p className="max-w-2xl text-lg leading-relaxed text-text sm:text-xl">{line.out}</p>
                    )}
                  </motion.div>
                )}
              </div>
            )
          })}

          {state.done && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <p className="mb-5 font-mono text-xs text-muted sm:text-sm">
                <span className="text-accent-2">#</span> {hero.meta}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {hero.buttons.map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    download={b.download ? `${site.name.replace(' ', '-')}-Resume.pdf` : undefined}
                    className={`inline-flex h-11 items-center rounded-md px-5 text-sm font-medium transition-colors ${buttonStyles[b.kind]}`}
                  >
                    {b.label}
                    {b.download && <span className="sr-only"> (PDF)</span>}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Screen-reader friendly fallback while typing runs. */}
      <p className="sr-only" aria-live="polite">
        {state.done ? '' : `${site.name}. ${site.tagline}`}
      </p>
    </section>
  )
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent motion-safe:animate-pulse"
    />
  )
}
