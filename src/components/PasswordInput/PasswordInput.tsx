import { useState } from 'react'

import { EyeIcon, EyeOffIcon } from '../icons'
import { Input } from '../Input'
import type { InputProps } from '../Input'

export type PasswordInputProps = Omit<InputProps, 'type' | 'trailing'>

/**
 * Campo de senha com mostrar/ocultar.
 *
 * A alternância é apenas estado visual local — não é um formulário
 * (07-forms.md §37), por isso não utiliza React Hook Form.
 */
export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          className="flex h-8 w-8 items-center justify-center rounded text-muted transition-colors outline-none hover:text-body focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      }
    />
  )
}
