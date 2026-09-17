import { m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; delay?: number; className?: string }

/** Fades and lifts content into view on scroll. Static when motion is reduced. */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion() ?? false
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
