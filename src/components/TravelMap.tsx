import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { photos, travel } from '../content'
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

/** Size of the map box, so map coordinates can be turned into pixel offsets. */
function useBoxSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

type Props = {
  active: string | null
  onActive: (city: string | null) => void
}

/**
 * Europe map with arcs flying out from Madrid to every place visited, drawn in
 * list order when scrolled into view. Hovering a pin or a place in the list
 * lights up its arc and shows its name, plus a photo when there is one.
 */
export function TravelMap({ active, onActive }: Props) {
  const reduce = useReducedMotion() ?? false
  const [boxRef, box] = useBoxSize()

  const home = travel.places.find((p) => p.city === travel.home)!
  const origin = project(home.lat, home.lon)
  const pins = travel.places.map((p) => ({ ...p, at: project(p.lat, p.lon) }))
  const trips = pins
    .filter((p) => p.city !== home.city)
    .map((p, i) => ({ ...p, d: arc(origin, p.at), delay: 0.3 + i * STEP }))

  const countries = [...new Set(travel.places.map((p) => p.country))]
  const byCountry = countries.map((c) => ({
    country: c,
    cities: travel.places.filter((p) => p.country === c),
  }))

  // The svg uses "slice", so the map is scaled to cover the box and centered.
  const scale = Math.max(box.w / MAP_WIDTH, box.h / MAP_HEIGHT)
  const ox = (box.w - MAP_WIDTH * scale) / 2
  const oy = (box.h - MAP_HEIGHT * scale) / 2
  const current = pins.find((p) => p.city === active)
  const photo = current && photos.find((ph) => ph.place === current.city)
  const tip = current && { x: ox + current.at[0] * scale, y: oy + current.at[1] * scale }
  const tipBelow = tip ? tip.y < (photo ? 190 : 70) : false
  const tipWidth = photo ? 160 : 140
  const tipLeft = tip ? Math.min(Math.max(tip.x - tipWidth / 2, 8), box.w - tipWidth - 8) : 0

  const pinEvents = (city: string) => ({
    onMouseEnter: () => onActive(city),
    onMouseLeave: () => onActive(null),
    onClick: () => onActive(active === city ? null : city),
  })

  return (
    <figure className="print-hidden overflow-hidden rounded-xl border border-line bg-surface/60">
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div ref={boxRef} className="relative border-b border-line bg-bg/60 lg:border-b-0 lg:border-r">
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

            {!active && (
              <text
                x={origin[0] + 12}
                y={origin[1] + 5}
                className="fill-text font-mono text-[26px] font-semibold sm:text-[18px] md:text-[15px]"
                paintOrder="stroke"
                stroke="var(--bg)"
                strokeWidth={4}
                strokeLinejoin="round"
              >
                {home.city} (home base)
              </text>
            )}

            {/* Invisible, larger hover targets so small pins are easy to hit. */}
            {pins.map((p) => (
              <circle
                key={p.city}
                cx={p.at[0]}
                cy={p.at[1]}
                r={11}
                fill="transparent"
                className="cursor-pointer"
                {...pinEvents(p.city)}
              />
            ))}
          </svg>

          {current && tip && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-10 overflow-hidden rounded-lg border border-line bg-bg shadow-lg"
              style={{
                left: tipLeft,
                width: tipWidth,
                top: tipBelow ? tip.y + 14 : undefined,
                bottom: tipBelow ? undefined : box.h - tip.y + 14,
              }}
            >
              {photo && (
                <img
                  src={photo.src}
                  alt=""
                  width={photo.width}
                  height={photo.height}
                  className="block h-28 w-full object-cover"
                />
              )}
              <p className="px-3 py-2 leading-tight">
                <span className="block text-sm font-semibold text-text">{current.city}</span>
                <span className="font-mono text-[11px] text-muted">
                  {current.city === home.city ? 'Home base' : current.country}
                </span>
              </p>
            </div>
          )}
        </div>

        <figcaption className="p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{travel.label}</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{travel.title}</p>
          <p className="mt-1 text-sm text-muted">{travel.caption}</p>
          <ul className="mt-5 space-y-2.5 text-sm" onMouseLeave={() => onActive(null)}>
            {byCountry.map(({ country, cities }) => (
              <li key={country} className="flex gap-3">
                <span className="w-28 shrink-0 font-mono text-xs leading-6 text-muted">{country}</span>
                <span className="flex flex-wrap gap-1.5">
                  {cities.map((p) => (
                    <button
                      key={p.city}
                      type="button"
                      onMouseEnter={() => onActive(p.city)}
                      onFocus={() => onActive(p.city)}
                      onBlur={() => onActive(null)}
                      onClick={() => onActive(active === p.city ? null : p.city)}
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
