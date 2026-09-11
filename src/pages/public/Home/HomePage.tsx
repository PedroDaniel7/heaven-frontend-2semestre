import { ButtonLink } from '../../../components/Button'
import { FeatureCard } from '../../../components/FeatureCard'
import { ArrowRightIcon } from '../../../components/icons'
import { PUBLIC_ROUTES } from '../../../routes'

/** Etapas do ecossistema, migradas de `index.html` da Sprint 2. */
const ECOSYSTEM_STEPS = [
  {
    title: '1. Registre sua Ação',
    description:
      'Andou de transporte público ou economizou energia? Suba o comprovante na plataforma de forma rápida.',
  },
  {
    title: '2. Validação por Pares',
    description:
      'A comunidade analisa e vota de forma distribuída e anônima para garantir a honestidade da ação.',
  },
  {
    title: '3. Ganhe Recompensas',
    description:
      'Ação aprovada gera pontos na carteira, mantém sua sequência (streak) ativa e eleva seu nível de confiança.',
  },
]

/** Home pública — `index.html` da Sprint 2. */
export function HomePage() {
  return (
    <>
      <section className="border-b border-border px-6 py-14 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Sua rotina sustentável transformada em recompensas reais
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-body">
            Participe da nossa rede descentralizada de auditoria ambiental
            urbana. Registre suas ações ecológicas diárias, valide as de
            outros usuários, acumule pontos e suba na nossa escala de
            reputação.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to={PUBLIC_ROUTES.solucao} fullWidth={false}>
              Acessar Painel
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>

            <ButtonLink
              to={PUBLIC_ROUTES.sobre}
              variant="secondary"
              fullWidth={false}
            >
              Saber Mais
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-medium text-ink">
            Como o ecossistema funciona?
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ECOSYSTEM_STEPS.map((step) => (
              <FeatureCard
                key={step.title}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
