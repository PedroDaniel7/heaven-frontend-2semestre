import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

/**
 * Botão primário do Heaven (02-design-system.md §15 e §16).
 *
 * Deep forest green, contraste alto, raio moderado, tipografia medium.
 * As variantes secondary/tertiary serão adicionadas quando uma tela
 * aprovada realmente precisar delas (02-design-system.md §39).
 */
export function Button({ children, className, ...buttonProps }: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={[
        'flex h-12 w-full items-center justify-center gap-2 rounded-md',
        'bg-primary text-sm font-medium text-canvas',
        'transition-colors outline-none',
        'hover:bg-primary-hover',
        'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-primary',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
