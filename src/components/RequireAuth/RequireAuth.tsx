import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { AUTH_ROUTES } from '../../routes/routeConfig'

/**
 * Rota de layout: só renderiza as rotas filhas com usuário autenticado;
 * caso contrário redireciona para o login, guardando a página pedida.
 */
export function RequireAuth() {
  const { estaAutenticado } = useAuth()
  const local = useLocation()

  if (!estaAutenticado) {
    return <Navigate to={AUTH_ROUTES.login} replace state={{ de: local }} />
  }
  return <Outlet />
}
