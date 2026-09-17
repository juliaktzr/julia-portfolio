import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { experience, type Role } from '../content'
import { usePrinting } from '../hooks/usePrinting'
import { Section, Tag } from './Section'

export function Experience() {
  const [open, setOpen] = useState<number | null>(0)
  const printing = usePrinting()

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have worked."
      intro="Click a role to expand it."
      introClassName="print-hidden"
    >
      <ol className="relative border-l border-line pl-6 sm:pl-8">
        {experience.map((role, i) => (
          <TimelineItem
            key={`${role.org}-${role.title}`}
            role={role}
            index={i}
            open={printing || open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </ol>
    </Section>
  )
}

type ItemProps = { role: Role; index: number; open: boolean; onToggle: () => void }

function TimelineItem({ role, index, open, onToggle }: ItemProps) {
  const reduce = useReducedMotion() ?? false
  const panelId = `exp-panel-${index}`
  const buttonId = `exp-button-${index}`

  return (
    <li className="relative pb-6 last:pb-0 print:pb-2">
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className={`absolute -left-[1.85rem] top-5 h-3 w-3 rounded-full border-2 border-bg sm:-left-[2.35rem] ${
          open ? 'bg-accent' : 'bg-muted'
        }`}
      />
      <div
        className={`rounded-xl border transition-colors ${
          open ? 'border-accent/50 bg-surface' : 'border-line bg-surface/50 hover:border-accent/40'
        }`}
      >
        <h3>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full items-start justify-between gap-4 rounded-xl px-4 py-4 text-left print:py-2 sm:px-5"
          >
            <span className="min-w-0">
              <span className="block font-semibold leading-snug">{role.title}</span>
              <span className="mt-0.5 block text-sm text-muted">
                {role.org} · {role.location}
              </span>
              <span className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted">{role.period}</span>
                <Tag>{role.tag}</Tag>
              </span>
            </span>
            <span
              aria-hidden="true"
              className={`mt-1 shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              key="panel"
              initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={
                reduce
                  ? { height: 'auto', opacity: 1, transition: { duration: 0 } }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 border-t border-line px-4 py-4 text-sm leading-relaxed text-muted print:space-y-1 print:py-2 sm:px-5">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}
