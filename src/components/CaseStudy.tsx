import { useState, type CSSProperties } from 'react'
import {
  caseStudies,
  sideProjects,
  work,
  type CaseStudy as CaseStudyData,
  type CaseStudyScreenshot,
} from '../content'
import { ButtonLink } from './Button'
import { FlowDiagram } from './FlowDiagram'
import { PipelineDiagram } from './PipelineDiagram'
import { PhotoViewer, type Gallery } from './PhotoViewer'
import { Section, Tag } from './Section'

export function CaseStudy() {
  return (
    <Section id={work.id} eyebrow={work.eyebrow} title={work.title}>
      <div className="space-y-20">
        {caseStudies.map((c) => (
          <CaseStudyArticle key={c.id} study={c} />
        ))}
      </div>
      <SideProjects />
    </Section>
  )
}

function CaseStudyArticle({ study }: { study: CaseStudyData }) {
  if (study.problem) return <CompactArticle study={study} />
  return (
    <article id={study.id} className="scroll-mt-20" aria-labelledby={`${study.id}-title`}>
      <MetaLine study={study} />
      <Title study={study} />
      {study.stats && <Stats items={study.stats} className="mt-4" />}
      <Links study={study} className="mt-5" />
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{study.summary}</p>

      {study.sections && <ProseSections study={study} />}
      {study.photos && <PhotoRow title={study.photos.title} items={study.photos.items} />}

      {study.diagram === 'flow' && (
        <div className="mt-10">
          <FlowDiagram />
        </div>
      )}

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

/** Company, role, dates, and status. Stacked on phones so separators never dangle at a line end. */
function MetaLine({ study }: { study: CaseStudyData }) {
  return (
    <div className="mb-4 flex flex-col gap-1 font-mono text-xs leading-relaxed text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
      <span className="text-text">{study.company}</span>
      <span aria-hidden="true" className="hidden sm:inline">
        ·
      </span>
      <span>{study.role}</span>
      {study.period && (
        <>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>{study.period}</span>
        </>
      )}
      {study.status && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] text-accent-ink">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {study.status}
        </span>
      )}
    </div>
  )
}

function Title({ study }: { study: CaseStudyData }) {
  return (
    <h3 id={`${study.id}-title`} className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      {study.title}
    </h3>
  )
}

function Links({ study, className }: { study: CaseStudyData; className: string }) {
  if (!study.links) return null
  return (
    <div className={`print-hidden flex flex-wrap gap-3 ${className}`}>
      {study.links.map((l) => (
        <ButtonLink key={l.href} href={l.href} kind={l.kind} external>
          {l.label}
        </ButtonLink>
      ))}
    </div>
  )
}

/**
 * Photos in one row, each as wide as its shape needs so they share a height.
 * On phones they become a swipeable row that bleeds to the screen edges;
 * from sm to md they stack. A click opens the full-size viewer.
 */
