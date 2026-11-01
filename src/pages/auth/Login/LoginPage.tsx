import { Link, Navigate, useLocation } from 'react-router-dom'

import { Logo } from '../../../components/Logo'
import { ArrowRightIcon } from '../../../components/icons'
import { LoginForm } from '../../../features/auth/forms'
import { useAuth } from '../../../hooks/useAuth'
import { APP_ROUTES, AUTH_ROUTES } from '../../../routes'

/** Estado enviado pelo RequireAuth ao redirecionar para o login. */
type EstadoRedirecionamento = { de?: { pathname?: unknown } } | null

/** Destino pedido antes do redirecionamento ao login (guardado pelo RequireAuth). */
function destinoDepoisDoLogin(state: EstadoRedirecionamento): string {
  const de = state?.de?.pathname
  return typeof de === 'string' && de.startsWith('/app') ? de : APP_ROUTES.root
}

/** Tela de Login — /login. Quem já está autenticado segue direto para o painel. */
export function LoginPage() {
  const { estaAutenticado } = useAuth()
  const local = useLocation()
  const estado = local.state as EstadoRedirecionamento

  if (estaAutenticado) {
    return <Navigate to={destinoDepoisDoLogin(estado)} replace />
  }

  return (
    <div className="mx-auto w-full max-w-[23.75rem] lg:mx-0">
      <Logo className="mx-auto w-[7.625rem] text-ink" />

      <div className="mt-9 text-center">
        <h1 className="font-serif text-[2.75rem] leading-none text-ink">
          Bem-vindo de volta.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Entre para continuar sua jornada de impacto.
        </p>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {estado?.de ? (
          <p className="mt-9 rounded-md bg-primary/8 px-4 py-3 text-sm font-medium text-primary">
            Faça login para acessar esta página.
          </p>
        ) : null}
      </div>

      <div className={estado?.de ? 'mt-6' : 'mt-9'}>
        <LoginForm />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Ainda não tem conta?{' '}
        <Link
          to={AUTH_ROUTES.register}
          className="inline-flex items-center gap-1 font-medium text-ink underline-offset-2 outline-none hover:underline focus-visible:underline"
        >
          Criar conta
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </p>
    </div>
  )
}
