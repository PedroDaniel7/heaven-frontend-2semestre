import { Link } from 'react-router-dom'

import { Logo } from '../../components/Logo'
import { ArrowRightIcon } from '../../components/icons'
import { RegisterForm } from '../../features/auth/forms'
import { PUBLIC_ROUTES } from '../../routes'

/**
 * Tela de Cadastro — /cadastro (04-screen-specs.md §6).
 *
 * A página compõe a interface: marca, headline, formulário e retorno
 * ao login (03-architecture.md §6 e §34).
 */
export function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-[23.75rem] lg:mx-0">
      <Logo className="text-ink" />

      <div className="mt-9 text-center">
        <h1 className="font-serif text-[2.75rem] leading-none text-ink">
          Crie sua conta.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Comece sua jornada de impacto.
        </p>
      </div>

      <div className="mt-9">
        <RegisterForm />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Já possui uma conta?{' '}
        <Link
          to={PUBLIC_ROUTES.login}
          className="inline-flex items-center gap-1 font-medium text-ink underline-offset-2 outline-none hover:underline focus-visible:underline"
        >
          Entrar
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </p>
    </div>
  )
}
