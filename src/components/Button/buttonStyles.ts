export type ButtonVariant = 'primary' | 'secondary'

type ButtonStyleOptions = {
  variant?: ButtonVariant
  fullWidth?: boolean
  className?: string
}

/**
 * Classes do sistema de botões do Heaven (02-design-system.md §15).
 *
 * Compartilhadas entre `Button` (ações) e `ButtonLink` (navegação),
 * para que os dois nunca divirjam visualmente.
 */
export function buttonStyles({
  variant = 'primary',
  fullWidth = true,
  className,
}: ButtonStyleOptions = {}) {
  return [
    'inline-flex h-12 items-center justify-center gap-2 rounded-md',
    'text-sm font-medium',
    'transition-colors outline-none',
    'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    fullWidth ? 'w-full' : 'w-full px-6 sm:w-auto',
    variant === 'primary'
      ? 'bg-primary text-canvas hover:bg-primary-hover disabled:hover:bg-primary'
      : 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-canvas',
    'disabled:cursor-not-allowed disabled:opacity-45',
    className ?? '',
  ].join(' ')
}
