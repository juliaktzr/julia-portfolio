import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, type Dispatch, type SetStateAction } from 'react'
import { nav } from '../content'

type Props = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }

/**
 * Section links for narrow screens. Rendered as a disclosure under the header.
 * The header owns `open` so it can stay on screen while the menu is showing.
 */
export function MobileMenu({ open, setOpen }: Props) {
  const reduce = useReducedMotion() ?? false
  const id = useId()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    firstLink.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-ink"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id={id}
            aria-label="Sections"
            key="menu"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur"
          >
            <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base text-text hover:bg-surface"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
