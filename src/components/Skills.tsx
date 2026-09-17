import { skills } from '../content'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id={skills.id} eyebrow={skills.eyebrow} title={skills.title}>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skills.groups.map((g) => (
          <div key={g.name}>
            <dt className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent-2">{g.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface/70 px-3 py-1.5 text-sm transition-colors hover:border-accent/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