function PhotoRow({ title, items }: { title: string; items: CaseStudyScreenshot[] }) {
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const photos = items.map((p) => ({ ...p, place: p.caption }))
  const cols = items.map((s) => `${(s.width / s.height).toFixed(3)}fr`).join(' ')
  return (
    <div className="print-hidden mt-10">
      <h4 className="mb-3 font-display text-xl font-semibold">{title}</h4>
      <div
        style={{ '--shot-cols': cols } as CSSProperties}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:[grid-template-columns:var(--shot-cols)]"
      >
        {items.map((p, i) => (
          <figure
            key={p.src}
            className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-line bg-surface/60 sm:w-auto"
          >
            <button
              type="button"
              onClick={() => setGallery({ title, photos, start: i })}
              aria-label={`Open photo: ${p.caption}`}
              className="group block cursor-zoom-in overflow-hidden"
            >
              <img
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="flex-1 border-t border-line px-4 py-3 text-sm leading-snug text-muted">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <PhotoViewer gallery={gallery} onClose={() => setGallery(null)} />
    </div>
  )
}

/** Prose sections in a 2x2 grid from md up, one column on mobile. */
function ProseSections({ study }: { study: CaseStudyData }) {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 print:mt-4 print:grid-cols-2 print:gap-4">
      {study.sections?.map((s) => (
        <div key={s.heading}>
          <h4 className="mb-2 font-display text-xl font-semibold">{s.heading}</h4>
          <p className="leading-relaxed">{s.body}</p>
          {s.steps && (
            <ol className="mt-3 space-y-2">
              {s.steps.map((step, i) => (
                <li key={step} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 font-mono text-sm leading-[1.625rem] text-accent-ink"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
          {s.bullets && (
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed">
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

/**
 * Witness layout: a hero with the first screenshot in a browser frame, a slim
 * status strip, problem and intro side by side, light decision cards, then the
 * pipeline diagram beside the second screenshot.
 */
function CompactArticle({ study }: { study: CaseStudyData }) {
  const [heroShot, secondShot] = study.screenshots ?? []
  return (
    <article id={study.id} className="scroll-mt-20" aria-labelledby={`${study.id}-title`}>
      <div className="grid items-start gap-8 min-[900px]:grid-cols-[55fr_45fr] min-[900px]:gap-10 print:block">
        <div>
          <MetaLine study={study} />
          <Title study={study} />
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">{study.summary}</p>
          {study.stats && <Stats items={study.stats} className="mt-5" />}
          <Links study={study} className="mt-5" />
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
            {study.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-2 font-mono text-[0.625rem] leading-5 text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        {heroShot && <BrowserFrame shot={heroShot} />}
      </div>

      {study.progress && (
        <div className="mt-10 flex flex-col gap-x-6 gap-y-1.5 border-y border-line py-4 text-sm leading-relaxed print:mt-4 sm:flex-row sm:items-baseline">
          <p className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Where it stands
          </p>
          <p className="text-muted">
            <span className="font-medium text-text">Done:</span> {study.progress.done}{' '}
            <span className="font-medium text-text">Next:</span> {study.progress.next}
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 print:mt-4 print:grid-cols-2 print:gap-4">
        <div>
          <h4 className="mb-2 font-display text-xl font-semibold">The problem</h4>
          <p className="max-w-[60ch] leading-relaxed">{study.problem}</p>
        </div>
        <div>
          <h4 className="mb-2 font-display text-xl font-semibold">What I built</h4>
          <p className="max-w-[60ch] leading-relaxed">{study.builtIntro}</p>
        </div>
      </div>

      <div className="mt-10 print:mt-4">
        <h4 className="mb-2 font-display text-xl font-semibold">How I decided</h4>
        <p className="mb-5 max-w-2xl leading-relaxed text-muted">{study.decisionsIntro}</p>
        <ol className="grid gap-3 md:grid-cols-3 print:grid-cols-3">
          {study.decisions?.map((d, i) => (
            <li key={d.chose} className="rounded-lg border border-line bg-surface/60 p-3.5 print:p-2">
              <p className="flex gap-2 text-sm font-medium leading-snug text-text">
                <span aria-hidden="true" className="font-mono text-[0.6875rem] leading-5 text-accent-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="sr-only">Chose: </span>
                  {d.chose}
                </span>
              </p>
              <p className="mt-1 pl-6 text-xs leading-snug text-muted line-through decoration-accent-2/60">
                <span className="sr-only">Over: </span>
                {d.over}
              </p>
              <p className="mt-2.5 text-sm leading-snug text-muted">
                <span className="sr-only">Why: </span>
                {d.why}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {(study.pipeline || secondShot) && (
        <div className="mt-10 grid items-stretch gap-4 min-[900px]:grid-cols-[3fr_2fr] print:mt-4 print:block">
          {study.pipeline && <PipelineDiagram title={study.pipeline.title} steps={study.pipeline.steps} />}
          {secondShot && (
            <figure className="print-hidden flex flex-col overflow-hidden rounded-xl border border-line bg-surface/60">
              <img
                src={secondShot.src}
                alt={secondShot.alt}
                width={secondShot.width}
                height={secondShot.height}
                loading="lazy"
                className="block h-auto w-full"
              />
              <figcaption className="flex-1 border-t border-line px-4 py-3 text-sm leading-snug text-muted">
                {secondShot.caption}
              </figcaption>
            </figure>
          )}
        </div>
      )}
    </article>
  )
}

/** A screenshot dressed as a browser window. Loads eagerly because it sits above the fold. */
function BrowserFrame({ shot }: { shot: CaseStudyScreenshot }) {
  return (
    <figure className="print-hidden overflow-hidden rounded-xl border border-line bg-surface shadow-lg shadow-text/5">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent/80" />
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent-2/70" />
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-muted/50" />
        <figcaption className="ml-2 truncate font-mono text-[11px] text-muted">{shot.caption}</figcaption>
      </div>
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="eager"
        className="block h-auto w-full"
      />
    </figure>
  )
}

/**
 * Compact cards for smaller projects, after the full case studies: problem,
 * solution, and product decisions, with a screenshot when there is one.
 */
function SideProjects() {
  return (
    <div className="mt-20 border-t border-line pt-10">
      <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
        <span aria-hidden="true">// </span>
        {sideProjects.title}
      </h3>
      <div className="grid gap-4">
        {sideProjects.items.map((p) => (
          <article
            key={p.name}
            className={`grid gap-x-10 gap-y-6 rounded-xl border border-line bg-surface/60 p-5 sm:p-6 ${
              p.image ? 'md:grid-cols-[minmax(0,1fr)_16rem]' : 'md:grid-cols-2'
            }`}
          >
            <div>
              <p className="font-mono text-xs text-muted">
                {p.kind} · {p.period}
              </p>
              <h4 className="mt-2 font-display text-2xl font-semibold">{p.name}</h4>
              <p className="mt-1 text-text">{p.tagline}</p>
              {p.stats && <Stats items={p.stats} className="mt-3" />}
              {p.links && (
                <div className="print-hidden mt-4 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <ButtonLink key={l.href} href={l.href} kind={l.kind} external>
                      {l.label}
                    </ButtonLink>
                  ))}
                </div>
              )}
              <dl className="mt-5 space-y-4 leading-relaxed">
                <div>
                  <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                    Problem
                  </dt>
                  <dd className="text-muted">{p.problem}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">
                    Fix
                  </dt>
                  <dd className="text-muted">{p.solution}</dd>
                </div>
              </dl>
              {p.image && <Decisions items={p.decisions} className="mt-6" />}
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            {p.image ? (
              <img
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.width}
                height={p.image.height}
                loading="lazy"
                className="mx-auto w-full max-w-64 self-center rounded-xl border border-line shadow-lg"
              />
            ) : (
              <Decisions items={p.decisions} className="mt-5 md:mt-0" />
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

/** Key numbers as small chips under a title. */
function Stats({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Key numbers">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-xs text-text"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

function Decisions({ items, className }: { items: string[]; className: string }) {
  return (
    <div className={className}>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Product decisions</p>
      <ul className="space-y-2 text-sm leading-relaxed text-muted">
        {items.map((d) => (
          <li key={d} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
