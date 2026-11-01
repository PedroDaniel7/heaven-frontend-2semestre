import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { AUTH_ROUTES } from '../../routes/routeConfig'

/**
 * Rota de layout: só renderiza as rotas filhas com usuário autenticado;
 * caso contrário redireciona para o login, guardando a página pedida.
 * Se a sessão acabou de ser encerrada aqui (Sair), vai ao login sem esse
 * estado, para a tela não mostrar o aviso de acesso restrito.
 */
export function RequireAuth() {
  const { estaAutenticado } = useAuth()
  const local = useLocation()
  const [estavaAutenticado, setEstavaAutenticado] = useState(estaAutenticado)
  const [saiu, setSaiu] = useState(false)

  // Ajuste durante a renderização: perder a autenticação aqui dentro é um "Sair".
  if (estavaAutenticado !== estaAutenticado) {
    setEstavaAutenticado(estaAutenticado)
    if (!estaAutenticado) setSaiu(true)
  }

  if (!estaAutenticado) {
    return (
      <Navigate
        to={AUTH_ROUTES.login}
        replace
        state={saiu ? undefined : { de: local }}
      />
    )
  }
  return <Outlet />
}
