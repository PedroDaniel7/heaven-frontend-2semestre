import { useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ButtonLink } from '../../../components/Button'
import { AvisoErro, Carregando } from '../../../components/EstadoApi'
import { ArrowRightIcon } from '../../../components/icons'
import { useApi } from '../../../hooks/useApi'
import { APP_ROUTES } from '../../../routes'
import { ApiError } from '../../../services/http'
import { obterTipoAcao } from '../../../services/tiposAcao'
import { rotuloCategoria, rotuloDificuldade } from '../../../utils/formatar'
import { mensagemPadrao } from '../../../utils/mensagemErro'

const APP_NAME = 'Heaven'

/** O id da URL só vale se for um inteiro positivo; qualquer outro texto é "não encontrada". */
function idNumerico(id: string | undefined): number | null {
  return id && /^\d+$/.test(id) ? Number(id) : null
}

/**
 * Detalhe de um tipo de ação — rota dinâmica `/app/acoes/:id`
 * (GET /tipos-acao/{id}). O desafio vem da API.
 */
export function ActionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const idTipo = idNumerico(id)

  const carregar = useCallback(
    () =>
      idTipo === null
        ? Promise.reject(
            new ApiError(404, 'NAO_ENCONTRADO', 'Tipo de ação não encontrado.'),
          )
        : obterTipoAcao(idTipo),
    [idTipo],
  )
  const { estado, recarregar } = useApi(carregar)
  const tipo = estado.status === 'sucesso' ? estado.dados : null
  const naoEncontrado =
    estado.status === 'erro' && estado.erro.codigo === 'NAO_ENCONTRADO'

  // Mantém o título da aba em sincronia com o tipo aberto, restaurando o
  // anterior ao sair da página ou ao trocar de tipo.
  useEffect(() => {
    const previousTitle = document.title
    if (tipo) document.title = `${tipo.nome} — ${APP_NAME}`
    else if (naoEncontrado) document.title = `Ação não encontrada — ${APP_NAME}`

    return () => {
      document.title = previousTitle
    }
  }, [tipo, naoEncontrado])

  return (
    <div className="mx-auto w-full max-w-3xl py-4 lg:py-8">
      <Link
        to={APP_ROUTES.newAction}
        className="inline-flex items-center gap-2 text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" />
        Voltar para Nova ação
      </Link>

      <div className="mt-10">
        {estado.status === 'carregando' ? (
          <Carregando rotulo="Carregando a ação…" />
        ) : null}

        {naoEncontrado ? (
          <section>
            <h1 className="font-serif text-4xl text-ink">
              Ação não encontrada
            </h1>
            <p className="mt-3 leading-relaxed text-body">
              Não existe uma ação com o identificador informado.
            </p>
            <ButtonLink
              to={APP_ROUTES.newAction}
              fullWidth={false}
              className="mt-8"
            >
              Voltar para Nova ação
            </ButtonLink>
          </section>
        ) : null}

        {estado.status === 'erro' && !naoEncontrado ? (
          <AvisoErro
            mensagem={mensagemPadrao(estado.erro)}
            onTentarNovamente={recarregar}
          />
        ) : null}

        {tipo ? (
          <article>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Ação sustentável · {rotuloCategoria(tipo.categoria)}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-ink">{tipo.nome}</h1>
            <p className="mt-3 leading-relaxed text-body">
              Medida em {tipo.unidade} · Dificuldade{' '}
              {rotuloDificuldade(tipo.dificuldade).toLowerCase()}
            </p>

            {tipo.desafio ? (
              <section className="mt-10 rounded-lg border border-border bg-surface p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-medium text-ink">
                  Desafio
                </h2>
                <p className="mt-3 leading-relaxed text-body">{tipo.desafio}</p>
              </section>
            ) : null}
          </article>
        ) : null}
      </div>
    </div>
  )
}
