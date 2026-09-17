import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readInitial(): Theme {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  return systemTheme()
}

/**
 * Theme state. Defaults to the system preference. A manual toggle is stored in
 * localStorage; clearing it (via `reset`) returns to following the system.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Follow system changes only while the user has not chosen manually.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem(STORAGE_KEY)
      } catch {
        /* storage unavailable */
      }
      if (stored !== 'light' && stored !== 'dark') setThemeState(systemTheme())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggle }
}
