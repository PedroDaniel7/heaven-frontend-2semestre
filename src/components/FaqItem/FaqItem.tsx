import { ChevronDownIcon } from '../icons'

export type FaqItemProps = {
  id: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: (id: string) => void
}

/**
 * Item do FAQ público.
 *
 * Componente controlado: o estado de abertura vive na página. No
 * legado o accordion era feito com `classList.toggle` e um
 * `max-height: 200px` que truncava respostas longas — aqui a resposta
 * é montada e desmontada, sem limite de altura.
 */
export function FaqItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  const panelId = `faq-panel-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
        >
          <span className="font-medium text-ink">{question}</span>
          <ChevronDownIcon
            className={[
              'h-4 w-4 shrink-0 text-muted transition-transform',
              isOpen ? 'rotate-180' : '',
            ].join(' ')}
          />
        </button>
      </h3>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="pb-5"
        >
          <p className="text-sm leading-relaxed text-body">{answer}</p>
        </div>
      ) : null}
    </div>
  )
}
