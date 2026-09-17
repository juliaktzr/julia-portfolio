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

      {study.sections && <ProseSections study={study} />}
      {study.built && <CompactSections study={study} />}

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

/** Three prose columns. */
function ProseSections({ study }: { study: CaseStudyData }) {
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-3 print:mt-4 print:grid-cols-3 print:gap-4">
      {study.sections?.map((s) => (
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
  )
}

/** Problem line, terminal-style feature listing, and tradeoff cards. */
function CompactSections({ study }: { study: CaseStudyData }) {
  return (
    <>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10 print:mt-4 print:grid-cols-2 print:gap-4">
        <div>
          <h4 className="mb-2 font-display text-xl font-semibold">The problem</h4>
          <p className="leading-relaxed text-muted">{study.problem}</p>
          <h4 className="mb-2 mt-8 font-display text-xl font-semibold">What I built</h4>
          <p className="leading-relaxed text-muted">{study.builtIntro}</p>
        </div>

        <div className="self-start overflow-hidden rounded-xl border border-line bg-surface/70">
          <div className="print-hidden flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted/50" aria-hidden="true" />
            <span className="ml-2 font-mono text-[11px] text-muted">witness-to-history</span>
          </div>
          <div className="px-4 py-4 font-mono text-sm sm:px-5">
            <p className="mb-3 text-muted" aria-hidden="true">
              <span className="text-accent-ink">❯</span> ls src/
            </p>
            <dl className="space-y-2.5">
              {study.built?.map((f) => (
                <div key={f.name} className="grid grid-cols-[6.5rem_1fr] gap-3 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-accent-ink">{f.name}</dt>
                  <dd className="font-sans text-sm leading-snug text-text">{f.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-10 print:mt-4">
        <h4 className="mb-2 font-display text-xl font-semibold">How I decided</h4>
        <p className="mb-5 max-w-2xl leading-relaxed text-muted">{study.decisionsIntro}</p>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
          {study.decisions?.map((d, i) => (
            <li
              key={d.chose}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface/60 p-4 print:p-3"
            >
              <dl className="space-y-3 text-sm leading-snug">
                <div>
                  <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ink">
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')} </span>Chose
                  </dt>
                  <dd className="font-medium text-text">{d.chose}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Over</dt>
                  <dd className="text-muted line-through decoration-accent-2/60">{d.over}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-2">
                    Why
                  </dt>
                  <dd className="text-muted">{d.why}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
