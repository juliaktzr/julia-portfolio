import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { nav, site } from '../content'
import type { Theme } from '../hooks/useTheme'
import { buttonStyles } from './buttonStyles'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

type Props = { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void }

/** True once less than this share of the hero is on screen. */
const HERO_VISIBLE = 0.3

/**
 * Fixed bar, hidden over the hero and slid in once most of it has scrolled
 * away. It also shows while anything inside it has focus or the mobile menu is open.
 */
export function Nav({ theme, onToggleTheme, onOpenPalette }: Props) {
  const [pastHero, setPastHero] = useState(false)
  const [focused, setFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const io = new IntersectionObserver(([entry]) => setPastHero(entry.intersectionRatio < HERO_VISIBLE), {
      threshold: HERO_VISIBLE,
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const onBlur = (e: FocusEvent) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node | null)) setFocused(false)
  }

  const shown = pastHero || focused || menuOpen

  return (
    <header
      ref={headerRef}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
      aria-hidden={shown ? undefined : true}
      className={`fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur transition-[transform,opacity] duration-300 ease-out motion-reduce:translate-y-0 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      {/* relative wrapper so the mobile menu can hang below the bar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label={site.name} className="font-display text-xl font-semibold tracking-tight">
          JK<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command palette"
            className="hidden h-8 items-center rounded-md border border-line px-2 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent-ink sm:inline-flex"
          >
            ⌘K
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={site.resumeUrl}
            download={site.resumeFilename}
            className={`inline-flex h-9 items-center gap-1 rounded-full px-4 text-sm font-medium transition-colors ${buttonStyles.secondary}`}
          >
            Resume <span aria-hidden="true">↓</span>
            <span className="sr-only"> (PDF)</span>
          </a>
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  )
}
