import { lazy, Suspense, useRef, useState } from 'react'
import { about } from '../content'
import { Section } from './Section'

// The basemap is about 60 KB of path data, so it loads in its own chunk.
const TravelMap = lazy(() => import('./TravelMap').then((mod) => ({ default: mod.TravelMap })))

/** Hobbies, the travel map, and favorites. Photos live on the map, shown per city. */
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

      <Favorites />
    </Section>
  )
}

const cardLabel = 'font-mono text-xs uppercase tracking-[0.18em] text-muted'

/** Favorite photo on the left, with favorite book and languages stacked beside it. */
function Favorites() {
  const { favoritePhoto: photo, favoriteBook: book, languages } = about
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <figure className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface/60 md:row-span-2">
        {/* Absolutely placed so the cards beside it, not the photo, set the row height. */}
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="group relative block h-64 w-full cursor-zoom-in md:h-auto md:min-h-56 md:flex-1"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[50%_60%]"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[11px] text-text opacity-90 transition-opacity group-hover:opacity-100">
            View full photo
          </span>
        </button>
        <figcaption className="p-4">
          <p className={cardLabel}>{photo.label}</p>
          <p className="mt-1 text-sm text-text">{photo.place}</p>
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

      {/* Full photo at its own proportions. Esc, the close button, or a click outside closes it. */}
      <dialog
        ref={dialog}
        aria-label={`${photo.label}: ${photo.place}`}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="photo-viewer m-auto max-h-none max-w-none bg-transparent p-0"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="block h-auto max-h-[85svh] w-auto max-w-[92vw] rounded-lg"
        />
        <div className="mt-2 flex items-center justify-between gap-4 text-sm text-white/85">
          <span>{photo.place}</span>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="rounded-full border border-white/30 px-3 py-1 text-white hover:border-white"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  )
}
