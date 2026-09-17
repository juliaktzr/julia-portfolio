import { education } from '../content'
import { Section } from './Section'

export function Education() {
  return (
    <Section id={education.id} eyebrow={education.eyebrow} title={education.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {education.schools.map((s) => (
          <article key={s.name} className="flex gap-5 rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#faf6f1] ring-1 ring-line ${
                s.logoStyle === 'seal' ? 'p-2' : 'p-3'
              }`}
            >
              <img
                src={s.logo}
                alt={s.logoAlt}
                loading="lazy"
                width={64}
                height={64}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug">{s.name}</h3>
              <p className="mt-1 text-sm text-text">{s.degree}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
              <p className="mt-3 font-mono text-xs text-muted">
                {s.period} · {s.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
