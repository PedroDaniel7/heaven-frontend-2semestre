import { Outlet } from 'react-router-dom'

/**
 * Estrutura das telas autenticadas (dashboard, ações, validação,
 * ranking, perfil).
 *
 * No desktop a composição é `navegação lateral + conteúdo principal`; no
 * mobile a navegação é substituída por uma navegação compacta
 * (02-design-system.md §26 e §27, 06-responsive.md §6).
 *
 * Os componentes de navegação (Sidebar / MobileNavigation) ainda não
 * foram implementados — dependem da referência visual aprovada — e serão
 * montados nos slots indicados abaixo.
 */
export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Slot: Sidebar (desktop) — 02-design-system.md §26. */}

      <main className="flex w-full flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Slot: MobileNavigation (mobile) — 02-design-system.md §27. */}
    </div>
  )
}
