import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { buttonStyles } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  /** Quando falso, o botão ocupa apenas a largura do conteúdo no desktop. */
  fullWidth?: boolean
}

/**
 * Botão do Heaven (02-design-system.md §15 e §16).
 *
 * Use para ações. Para navegação, use `ButtonLink`.
 */
export function Button({
  children,
  className,
  variant = 'primary',
  fullWidth = true,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={buttonStyles({ variant, fullWidth, className })}
    >
      {children}
    </button>
  )
}
