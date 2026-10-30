import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

import type { ApiError } from '../services/http'

/**
 * Leva os `campos[]` de um erro 400 para os campos do formulário.
 * `mapa` traduz o nome do campo da API para o nome no formulário.
 * Devolve verdadeiro se pelo menos um campo foi marcado.
 */
export function aplicarCamposDoErro<T extends FieldValues>(
  erro: ApiError,
  setError: UseFormSetError<T>,
  mapa: Record<string, FieldPath<T>>,
): boolean {
  let marcou = false
  for (const { campo, mensagem } of erro.campos) {
    const destino = mapa[campo]
    if (!destino) continue
    setError(destino, { type: 'server', message: mensagem })
    marcou = true
  }
  return marcou
}
