import { Outlet } from 'react-router-dom'

import { AuthBrandPanel } from './AuthBrandPanel'

/**
 * Estrutura das telas não autenticadas (login, cadastro).
 *
 * Desktop: `form | brand composition`. Mobile: apenas o formulário,
 * com a composição decorativa ocultada (06-responsive.md §21).
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <main className="flex w-full flex-1 items-center px-6 py-10 sm:px-10 lg:w-[48%] lg:py-7 lg:pr-10 lg:pl-[6%]">
        <Outlet />
      </main>

      <AuthBrandPanel />
    </div>
  )
}
