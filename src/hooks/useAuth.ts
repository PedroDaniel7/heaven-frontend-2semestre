import { useContext } from 'react'

import { AuthContext } from '../context/contextoAuth'
import type { AuthContextValue } from '../context/contextoAuth'

export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.')
  }
  return contexto
}
