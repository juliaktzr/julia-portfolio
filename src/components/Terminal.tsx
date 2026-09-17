import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { site } from '../content'
import type { Theme } from '../hooks/useTheme'
import { COMMAND_NAMES, runCommand } from '../terminal/commands'
import { gamePrompt, playGame, type GameState } from '../terminal/games'
import type { Line } from '../terminal/types'

type Props = {
  open: boolean
  onClose: () => void
  theme: Theme
  onToggleTheme: () => void
  onSetTheme: (t: Theme) => void
}

const WELCOME: Line[] = [{ kind: 'out', text: `${site.name} portfolio shell. Type help to see commands.` }]

export function Terminal({ open, onClose, theme, onToggleTheme, onSetTheme }: Props) {
  const reduce = useReducedMotion() ?? false
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState<number | null>(null)
  const [game, setGame] = useState<GameState | null>(null)
  const openedAt = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      openedAt.current = Date.now()
      returnFocus.current = document.activeElement as HTMLElement | null
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  // Leaving the terminal also leaves any game in progress.
  const close = () => {
    setGame(null)
    onClose()
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const print = (...out: Line[]) => setLines((l) => [...l, ...out])

  const execute = (raw: string) => {
    const echo: Line = { kind: 'in', text: raw, prompt: game ? `${gamePrompt(game)}❯` : '❯' }

    if (game) {
      const { lines: outLines, state } = playGame(game, raw)
      setGame(state)
      print(echo, ...outLines)
      return
    }

    const result = runCommand(raw, {
      theme,
      setTheme: onSetTheme,
      toggleTheme: onToggleTheme,
      close,
      history,
      openedAt: openedAt.current,
    })
    if (result.clear) {
      setLines([])
      return
    }
    if (result.game !== undefined) setGame(result.game)
    print(echo, ...result.lines)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    execute(input)
    if (input.trim()) setHistory((h) => [...h, input])
    setHistIdx(null)
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown' && histIdx !== null) {
      e.preventDefault()
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(null)
        setInput('')
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (game) return
      const match = COMMAND_NAMES.find((c) => c.startsWith(input.toLowerCase()) && input)
      if (match) setInput(match)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="terminal"
          role="dialog"
          aria-modal="true"
          aria-label="Terminal"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-h-[60vh] w-auto max-w-2xl flex-col overflow-hidden rounded-xl border border-line bg-bg font-mono text-sm shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)] sm:inset-x-6 sm:bottom-6"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
            <span>julia@vanderbilt ~ zsh</span>
            <button
              type="button"
              onClick={close}
              className="rounded px-2 py-0.5 text-muted hover:text-text"
              aria-label="Close terminal"
            >
              esc
            </button>
          </div>
          <div ref={scrollRef} className="min-h-[10rem] flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
            {lines.map((l, i) => (
              <p
                key={i}
                className={`whitespace-pre-wrap break-words ${
                  l.kind === 'in' ? 'text-accent-ink' : l.kind === 'err' ? 'text-pop' : 'text-text'
                }`}
              >
                {l.kind === 'in' ? `${l.prompt ?? '❯'} ${l.text}` : l.text}
              </p>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-2">
            <span aria-hidden="true" className="shrink-0 text-accent-ink">
              {game ? `${gamePrompt(game)}❯` : '❯'}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label={game ? `${gamePrompt(game)} input` : 'Terminal input'}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="h-8 w-full bg-transparent outline-none"
            />
          </form>
        </m.div>
      )}
    </AnimatePresence>
  )
}
