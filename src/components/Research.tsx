import { research } from '../content'
import { Counter } from './Counter'
import { Section } from './Section'

export function Research() {
  return (
    <Section id={research.id} eyebrow={research.eyebrow} title={research.title} intro={research.intro}>
      <div className="grid gap-6 md:grid-cols-2">
        {research.items.map((item) => (
          <article key={item.org} className="flex flex-col rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
            <h3 className="font-semibold leading-snug">{item.org}</h3>
            <p className="mt-1 text-sm text-muted">{item.role}</p>
            <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {item.stat && (
              <div className="mt-6 border-t border-line pt-5">
                <Counter value={item.stat.value} suffix={item.stat.suffix} label={item.stat.label} />
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
