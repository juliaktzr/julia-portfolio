import { caseStudies, work, type CaseStudy as CaseStudyData } from '../content'
import { ButtonLink } from './Button'
import { FlowDiagram } from './FlowDiagram'
import { PipelineDiagram } from './PipelineDiagram'
import { Section, Tag } from './Section'

export function CaseStudy() {
  return (
    <Section id={work.id} eyebrow={work.eyebrow} title={work.title}>
      <div className="space-y-20">
        {caseStudies.map((c) => (
          <CaseStudyArticle key={c.id} study={c} />
        ))}
      </div>
    </Section>
  )
}

function CaseStudyArticle({ study }: { study: CaseStudyData }) {
  return (
    <article id={study.id} className="scroll-mt-20" aria-labelledby={`${study.id}-title`}>
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
        <span className="text-text">{study.company}</span>
        <span aria-hidden="true">·</span>
        <span>{study.role}</span>
        {study.period && (
          <>
            <span aria-hidden="true">·</span>
            <span>{study.period}</span>
          </>
        )}
      </div>
      <h3 id={`${study.id}-title`} className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {study.title}
      </h3>
      {study.links && (
        <div className="print-hidden mt-5 flex flex-wrap gap-3">
          {study.links.map((l) => (
            <ButtonLink key={l.href} href={l.href} kind={l.kind} external>
              {l.label}
            </ButtonLink>
          ))}
        </div>
      )}
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{study.summary}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-3 print:mt-4 print:grid-cols-3 print:gap-4">
        {study.sections.map((s) => (
          <div key={s.heading}>
            <h4 className="mb-2 font-display text-xl font-semibold">{s.heading}</h4>
            <p className="leading-relaxed text-muted">{s.body}</p>
            {s.bullets && (
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">{study.diagram === 'flow' ? <FlowDiagram /> : <PipelineDiagram />}</div>

      <div className="mt-8">
        <h4 className="mb-3 font-display text-xl font-semibold">Stack</h4>
        <ul className="flex flex-wrap gap-2">
          {study.stack.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
