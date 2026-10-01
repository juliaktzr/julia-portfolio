import { caseStudies, contact, education, experience, hero, interests, nav, site, skills } from '../content'
import type { Theme } from '../hooks/useTheme'
import { startHangman, type GameState, type WordBank } from './games'
import type { Line } from './types'

export type Context = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  close: () => void
  history: string[]
}

export type Result = {
  lines: Line[]
  /** Set to start a game, or explicitly null to keep none. */
  game?: GameState | null
  clear?: boolean
}

const out = (text: string): Line => ({ kind: 'out', text })
const err = (text: string): Line => ({ kind: 'err', text })

type Command = { name: string; usage?: string; desc: string; group: 'Info' | 'Navigate' | 'Shell' }

export const COMMANDS: Command[] = [
  { name: 'help', desc: 'List commands', group: 'Shell' },
  { name: 'about', desc: 'Who I am', group: 'Info' },
  { name: 'projects', desc: 'Selected work', group: 'Info' },
  { name: 'experience', desc: 'Roles, newest first', group: 'Info' },
  { name: 'education', desc: 'Schools', group: 'Info' },
  { name: 'skills', desc: 'Grouped skills', group: 'Info' },
  { name: 'contact', desc: 'Email, LinkedIn, GitHub', group: 'Info' },
  { name: 'ls', desc: 'List sections', group: 'Navigate' },
  { name: 'cd', usage: 'cd <section>', desc: 'Scroll to a section', group: 'Navigate' },
  {
    name: 'open',
    usage: 'open github | linkedin | demo | source',
    desc: 'Open a link in a new tab',
    group: 'Navigate',
  },
  { name: 'resume', desc: 'Open the resume PDF', group: 'Navigate' },
  { name: 'theme', usage: 'theme [light | dark]', desc: 'Toggle or set the theme', group: 'Shell' },
  { name: 'hangman', desc: 'Guess a word from this site', group: 'Shell' },
  { name: 'history', desc: 'Commands you have run', group: 'Shell' },
  { name: 'clear', desc: 'Clear the screen', group: 'Shell' },
  { name: 'exit', desc: 'Close the terminal', group: 'Shell' },
]

export const COMMAND_NAMES = COMMANDS.map((c) => c.name)

const sections = nav.map((n) => ({ id: n.href.slice(1), label: n.label }))

/** Words for hangman, all pulled from site content. */
const wordBank: WordBank = [
  ...skills.groups.flatMap((g) =>
    g.items
      .map((i) => i.replace(/\s*\(.*\)/, ''))
      .filter((w) => /^[A-Za-z]{4,}$/.test(w))
      .map((w) => ({ word: w, hint: `${g.name} skill` })),
  ),
  { word: 'Vanderbilt', hint: 'Where I study' },
  { word: 'Nashville', hint: 'City I study in' },
  { word: 'Madrid', hint: 'Where I studied abroad' },
  { word: 'Pegasystems', hint: 'Where I am now' },
  { word: 'espresso', hint: 'Half of this color palette' },
  { word: 'Fraunces', hint: 'The font my name is set in' },
  ...caseStudies.flatMap((c) =>
    c.stack
      .filter((w) => /^[A-Za-z]{4,}$/.test(w))
      .map((w) => ({ word: w, hint: `In the ${c.company} stack` })),
  ),
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', `#${id}`)
  return true
}

export function runCommand(raw: string, ctx: Context): Result {
  const [name = '', ...rest] = raw.trim().split(/\s+/)
  const cmd = name.toLowerCase()
  const arg = rest.join(' ')

  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help': {
      const groups = ['Info', 'Navigate', 'Shell'] as const
      return {
        lines: groups.flatMap((g) => [
          out(`${g}:`),
          ...COMMANDS.filter((c) => c.group === g).map((c) =>
            out(`  ${(c.usage ?? c.name).padEnd(38)} ${c.desc}`),
          ),
        ]),
      }
    }
    case 'about':
      return { lines: [out(site.tagline), out(hero.meta), out(hero.status), out(''), out(interests.body)] }
    case 'projects':
      return {
        lines: caseStudies.flatMap((c) => [
          out(`${c.company}: ${c.title}`),
          out(`  Stack: ${c.stack.join(', ')}`),
        ]),
      }
    case 'experience':
      return { lines: experience.map((r) => out(`${r.period.padEnd(30)} ${r.title}, ${r.org}`)) }
    case 'education':
      return {
        lines: education.schools.map((s) => out(`${s.period.padEnd(30)} ${s.degree}, ${s.name}`)),
      }
    case 'skills':
      return { lines: skills.groups.map((g) => out(`${g.name}: ${g.items.join(', ')}`)) }
    case 'contact':
      return {
        lines: contact.links.map((l) => ({ ...out(`${l.label.padEnd(9)} ${l.value}`), href: l.href })),
      }
    case 'ls':
      return { lines: [out(sections.map((s) => `${s.id}/`).join('  '))] }
    case 'cd': {
      const target = arg.replace(/^#|\/$/g, '').toLowerCase()
      if (!target || target === '~') {
        scrollTo('top')
        return { lines: [] }
      }
      const match = sections.find((s) => s.id === target || s.label.toLowerCase() === target)
      if (match && scrollTo(match.id)) return { lines: [out(`Now at ${match.label}.`)] }
      return { lines: [err(`cd: no such section: ${target}. Try ls.`)] }
    }
    case 'open': {
      const links: Record<string, string> = {
        github: site.github,
        linkedin: site.linkedin,
        demo: caseStudies.find((c) => c.id === 'work-witness')?.links?.[0]?.href ?? '',
        source: caseStudies.find((c) => c.id === 'work-witness')?.links?.[1]?.href ?? '',
        resume: site.resumeUrl,
      }
      const key = arg.toLowerCase()
      const href = links[key]
      if (!href) return { lines: [err(`open: unknown target. Try ${Object.keys(links).join(', ')}.`)] }
      window.open(href, '_blank', 'noopener')
      return { lines: [out(`Opening ${href}`)] }
    }
    case 'resume':
      window.open(site.resumeUrl, '_blank', 'noopener')
      return { lines: [out(`Opening ${site.resumeUrl}`)] }
    case 'theme': {
      const want = arg.toLowerCase()
      if (want === 'light' || want === 'dark') {
        ctx.setTheme(want)
        return { lines: [out(`Theme set to ${want}.`)] }
      }
      if (want) return { lines: [err('Usage: theme [light | dark]')] }
      ctx.toggleTheme()
      return { lines: [out(`Theme set to ${ctx.theme === 'dark' ? 'light' : 'dark'}.`)] }
    }
    case 'hangman': {
      const { lines, state } = startHangman(wordBank)
      return { lines, game: state }
    }
    case 'history':
      return { lines: ctx.history.map((h, i) => out(`${String(i + 1).padStart(4)}  ${h}`)) }
    case 'clear':
      return { lines: [], clear: true }
    case 'exit':
    case 'quit':
      ctx.close()
      return { lines: [] }
    default:
      return { lines: [err(`command not found: ${cmd}. Type help.`)] }
  }
}
