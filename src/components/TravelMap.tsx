import { m, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { travel } from '../content'
import { MAP_HEIGHT, MAP_WIDTH, otherPath, project, visitedPath } from '../travel/europeMap'

const STEP = 0.16
const DRAW = 0.7
const ease = [0.22, 1, 0.36, 1] as const

/** Curved flight path from a to b, bowed to the left of the direction of travel. */
function arc([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const dx = x2 - x1
  const dy = y2 - y1
  const bend = 0.22
  const cx = (x1 + x2) / 2 + dy * bend
  const cy = (y1 + y2) / 2 - dx * bend
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

/**
 * Europe map with arcs flying out from Madrid to every place visited, drawn in
 * list order when scrolled into view. Hovering a place in the list lights up
 * its pin and arc.
 */
export function TravelMap() {
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState<string | null>(null)

  const home = travel.places.find((p) => p.city === travel.home)!
  const origin = project(home.lat, home.lon)
  const trips = travel.places
    .filter((p) => p !== home)
    .map((p, i) => {
      const at = project(p.lat, p.lon)
      return { ...p, at, d: arc(origin, at), delay: 0.3 + i * STEP }
    })

  const countries = [...new Set(travel.places.map((p) => p.country))]
  const byCountry = countries.map((c) => ({
    country: c,
    cities: travel.places.filter((p) => p.country === c),
  }))
  const activePlace = travel.places.find((p) => p.city === active)
  const label = activePlace ?? home
  const [lx, ly] = project(label.lat, label.lon)

  return (
    <figure className="print-hidden mt-6 overflow-hidden rounded-xl border border-line bg-surface/60">
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="relative border-b border-line bg-bg/60 lg:border-b-0 lg:border-r">
          {/* From lg up the map fills its column, cropping open sea at the sides. */}
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
            className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full"
            role="img"
            aria-label={`Map of Europe with routes from ${travel.home} to ${trips.map((t) => t.city).join(', ')}`}
          >
            <path d={otherPath} className="fill-line stroke-bg" strokeWidth={0.6} />
            <path d={visitedPath} className="fill-accent/25 stroke-bg" strokeWidth={0.6} />

            {trips.map((t) => {
              const on = active === t.city
              return (
                <m.path
                  key={t.city}
                  d={t.d}
                  fill="none"
                  strokeLinecap="round"
                  className={on ? 'stroke-accent-ink' : 'stroke-accent'}
                  strokeWidth={on ? 2.6 : 1.4}
                  strokeOpacity={active && !on ? 0.3 : 0.85}
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: DRAW, delay: t.delay, ease }}
                />
              )
            })}

            {trips.map((t) => {
              const on = active === t.city
              return (
                <m.circle
                  key={t.city}
                  cx={t.at[0]}
                  cy={t.at[1]}
                  r={on ? 6 : 3.6}
                  className="fill-accent-ink stroke-bg"
                  strokeWidth={1.5}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: t.delay + DRAW * 0.85, ease }}
                />
              )
            })}

            {!reduce && <circle cx={origin[0]} cy={origin[1]} r={8} className="travel-ping fill-accent" />}
            <circle cx={origin[0]} cy={origin[1]} r={7} className="fill-text stroke-bg" strokeWidth={2} />

            <text
              x={lx + 12}
              y={ly + 5}
              className="fill-text font-mono text-[26px] font-semibold sm:text-[18px] md:text-[15px]"
              paintOrder="stroke"
              stroke="var(--bg)"
              strokeWidth={4}
              strokeLinejoin="round"
            >
              {label.city}
              {label === home ? ' (home base)' : ''}
            </text>
          </svg>
        </div>

        <figcaption className="p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{travel.label}</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{travel.title}</p>
          <p className="mt-1 text-sm text-muted">{travel.caption}</p>
          <ul className="mt-5 space-y-2.5 text-sm" onMouseLeave={() => setActive(null)}>
            {byCountry.map(({ country, cities }) => (
              <li key={country} className="flex gap-3">
                <span className="w-28 shrink-0 font-mono text-xs leading-6 text-muted">{country}</span>
                <span className="flex flex-wrap gap-1.5">
                  {cities.map((p) => (
                    <button
                      key={p.city}
                      type="button"
                      onMouseEnter={() => setActive(p.city)}
                      onFocus={() => setActive(p.city)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive((a) => (a === p.city ? null : p.city))}
                      aria-pressed={active === p.city}
                      className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                        active === p.city
                          ? 'border-accent bg-accent text-bg'
                          : 'border-line bg-bg/70 text-text hover:border-accent'
                      }`}
                    >
                      {p.city}
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </div>
    </figure>
  )
}
