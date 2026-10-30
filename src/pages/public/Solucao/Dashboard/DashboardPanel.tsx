import { ButtonLink } from '../../../../components/Button'
import { useAuth } from '../../../../hooks/useAuth'
import { APP_ROUTES, AUTH_ROUTES } from '../../../../routes'

/**
 * Painel do usuário na solução pública.
 *
 * O perfil e o registro de ações funcionam na área logada, ligados à API;
 * aqui o visitante é levado até lá.
 */
export function DashboardPanel() {
  const { estaAutenticado } = useAuth()

  return (
    <section className="rounded-lg border border-border p-6 sm:p-8">
      <h2 className="font-serif text-2xl font-medium text-ink">
        Registrar Nova Ação Sustentável
      </h2>
      <p className="mt-2 text-sm text-body">
        Sua ação passará pela validação descentralizada da comunidade antes de
        computar os pontos. Acompanhe seus pontos, sua sequência e sua
        reputação no seu painel.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {estaAutenticado ? (
          <ButtonLink to={APP_ROUTES.root} fullWidth={false}>
            Ir para o meu painel
          </ButtonLink>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  )
}
