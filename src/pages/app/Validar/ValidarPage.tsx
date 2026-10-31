import { useState } from 'react'

import { AvisoVazio, ResultadoApi } from '../../../components/EstadoApi'
import { useApi } from '../../../hooks/useApi'
import { sortearAcao } from '../../../services/validacoes'
import type { ApiError } from '../../../services/http'
import { OfertaValidacao } from './OfertaValidacao'

/** Erros do sorteio com texto próprio; os demais usam a mensagem padrão. */
function mensagemDoSorteio(erro: ApiError): string | null {
  if (erro.codigo === 'PROIBIDO') return erro.message
  if (erro.codigo === 'REGRA') return 'Limite diário de validações atingido.'
  return null
}

/**
 * Validar — /app/validar. Ao abrir, sorteia uma ação de outro usuário
 * (POST /validacoes/sorteio); o autor nunca aparece.
 */
export function ValidarPage() {
  const { estado, recarregar } = useApi(sortearAcao)
  const [aviso, setAviso] = useState<string | null>(null)

  function validarOutra(novoAviso: string | null = null) {
    setAviso(novoAviso)
    recarregar()
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="font-serif text-4xl text-ink">
        Central de Auditoria de Pares
      </h1>
      <p className="mt-3 leading-relaxed text-body">
        Analise a evidência abaixo de forma imparcial. Seu voto correto aumenta
        sua reputação na rede.
      </p>

      <div role="status" aria-live="polite" aria-atomic="true">
        {aviso ? (
          <p className="mt-6 rounded-md bg-primary/8 px-4 py-3 text-sm font-medium text-primary">
            {aviso}
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <ResultadoApi
          estado={estado}
          onTentarNovamente={() => validarOutra()}
          rotuloCarregando="Sorteando uma ação para você…"
          erro={mensagemDoSorteio}
          vazio={
            <AvisoVazio
              titulo="Nenhuma ação disponível para validar agora"
              texto="Todas as ações pendentes já foram votadas por você ou são suas. Volte mais tarde."
            />
          }
        >
          {(sorteio) =>
            sorteio ? (
              <OfertaValidacao
                key={sorteio.acao.id}
                sorteio={sorteio}
                onValidarOutra={validarOutra}
              />
            ) : null
          }
        </ResultadoApi>
      </div>
    </div>
  )
}
