import type { Action } from '../types'

/**
 * Ações sustentáveis disponíveis.
 *
 * As categorias e descrições vêm do painel da solução da Sprint 2. Os
 * nomes seguem 01-product.md §5, e o desafio de Transporte público é o
 * exemplo definido em 01-product.md §6 — as demais ações ainda não têm
 * desafio definido pelo produto.
 */
export const ACTIONS: Action[] = [
  {
    id: 'transporte',
    name: 'Transporte público',
    label: 'Uso de Transporte Público (Metrô/Ônibus)',
    challenge: 'Mostre o transporte utilizado e faça o gesto ✌️.',
  },
  {
    id: 'energia',
    name: 'Economia de energia',
    label: 'Redução de Consumo Elétrico (Evidência em Conta)',
  },
  {
    id: 'reciclagem',
    name: 'Reciclagem',
    label: 'Descarte Correto de Eletrônicos/Óleo',
  },
]

export function findAction(id: string) {
  return ACTIONS.find((action) => action.id === id)
}
