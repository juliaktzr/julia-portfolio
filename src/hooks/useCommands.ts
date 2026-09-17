import { useMemo } from 'react'
import { nav, site } from '../content'
import type { Theme } from './useTheme'

export type Command = {
  id: string
  label: string
  hint?: string
  group: 'Navigate' | 'Actions'
  run: () => void
}

type Deps = { theme: Theme; onToggleTheme: () => void; onOpenTerminal: () => void }

export function useCommands({ theme, onToggleTheme, onOpenTerminal }: Deps) {
  return useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      document.querySelector<HTMLElement>(href)?.scrollIntoView({ block: 'start' })
      history.replaceState(null, '', href)
      document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true })
    }
    return [
      { id: 'top', label: 'Top', hint: 'Back to the start', group: 'Navigate', run: go('#top') },
      ...nav.map<Command>((n) => ({
        id: n.href,
        label: n.label,
        hint: n.href,
        group: 'Navigate',
        run: go(n.href),
      })),
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
        hint: 'Toggle theme',
        group: 'Actions',
        run: onToggleTheme,
      },
      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: site.email,
        group: 'Actions',
        run: () => {
          navigator.clipboard?.writeText(site.email).catch(() => {})
        },
      },
      {
        id: 'resume',
        label: 'Download resume',
        hint: 'PDF',
        group: 'Actions',
        run: () => {
          const a = document.createElement('a')
          a.href = site.resumeUrl
          a.download = site.resumeFilename
          a.click()
        },
      },
      { id: 'terminal', label: 'Open terminal', hint: 'or press ~', group: 'Actions', run: onOpenTerminal },
    ]
  }, [theme, onToggleTheme, onOpenTerminal])
}
