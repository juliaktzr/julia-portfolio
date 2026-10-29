import type { PipelineStep } from '../content'

/**
 * Steps from left to right with connectors, stacked on phones. The highlighted
 * step gets the rose border; there is no badge.
 */
export function PipelineDiagram({ title, steps }: { title: string; steps: PipelineStep[] }) {
  return (
    <figure className="flex h-full flex-col justify-center rounded-xl border border-line bg-surface/60 p-4 sm:p-5">
      <figcaption className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        {title}
      </figcaption>
      <ol className="flex flex-col sm:flex-row sm:items-stretch">
        {steps.map((s, i) => (
          <li key={s.name} className="flex flex-1 flex-col sm:flex-row sm:items-center">
            <div
              className={`flex h-full flex-1 flex-col rounded-lg border px-3 py-2.5 ${
                s.highlight ? 'border-accent bg-bg' : 'border-line bg-bg/60'
              }`}
            >
              <span className="flex items-baseline gap-1.5">
                <span aria-hidden="true" className="font-mono text-[0.6875rem] text-accent-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium leading-snug">{s.name}</span>
              </span>
              <span className="mt-1 text-xs leading-snug text-muted">{s.desc}</span>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-auto block h-3 w-px bg-line sm:mx-0 sm:h-px sm:w-3 sm:shrink-0"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}
