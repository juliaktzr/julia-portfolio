import type { Line } from './types'

/* -------------------------------------------------------------------------
   Games that take over the prompt. Each returns new output and its next state
   (null when finished). Type quit in any game to leave it.
------------------------------------------------------------------------- */

export type HangmanState = { kind: 'hangman'; word: string; hint: string; guessed: string[]; wrong: number }
export type GuessState = { kind: 'guess'; target: number; tries: number }
export type GameState = HangmanState | GuessState

const MAX_WRONG = 6

// Gallows stages, 0 to 6 wrong guesses.
const STAGES = [
  ['  +---+', '  |   |', '      |', '      |', '      |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', '      |', '      |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', '  |   |', '      |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', ' /|   |', '      |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', ' /|\\  |', '      |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', ' /|\\  |', ' /    |', '      |', '======='],
  ['  +---+', '  |   |', '  O   |', ' /|\\  |', ' / \\  |', '      |', '======='],
]

export type WordBank = { word: string; hint: string }[]

const out = (text: string): Line => ({ kind: 'out', text })
const err = (text: string): Line => ({ kind: 'err', text })

function masked(s: HangmanState) {
  return s.word
    .split('')
    .map((c) => (s.guessed.includes(c) ? c : '_'))
    .join(' ')
}

function board(s: HangmanState): Line[] {
  const wrongLetters = s.guessed.filter((c) => !s.word.includes(c))
  return [
    ...STAGES[s.wrong].map(out),
    out(''),
    out(`Word:  ${masked(s)}`),
    out(`Hint:  ${s.hint}`),
    out(`Wrong: ${wrongLetters.join(' ') || 'none'}  (${MAX_WRONG - s.wrong} left)`),
  ]
}

export function startHangman(bank: WordBank): { lines: Line[]; state: HangmanState } {
  const pick = bank[Math.floor(Math.random() * bank.length)]
  const state: HangmanState = {
    kind: 'hangman',
    word: pick.word.toLowerCase(),
    hint: pick.hint,
    guessed: [],
    wrong: 0,
  }
  return {
    lines: [out('hangman: guess a letter, or the whole word. Type quit to stop.'), out(''), ...board(state)],
    state,
  }
}

export function playHangman(s: HangmanState, raw: string): { lines: Line[]; state: GameState | null } {
  const g = raw.trim().toLowerCase()
  if (g === 'quit' || g === 'exit')
    return { lines: [out(`The word was ${s.word}. Thanks for playing.`)], state: null }
  if (!/^[a-z]+$/.test(g)) return { lines: [err('Letters only.')], state: s }

  if (g.length > 1) {
    if (g === s.word) {
      const done = { ...s, guessed: Array.from(new Set([...s.guessed, ...s.word])) }
      return { lines: [...board(done), out(''), out('You got it. Nice.')], state: null }
    }
    const next = { ...s, wrong: s.wrong + 1 }
    if (next.wrong >= MAX_WRONG)
      return { lines: [...board(next), out(''), err(`Out of guesses. The word was ${s.word}.`)], state: null }
    return { lines: [err(`Not ${g}.`), ...board(next)], state: next }
  }

  if (s.guessed.includes(g)) return { lines: [out(`Already tried ${g}.`), ...board(s)], state: s }
  const next: HangmanState = {
    ...s,
    guessed: [...s.guessed, g],
    wrong: s.word.includes(g) ? s.wrong : s.wrong + 1,
  }
  const solved = next.word.split('').every((c) => next.guessed.includes(c))
  if (solved) return { lines: [...board(next), out(''), out('You got it. Nice.')], state: null }
  if (next.wrong >= MAX_WRONG)
    return { lines: [...board(next), out(''), err(`Out of guesses. The word was ${s.word}.`)], state: null }
  return { lines: board(next), state: next }
}

export function startGuess(): { lines: Line[]; state: GuessState } {
  return {
    lines: [out('guess: I picked a number from 1 to 100. Type a number. Type quit to stop.')],
    state: { kind: 'guess', target: 1 + Math.floor(Math.random() * 100), tries: 0 },
  }
}

export function playGuess(s: GuessState, raw: string): { lines: Line[]; state: GameState | null } {
  const g = raw.trim().toLowerCase()
  if (g === 'quit' || g === 'exit') return { lines: [out(`It was ${s.target}.`)], state: null }
  const n = Number(g)
  if (!Number.isInteger(n) || n < 1 || n > 100)
    return { lines: [err('A whole number from 1 to 100, please.')], state: s }
  const tries = s.tries + 1
  if (n === s.target)
    return { lines: [out(`${n} is it. Got it in ${tries} ${tries === 1 ? 'try' : 'tries'}.`)], state: null }
  return { lines: [out(n < s.target ? `${n} is too low.` : `${n} is too high.`)], state: { ...s, tries } }
}

export function playGame(state: GameState, raw: string) {
  return state.kind === 'hangman' ? playHangman(state, raw) : playGuess(state, raw)
}

export function gamePrompt(state: GameState) {
  return state.kind === 'hangman' ? 'hangman' : 'guess'
}

/** One-shot rock, paper, scissors. */
export function rps(choice: string): Line[] {
  const moves = ['rock', 'paper', 'scissors'] as const
  const you = choice.trim().toLowerCase()
  if (!moves.includes(you as (typeof moves)[number])) return [err('Usage: rps rock | paper | scissors')]
  const me = moves[Math.floor(Math.random() * 3)]
  const beats: Record<string, string> = { rock: 'scissors', paper: 'rock', scissors: 'paper' }
  const result = you === me ? 'Draw.' : beats[you] === me ? 'You win.' : 'I win.'
  return [out(`You: ${you}. Me: ${me}. ${result}`)]
}
