import { lazy, Suspense, useRef, useState } from 'react'
import { about, photos, travel } from '../content'
import { Section } from './Section'

// The basemap is about 60 KB of path data, so it loads in its own chunk.
const TravelMap = lazy(() => import('./TravelMap').then((mod) => ({ default: mod.TravelMap })))

const onMap = new Set(travel.places.map((p) => p.city))

/** Hobbies, the travel map, and a scrolling strip of photos. Hovering a photo lights up its pin. */
export function AboutMe() {
  const [active, setActive] = useState<string | null>(null)
  const strip = useRef<HTMLUListElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = strip.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <Section id={about.id} eyebrow={about.eyebrow} title={about.title} intro={about.intro}>
      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Hobbies">
        {about.hobbies.map((h) => (
          <li
            key={h}
            className="rounded-full border border-accent-2/35 px-3 py-1 font-mono text-xs text-accent-2"
          >
            {h}
          </li>
        ))}
      </ul>

      <Suspense
        fallback={
          <div className="print-hidden aspect-[10/7] rounded-xl border border-line lg:aspect-[1.83/1]" />
        }
      >
        <TravelMap active={active} onActive={setActive} />
      </Suspense>

      <div className="print-hidden mt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Photos</p>
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? 'Previous photos' : 'Next photos'}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-text"
              >
                <span aria-hidden="true">{dir < 0 ? '←' : '→'}</span>
              </button>
            ))}
          </div>
        </div>
        <ul
          ref={strip}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
        >
          {photos.map((p) => (
            <li
              key={p.src}
              className="shrink-0 snap-start"
              onMouseEnter={() => onMap.has(p.place) && setActive(p.place)}
              onMouseLeave={() => setActive(null)}
            >
              <figure>
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  className="h-64 w-auto rounded-lg border border-line object-cover sm:h-72"
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                />
                <figcaption className="mt-1.5 font-mono text-xs text-muted">{p.place}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
