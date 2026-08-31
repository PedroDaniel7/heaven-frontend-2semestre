import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  /** Conteúdo da label; aceita texto com links (02-design-system.md §24). */
  label: ReactNode
  /** Mensagem de erro exibida abaixo do controle. */
  error?: string
  ref?: Ref<HTMLInputElement>
}

/**
 * Checkbox do Heaven (02-design-system.md §24, 07-forms.md §25).
 *
 * O estado selecionado é comunicado por preenchimento **e** por marca
 * de verificação, para não depender apenas de cor
 * (02-design-system.md §34).
 */
export function Checkbox({
  label,
  error,
  id,
  ref,
  ...inputProps
}: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const errorId = `${checkboxId}-error`

  return (
    <div>
      <div className="flex items-start gap-2.5">
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0">
          <input
            {...inputProps}
            id={checkboxId}
            ref={ref}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={[
              'peer h-4 w-4 appearance-none rounded-[3px] border bg-surface',
              'transition-colors outline-none',
              'checked:border-primary checked:bg-primary',
              'focus-visible:ring-2 focus-visible:ring-primary/30',
              error ? 'border-danger' : 'border-border',
            ].join(' ')}
          />
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute inset-0 hidden h-4 w-4 text-canvas peer-checked:block"
          >
            <path d="m3.5 8.4 3 3 6-6" />
          </svg>
        </span>

        <label
          htmlFor={checkboxId}
          className="text-xs leading-relaxed text-body"
        >
          {label}
        </label>
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
