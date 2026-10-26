import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { experience, type Role } from '../content'
import { usePrinting } from '../hooks/usePrinting'
import { Section, Tag } from './Section'

/** The axis runs from the start of the first year to the end of the last. */
const AXIS_START = 2019
const AXIS_END = 2027
const YEARS = Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i)
/** Years before this are squeezed into a narrow strip, so the busy recent years get most of the width. */
const SQUEEZE_UNTIL = 2024
const SQUEEZED_SHARE = 22
/** Bars that start past this share of the axis get their name to the left, in the empty space. */
const LABEL_LEFT_FROM = 22

const now = new Date()
const NOW = now.getFullYear() + now.getMonth() / 12

/** "2025-08" as a fractional year. `inclusive` moves to the end of that month. */
function toYear(ym: string, inclusive = false) {
  const [y, mo] = ym.split('-').map(Number)
  return y + (mo - 1 + (inclusive ? 1 : 0)) / 12
}

/** Position on the axis as a percentage, with the early years compressed. */
function pct(year: number) {
  if (year < SQUEEZE_UNTIL) return ((year - AXIS_START) / (SQUEEZE_UNTIL - AXIS_START)) * SQUEEZED_SHARE
  return SQUEEZED_SHARE + ((year - SQUEEZE_UNTIL) / (AXIS_END - SQUEEZE_UNTIL)) * (100 - SQUEEZED_SHARE)
}

/** Oldest first, so overlapping roles stack into a staircase. */
const rows = [...experience].sort((a, b) => a.start.localeCompare(b.start))

/**
 * Roles as bars on one time axis, so overlapping commitments show at a glance.
 * Clicking a bar shows its details underneath. Print lists every role.
 */
export function Experience() {
  const [selected, setSelected] = useState(rows.length - 1)
  const printing = usePrinting()
  const reduce = useReducedMotion() ?? false
  const role = rows[selected]

  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve worked.">
      <div className="print-hidden">
        <Timeline selected={selected} onSelect={setSelected} />
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={selected}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <RoleDetails role={role} id="exp-details" className="mt-6" />
          </m.div>
        </AnimatePresence>
      </div>
      {printing && (
        <div className="space-y-2">
          {experience.map((r) => (
            <RoleDetails key={r.org} role={r} />
          ))}
        </div>
      )}
    </Section>
  )
}

function Timeline({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const nowLeft = pct(NOW)
  return (
    <div className="rounded-xl border border-line bg-surface/60 px-3 pb-3 pt-4 sm:px-5 sm:pt-5">
      <div className="relative">
        {/* Year gridlines and the "now" marker sit behind the bars. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {YEARS.map((y) => (
            <span
              key={y}
              className={`absolute inset-y-0 w-px ${y < SQUEEZE_UNTIL ? 'bg-line/40' : 'bg-line/70'}`}
              style={{ left: `${pct(y)}%` }}
            />
          ))}
          <span className="absolute inset-y-0 w-px bg-accent/60" style={{ left: `${nowLeft}%` }} />
        </div>

        <ol className="relative">
          {rows.map((r, i) => {
            const left = pct(toYear(r.start))
            const right = pct(r.end ? toYear(r.end, true) : NOW)
            const on = i === selected
            const labelLeft = left > LABEL_LEFT_FROM
            return (
              <li key={r.org} className="relative h-10 sm:h-11">
                {/* Name sits in the empty space beside the bar: left of it for later roles, right for early ones. */}
                <span
                  aria-hidden="true"
                  onClick={() => onSelect(i)}
                  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap text-xs font-medium sm:text-sm ${
                    labelLeft ? 'pr-2.5 text-right' : 'pl-2.5'
                  } ${on ? 'text-text' : 'text-muted'}`}
                  style={labelLeft ? { right: `${100 - left}%` } : { left: `${right}%` }}
                >
                  {r.short}
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={on}
                  aria-controls="exp-details"
                  aria-label={`${r.title}, ${r.org}, ${r.period}`}
                  title={`${r.short}: ${r.period}`}
                  className={`absolute top-1/2 h-6 min-w-2.5 -translate-y-1/2 rounded-full border transition-colors before:absolute before:-inset-2 before:content-[''] sm:h-7 ${
                    on
                      ? 'border-accent bg-accent'
                      : 'border-accent/45 bg-accent/20 hover:border-accent hover:bg-accent/35'
                  } ${r.end ? '' : 'rounded-r-none border-r-0'}`}
                  style={{ left: `${left}%`, width: `${right - left}%` }}
                />
              </li>
            )
          })}
        </ol>
      </div>

      {/* Year labels: the first squeezed year, then each full-size year. The axis end is left to the "now" pill. */}
      <div aria-hidden="true" className="relative mt-2 h-4 font-mono text-[10px] text-muted sm:text-[11px]">
        {YEARS.filter((y) => y === AXIS_START || (y >= SQUEEZE_UNTIL && y < AXIS_END)).map((y) => (
          <span
            key={y}
            className={`absolute ${y === AXIS_START ? '' : '-translate-x-1/2'}`}
            style={{ left: `${pct(y)}%` }}
          >
            {y}
          </span>
        ))}
        <span
          className="absolute -top-0.5 -translate-x-1/2 rounded-full bg-accent px-1.5 text-bg"
          style={{ left: `${nowLeft}%` }}
        >
          now
        </span>
      </div>
    </div>
  )
}

function RoleDetails({ role, id, className = '' }: { role: Role; id?: string; className?: string }) {
  return (
    <article
      id={id}
      aria-live={id ? 'polite' : undefined}
      className={`rounded-xl border border-accent/50 bg-surface p-4 print:border-line print:p-2 sm:p-5 ${className}`}
    >
      <h3 className="font-semibold leading-snug">{role.title}</h3>
      <p className="mt-0.5 text-sm text-muted">
        {role.org}
        {role.location && ` · ${role.location}`}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">{role.period}</span>
        <Tag>{role.tag}</Tag>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text">{role.summary}</p>
      <ul className="mt-3 space-y-2.5 border-t border-line pt-3 text-sm leading-relaxed text-muted print:space-y-1">
        {role.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
