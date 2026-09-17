import type { AnchorHTMLAttributes } from 'react'

export type ButtonKind = 'primary' | 'secondary' | 'ghost'

export const buttonStyles: Record<ButtonKind, string> = {
  primary: 'bg-text text-bg hover:bg-accent-ink hover:text-bg',
  secondary: 'border border-text/30 text-text hover:border-accent hover:text-accent-ink',
  ghost: 'text-muted hover:text-accent-ink',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { kind?: ButtonKind; external?: boolean }

/** Link styled as a button. Shared by the hero and the case studies. */
export function ButtonLink({ kind = 'primary', external, className = '', children, ...rest }: Props) {
  return (
    <a
      {...rest}
      target={external ? '_blank' : rest.target}
      rel={external ? 'noreferrer' : rest.rel}
      className={`inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-medium transition-colors ${buttonStyles[kind]} ${className}`}
    >
      {children}
      {external && (
        <>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  )
}
