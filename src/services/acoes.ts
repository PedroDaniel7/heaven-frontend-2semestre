import type { Acao, NovaAcao } from '../types/api'
import { requisitar } from './http'

export function criarAcao(dados: NovaAcao): Promise<Acao> {
  return requisitar<Acao>('POST', '/api/acoes', { corpo: dados })
}

/** Mais recentes primeiro. */
export function listarMinhasAcoes(): Promise<Acao[]> {
  return requisitar<Acao[]>('GET', '/api/acoes/minhas')
}

export function obterAcao(id: number): Promise<Acao> {
  return requisitar<Acao>('GET', `/api/acoes/${id}`)
}

/** Cancelamento lógico: a ação passa a CANCELADA. */
export function cancelarAcao(id: number): Promise<void> {
  return requisitar<void>('DELETE', `/api/acoes/${id}`)
}
