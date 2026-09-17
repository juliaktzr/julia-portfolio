import { m, useReducedMotion } from 'framer-motion'
import { caseStudy } from '../content'

/**
 * Animated before/after flow. The "before" row is a slow chain of manual
 * steps; the "after" row is a short chain that draws in with the accent.
 * Stands in for screenshots, which are likely confidential.
 */
export function FlowDiagram() {
  const reduce = useReducedMotion() ?? false
  return (
    <figure className="rounded-xl border border-line bg-surface/60 p-4 sm:p-6">
      <figcaption className="sr-only">
        Before: {caseStudy.before.steps.join(', ')}, taking {caseStudy.before.time}. After:{' '}
        {caseStudy.after.steps.join(', ')}, {caseStudy.after.time}.
      </figcaption>
      <Row
        label={caseStudy.before.label}
        steps={caseStudy.before.steps}
        note={caseStudy.before.time}
        tone="muted"
        reduce={reduce}
      />
      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">rebuilt as</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <Row
        label={caseStudy.after.label}
        steps={caseStudy.after.steps}
        note={caseStudy.after.time}
        tone="accent"
        reduce={reduce}
      />
    </figure>
  )
}

type RowProps = {
  label: string
  steps: string[]
  note: string
  tone: 'muted' | 'accent'
  reduce: boolean
}

function Row({ label, steps, note, tone, reduce }: RowProps) {
  const accent = tone === 'accent'
  const box = accent ? 'border-accent/60 bg-bg text-text' : 'border-line bg-bg/60 text-muted'
  const line = accent ? 'bg-accent' : 'bg-line'
  const stagger = accent ? 0.18 : 0.1

  return (
    <div aria-hidden="true">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span
          className={`font-mono text-xs uppercase tracking-[0.18em] ${accent ? 'text-accent-ink' : 'text-muted'}`}
        >
          {label}
        </span>
        <span className={`font-mono text-xs ${accent ? 'text-accent-ink' : 'text-muted'}`}>{note}</span>
      </div>
      <ol className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col">
            <m.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
              className={`flex min-h-[3rem] items-center rounded-lg border px-3 py-2 text-sm leading-snug ${box}`}
            >
              <span className={`mr-2 font-mono text-[11px] ${accent ? 'text-accent-ink' : 'text-muted'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
            </m.div>
            {i < steps.length - 1 && (
              <m.span
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.3, delay: i * stagger + 0.25 }}
                className={`mx-auto my-0.5 block h-4 w-0.5 origin-top ${line}`}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
