import { contact, footer, site } from '../content'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id={contact.id} eyebrow={contact.eyebrow} title={contact.title} intro={contact.body}>
      <img
        src={site.headshot}
        alt={site.headshotAlt}
        width={800}
        height={800}
        loading="lazy"
        className="mb-8 h-20 w-20 rounded-full object-cover ring-2 ring-accent/50 ring-offset-4 ring-offset-bg sm:h-24 sm:w-24"
      />
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
        <a
          href={site.resumeUrl}
          download
          className="text-accent-ink underline underline-offset-4 hover:text-text"
        >
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
      <div className="mx-auto max-w-5xl px-4 py-8 font-mono text-xs text-muted sm:px-6">
        <p>{footer.line}</p>
      </div>
    </footer>
  )
}
