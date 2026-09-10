import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { RegisterPage } from '../pages/auth/Register'
import { ContatoPage } from '../pages/public/Contato'
import { FAQPage } from '../pages/public/FAQ'
import { HomePage } from '../pages/public/Home'
import { IntegrantesPage } from '../pages/public/Integrantes'
import { SobrePage } from '../pages/public/Sobre'
import { SolucaoPage } from '../pages/public/Solucao'
import { APP_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from './routeConfig'

/**
 * Árvore de rotas do Heaven.
 *
 * As páginas públicas são as obrigatórias herdadas da Sprint 2; as
 * telas de autenticação e a aplicação em `/app` são a nova experiência
 * (03-architecture.md §14).
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={PUBLIC_ROUTES.home} element={<HomePage />} />
        <Route path={PUBLIC_ROUTES.sobre} element={<SobrePage />} />
        <Route
          path={PUBLIC_ROUTES.integrantes}
          element={<IntegrantesPage />}
        />
        <Route path={PUBLIC_ROUTES.faq} element={<FAQPage />} />
        <Route path={PUBLIC_ROUTES.contato} element={<ContatoPage />} />
        <Route path={PUBLIC_ROUTES.solucao} element={<SolucaoPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={AUTH_ROUTES.register} element={<RegisterPage />} />
        {/* Login será registrado aqui. */}
      </Route>

      <Route path={APP_ROUTES.root} element={<AppLayout />}>
        {/* As telas autenticadas são registradas aqui. */}
      </Route>
    </Routes>
  )
}
