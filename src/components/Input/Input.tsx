import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Label visível — nunca substituída por placeholder (07-forms.md §14). */
  label: string
  /** Ícone funcional exibido à esquerda (02-design-system.md §29). */
  icon?: ReactNode
  /** Elemento à direita, como o botão de mostrar/ocultar senha. */
  trailing?: ReactNode
  /** Texto auxiliar exibido abaixo do campo. */
  helperText?: string
  /** Mensagem de erro; quando presente, aplica o estado inválido. */
  error?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Campo de texto do Heaven (02-design-system.md §17 e §18).
 *
 * Estrutura: Label → Input → Error/helper text (07-forms.md §14).
 */
export function Input({
  label,
  icon,
  trailing,
  helperText,
  error,
  id,
  ref,
  ...inputProps
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`
  const describedBy = error ? errorId : helperText ? helperId : undefined

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-medium text-body"
      >
        {label}
      </label>

      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-muted">
            {icon}
          </span>
        ) : null}

        <input
          {...inputProps}
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            'h-12 w-full rounded-md border bg-surface text-sm text-ink',
            'placeholder:text-muted',
            'transition-colors outline-none',
            'focus:border-primary focus:ring-2 focus:ring-primary/15',
            'disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted',
            icon ? 'pl-11' : 'pl-4',
            trailing ? 'pr-11' : 'pr-4',
            error ? 'border-danger' : 'border-border',
          ].join(' ')}
        />

        {trailing ? (
          <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
            {trailing}
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-xs text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
