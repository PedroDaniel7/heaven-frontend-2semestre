import { useEffect, useRef, useState } from 'react'

import { Button } from '../../../components/Button'
import { AvisoServidor } from '../../../components/EstadoApi'
import { Textarea } from '../../../components/Textarea'
import { votar } from '../../../services/validacoes'
import type { ResultadoVoto, Sorteio, Voto } from '../../../types/api'
import { formatarDataHora, formatarNumero } from '../../../utils/formatar'
import { comoApiError, mensagemPadrao } from '../../../utils/mensagemErro'

type Props = {
  sorteio: Sorteio
  /** Pede outra ação; `aviso` aparece acima da nova oferta. */
  onValidarOutra: (aviso?: string | null) => void
}

/** Segundos que faltam até `expiraEm`, atualizados a cada segundo. */
function useSegundosRestantes(expiraEm: string): number {
  const alvo = new Date(expiraEm).getTime()
  const calcular = () => Math.max(0, Math.ceil((alvo - Date.now()) / 1000))
  const [restantes, setRestantes] = useState(calcular)

  useEffect(() => {
    const id = window.setInterval(() => setRestantes(calcular()), 1000)
    return () => window.clearInterval(id)
    // `calcular` só depende de `alvo`.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [alvo])

  return restantes
}

function textoRestante(segundos: number): string {
  const min = Math.floor(segundos / 60)
  const seg = String(segundos % 60).padStart(2, '0')
  return `${min}:${seg}`
}

function mensagemDoVoto(e: unknown): string {
  const erro = comoApiError(e)
  switch (erro.codigo) {
    case 'CONFLITO':
      return 'Esta ação já foi concluída ou você já votou.'
    case 'PROIBIDO':
      return erro.message
    case 'REGRA':
      return 'Limite diário de validações atingido.'
    default:
      return mensagemPadrao(erro)
  }
}

/** Ação anônima sorteada, com os botões de voto e o resultado. */
export function OfertaValidacao({ sorteio, onValidarOutra }: Props) {
  const { acao } = sorteio
  const restantes = useSegundosRestantes(sorteio.expiraEm)
  const [justificativa, setJustificativa] = useState('')
  const [enviando, setEnviando] = useState<Voto | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [resultado, setResultado] = useState<ResultadoVoto | null>(null)
  const resultadoRef = useRef<HTMLParagraphElement>(null)

  // Os botões somem após o voto: o foco vai para o resultado.
  useEffect(() => {
    if (resultado) resultadoRef.current?.focus()
  }, [resultado])

  async function enviar(voto: Voto) {
    setEnviando(voto)
    setErro(null)
    try {
      const texto = justificativa.trim()
      setResultado(
        await votar({
          idAcao: acao.id,
          voto,
          ...(texto ? { justificativa: texto } : {}),
        }),
      )
    } catch (e) {
      if (comoApiError(e).codigo === 'OFERTA_EXPIRADA') {
        onValidarOutra('A oferta anterior expirou. Sorteamos outra ação para você.')
        return
      }
      setErro(mensagemDoVoto(e))
    } finally {
      setEnviando(null)
    }
  }

  const expirou = restantes === 0

  return (
    <article className="rounded-lg border border-primary/30 bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="inline-block rounded bg-sage/30 px-2 py-1 text-xs font-semibold tracking-wide text-ink">
          AÇÃO PENDENTE ID #{acao.id}
        </p>
        {!resultado ? (
          <p className="text-xs text-muted">
            {expirou
              ? 'A oferta expirou.'
              : `Oferta válida por mais ${textoRestante(restantes)}`}
          </p>
        ) : null}
      </div>

      <h2 className="mt-3 font-serif text-xl font-medium text-ink">
        {acao.tipo.nome}
      </h2>
      <p className="mt-1 text-xs text-muted">
        {formatarNumero(acao.quantidade)} {acao.tipo.unidade} · registrada em{' '}
        {formatarDataHora(acao.dataHora)}
      </p>

      {acao.tipo.desafio ? (
        <p className="mt-4 text-sm leading-relaxed text-body">
          <span className="font-medium text-ink">Desafio: </span>
          {acao.tipo.desafio}
        </p>
      ) : null}

      <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm leading-relaxed break-words text-muted italic">
        {acao.evidencia}
      </blockquote>

      <div role="status" aria-live="polite" aria-atomic="true">
        {resultado ? (
          <div className="mt-6 rounded-md bg-primary/8 px-4 py-3 text-center">
            <p
              ref={resultadoRef}
              tabIndex={-1}
              className="text-sm font-medium text-primary outline-none"
            >
              {resultado.voto === 'APROVAR'
                ? 'Voto de aprovação registrado.'
                : 'Voto de reprovação registrado.'}
            </p>
            {resultado.acaoConcluida ? (
              <p className="mt-1 text-sm text-primary">
                A votação desta ação foi concluída.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {erro ? (
        <p
          role="alert"
          className="mt-6 rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
        >
          {erro}
        </p>
      ) : null}

      {resultado ? (
        <Button
          type="button"
          fullWidth={false}
          className="mt-6"
          onClick={() => onValidarOutra()}
        >
          Validar outra
        </Button>
      ) : expirou ? (
        <Button
          type="button"
          fullWidth={false}
          className="mt-6"
          onClick={() => onValidarOutra()}
        >
          Pedir outra ação
        </Button>
      ) : (
        <>
          <div className="mt-6">
            <Textarea
              label="Justificativa (opcional)"
              rows={2}
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              disabled={enviando !== null}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              disabled={enviando !== null}
              onClick={() => void enviar('APROVAR')}
            >
              {enviando === 'APROVAR' ? 'Enviando…' : 'Aprovar'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={enviando !== null}
              onClick={() => void enviar('REJEITAR')}
            >
              {enviando === 'REJEITAR' ? 'Enviando…' : 'Reprovar'}
            </Button>
          </div>
          <AvisoServidor ativo={enviando !== null} />
        </>
      )}
    </article>
  )
}
