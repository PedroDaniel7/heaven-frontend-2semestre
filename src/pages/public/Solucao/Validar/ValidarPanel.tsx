import { useState } from 'react'

import { Button } from '../../../../components/Button'

type VoteResult = 'approved' | 'rejected'

/** Ação pendente exibida no legado (`solucao-validar.html`). */
const PENDING_ACTION = {
  id: '9821',
  category: 'Descarte de Eletrônicos',
  description:
    'Descartei 3 baterias velhas de celular e um monitor antigo no posto de coleta oficial do Ecofácil no shopping central. Segue anexo o canhoto digitalizado gerado pela máquina.',
}

const FEEDBACK: Record<VoteResult, string> = {
  approved:
    'Voto de Aprovação enviado! Sua resposta foi salva de forma criptografada na rede. (+10 pontos de Auditor)',
  rejected:
    'Denúncia computada. O registro foi encaminhado para dupla checagem. Obrigado por proteger o ecossistema!',
}

/**
 * Central de auditoria da solução pública da Sprint 2.
 *
 * No legado o voto era uma função global chamada por `onclick`, que
 * escondia os botões com `style.display` e injetava o feedback com
 * `innerHTML`. Aqui é estado React com renderização condicional.
 */
export function ValidarPanel() {
  const [vote, setVote] = useState<VoteResult | null>(null)

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-serif text-3xl font-medium text-ink">
        Central de Auditoria de Pares
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Analise a evidência abaixo de forma totalmente imparcial. Seu voto
        correto aumenta sua reputação na rede.
      </p>

      <article className="mt-8 rounded-lg border border-primary/30 bg-surface p-6 sm:p-8">
        <p className="inline-block rounded bg-sage/30 px-2 py-1 text-xs font-semibold tracking-wide text-ink">
          AÇÃO PENDENTE ID #{PENDING_ACTION.id}
        </p>

        <h3 className="mt-3 font-serif text-xl font-medium text-ink">
          Categoria: {PENDING_ACTION.category}
        </h3>

        <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted italic">
          {PENDING_ACTION.description}
        </blockquote>

        <div className="mt-6 rounded-md border border-dashed border-border bg-canvas p-8 text-center text-sm text-muted">
          Imagem do comprovante anexada pelo usuário
        </div>

        {vote ? (
          <p
            role="status"
            className="mt-6 rounded-md bg-primary/8 px-4 py-3 text-center text-sm font-medium text-primary"
          >
            {FEEDBACK[vote]}
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="button" onClick={() => setVote('approved')}>
              Aprovar Registro
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setVote('rejected')}
            >
              Rejeitar / Fraude
            </Button>
          </div>
        )}
      </article>
    </div>
  )
}
