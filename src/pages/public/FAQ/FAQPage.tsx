import { useState } from 'react'

import { FaqItem } from '../../../components/FaqItem'
import { FAQ_ENTRIES } from '../../../data/faq'

/** Página FAQ — `paginas/faq.html` da Sprint 2. */
export function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
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
            isOpen={openId === entry.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}
