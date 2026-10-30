import type { TipoAcao } from '../types/api'
import { requisitar } from './http'

export function listarTiposAcao(): Promise<TipoAcao[]> {
  return requisitar<TipoAcao[]>('GET', '/api/tipos-acao')
}

export function obterTipoAcao(id: number): Promise<TipoAcao> {
  return requisitar<TipoAcao>('GET', `/api/tipos-acao/${id}`)
}
