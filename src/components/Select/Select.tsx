import { useId } from 'react'
import type { ReactNode, Ref, SelectHTMLAttributes } from 'react'

import { ChevronDownIcon } from '../icons'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  children: ReactNode
  ref?: Ref<HTMLSelectElement>
}

/** Campo de seleção, seguindo a linguagem dos demais campos. */
export function Select({
  label,
  error,
  children,
  id,
  ref,
  ...selectProps
}: SelectProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-xs font-medium text-body"
      >
        {label}
      </label>

      <div className="relative">
        <select
          {...selectProps}
          id={fieldId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={[
            'h-12 w-full appearance-none rounded-md border bg-surface pr-11 pl-4 text-sm text-ink',
            'transition-colors outline-none',
            'focus:border-primary focus:ring-2 focus:ring-primary/15',
            error ? 'border-danger' : 'border-border',
          ].join(' ')}
        >
          {children}
        </select>

        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
