import type { NovoVoto, ResultadoVoto, Sorteio } from '../types/api'
import { requisitar } from './http'

/** Devolve `null` quando não há ação elegível (resposta 204). */
export async function sortearAcao(): Promise<Sorteio | null> {
  const sorteio = await requisitar<Sorteio | undefined>(
    'POST',
    '/api/validacoes/sorteio',
  )
  return sorteio ?? null
}

export function votar(voto: NovoVoto): Promise<ResultadoVoto> {
  return requisitar<ResultadoVoto>('POST', '/api/validacoes', { corpo: voto })
}
