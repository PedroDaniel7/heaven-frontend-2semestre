import { useId } from 'react'
import type { Ref, TextareaHTMLAttributes } from 'react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  helperText?: string
  error?: string
  ref?: Ref<HTMLTextAreaElement>
}

/**
 * Área de texto do Heaven (02-design-system.md §19).
 *
 * Segue a mesma linguagem do `Input`: Label → campo → erro/auxiliar.
 */
export function Textarea({
  label,
  helperText,
  error,
  id,
  ref,
  ...textareaProps
}: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const helperId = `${fieldId}-helper`
  const errorId = `${fieldId}-error`

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-xs font-medium text-body"
      >
        {label}
      </label>

      <textarea
        {...textareaProps}
        id={fieldId}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={[
          'w-full rounded-md border bg-surface px-4 py-3 text-sm text-ink',
          'placeholder:text-muted',
          'transition-colors outline-none',
          'focus:border-primary focus:ring-2 focus:ring-primary/15',
          error ? 'border-danger' : 'border-border',
        ].join(' ')}
      />

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
