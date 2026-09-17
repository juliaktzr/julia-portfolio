import { contact, footer, site } from '../content'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id={contact.id} eyebrow={contact.eyebrow} title={contact.title} intro={contact.body}>
      <ul className="grid gap-4 sm:grid-cols-3">
        {contact.links.map((l) => {
          const external = l.href.startsWith('http')
          return (
            <li key={l.label}>
              <a
                href={l.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent/60"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">{l.label}</span>
                <span className="mt-2 break-all text-sm font-medium group-hover:text-accent-ink">
                  {l.value}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-sm text-muted">
        Or grab the{' '}
        <a href={site.resumeUrl} download className="text-accent-ink underline underline-offset-4 hover:text-text">
          resume PDF
        </a>
        .
      </p>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{footer.line}</p>
        <p>
          <span aria-hidden="true">~ </span>
          press <kbd className="rounded border border-line px-1">~</kbd> for terminal
        </p>
      </div>
    </footer>
  )
}
