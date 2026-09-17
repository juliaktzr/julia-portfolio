import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { pegaFlow as caseStudy } from '../content'
import { usePrinting } from '../hooks/usePrinting'

/**
 * Playable before/after flow. Phases:
 *   0            idle, everything dim
 *   1..B         before steps light up left to right
 *   B+1          the before path collapses
 *   B+2..B+1+A   after steps light up left to right
 *   DONE         final state
 * Autoplays once when scrolled into view. Reduced motion shows the final state.
 */
const STEP_MS = 480
const COLLAPSE_MS = 800

export function FlowDiagram() {
  const reduce = useReducedMotion() ?? false
  const printing = usePrinting()
  const B = caseStudy.before.steps.length
  const A = caseStudy.after.steps.length
  const COLLAPSE = B + 1
  const DONE = B + 1 + A

  const [phase, setPhase] = useState(reduce ? DONE : 0)
  const [running, setRunning] = useState(false)
  const playedRef = useRef(false)
  const rootRef = useRef<HTMLElement>(null)

  const run = useCallback(() => {
    if (reduce) {
      setPhase(DONE)
      return
    }
    setPhase(0)
    setRunning(true)
  }, [reduce, DONE])

  const skip = useCallback(() => {
    setRunning(false)
    setPhase(DONE)
  }, [DONE])

  // Autoplay once when half the figure is on screen.
  useEffect(() => {
    const el = rootRef.current
    if (!el || playedRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !playedRef.current) {
          playedRef.current = true
          io.disconnect()
          run()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [run])

  // Advance phases on a timer while running.
  useEffect(() => {
    if (!running || phase >= DONE) return
    const delay = phase === COLLAPSE ? COLLAPSE_MS : STEP_MS
    const id = window.setTimeout(() => {
      const next = phase + 1
      setPhase(next)
      if (next >= DONE) setRunning(false)
    }, delay)
    return () => window.clearTimeout(id)
  }, [running, phase, COLLAPSE, DONE])

  const shown = printing ? DONE : phase
  const collapsed = shown >= COLLAPSE
  const status = running ? 'Running' : shown >= DONE ? 'Done' : 'Ready'

  return (
    <figure ref={rootRef} className="print-hidden rounded-xl border border-line bg-surface/60 p-4 sm:p-6">
      <figcaption className="sr-only">
        Before: {caseStudy.before.steps.join(', ')}, taking {caseStudy.before.time}. After:{' '}
        {caseStudy.after.steps.join(', ')}, {caseStudy.after.time}.
      </figcaption>

      <Row
        label={caseStudy.before.label}
        steps={caseStudy.before.steps}
        note={caseStudy.before.time}
        tone="muted"
        lit={Math.min(shown, B)}
        noteShown={shown >= B}
        collapsed={collapsed}
      />

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span
          className={`h-px flex-1 transition-colors duration-500 ${collapsed ? 'bg-accent/60' : 'bg-line'}`}
        />
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
            collapsed ? 'text-accent-ink' : 'text-muted/60'
          }`}
        >
          rebuilt as
        </span>
        <span
          className={`h-px flex-1 transition-colors duration-500 ${collapsed ? 'bg-accent/60' : 'bg-line'}`}
        />
      </div>

      <Row
        label={caseStudy.after.label}
        steps={caseStudy.after.steps}
        note={caseStudy.after.time}
        tone="accent"
        lit={Math.max(0, shown - COLLAPSE)}
        noteShown={shown >= DONE}
        collapsed={false}
      />

      <div className="print-hidden mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="font-mono text-[11px] text-muted" aria-live="polite">
          {status}
        </span>
        <div className="flex gap-2">
          {running ? (
            <button type="button" onClick={skip} className={btn}>
              Skip
            </button>
          ) : (
            <button
              type="button"
              onClick={run}
              className={btn}
              aria-label={shown >= DONE ? 'Replay animation' : 'Run animation'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4v16l13-8z" />
              </svg>
              {shown >= DONE ? 'Replay' : 'Run'}
            </button>
          )}
        </div>
      </div>
    </figure>
  )
}

const btn =
  'inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent-ink'

type RowProps = {
  label: string
  steps: string[]
  note: string
  tone: 'muted' | 'accent'
  lit: number
  noteShown: boolean
  collapsed: boolean
}

function Row({ label, steps, note, tone, lit, noteShown, collapsed }: RowProps) {
  const accent = tone === 'accent'
  return (
    <div aria-hidden="true">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span
          className={`font-mono text-xs uppercase tracking-[0.18em] ${accent ? 'text-accent-ink' : 'text-muted'}`}
        >
          {label}
        </span>
        <span
          className={`font-mono text-xs transition-opacity duration-500 ${accent ? 'text-accent-ink' : 'text-muted'} ${
            noteShown ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {note}
        </span>
      </div>
      <ol
        className={`flex flex-col gap-2 transition-transform duration-700 ease-out sm:flex-row sm:items-stretch sm:gap-0 ${
          collapsed ? 'scale-[0.97]' : ''
        }`}
      >
        {steps.map((step, i) => {
          const on = i < lit
          const box = on
            ? accent
              ? 'border-accent/70 bg-bg text-text'
              : collapsed
                ? 'border-dashed border-accent-2/50 bg-bg/60 text-muted line-through decoration-accent-2/70'
                : 'border-text/30 bg-bg/80 text-text'
            : 'border-line bg-bg/30 text-muted'
          const line =
            i < lit - 1 || (i === lit - 1 && lit === steps.length)
              ? accent
                ? 'bg-accent'
                : 'bg-text/30'
              : 'bg-line/60'
          return (
            <li key={step} className="flex flex-1 flex-col sm:flex-row sm:items-center">
              <div
                className={`flex min-h-[3.25rem] flex-1 items-center rounded-lg border px-3 py-2 text-sm leading-snug transition-[border-color,background-color,color,transform] duration-400 ${box} ${
                  on ? 'translate-y-0' : 'translate-y-1'
                }`}
              >
                <span
                  className={`mr-2 font-mono text-[11px] ${on && accent ? 'text-accent-ink' : 'text-muted'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
              </div>
              {i < steps.length - 1 && (
                <span
                  className={`mx-auto my-0.5 block h-4 w-0.5 transition-colors duration-400 sm:my-0 sm:h-0.5 sm:w-5 sm:shrink-0 ${line}`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
