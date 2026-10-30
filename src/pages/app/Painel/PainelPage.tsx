import { Link } from 'react-router-dom'

import { ButtonLink } from '../../../components/Button'
import { AvisoVazio, ResultadoApi } from '../../../components/EstadoApi'
import { StatBox } from '../../../components/StatBox'
import { StatusAcao } from '../../../components/StatusAcao'
import { ArrowRightIcon } from '../../../components/icons'
import { useApi } from '../../../hooks/useApi'
import { APP_ROUTES } from '../../../routes'
import { listarMinhasAcoes } from '../../../services/acoes'
import { obterMeuUsuario } from '../../../services/usuarios'
import { formatarDataHora, formatarNumero } from '../../../utils/formatar'

const ULTIMAS_ACOES = 5

/**
 * Painel — /app. Mostra o perfil real (GET /usuarios/me) e as últimas
 * ações do usuário (GET /acoes/minhas).
 */
export function PainelPage() {
  const perfil = useApi(obterMeuUsuario)
  const acoes = useApi(listarMinhasAcoes)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <aside className="h-fit rounded-lg bg-surface p-6 ring-1 ring-border">
        <h1 className="font-serif text-2xl font-medium text-ink">Seu Perfil</h1>

        <ResultadoApi
          estado={perfil.estado}
          onTentarNovamente={perfil.recarregar}
          rotuloCarregando="Carregando seu perfil…"
          vazio={null}
        >
          {(usuario) => (
            <>
              <p className="mt-1 text-sm text-muted">Nível {usuario.nivel}</p>
              <div className="mt-6 space-y-3">
                <StatBox
                  label="Pontos Acumulados"
                  value={formatarNumero(usuario.pontos)}
                />
                <StatBox
                  label="Sequência Ativa (Streak)"
                  value={`🔥 ${usuario.streak} ${usuario.streak === 1 ? 'Dia' : 'Dias'}`}
                />
                <StatBox
                  label="Reputação na Rede"
                  value={`${formatarNumero(usuario.reputacao)}%`}
                />
              </div>
            </>
          )}
        </ResultadoApi>
      </aside>

      <section className="rounded-lg border border-border p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium text-ink">
              Últimas ações
            </h2>
            <p className="mt-2 text-sm text-body">
              Cada ação passa pela validação da comunidade antes de gerar
              pontos.
            </p>
          </div>
          <ButtonLink to={APP_ROUTES.newAction} fullWidth={false}>
            Registrar nova ação
          </ButtonLink>
        </div>

        <div className="mt-6">
          <ResultadoApi
            estado={acoes.estado}
            onTentarNovamente={acoes.recarregar}
            rotuloCarregando="Carregando suas ações…"
            vazio={
              <AvisoVazio
                titulo="Você ainda não registrou nenhuma ação"
                texto="Registre sua primeira ação sustentável para começar a pontuar."
              />
            }
          >
            {(lista) => (
              <>
                <ul className="divide-y divide-border">
                  {lista.slice(0, ULTIMAS_ACOES).map((acao) => (
                    <li
                      key={acao.id}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">
                          {acao.tipo.nome}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {formatarNumero(acao.quantidade)} {acao.tipo.unidade}{' '}
                          · {formatarDataHora(acao.dataHora)}
                        </p>
                      </div>
                      <StatusAcao status={acao.status} />
                    </li>
                  ))}
                </ul>
                <Link
                  to={APP_ROUTES.myActions}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
                >
                  Ver todas as minhas ações
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </ResultadoApi>
        </div>
      </section>
    </div>
  )
}
