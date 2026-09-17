import { caseStudy } from '../content'
import { FlowDiagram } from './FlowDiagram'
import { Section, Tag } from './Section'

export function CaseStudy() {
  return (
    <Section id={caseStudy.id} eyebrow={caseStudy.eyebrow} title={caseStudy.title}>
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
        <span className="text-text">{caseStudy.company}</span>
        <span aria-hidden="true">·</span>
        <span>{caseStudy.role}</span>
        <span aria-hidden="true">·</span>
        <span>{caseStudy.period}</span>
      </div>
      <p className="max-w-2xl text-lg leading-relaxed">{caseStudy.summary}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-3 print:mt-4 print:grid-cols-3 print:gap-4">
        {caseStudy.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="mb-2 font-display text-xl font-semibold">{s.heading}</h3>
            <p className="leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <FlowDiagram />
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-display text-xl font-semibold">Stack</h3>
        <ul className="flex flex-wrap gap-2">
          {caseStudy.stack.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
