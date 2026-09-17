import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { hero } from '../content'

type Props = { onOpen: () => void; start: boolean }

/**
 * Types itself out under the hero buttons once the intro is done, with a
 * keycap that presses itself. Clicking it opens the terminal. On touch
 * devices, where there is no ~ key, the wording changes to "tap here".
 */
export function TerminalHint({ onOpen, start }: Props) {
  const reduce = useReducedMotion() ?? false
  const [touch, setTouch] = useState(false)
  const text = touch ? hero.terminalHint.touch : hero.terminalHint.before
  const [typed, setTyped] = useState(reduce ? text.length : 0)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    const update = () => setTouch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Type the hint one character at a time after a short pause.
  useEffect(() => {
    if (!start || reduce) return
    if (typed >= text.length) return
    const id = window.setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 1400 : 45)
    return () => window.clearTimeout(id)
  }, [start, reduce, typed, text.length])

  if (!start) return null
  const done = reduce || typed >= text.length

  return (
    <m.button
      type="button"
      onClick={onOpen}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: reduce ? 0 : 1.2 }}
      aria-label="Open the terminal"
      className="print-hidden group mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md font-mono text-xs text-muted transition-colors hover:text-accent-ink sm:text-sm"
    >
      <span className="text-accent-2" aria-hidden="true">
        #
      </span>
      <span aria-hidden="true">{reduce ? text : text.slice(0, typed)}</span>
      <span className="sr-only">{text}</span>
      {done && !touch && (
        <>
          <kbd
            aria-hidden="true"
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-accent/60 bg-bg px-1.5 text-[13px] leading-none text-accent-ink shadow-[0_2px_0_var(--accent)] motion-safe:animate-keypress group-hover:border-accent"
          >
            ~
          </kbd>
          <span aria-hidden="true">{hero.terminalHint.after}</span>
        </>
      )}
      {done && !touch && <span className="sr-only">{hero.terminalHint.after}</span>}
    </m.button>
  )
}
