/** Ação sustentável que o usuário pode realizar e comprovar. */
export type Action = {
  /** Identificador usado na rota `/app/acoes/:id`. */
  id: string
  name: string
  /** Descrição da categoria, como exibida no painel da solução. */
  label: string
  /** Desafio de prova — presente apenas quando definido pelo produto. */
  challenge?: string
}
