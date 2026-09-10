import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../../../components/Button'
import { Select } from '../../../../components/Select'
import { StatBox } from '../../../../components/StatBox'
import { Textarea } from '../../../../components/Textarea'
import type { ActionRegistrationData } from './types'

/** Indicadores do perfil, migrados de `solucao-dashboard.html`. */
const PROFILE_STATS = [
  { label: 'Pontos Acumulados', value: '120' },
  { label: 'Sequência Ativa (Streak)', value: '🔥 5 Dias' },
  { label: 'Reputação na Rede', value: '98% (Excelente)' },
]

const IMPACT_TYPES = [
  {
    value: 'transporte',
    label: 'Uso de Transporte Público (Metrô/Ônibus)',
  },
  {
    value: 'energia',
    label: 'Redução de Consumo Elétrico (Evidência em Conta)',
  },
  { value: 'reciclagem', label: 'Descarte Correto de Eletrônicos/Óleo' },
]

/**
 * Painel do usuário da solução pública da Sprint 2.
 *
 * O envio é uma simulação local, como no legado: não há API
 * (07-forms.md §33 e §34).
 */
export function DashboardPanel() {
  const [wasSubmitted, setWasSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActionRegistrationData>({
    mode: 'onTouched',
    defaultValues: { impactType: IMPACT_TYPES[0].value, description: '' },
  })

  function onSubmit() {
    setWasSubmitted(true)
    reset()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <aside className="h-fit rounded-lg bg-surface p-6 ring-1 ring-border">
        <h2 className="font-serif text-2xl text-ink">Seu Perfil</h2>
        <p className="mt-1 text-sm text-muted">Nível Eco Cidadão</p>

        <div className="mt-6 space-y-3">
          {PROFILE_STATS.map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-border p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-ink">
          Registrar Nova Ação Sustentável
        </h2>
        <p className="mt-2 text-sm text-body">
          Sua ação passará pela validação descentralizada da comunidade antes
          de computar os pontos.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 space-y-5"
        >
          <Select label="Tipo de Impacto" {...register('impactType')}>
            {IMPACT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>

          <Textarea
            label="Descrição ou Justificativa"
            rows={3}
            placeholder="Ex: Utilizei a linha verde do metrô para ir ao trabalho (Deslocamento de 12km)."
            error={errors.description?.message}
            {...register('description', {
              required:
                'Por favor, preencha a descrição com os detalhes da ação.',
            })}
          />

          <Button type="submit" onClick={() => setWasSubmitted(false)}>
            Submeter para Auditoria Coletiva
          </Button>
        </form>

        {wasSubmitted ? (
          <p
            role="status"
            className="mt-4 rounded-md bg-primary/8 px-4 py-3 text-sm font-medium text-primary"
          >
            Sucesso! Sua ação entrou na fila pendente. 3 validadores
            aleatórios estão revisando seu registro.
          </p>
        ) : null}
      </section>
    </div>
  )
}
