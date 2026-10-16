import { lazy, Suspense, useState } from 'react'
import { about } from '../content'
import { PhotoViewer, type Gallery } from './PhotoViewer'
import { Section } from './Section'

// The basemap is about 60 KB of path data, so it loads in its own chunk.
const TravelMap = lazy(() => import('./TravelMap').then((mod) => ({ default: mod.TravelMap })))

/** Hobbies, the travel map, and favorites. Photos live on the map, shown per city. */
export function AboutMe() {
  const [active, setActive] = useState<string | null>(null)
  const [gallery, setGallery] = useState<Gallery | null>(null)

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
        <TravelMap active={active} onActive={setActive} onOpen={setGallery} />
      </Suspense>

      <Favorites onOpen={setGallery} />
      <PhotoViewer gallery={gallery} onClose={() => setGallery(null)} />
    </Section>
  )
}

const cardLabel = 'font-mono text-xs uppercase tracking-[0.18em] text-muted'

/** Favorite photos on the left, with favorite book and languages stacked beside them. */
function Favorites({ onOpen }: { onOpen: (gallery: Gallery) => void }) {
  const { favoritePhotos: favs, favoriteBook: book, languages } = about

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <figure className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface/60 md:row-span-2">
        {/* Absolutely placed so the cards beside it, not the photos, set the row height. */}
        <div className="relative h-72 md:h-auto md:min-h-64 md:flex-1">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1">
            {favs.photos.map((ph, i) => (
              <button
                key={ph.src}
                type="button"
                onClick={() => onOpen({ title: favs.label, photos: favs.photos, start: i })}
                aria-label={`Open ${favs.label.toLowerCase()}, starting with ${ph.place}`}
                className={`group relative block cursor-zoom-in overflow-hidden rounded-lg ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={ph.src}
                  alt={ph.alt}
                  width={ph.width}
                  height={ph.height}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_60%] transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
        <figcaption className="p-4">
          <p className={cardLabel}>{favs.label}</p>
        </figcaption>
      </figure>

      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <p className={cardLabel}>{book.label}</p>
        <p className="mt-2 font-display text-lg font-semibold leading-tight">{book.title}</p>
        <p className="mt-1 text-sm text-muted">{book.author}</p>
      </div>

      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <p className={cardLabel}>{languages.label}</p>
        <ul className="mt-3 space-y-3">
          {languages.items.map((l) => (
            <li key={l.name} className="flex items-baseline justify-between gap-3">
              <span>
                <span className="font-display text-lg font-semibold">{l.hello}</span>
                <span className="ml-2 text-sm text-muted">{l.name}</span>
              </span>
              <span className="font-mono text-[11px] text-accent-ink">{l.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
