export type ButtonKind = 'primary' | 'blush' | 'secondary' | 'ghost'

/** Colors and hover per kind. Every button on the site uses these, so hovers match. */
export const buttonStyles: Record<ButtonKind, string> = {
  primary: 'bg-text text-bg hover:bg-accent-ink hover:text-bg',
  blush: 'bg-accent-ink font-semibold text-bg hover:bg-text',
  secondary: 'border border-text/30 text-text hover:border-accent hover:text-accent-ink',
  ghost: 'text-muted hover:text-accent-ink',
}
