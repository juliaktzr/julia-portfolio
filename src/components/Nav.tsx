import { nav, site } from '../content'
import type { Theme } from '../hooks/useTheme'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

type Props = { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void }

export function Nav({ theme, onToggleTheme, onOpenPalette }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      {/* relative wrapper so the mobile menu can hang below the bar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
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
            title="Command palette (Cmd K)"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-ink"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
