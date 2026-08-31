import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { RegisterPage } from '../pages/Register'
import { APP_ROUTES, PUBLIC_ROUTES } from './routeConfig'

/**
 * TEMPORÁRIO — placeholder de fundação.
 *
 * Existe apenas enquanto a tela inicial do fluxo não foi implementada.
 * Deve ser removido quando o Login for construído.
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
 * (05-development-workflow.md §2).
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* TEMPORÁRIO — remover quando a tela de Login for implementada. */}
      <Route path="/" element={<FoundationPlaceholder />} />

      {/* Rotas públicas (PUBLIC_ROUTES). */}
      <Route element={<AuthLayout />}>
        <Route path={PUBLIC_ROUTES.register} element={<RegisterPage />} />
        {/* Login será registrado aqui. */}
      </Route>

      {/* Rotas autenticadas: /app e subrotas (APP_ROUTES). */}
      <Route path={APP_ROUTES.root} element={<AppLayout />}>
        {/* As telas autenticadas são registradas aqui. */}
      </Route>
    </Routes>
  )
}
