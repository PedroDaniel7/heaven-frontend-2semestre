import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Logo } from '../Logo'
import { CloseIcon, MenuIcon } from '../icons'
import { PUBLIC_NAV_ITEMS, PUBLIC_ROUTES } from '../../routes'

/**
 * Navegação pública, migrada do header repetido nas 7 páginas da
 * Sprint 2.
 *
 * O menu mobile é controlado por estado React — no legado era feito
 * com `classList.toggle` em `js/main.js`.
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Com o menu mobile aberto, Escape fecha o menu e devolve o foco ao
  // botão que o abriu.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      'text-sm transition-colors outline-none',
      'focus-visible:underline focus-visible:underline-offset-4',
      isActive
        ? 'font-medium text-primary'
        : 'text-body hover:text-primary',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <NavLink
          to={PUBLIC_ROUTES.home}
          className="outline-none focus-visible:underline focus-visible:underline-offset-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className="w-20 text-ink lg:w-24" />
          <span className="sr-only">Heaven — página inicial</span>
        </NavLink>

        <ul className="hidden items-center gap-7 lg:flex">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end className={linkClasses}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors outline-none hover:bg-border/40 focus-visible:ring-2 focus-visible:ring-primary/30 lg:hidden"
        >
          {isMenuOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </nav>

      <div
        id="menu-mobile"
        hidden={!isMenuOpen}
        className="border-t border-border bg-canvas lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                onClick={() => setIsMenuOpen(false)}
                className={(state) =>
                  ['block py-3', linkClasses(state)].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
