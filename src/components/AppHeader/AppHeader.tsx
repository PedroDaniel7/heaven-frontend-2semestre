import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { APP_NAV_ITEMS, APP_ROUTES, AUTH_ROUTES } from '../../routes'
import { Logo } from '../Logo'

/**
 * Cabeçalho da área logada: marca, links das telas e botão Sair.
 *
 * Em telas estreitas os links descem para uma segunda linha, rolável na
 * horizontal se não couberem, em vez de virar um menu.
 */
export function AppHeader() {
  const { usuario, sair } = useAuth()
  const navigate = useNavigate()

  function aoSair() {
    sair()
    navigate(AUTH_ROUTES.login, { replace: true })
  }

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      'whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors outline-none',
      'focus-visible:ring-2 focus-visible:ring-primary/30',
      isActive
        ? 'bg-primary/8 font-medium text-primary'
        : 'text-body hover:text-primary',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link
          to={APP_ROUTES.root}
          className="outline-none focus-visible:underline focus-visible:underline-offset-4"
        >
          <Logo className="w-20 text-ink lg:w-24" />
          <span className="sr-only">Heaven — painel</span>
        </Link>

        <nav
          aria-label="Navegação da área logada"
          className="order-last -mx-1 w-full overflow-x-auto lg:order-none lg:mx-0 lg:w-auto lg:flex-1 lg:overflow-visible"
        >
          <ul className="flex items-center gap-1 lg:gap-3">
            {APP_NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={linkClasses}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {usuario ? (
            <span className="hidden max-w-40 truncate text-sm text-muted sm:inline">
              {usuario.nome}
            </span>
          ) : null}
          <button
            type="button"
            onClick={aoSair}
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors outline-none hover:bg-primary hover:text-canvas focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
