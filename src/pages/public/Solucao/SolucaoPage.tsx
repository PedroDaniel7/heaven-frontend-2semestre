import { Link } from 'react-router-dom'

import { ButtonLink } from '../../../components/Button'
import { ArrowRightIcon } from '../../../components/icons'
import { useAuth } from '../../../hooks/useAuth'
import { APP_ROUTES, AUTH_ROUTES } from '../../../routes'

/** Atalhos para as telas reais da área logada. */
const ATALHOS = [
  {
    titulo: 'Painel',
    texto: 'Seus pontos, sua sequência, sua reputação e suas últimas ações.',
    to: APP_ROUTES.root,
  },
  {
    titulo: 'Registrar ação',
    texto: 'Registre uma ação sustentável e envie a evidência para a comunidade.',
    to: APP_ROUTES.newAction,
  },
  {
    titulo: 'Minhas ações',
    texto: 'Acompanhe o status de cada ação e cancele as que ainda estão pendentes.',
    to: APP_ROUTES.myActions,
  },
  {
    titulo: 'Validar ações',
    texto: 'Audite, de forma anônima, a evidência de outros usuários e vote.',
    to: APP_ROUTES.validation,
  },
  {
    titulo: 'Ranking',
    texto: 'Veja quem mais pontua na comunidade.',
    to: APP_ROUTES.ranking,
  },
  {
    titulo: 'Perfil',
    texto: 'Edite seus dados ou desative sua conta.',
    to: APP_ROUTES.profile,
  },
]

/**
 * Solução do Projeto — página pública obrigatória da Sprint 2
 * (04-screen-specs.md §5).
 *
 * As interfaces do legado (`solucao-dashboard.html` e
 * `solucao-validar.html`) agora existem como telas reais em `/app`,
 * ligadas à API; esta página apenas leva até elas.
 */
export function SolucaoPage() {
  const { estaAutenticado } = useAuth()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl text-ink">Solução do Projeto</h1>
        <p className="mt-3 leading-relaxed text-body">
          A solução do Heaven combina o registro de ações sustentáveis com a
          auditoria distribuída da própria comunidade.
        </p>
      </header>

      {estaAutenticado ? null : (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={AUTH_ROUTES.register} fullWidth={false}>
            Criar minha conta
          </ButtonLink>
          <ButtonLink
            to={AUTH_ROUTES.login}
            variant="secondary"
            fullWidth={false}
          >
            Entrar
          </ButtonLink>
        </div>
      )}

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATALHOS.map((atalho) => (
          <li key={atalho.to}>
            <Link
              to={atalho.to}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors outline-none hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <h2 className="font-serif text-2xl font-medium text-ink">
                {atalho.titulo}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                {atalho.texto}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-link">
                Abrir
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
