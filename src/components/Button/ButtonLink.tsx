import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'

import { buttonStyles } from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
}

/**
 * Link com aparência de botão.
 *
 * Navegação é sempre um link, nunca um botão (09-quality-gates.md §29).
 */
export function ButtonLink({
  children,
  className,
  variant = 'primary',
  fullWidth = true,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      {...linkProps}
      className={buttonStyles({ variant, fullWidth, className })}
    >
      {children}
    </Link>
  )
}
