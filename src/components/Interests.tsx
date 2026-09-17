import { interests } from '../content'

export function Interests() {
  return (
    <section aria-labelledby="interests-title" className="border-y border-line bg-surface/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-baseline sm:gap-10 sm:px-6">
        <h2 id="interests-title" className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
          <span aria-hidden="true">// </span>
          {interests.eyebrow}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed">{interests.body}</p>
      </div>
    </section>
  )
}
