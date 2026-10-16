import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Photo } from '../content'

export type Gallery = { title: string; subtitle?: string; photos: Photo[]; start?: number }

type Props = {
  gallery: Gallery | null
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Full-screen photo viewer. Photos deal in as a fanned stack, then the
 * current one slides in large. Arrow keys, swipes, the thumbnails, or the
 * buttons move between photos. Esc, Close, or a click on the backdrop closes it.
 */
export function PhotoViewer({ gallery, onClose }: Props) {
  const reduce = useReducedMotion() ?? false
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const swipeX = useRef<number | null>(null)

  // Start at the requested photo whenever a new gallery opens.
  const [shown, setShown] = useState(gallery)
  if (gallery !== shown) {
    setShown(gallery)
    setIndex(gallery?.start ?? 0)
  }

  const photos = gallery?.photos ?? []
  const count = photos.length

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (gallery) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [gallery])

  const go = (step: number) => {
    if (count < 2) return
    setDir(step)
    setIndex((i) => (i + step + count) % count)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const photo = photos[index]

  return (
    <dialog
      ref={dialog}
      aria-label={gallery ? `Photos: ${gallery.title}` : 'Photos'}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="photo-viewer m-auto max-h-none max-w-none bg-transparent p-0 text-white"
    >
      {gallery && photo && (
        <div className="flex w-[min(92vw,56rem)] flex-col items-center gap-4">
          <div className="flex w-full items-baseline justify-between gap-4">
            <div>
              <p className="font-display text-xl font-semibold sm:text-2xl">{gallery.title}</p>
              {gallery.subtitle && <p className="font-mono text-xs text-white/60">{gallery.subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/30 px-3 py-1 text-sm hover:border-white"
            >
              Close
            </button>
          </div>

          <div
            className="relative flex h-[min(70svh,40rem)] w-full touch-pan-y items-center justify-center"
            onPointerDown={(e) => (swipeX.current = e.clientX)}
            onPointerUp={(e) => {
              if (swipeX.current === null) return
              const dx = e.clientX - swipeX.current
              swipeX.current = null
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
            }}
          >
            <AnimatePresence initial={!reduce} custom={dir} mode="popLayout">
              <m.img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                draggable={false}
                custom={dir}
                variants={{
                  enter: (d: number) => ({
                    opacity: 0,
                    x: reduce ? 0 : d * 60,
                    scale: reduce ? 1 : 0.94,
                    rotate: reduce ? 0 : d * 2,
                  }),
                  center: { opacity: 1, x: 0, scale: 1, rotate: 0 },
                  exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -60, scale: reduce ? 1 : 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0.15 : 0.45, ease }}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
              />
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg backdrop-blur hover:bg-black/70"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg backdrop-blur hover:bg-black/70"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
          </div>

          <p className="font-mono text-xs text-white/70" aria-live="polite">
            {photo.place}
            {count > 1 && ` · ${index + 1} / ${count}`}
          </p>

          {count > 1 && (
            <ul className="flex gap-2">
              {photos.map((p, i) => (
                <m.li
                  key={p.src}
                  initial={reduce ? false : { opacity: 0, y: 24, rotate: (i - (count - 1) / 2) * 8 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1)
                      setIndex(i)
                    }}
                    aria-label={`Show photo ${i + 1} of ${count}`}
                    aria-current={i === index}
                    className={`block overflow-hidden rounded-md ring-2 transition ${
                      i === index ? 'ring-white' : 'opacity-55 ring-transparent hover:opacity-100'
                    }`}
                  >
                    <img src={p.src} alt="" className="h-14 w-14 object-cover sm:h-16 sm:w-16" />
                  </button>
                </m.li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  )
}
