import { createContext } from 'react'

import type { Credenciais, Usuario } from '../types/api'

export interface AuthContextValue {
  usuario: Usuario | null
  token: string | null
  estaAutenticado: boolean
  entrar: (credenciais: Credenciais) => Promise<void>
  sair: () => void
  /** Atualiza o usuário guardado na sessão (ex.: depois de editar o perfil). */
  atualizarUsuario: (usuario: Usuario) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
