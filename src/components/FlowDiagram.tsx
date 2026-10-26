import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { pegaFlow as caseStudy, type ChatLine } from '../content'
import { usePrinting } from '../hooks/usePrinting'

/**
 * Playable before/after flow. Phases:
 *   0            idle, everything dim
 *   1..B         before steps light up left to right
 *   B+1          the before path collapses
 *   B+2..B+1+A   chat lines type out one at a time
 *   DONE         final state
 * Autoplays once when scrolled into view. Reduced motion shows the final state.
 */
const STEP_MS = 480
const COLLAPSE_MS = 800
/** Chat pacing: the bot "thinks" before replying, and the person types slower than the bot. */
const THINK_MS = 700
const CHAR_MS = { bot: 24, user: 70, status: 30 }
const LINE_PAUSE_MS = { bot: 450, user: 450, status: 1100 }

export function FlowDiagram() {
  const reduce = useReducedMotion() ?? false
  const printing = usePrinting()
  const B = caseStudy.before.steps.length
  const chat = caseStudy.after.chat
  const A = chat.length
  const COLLAPSE = B + 1
  const DONE = B + 2 + A

  const [phase, setPhase] = useState(reduce ? DONE : 0)
  const [running, setRunning] = useState(false)
  /** Characters shown of the chat line that is typing. */
  const [typed, setTyped] = useState(0)
  const playedRef = useRef(false)
  const rootRef = useRef<HTMLElement>(null)

  const run = useCallback(() => {
    if (reduce) {
      setPhase(DONE)
      return
    }
    setPhase(0)
    setTyped(0)
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

  // Advance on a timer while running: one character at a time inside a chat line, else one phase.
  useEffect(() => {
    if (!running || phase >= DONE) return
    const line = chat[phase - COLLAPSE - 1] as ChatLine | undefined
    const typing = line && typed < line.text.length
    const delay = line
      ? typing
        ? typed === 0 && line.from === 'bot'
          ? THINK_MS
          : CHAR_MS[line.from]
        : LINE_PAUSE_MS[line.from]
      : phase === COLLAPSE
        ? COLLAPSE_MS
        : STEP_MS
    const id = window.setTimeout(() => {
      if (typing) {
        setTyped((t) => t + 1)
        return
      }
      setTyped(0)
      const next = phase + 1
      setPhase(next)
      if (next >= DONE) setRunning(false)
    }, delay)
    return () => window.clearTimeout(id)
  }, [running, phase, typed, chat, COLLAPSE, DONE])

  const shown = printing ? DONE : phase
  const collapsed = shown >= COLLAPSE
  const status = running ? 'Running' : shown >= DONE ? 'Done' : 'Ready'

  return (
    <figure ref={rootRef} className="print-hidden rounded-xl border border-line bg-surface/60 p-4 sm:p-6">
      <figcaption className="sr-only">
        Before: {caseStudy.before.steps.join(', ')}, taking {caseStudy.before.time}. After: a guided chat,{' '}
        {caseStudy.after.time}. {caseStudy.after.tag}: {chat.map((l) => l.text).join(' ')}
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

      <ChatDemo
        lines={chat}
        active={shown >= DONE ? A : shown - COLLAPSE - 1}
        typed={typed}
        noteShown={shown >= DONE}
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

type ChatProps = {
  lines: ChatLine[]
  /** Index of the line typing now. Lines before it are complete, lines after it are hidden. */
  active: number
  typed: number
  noteShown: boolean
}

/**
 * Made-up session in the guided chat, typed out line by line. Every line keeps
 * its full size from the start, so the figure never changes height.
 */
function ChatDemo({ lines, active, typed, noteShown }: ChatProps) {
  return (
    <div aria-hidden="true">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
            {caseStudy.after.label}
          </span>
          <span className="rounded-full border border-line px-2 py-px font-mono text-[10px] text-muted">
            {caseStudy.after.tag}
          </span>
        </span>
        <span
          className={`font-mono text-xs text-accent-ink transition-opacity duration-500 ${
            noteShown ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {caseStudy.after.time}
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-bg/60">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-accent/80" />
          <span className="h-2 w-2 rounded-full bg-accent-2/70" />
          <span className="h-2 w-2 rounded-full bg-muted/50" />
          <span className="ml-1.5 font-mono text-[11px] text-muted">guided sizing chat</span>
        </div>
        <ol className="flex flex-col gap-2.5 p-3 sm:p-4">
          {lines.map((line, i) => {
            const state = i < active ? 'done' : i === active ? 'typing' : 'hidden'
            const text = state === 'typing' ? line.text.slice(0, typed) : line.text
            const thinking = state === 'typing' && typed === 0 && line.from === 'bot'
            const last = i === lines.length - 1
            return (
              <li
                key={line.text}
                className={`flex transition-opacity duration-300 ${line.from === 'user' ? 'justify-end' : 'justify-start'} ${
                  state === 'hidden' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {line.from === 'status' ? (
                  <span className="flex items-center gap-2 py-1 font-mono text-xs text-muted">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-accent ${state === 'typing' ? 'animate-pulse' : ''}`}
                    />
                    <Typed full={line.text} shown={text} />
                  </span>
                ) : (
                  <span
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                      line.from === 'user'
                        ? 'rounded-br-md bg-text text-bg'
                        : `rounded-bl-md border bg-surface text-text ${last ? 'border-accent/70 font-medium' : 'border-line'}`
                    }`}
                  >
                    {thinking ? (
                      <span className="relative block">
                        <span className="invisible">{line.text}</span>
                        <span className="absolute inset-0 flex items-center gap-1">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted"
                              style={{ animationDelay: `${d * 150}ms` }}
                            />
                          ))}
                        </span>
                      </span>
                    ) : (
                      <Typed full={line.text} shown={text} />
                    )}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

/** Shows `shown` on top of an invisible copy of `full`, so the box is sized for the whole line. */
function Typed({ full, shown }: { full: string; shown: string }) {
  return (
    <span className="relative block">
      <span className="invisible">{full}</span>
      <span className="absolute inset-0">{shown}</span>
    </span>
  )
}
