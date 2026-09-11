import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ButtonLink } from '../../../components/Button'
import { ArrowRightIcon } from '../../../components/icons'
import { findAction } from '../../../data/actions'
import { PUBLIC_ROUTES } from '../../../routes'

const APP_NAME = 'Heaven'

/**
 * Detalhe de uma ação sustentável — rota dinâmica `/app/acoes/:id`
 * (03-architecture.md §14.1).
 *
 * O `id` da URL define qual ação é exibida. Um id que não corresponde a
 * nenhuma ação mostra o estado de "não encontrada".
 */
export function ActionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const action = id ? findAction(id) : undefined

  // Mantém o título da aba em sincronia com a ação aberta, restaurando o
  // anterior ao sair da página ou ao trocar de ação.
  useEffect(() => {
    const previousTitle = document.title
    document.title = action
      ? `${action.name} — ${APP_NAME}`
      : `Ação não encontrada — ${APP_NAME}`

    return () => {
      document.title = previousTitle
    }
  }, [action])

  return (
    <div className="mx-auto w-full max-w-3xl py-10 lg:py-16">
      <Link
        to={PUBLIC_ROUTES.solucao}
        className="inline-flex items-center gap-2 text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" />
        Voltar para a Solução
      </Link>

      {action ? (
        <article className="mt-10">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Ação sustentável
          </p>
          <h1 className="mt-2 font-serif text-4xl text-ink">{action.name}</h1>
          <p className="mt-3 leading-relaxed text-body">{action.label}</p>

          {action.challenge ? (
            <section className="mt-10 rounded-lg border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-ink">
                Desafio
              </h2>
              <p className="mt-3 leading-relaxed text-body">
                {action.challenge}
              </p>
            </section>
          ) : null}
        </article>
      ) : (
        <section className="mt-10">
          <h1 className="font-serif text-4xl text-ink">Ação não encontrada</h1>
          <p className="mt-3 leading-relaxed text-body">
            Não existe uma ação com o identificador informado.
          </p>
          <ButtonLink
            to={PUBLIC_ROUTES.solucao}
            fullWidth={false}
            className="mt-8"
          >
            Voltar para a Solução
          </ButtonLink>
        </section>
      )}
    </div>
  )
}
