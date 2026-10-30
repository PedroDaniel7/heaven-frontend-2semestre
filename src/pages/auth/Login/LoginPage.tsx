import { Link } from 'react-router-dom'

import { Logo } from '../../../components/Logo'
import { AUTH_ROUTES } from '../../../routes'

/** Página mínima de /login; o formulário completo vem em seguida. */
export function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-[23.75rem] lg:mx-0">
      <Logo className="mx-auto w-[7.625rem] text-ink" />

      <div className="mt-9 text-center">
        <h1 className="font-serif text-[2.75rem] leading-none text-ink">
          Entrar
        </h1>
        <p className="mt-3 text-sm text-muted">
          O acesso à sua conta estará disponível em breve.
        </p>
      </div>

      <p className="mt-9 text-center text-xs text-muted">
        Ainda não tem conta?{' '}
        <Link
          to={AUTH_ROUTES.register}
          className="font-medium text-ink underline underline-offset-2 outline-none focus-visible:no-underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  )
}
