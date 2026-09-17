import { m, useReducedMotion } from 'framer-motion'
import { witnessPipeline } from '../content'

const STEP = 0.22

/**
 * Content pipeline, animated left to right (top to bottom on phones) when
 * scrolled into view. The validator step carries the rose highlight.
 */
export function PipelineDiagram() {
  const reduce = useReducedMotion() ?? false
  const steps = witnessPipeline.steps
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <figure className="print-hidden rounded-xl border border-line bg-surface/60 p-4 sm:p-6">
      <figcaption className="sr-only">
        Content pipeline: {steps.map((s) => s.label).join(', then ')}. The validator checks every reference
        and returns plain-English errors.
      </figcaption>
      <div className="mb-4 flex items-baseline justify-between gap-3" aria-hidden="true">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Content pipeline</span>
        <span className="font-mono text-xs text-accent-ink">No code for content authors</span>
      </div>
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0" aria-hidden="true">
        {steps.map((step, i) => {
          const hi = !!step.highlight
          return (
            <li key={step.label} className="flex flex-1 flex-col sm:flex-row sm:items-center">
              <m.div
                initial={reduce ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: i * STEP, ease }}
                className={`relative flex min-h-[4.5rem] flex-1 flex-col justify-center rounded-lg border px-3 py-2 ${
                  hi ? 'border-accent bg-bg text-text' : 'border-line bg-bg/70 text-text'
                }`}
              >
                {hi && !reduce && (
                  <m.span
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [0.98, 1.04, 1.06] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.2, delay: i * STEP + 0.35, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 rounded-lg border-2 border-accent"
                  />
                )}
                <span className="flex items-center gap-2 text-sm font-medium leading-snug">
                  <span className={`font-mono text-[11px] ${hi ? 'text-accent-ink' : 'text-muted'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step.label}
                  {hi && (
                    <span className="ml-auto rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-ink">
                      key
                    </span>
                  )}
                </span>
                <span className="mt-1 text-xs leading-snug text-muted">{step.note}</span>
              </m.div>
              {i < steps.length - 1 && (
                <m.span
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.3, delay: i * STEP + 0.3 }}
                  className={`mx-auto my-0.5 block h-4 w-0.5 sm:my-0 sm:h-0.5 sm:w-5 sm:shrink-0 ${
                    hi || steps[i + 1].highlight ? 'bg-accent' : 'bg-line'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
