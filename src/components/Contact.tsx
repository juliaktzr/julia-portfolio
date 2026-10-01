import { contact, footer, site } from '../content'
import { ButtonLink } from './Button'
import { Section } from './Section'

export function Contact() {
  return (
    <Section id={contact.id} eyebrow={contact.eyebrow} title={contact.title} intro={contact.body}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={site.headshot}
          alt={site.headshotAlt}
          width={800}
          height={800}
          loading="lazy"
          className="print-hidden h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-accent/50 ring-offset-4 ring-offset-bg sm:h-24 sm:w-24"
        />
        <div className="flex-1">
          <ul className="grid gap-4 sm:grid-cols-3 print:grid-cols-3">
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
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
                      {l.label}
                    </span>
                    <span className="mt-2 break-all text-sm font-medium group-hover:text-accent-ink">
                      {l.value}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
          {/* Sits under the cards so it spans from Email to GitHub. */}
          <ButtonLink
            href={site.resumeUrl}
            download={site.resumeFilename}
            kind="blush"
            className="print-hidden mt-4 w-full justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
            Download my resume
            <span className="sr-only"> (PDF)</span>
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{footer.line}</p>
        <p>{footer.hint}</p>
      </div>
    </footer>
  )
}
