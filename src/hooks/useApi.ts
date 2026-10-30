import { useCallback, useEffect, useState } from 'react'

import { ApiError } from '../services/http'

export type EstadoApi<T> =
  | { status: 'carregando' }
  | { status: 'erro'; erro: ApiError }
  | { status: 'vazio' }
  | { status: 'sucesso'; dados: T }

function ehVazio(dados: unknown): boolean {
  return dados === null || dados === undefined || (Array.isArray(dados) && dados.length === 0)
}

function comoApiError(e: unknown): ApiError {
  return e instanceof ApiError
    ? e
    : new ApiError(0, 'REDE', 'Não foi possível concluir a operação.')
}

/**
 * Carrega dados da API com os estados carregando, erro, vazio e sucesso.
 * `carregar` deve ser estável (module-level ou useCallback); quando muda, recarrega.
 */
export function useApi<T>(carregar: () => Promise<T>) {
  const [estado, setEstado] = useState<EstadoApi<T>>({ status: 'carregando' })
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let cancelado = false
    carregar()
      .then((dados) => {
        if (cancelado) return
        setEstado(ehVazio(dados) ? { status: 'vazio' } : { status: 'sucesso', dados })
      })
      .catch((e: unknown) => {
        if (!cancelado) setEstado({ status: 'erro', erro: comoApiError(e) })
      })
    return () => {
      cancelado = true
    }
  }, [carregar, tentativa])

  const recarregar = useCallback(() => {
    setEstado({ status: 'carregando' })
    setTentativa((n) => n + 1)
  }, [])

  return { estado, recarregar }
}
