import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, ButtonLink } from '../../../components/Button'
import { AvisoServidor, AvisoVazio, ResultadoApi } from '../../../components/EstadoApi'
import { StatusAcao } from '../../../components/StatusAcao'
import { useApi } from '../../../hooks/useApi'
import { APP_ROUTES } from '../../../routes'
import { cancelarAcao, listarMinhasAcoes } from '../../../services/acoes'
import { formatarDataHora, formatarNumero } from '../../../utils/formatar'
import { comoApiError, mensagemPadrao } from '../../../utils/mensagemErro'

type Aviso = { tipo: 'sucesso' | 'erro'; texto: string }

/** Aviso enviado por outra tela (ex.: ação registrada) via estado de navegação. */
function avisoDaNavegacao(state: unknown): Aviso | null {
  const texto = (state as { aviso?: unknown } | null)?.aviso
  return typeof texto === 'string' ? { tipo: 'sucesso', texto } : null
}

function mensagemDoCancelamento(e: unknown): string {
  const erro = comoApiError(e)
  if (erro.codigo === 'CONFLITO') {
    return 'Esta ação já foi concluída ou tem votos.'
  }
  if (erro.codigo === 'NAO_ENCONTRADO') return 'Ação não encontrada.'
  return mensagemPadrao(erro)
}

/**
 * Minhas ações — /app/minhas-acoes. Lista o histórico do usuário e permite
 * cancelar ações pendentes, com confirmação.
 */
export function MinhasAcoesPage() {
  const { estado, recarregar } = useApi(listarMinhasAcoes)
  const local = useLocation()
  const navigate = useNavigate()

  const [aviso, setAviso] = useState<Aviso | null>(() =>
    avisoDaNavegacao(local.state),
  )
  const [confirmando, setConfirmando] = useState<number | null>(null)
  const [cancelando, setCancelando] = useState<number | null>(null)

  // O aviso veio na navegação: limpa o estado para não reaparecer ao recarregar.
  useEffect(() => {
    if (avisoDaNavegacao(local.state)) {
      navigate(local.pathname, { replace: true, state: null })
    }
  }, [local.pathname, local.state, navigate])

  async function cancelar(id: number) {
    setCancelando(id)
    setAviso(null)
    try {
      await cancelarAcao(id)
      setAviso({ tipo: 'sucesso', texto: 'Ação cancelada.' })
    } catch (e) {
      setAviso({ tipo: 'erro', texto: mensagemDoCancelamento(e) })
    } finally {
      setCancelando(null)
      setConfirmando(null)
      // O status pode ter mudado no servidor: busca a lista de novo.
      recarregar()
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink">Minhas ações</h1>
          <p className="mt-3 leading-relaxed text-body">
            Acompanhe o status de cada ação que você registrou.
          </p>
        </div>
        <ButtonLink to={APP_ROUTES.newAction} fullWidth={false}>
          Registrar nova ação
        </ButtonLink>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {aviso ? (
          <p
            className={
              aviso.tipo === 'sucesso'
                ? 'mt-6 rounded-md bg-primary/8 px-4 py-3 text-sm font-medium text-primary'
                : 'mt-6 rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger'
            }
          >
            {aviso.texto}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <ResultadoApi
          estado={estado}
          onTentarNovamente={recarregar}
          rotuloCarregando="Carregando suas ações…"
          vazio={
            <AvisoVazio
              titulo="Nenhuma ação registrada ainda"
              texto="Quando você registrar uma ação sustentável, ela aparece aqui com o status da validação."
            >
              <ButtonLink to={APP_ROUTES.newAction} fullWidth={false}>
                Registrar minha primeira ação
              </ButtonLink>
            </AvisoVazio>
          }
        >
          {(lista) => (
            <ul className="space-y-4">
              {lista.map((acao) => (
                <li
                  key={acao.id}
                  className="rounded-lg border border-border bg-surface p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-serif text-xl font-medium text-ink">
                        {acao.tipo.nome}
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        {formatarNumero(acao.quantidade)} {acao.tipo.unidade} ·
                        registrada em {formatarDataHora(acao.dataHora)}
                      </p>
                    </div>
                    <StatusAcao status={acao.status} />
                  </div>

                  <p className="mt-3 text-sm leading-relaxed break-words text-body">
                    {acao.evidencia}
                  </p>

                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
                    <div className="flex gap-1.5">
                      <dt>Pontos previstos:</dt>
                      <dd className="font-medium text-body">
                        {formatarNumero(acao.pontosPrevistos)}
                      </dd>
                    </div>
                    {acao.dataConclusao ? (
                      <div className="flex gap-1.5">
                        <dt>Concluída em:</dt>
                        <dd className="font-medium text-body">
                          {formatarDataHora(acao.dataConclusao)}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  {acao.status === 'PENDENTE' ? (
                    confirmando === acao.id ? (
                      <div
                        role="group"
                        aria-label="Confirmar cancelamento"
                        className="mt-4 rounded-md bg-canvas p-4"
                      >
                        <p className="text-sm text-ink">
                          Cancelar esta ação? Ela deixa de ser validada e não
                          gera pontos.
                        </p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Button
                            type="button"
                            fullWidth={false}
                            className="h-10"
                            disabled={cancelando === acao.id}
                            onClick={() => void cancelar(acao.id)}
                          >
                            {cancelando === acao.id
                              ? 'Cancelando…'
                              : 'Sim, cancelar ação'}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            fullWidth={false}
                            className="h-10"
                            disabled={cancelando === acao.id}
                            onClick={() => setConfirmando(null)}
                          >
                            Manter ação
                          </Button>
                        </div>
                        <AvisoServidor ativo={cancelando === acao.id} />
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        fullWidth={false}
                        className="mt-4 h-10"
                        onClick={() => setConfirmando(acao.id)}
                      >
                        Cancelar ação
                      </Button>
                    )
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </ResultadoApi>
      </div>
    </div>
  )
}
