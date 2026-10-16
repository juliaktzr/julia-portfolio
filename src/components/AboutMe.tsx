import { lazy, Suspense, useState } from 'react'
import { about } from '../content'
import { Section } from './Section'

// The basemap is about 60 KB of path data, so it loads in its own chunk.
const TravelMap = lazy(() => import('./TravelMap').then((mod) => ({ default: mod.TravelMap })))

/** Hobbies and the travel map. Photos live on the map, shown per city. */
export function AboutMe() {
  const [active, setActive] = useState<string | null>(null)

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
    </Section>
  )
}
