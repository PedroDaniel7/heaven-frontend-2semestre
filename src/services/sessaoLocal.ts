import type { Usuario } from '../types/api'

/** Sessão guardada no navegador. O acesso ao storage pode falhar (modo privado, bloqueio). */
export interface SessaoSalva {
  token: string
  expiraEm: string
  usuario: Usuario
}

const CHAVE = 'heaven.sessao'

export function lerSessao(): SessaoSalva | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE)
    if (!bruto) return null
    const sessao = JSON.parse(bruto) as Partial<SessaoSalva>
    if (!sessao.token || !sessao.expiraEm || !sessao.usuario) return null
    if (new Date(sessao.expiraEm).getTime() <= Date.now()) {
      limparSessao()
      return null
    }
    return sessao as SessaoSalva
  } catch {
    return null
  }
}

export function salvarSessao(sessao: SessaoSalva): void {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(sessao))
  } catch {
    // Sem storage a sessão vale só até recarregar a página.
  }
}

export function limparSessao(): void {
  try {
    window.localStorage.removeItem(CHAVE)
  } catch {
    // Nada a fazer.
  }
}
