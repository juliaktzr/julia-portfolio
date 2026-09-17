import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
}

/** Shared section frame: mono eyebrow, display title, optional intro. */
export function Section({ id, eyebrow, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent-ink">
          <span aria-hidden="true">// </span>
          {eyebrow}
        </p>
        {title && (
          <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {!title && <h2 id={`${id}-title`} className="sr-only">{eyebrow}</h2>}
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'pop' }) {
  const cls =
    tone === 'pop'
      ? 'border-pop/40 text-pop'
      : 'border-accent-2/40 text-accent-2'
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 ${cls}`}>
      {children}
    </span>
  )
}
