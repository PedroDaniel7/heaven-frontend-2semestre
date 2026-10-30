import type { ReactNode } from 'react'

import { useAposAtraso } from '../../hooks/useAposAtraso'
import type { EstadoApi } from '../../hooks/useApi'
import { mensagemPadrao } from '../../utils/mensagemErro'
import { Button } from '../Button'

/** Aviso para quando o servidor gratuito ainda está acordando (primeira chamada). */
export function AvisoServidor({ ativo }: { ativo: boolean }) {
  const demorou = useAposAtraso(ativo)

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {demorou ? (
        <p className="mt-3 text-xs text-muted">
          Acordando o servidor, pode levar até 1 minuto.
        </p>
      ) : null}
    </div>
  )
}

/** Estado de carregamento de uma área de dados. */
export function Carregando({ rotulo = 'Carregando…' }: { rotulo?: string }) {
  return (
    <div className="py-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary"
        />
        {rotulo}
      </div>
      <AvisoServidor ativo />
    </div>
  )
}

type ErroProps = {
  mensagem: string
  onTentarNovamente?: () => void
}

/** Estado de erro de uma área de dados, com a opção de tentar de novo. */
export function AvisoErro({ mensagem, onTentarNovamente }: ErroProps) {
  return (
    <div
      role="alert"
      className="rounded-md border border-danger/40 bg-surface p-4"
    >
      <p className="text-sm text-danger">{mensagem}</p>
      {onTentarNovamente ? (
        <Button
          type="button"
          variant="secondary"
          fullWidth={false}
          className="mt-3 h-10"
          onClick={onTentarNovamente}
        >
          Tentar novamente
        </Button>
      ) : null}
    </div>
  )
}

/** Estado vazio de uma área de dados. */
export function AvisoVazio({
  titulo,
  texto,
  children,
}: {
  titulo: string
  texto?: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface p-6 text-center">
      <p className="font-serif text-xl text-ink">{titulo}</p>
      {texto ? <p className="mt-2 text-sm text-muted">{texto}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  )
}

type ResultadoProps<T> = {
  estado: EstadoApi<T>
  onTentarNovamente: () => void
  /** Conteúdo do estado vazio. */
  vazio: ReactNode
  /** Mensagem própria para um erro; sem ela usa o texto padrão por `codigo`. */
  erro?: (erro: Extract<EstadoApi<T>, { status: 'erro' }>['erro']) => string | null
  rotuloCarregando?: string
  children: (dados: T) => ReactNode
}

/** Escolhe entre carregando, erro, vazio e sucesso para o resultado de `useApi`. */
export function ResultadoApi<T>({
  estado,
  onTentarNovamente,
  vazio,
  erro,
  rotuloCarregando,
  children,
}: ResultadoProps<T>) {
  switch (estado.status) {
    case 'carregando':
      return <Carregando rotulo={rotuloCarregando} />
    case 'erro':
      return (
        <AvisoErro
          mensagem={erro?.(estado.erro) ?? mensagemPadrao(estado.erro)}
          onTentarNovamente={onTentarNovamente}
        />
      )
    case 'vazio':
      return <>{vazio}</>
    case 'sucesso':
      return <>{children(estado.dados)}</>
  }
}
