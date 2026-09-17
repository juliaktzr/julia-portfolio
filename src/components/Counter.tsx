import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Counter as CounterData } from '../content'

const fmt = new Intl.NumberFormat('en-US')

/** Counts up from 0 when scrolled into view. Reduced motion shows the final value. */
export function Counter({ value, prefix = '', suffix = '', label }: CounterData) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion() ?? false
  const [counted, setCounted] = useState(0)
  const shown = reduce ? value : counted

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCounted(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  const finalText = `${prefix}${fmt.format(value)}${suffix}`

  return (
    <div className="flex flex-col">
      <span ref={ref} className="font-display text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
        <span aria-hidden="true">
          {prefix}
          {fmt.format(shown)}
          {suffix}
        </span>
        <span className="sr-only">{finalText}</span>
      </span>
      <span className="mt-1 text-sm text-muted">{label}</span>
    </div>
  )
}
