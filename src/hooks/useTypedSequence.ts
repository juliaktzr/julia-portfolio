import { useEffect, useState } from 'react'

export type TypedLine = { cmd: string; out: string }

export type TypedState = {
  /** Index of the line currently being typed or revealed. */
  index: number
  /** Number of characters of the current command shown so far. */
  typed: number
  /** Whether the current line's output is visible. */
  outShown: boolean
  /** True once every line is complete. */
  done: boolean
}

type Options = {
  charDelay?: number
  outDelay?: number
  lineDelay?: number
  startDelay?: number
  /** Skip animation entirely and show the finished state. */
  instant?: boolean
}

/**
 * Drives a terminal-style typing sequence: type a command character by
 * character, reveal its output, pause, move to the next line.
 */
export function useTypedSequence(lines: TypedLine[], options: Options = {}): TypedState {
  const { charDelay = 55, outDelay = 350, lineDelay = 650, startDelay = 400, instant = false } = options

  const finished: TypedState = {
    index: lines.length - 1,
    typed: lines[lines.length - 1]?.cmd.length ?? 0,
    outShown: true,
    done: true,
  }

  const [state, setState] = useState<TypedState>(() =>
    instant ? finished : { index: 0, typed: 0, outShown: false, done: false },
  )

  useEffect(() => {
    if (instant) {
      setState(finished)
      return
    }
    if (state.done) return

    const line = lines[state.index]
    if (!line) return

    let delay: number
    let next: TypedState

    if (state.typed === 0 && state.index === 0 && !state.outShown) {
      delay = startDelay
      next = { ...state, typed: 1 }
    } else if (state.typed < line.cmd.length) {
      delay = charDelay
      next = { ...state, typed: state.typed + 1 }
    } else if (!state.outShown) {
      delay = outDelay
      next = { ...state, outShown: true }
    } else if (state.index < lines.length - 1) {
      delay = lineDelay
      next = { index: state.index + 1, typed: 0, outShown: false, done: false }
    } else {
      delay = 0
      next = { ...state, done: true }
    }

    const id = window.setTimeout(() => setState(next), delay)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, instant, lines])

  return state
}
