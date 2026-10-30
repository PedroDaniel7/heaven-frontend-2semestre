import type { ItemRanking } from '../types/api'
import { requisitar } from './http'

/** `limite` de 1 a 100. */
export function listarRanking(limite = 20): Promise<ItemRanking[]> {
  return requisitar<ItemRanking[]>('GET', '/api/ranking', { query: { limite } })
}
