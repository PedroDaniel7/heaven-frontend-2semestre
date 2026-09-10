import { useState } from 'react'

import { FaqItem } from '../../../components/FaqItem'
import { FAQ_ENTRIES } from '../../../data/faq'

/**
 * Página FAQ — `paginas/faq.html` da Sprint 2.
 *
 * Cada pergunta abre e fecha de forma independente, como no legado:
 * mais de uma resposta pode ficar visível ao mesmo tempo.
 */
export function FAQPage() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  function handleToggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <h1 className="text-center font-serif text-4xl text-ink">
        Perguntas Frequentes
      </h1>

      <div className="mt-12 border-t border-border">
        {FAQ_ENTRIES.map((entry) => (
          <FaqItem
            key={entry.id}
            id={entry.id}
            question={entry.question}
            answer={entry.answer}
            isOpen={openIds.has(entry.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}
