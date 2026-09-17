import { leadership } from '../content'
import { Counter } from './Counter'
import { Section } from './Section'

export function Leadership() {
  return (
    <Section id={leadership.id} eyebrow={leadership.eyebrow} title={leadership.title}>
      <div className="grid gap-6 lg:grid-cols-3">
        {leadership.items.map((item) => (
          <article key={item.org} className="flex flex-col rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
            <h3 className="font-semibold leading-snug">{item.org}</h3>
            <p className="mt-1 text-sm text-muted">{item.role}</p>
            <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
            {item.counters.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
                {item.counters.map((c) => (
                  <Counter key={c.label} {...c} />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
