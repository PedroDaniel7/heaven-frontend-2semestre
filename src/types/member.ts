/** Integrante do projeto. */
export type Member = {
  id: string
  name: string
  rm: string
  photo: string
  github: string
  linkedin: string
  /** Nem todo integrante forneceu e-mail. */
  email?: string
  phone: string
}
