import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { AvisoServidor } from '../../components/EstadoApi'
import { useAuth } from '../../hooks/useAuth'
import { PUBLIC_ROUTES } from '../../routes'
import { desativarMinhaConta } from '../../services/usuarios'
import { comoApiError, mensagemPadrao } from '../../utils/mensagemErro'

/** Desativação da conta (DELETE /usuarios/me), com confirmação; depois sai e volta à página inicial. */
export function DeactivateAccount() {
  const { sair } = useAuth()
  const navigate = useNavigate()
  const [confirmando, setConfirmando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function desativar() {
    setEnviando(true)
    setErro(null)
    try {
      await desativarMinhaConta()
    } catch (e) {
      setErro(mensagemPadrao(comoApiError(e)))
      setEnviando(false)
      return
    }
    sair()
    navigate(PUBLIC_ROUTES.home, { replace: true })
  }

  return (
    <section className="rounded-lg border border-danger/40 p-6 sm:p-8">
      <h2 className="font-serif text-2xl font-medium text-ink">
        Desativar conta
      </h2>
      <p className="mt-2 text-sm text-body">
        Sua conta deixa de poder entrar no Heaven. Esta ação não pode ser
        desfeita por aqui.
      </p>

      {erro ? (
        <p
          role="alert"
          className="mt-4 rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
        >
          {erro}
        </p>
      ) : null}

      {confirmando ? (
        <div role="group" aria-label="Confirmar desativação" className="mt-4">
          <p className="text-sm text-ink">
            Tem certeza de que deseja desativar sua conta?
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              fullWidth={false}
              className="h-10"
              disabled={enviando}
              onClick={() => void desativar()}
            >
              {enviando ? 'Desativando…' : 'Sim, desativar minha conta'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth={false}
              className="h-10"
              disabled={enviando}
              onClick={() => setConfirmando(false)}
            >
              Manter conta
            </Button>
          </div>
          <AvisoServidor ativo={enviando} />
        </div>
      ) : (
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          className="mt-4 h-10"
          onClick={() => setConfirmando(true)}
        >
          Desativar conta
        </Button>
      )}
    </section>
  )
}
