import { Outlet } from 'react-router-dom'

import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

/**
 * Estrutura das páginas públicas herdadas da Sprint 2
 * (03-architecture.md §5 e §6.1).
 *
 * Concentra o header e o rodapé que no legado eram repetidos em cada
 * arquivo HTML.
 */
export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
