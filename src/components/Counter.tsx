import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Counter as CounterData } from '../content'
import { usePrinting } from '../hooks/usePrinting'

const fmt = new Intl.NumberFormat('en-US')

/**
 * Counts up from 0 when scrolled into view. Reduced motion shows the final value.
 * `compact` is a smaller size for several counters sharing a narrow card.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  label,
  compact = false,
}: CounterData & { compact?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion() ?? false
  const [counted, setCounted] = useState(0)
  const printing = usePrinting()
  const shown = reduce || printing ? value : counted

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
      <span
        ref={ref}
        className={`font-display font-semibold tabular-nums tracking-tight print:text-2xl ${
          compact ? 'text-2xl sm:text-[1.75rem]' : 'text-3xl sm:text-4xl'
        }`}
      >
        <span aria-hidden="true">
          {prefix}
          {fmt.format(shown)}
          {suffix}
        </span>
        <span className="sr-only">{finalText}</span>
      </span>
      <span className={`mt-1 text-muted ${compact ? 'text-xs leading-snug' : 'text-sm'}`}>{label}</span>
    </div>
  )
}
