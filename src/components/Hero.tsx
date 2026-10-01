import { hero, site } from '../content'
import { ButtonLink } from './Button'

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-5xl flex-col justify-center px-4 py-16 print:min-h-0 print:py-4 sm:px-6"
    >
      <p className="text-sm text-muted sm:text-base">
        {hero.meta}
        <span aria-hidden="true" className="mx-2 text-accent">
          ·
        </span>
        {hero.status}
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
        {site.name}
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text sm:text-2xl">{site.tagline}</p>
      <div className="print-hidden mt-10 flex flex-wrap items-center gap-3">
        {hero.buttons.map((b) => (
          <ButtonLink
            key={b.label}
            href={b.href}
            kind={b.kind}
            download={b.download ? site.resumeFilename : undefined}
          >
            {b.label}
            {b.download && <span className="sr-only"> (PDF)</span>}
          </ButtonLink>
        ))}
      </div>
    </section>
  )
}
