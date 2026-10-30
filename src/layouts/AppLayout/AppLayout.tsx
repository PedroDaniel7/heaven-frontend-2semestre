import { Outlet } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'

/**
 * Estrutura das telas autenticadas: cabeçalho com a navegação e o
 * conteúdo principal (02-design-system.md §26 e §27, 06-responsive.md §6).
 */
export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <AppHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Outlet />
      </main>
    </div>
  )
}
