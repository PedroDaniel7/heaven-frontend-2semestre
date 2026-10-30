import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { AvisoServidor } from '../../components/EstadoApi'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Textarea } from '../../components/Textarea'
import { ArrowRightIcon } from '../../components/icons'
import { actionDetailPath, APP_ROUTES } from '../../routes'
import { criarAcao } from '../../services/acoes'
import type { TipoAcao } from '../../types/api'
import { aplicarCamposDoErro } from '../../utils/camposErro'
import { comoApiError, mensagemPadrao } from '../../utils/mensagemErro'

type NewActionFormData = {
  tipoId: string
  quantidade: string
  evidencia: string
}

/** Número positivo com até duas casas; aceita vírgula ou ponto. */
const QUANTIDADE_PATTERN = /^\d+([.,]\d{1,2})?$/

function mensagemDoRegistro(e: unknown): string {
  const erro = comoApiError(e)
  switch (erro.codigo) {
    case 'REGRA':
      return 'Não foi possível registrar: você atingiu o limite diário de ações ou este tipo de ação está inativo.'
    case 'PROIBIDO':
      return 'Você está impedido de registrar ações por uma penalização ativa.'
    case 'NAO_ENCONTRADO':
      return 'Esse tipo de ação não existe mais. Atualize a página e escolha outro.'
    default:
      return mensagemPadrao(erro)
  }
}

/** Formulário de registro de ação (POST /acoes) com os tipos vindos da API. */
export function NewActionForm({ tipos }: { tipos: TipoAcao[] }) {
  const navigate = useNavigate()
  const [erroGeral, setErroGeral] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewActionFormData>({
    mode: 'onTouched',
    defaultValues: { tipoId: String(tipos[0].id), quantidade: '', evidencia: '' },
  })

  const tipoId = useWatch({ control, name: 'tipoId' })
  const tipo = tipos.find((t) => String(t.id) === tipoId) ?? tipos[0]

  async function onSubmit(dados: NewActionFormData) {
    setErroGeral(null)
    try {
      await criarAcao({
        idTipoAcao: Number(dados.tipoId),
        quantidade: Number(dados.quantidade.replace(',', '.')),
        evidencia: dados.evidencia.trim(),
      })
    } catch (e) {
      const erro = comoApiError(e)
      const marcou =
        erro.codigo === 'VALIDACAO' &&
        aplicarCamposDoErro(erro, setError, {
          idTipoAcao: 'tipoId',
          quantidade: 'quantidade',
          evidencia: 'evidencia',
        })
      if (!marcou) setErroGeral(mensagemDoRegistro(erro))
      return
    }
    navigate(APP_ROUTES.myActions, {
      state: {
        aviso:
          'Ação registrada! Ela entrou na fila e será revisada pela comunidade.',
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <Select
          label="Tipo de Impacto"
          error={errors.tipoId?.message}
          {...register('tipoId')}
        >
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </Select>

        <Link
          to={actionDetailPath(tipo.id)}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
        >
          Ver detalhes deste tipo
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <Input
        label="Quantidade"
        inputMode="decimal"
        placeholder="Ex: 12"
        helperText={`Unidade: ${tipo.unidade}.`}
        error={errors.quantidade?.message}
        {...register('quantidade', {
          required: 'Informe a quantidade.',
          pattern: {
            value: QUANTIDADE_PATTERN,
            message: 'Use um número com até duas casas decimais.',
          },
          validate: (valor) =>
            Number(valor.replace(',', '.')) > 0 ||
            'A quantidade deve ser maior que zero.',
        })}
      />

      <Textarea
        label="Evidência"
        rows={3}
        placeholder="Ex: Utilizei a linha verde do metrô para ir ao trabalho (deslocamento de 12 km)."
        error={errors.evidencia?.message}
        {...register('evidencia', {
          validate: (valor) =>
            valor.trim().length > 0 ||
            'Descreva a evidência da ação (o que você fez e como comprova).',
        })}
      />

      {erroGeral ? (
        <p
          role="alert"
          className="rounded-md border border-danger/40 bg-surface px-4 py-3 text-sm text-danger"
        >
          {erroGeral}
        </p>
      ) : null}

      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando…' : 'Submeter para Auditoria Coletiva'}
        </Button>
        <AvisoServidor ativo={isSubmitting} />
      </div>
    </form>
  )
}
