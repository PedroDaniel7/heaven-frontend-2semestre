import { Outlet } from 'react-router-dom'

/**
 * Estrutura das telas não autenticadas (login, cadastro).
 *
 * O layout cuida apenas da estrutura compartilhada; o conteúdo pertence
 * às páginas (03-architecture.md §5). A composição visual definitiva
 * depende da referência visual aprovada de cada tela.
 */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
