import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { login } from '../services/auth'
import { definirAoSessaoExpirar, definirToken } from '../services/http'
import {
  lerSessao,
  limparSessao,
  salvarSessao,
} from '../services/sessaoLocal'
import type { SessaoSalva } from '../services/sessaoLocal'
import type { Credenciais, Usuario } from '../types/api'
import { AuthContext } from './contextoAuth'
import type { AuthContextValue } from './contextoAuth'

function restaurarSessao(): SessaoSalva | null {
  const sessao = lerSessao()
  definirToken(sessao?.token ?? null)
  return sessao
}

/** Guarda a sessão (token e usuário) e oferece login e logout à aplicação. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<SessaoSalva | null>(restaurarSessao)

  const sair = useCallback(() => {
    definirToken(null)
    limparSessao()
    setSessao(null)
  }, [])

  const entrar = useCallback(async (credenciais: Credenciais) => {
    const resposta = await login(credenciais)
    const nova: SessaoSalva = {
      token: resposta.token,
      expiraEm: resposta.expiraEm,
      usuario: resposta.usuario,
    }
    definirToken(nova.token)
    salvarSessao(nova)
    setSessao(nova)
  }, [])

  const atualizarUsuario = useCallback((usuario: Usuario) => {
    setSessao((atual) => {
      if (!atual) return atual
      const nova = { ...atual, usuario }
      salvarSessao(nova)
      return nova
    })
  }, [])

  // Token recusado pela API (expirado ou inválido): encerra a sessão local.
  useEffect(() => {
    definirAoSessaoExpirar(sair)
  }, [sair])

  const valor = useMemo<AuthContextValue>(
    () => ({
      usuario: sessao?.usuario ?? null,
      token: sessao?.token ?? null,
      estaAutenticado: sessao !== null,
      entrar,
      sair,
      atualizarUsuario,
    }),
    [sessao, entrar, sair, atualizarUsuario],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
