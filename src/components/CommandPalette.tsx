import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCommands, type Command } from '../hooks/useCommands'
import type { Theme } from '../hooks/useTheme'

type Props = {
  open: boolean
  onClose: () => void
  theme: Theme
  onToggleTheme: () => void
  onOpenTerminal: () => void
}

export function CommandPalette({ open, onClose, theme, onToggleTheme, onOpenTerminal }: Props) {
  const reduce = useReducedMotion() ?? false
  const returnFocus = useRef<HTMLElement | null>(null)

  // Remember where focus was and restore it on close.
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="palette"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-text/30 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <Panel
            reduce={reduce}
            onClose={onClose}
            theme={theme}
            onToggleTheme={onToggleTheme}
            onOpenTerminal={onOpenTerminal}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}

type PanelProps = Omit<Props, 'open'> & { reduce: boolean }

/** Mounted fresh each time the palette opens, so query and selection reset. */
function Panel({ reduce, onClose, theme, onToggleTheme, onOpenTerminal }: PanelProps) {
  const commands = useCommands({ theme, onToggleTheme, onOpenTerminal })
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView?.({ block: 'nearest' })
  }, [active])

  const run = (c: Command) => {
    c.run()
    if (c.id === 'copy-email') {
      setStatus('Email copied')
      window.setTimeout(onClose, 700)
    } else {
      onClose()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (results.length ? (a + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const c = results[active]
      if (c) run(c)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog: the input is the only focusable control.
      e.preventDefault()
    }
  }

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-bg shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]"
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <span aria-hidden="true" className="font-mono text-accent-ink">
          ❯
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          placeholder="Jump to a section or run an action"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
          esc
        </kbd>
      </div>
      <ul
        id="palette-list"
        ref={listRef}
        role="listbox"
        aria-label="Commands"
        className="max-h-[50vh] overflow-y-auto py-2"
      >
        {results.length === 0 && (
          <li className="px-4 py-3 font-mono text-sm text-muted" aria-live="polite">
            No matches.
          </li>
        )}
        {results.map((c, i) => {
          const showGroup = i === 0 || results[i - 1].group !== c.group
          return (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(c)}
              className={`mx-2 cursor-pointer rounded-md px-3 py-2 ${
                i === active ? 'bg-surface text-text' : 'text-muted'
              }`}
            >
              {showGroup && (
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-2">
                  {c.group}
                </span>
              )}
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-sm">{c.label}</span>
                {c.hint && <span className="truncate font-mono text-xs text-muted">{c.hint}</span>}
              </span>
            </li>
          )
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
        <span aria-live="polite">{status || 'Use arrow keys, Enter to run'}</span>
        <span>⌘K</span>
      </div>
    </m.div>
  )
}
