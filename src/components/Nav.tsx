import { nav, site } from '../content'
import type { Theme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'

type Props = { theme: Theme; onToggleTheme: () => void }

export function Nav({ theme, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
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
          <kbd className="hidden rounded-md border border-line px-2 py-1 font-mono text-xs text-muted sm:inline-block">
            ⌘K
          </kbd>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
