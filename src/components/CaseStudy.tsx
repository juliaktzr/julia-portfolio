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

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="space-y-8">
          {caseStudy.sections.map((s) => (
            <div key={s.heading}>
              <h3 className="mb-2 font-display text-xl font-semibold">{s.heading}</h3>
              <p className="leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
          <div>
            <h3 className="mb-3 font-display text-xl font-semibold">Stack</h3>
            <ul className="flex flex-wrap gap-2">
              {caseStudy.stack.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <FlowDiagram />
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">{caseStudy.shareNote}</p>
        </div>
      </div>
    </Section>
  )
}
