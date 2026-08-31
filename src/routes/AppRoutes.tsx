import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { APP_ROUTES } from './routeConfig'

/**
 * TEMPORÁRIO — placeholder de fundação.
 *
 * Existe apenas para permitir verificar que a aplicação inicia, que o
 * roteamento funciona e que o Tailwind está ativo enquanto nenhuma tela
 * foi implementada. Deve ser removido no ciclo da primeira tela.
 */
function FoundationPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <p className="text-center text-sm">
        Fundação do projeto configurada. Nenhuma tela implementada ainda.
      </p>
    </div>
  )
}

/**
 * Árvore de rotas do Heaven.
 *
 * As telas são registradas uma por ciclo de desenvolvimento
 * (05-development-workflow.md §2). Os slots abaixo indicam onde cada
 * grupo de rotas deve ser declarado.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* TEMPORÁRIO — remover quando a primeira tela for implementada. */}
      <Route path="/" element={<FoundationPlaceholder />} />

      {/* Rotas públicas: /login, /cadastro (PUBLIC_ROUTES). */}
      <Route element={<AuthLayout />}>
        {/* As telas públicas são registradas aqui. */}
      </Route>

      {/* Rotas autenticadas: /app e subrotas (APP_ROUTES). */}
      <Route path={APP_ROUTES.root} element={<AppLayout />}>
        {/* As telas autenticadas são registradas aqui. */}
      </Route>
    </Routes>
  )
}
