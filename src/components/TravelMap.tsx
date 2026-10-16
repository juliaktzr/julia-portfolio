import { m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { photos, travel } from '../content'
import type { Gallery } from './PhotoViewer'
import { MAP_HEIGHT, MAP_WIDTH, otherPath, project, visitedPath } from '../travel/europeMap'

const STEP = 0.16
/** Stops closer than this (in map units) to the previous stop on a trip share its pin. */
const CLUSTER = 14
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

const hasPhotos = new Set(photos.map((p) => p.place))

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <title>has photos</title>
      <path d="M2 5.5h2.5L6 3.5h4l1.5 2H14v7H2z" strokeLinejoin="round" />
      <circle cx="8" cy="9" r="2.2" />
    </svg>
  )
}

type Props = {
  active: string | null
  onActive: (city: string | null) => void
  /** Opens the photo viewer for a city's trip. Only called when there are photos. */
  onOpen: (gallery: Gallery) => void
}

/**
 * Europe map with arcs flying out from Madrid to every place visited, drawn in
 * list order when scrolled into view. Hovering or tapping a pin or a place in
 * the list lights up its arc and shows its name and any photos from there.
 */
export function TravelMap({ active, onActive, onOpen }: Props) {
  const reduce = useReducedMotion() ?? false
  const [boxRef, box] = useBoxSize()
  const figureRef = useRef<HTMLElement>(null)

  // On touch screens there is no mouseleave, so a tap outside the map clears the selection.
  useEffect(() => {
    if (!active) return
    const onDown = (e: PointerEvent) => {
      if (!figureRef.current?.contains(e.target as Node)) onActive(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [active, onActive])

  const home = travel.places.find((p) => p.city === travel.home)!
  const origin = project(home.lat, home.lon)
  const pins = travel.places.map((p) => ({ ...p, at: project(p.lat, p.lon) }))
  const pinOf = (city: string) => pins.find((p) => p.city === city)!

  // A stop too close to the previous one on its trip to show as its own dot
  // (Burano next to Venice) shares that trip's first pin instead.
  const leadOf = (city: string): string => {
    const p = pinOf(city)
    const prev = p.from ? pinOf(p.from) : undefined
    if (!prev) return city
    const dist = Math.hypot(p.at[0] - prev.at[0], p.at[1] - prev.at[1])
    return dist < CLUSTER ? leadOf(prev.city) : city
  }
  const groupOf = (lead: string) => pins.filter((p) => leadOf(p.city) === lead)

  const trips = pins
    .filter((p) => p.city !== home.city && leadOf(p.city) === p.city)
    .map((p, i) => {
      // Legs of a longer trip start from the previous stop instead of home.
      const start = (p.from && pinOf(p.from).at) || origin
      return { ...p, group: groupOf(p.city), d: arc(start, p.at), delay: 0.3 + i * STEP }
    })

  const countries = [...new Set(travel.places.map((p) => p.country))]
  const byCountry = countries.map((c) => ({
    country: c,
    cities: travel.places.filter((p) => p.country === c),
  }))

  // The svg uses "slice", so the map is scaled to cover the box and centered.
  const scale = Math.max(box.w / MAP_WIDTH, box.h / MAP_HEIGHT)
  const ox = (box.w - MAP_WIDTH * scale) / 2
  const oy = (box.h - MAP_HEIGHT * scale) / 2
  const activeLead = active ? leadOf(active) : null
  const current = activeLead ? pinOf(activeLead) : undefined
  const group = activeLead ? groupOf(activeLead) : []
  const shots = photos.filter((ph) => group.some((g) => g.city === ph.place))
  const tip = current && { x: ox + current.at[0] * scale, y: oy + current.at[1] * scale }
  const tipBelow = tip ? tip.y < (shots.length ? 210 : 70) : false
  // One photo shows large; two or three sit side by side.
  const tipWidth = Math.min(
    shots.length === 0 ? 140 : shots.length === 1 ? 200 : shots.length * 110 + 8,
    box.w - 16,
  )
  const tipLeft = tip ? Math.min(Math.max(tip.x - tipWidth / 2, 8), box.w - tipWidth - 8) : 0

  // Clicking a place selects it and, when its trip has photos, opens them full size.
  const select = (city: string) => {
    onActive(city)
    const grp = groupOf(leadOf(city))
    const shots = photos.filter((ph) => grp.some((g) => g.city === ph.place))
    if (!shots.length) return
    const first = shots.findIndex((ph) => ph.place === city)
    onOpen({
      title: grp.map((g) => g.city).join(', '),
      subtitle: city === home.city ? 'Home base' : pinOf(city).country,
      photos: shots,
      start: Math.max(first, 0),
    })
  }

  const pinEvents = (city: string) => ({
    onMouseEnter: () => onActive(city),
    onMouseLeave: () => onActive(null),
    onClick: () => select(city),
  })

  return (
    <figure
      ref={figureRef}
      className="print-hidden overflow-hidden rounded-xl border border-line bg-surface/60"
    >
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div ref={boxRef} className="relative border-b border-line bg-bg/60 lg:border-b-0 lg:border-r">
          {/* From lg up the map fills its column, cropping open sea at the sides. */}
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
            className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full"
            role="img"
            aria-label={`Map of Europe with routes from ${travel.home} to ${trips.map((t) => t.group.map((g) => g.city).join(' and ')).join(', ')}`}
          >
            <path d={otherPath} className="fill-line stroke-bg" strokeWidth={0.6} />
            <path d={visitedPath} className="fill-accent/25 stroke-bg" strokeWidth={0.6} />

            {trips.map((t) => {
              const on = activeLead === t.city
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
              const on = activeLead === t.city
              const many = t.group.length > 1
              return (
                <m.circle
                  key={t.city}
                  cx={t.at[0]}
                  cy={t.at[1]}
                  r={(on ? 6 : 3.6) + (many ? 1.4 : 0)}
                  className={many ? 'fill-accent-ink stroke-accent' : 'fill-accent-ink stroke-bg'}
                  strokeWidth={many ? 3 : 1.5}
                  strokeOpacity={many ? 0.45 : 1}
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
            {[home, ...trips].map((p) => (
              <circle
                key={p.city}
                cx={pinOf(p.city).at[0]}
                cy={pinOf(p.city).at[1]}
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
              {shots.length > 0 && (
                <div className="flex gap-1 p-1">
                  {shots.map((ph) => (
                    <img
                      key={ph.src}
                      src={ph.src}
                      alt=""
                      width={ph.width}
                      height={ph.height}
                      className={`block min-w-0 flex-1 rounded-md object-cover ${shots.length === 1 ? 'h-36' : 'h-32'}`}
                    />
                  ))}
                </div>
              )}
              <p className="px-3 pt-1.5 pb-2 leading-tight">
                <span className="block text-sm font-semibold text-text">
                  {group.map((g) => g.city).join(', ')}
                </span>
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
          <p className="mt-1 text-xs text-muted">{travel.hint}</p>
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
                      onClick={() => select(p.city)}
                      aria-pressed={active === p.city}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                        active === p.city
                          ? 'border-accent bg-accent text-bg'
                          : activeLead && leadOf(p.city) === activeLead
                            ? 'border-accent bg-accent/15 text-text'
                            : 'border-line bg-bg/70 text-text hover:border-accent'
                      }`}
                    >
                      {p.city}
                      {hasPhotos.has(p.city) && <CameraIcon />}
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
