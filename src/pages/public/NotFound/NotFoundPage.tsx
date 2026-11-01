import { useEffect } from 'react'

import { ButtonLink } from '../../../components/Button'
import { PUBLIC_ROUTES } from '../../../routes'

const APP_NAME = 'Heaven'

/** Página 404 — exibida para qualquer endereço que não existe no site. */
export function NotFoundPage() {
  // Título da aba próprio, restaurando o anterior ao sair da página.
  useEffect(() => {
    const previousTitle = document.title
    document.title = `Página não encontrada — ${APP_NAME}`

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8 lg:py-20">
      <h1 className="font-serif text-4xl text-ink">Página não encontrada</h1>
      <p className="mt-3 text-body">
        O endereço que você tentou abrir não existe ou foi removido.
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink to={PUBLIC_ROUTES.home} fullWidth={false}>
          Voltar para a página inicial
        </ButtonLink>
      </div>
    </div>
  )
}
