/** Fases do roadmap, migradas de `paginas/sobre.html` da Sprint 2. */
const ROADMAP = [
  {
    phase: 'Fase 1 (Atual):',
    description:
      'Arquitetura Web, protótipo de interfaces responsivas e lógica de simulação em JS.',
  },
  {
    phase: 'Fase 2:',
    description:
      'Integração com banco de dados descentralizado e API de mapas para rastreio de transporte público.',
  },
  {
    phase: 'Fase 3:',
    description:
      'Sistema automatizado de recompensas com parceiros comerciais e cupons sustentáveis.',
  },
]

/** Página Sobre — `paginas/sobre.html` da Sprint 2. */
export function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
      <header>
        <h1 className="font-serif text-4xl text-ink">
          Sobre o Projeto Heaven
        </h1>
        <p className="mt-3 text-lg text-muted">
          Transformando a sustentabilidade urbana através da inteligência
          coletiva.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-medium text-ink">O Problema</h2>
        <p className="mt-3 leading-relaxed text-body">
          Atualmente, as iniciativas de créditos de carbono ou recompensas
          ecológicas dependem de auditorias centralizadas caras e lentas.
          Isso impede que pequenas ações do dia a dia do cidadão — como usar
          transporte público, reciclar ou economizar energia — sejam
          validadas e recompensadas em larga escala de forma confiável.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium text-ink">A Solução Proposta</h2>
        <p className="mt-3 leading-relaxed text-body">
          O Heaven cria um sistema de gamificação sustentável baseado em{' '}
          <strong className="font-semibold text-ink">
            Validação Distribuída (Peer-to-Peer)
          </strong>
          . Os próprios usuários auditam as ações uns dos outros de forma
          anônima e aleatória. Isso torna o sistema altamente escalável e
          protegido contra fraudes, utilizando um modelo matemático de
          reputação onde quem joga limpo e valida corretamente ganha mais
          peso de voto e mais pontos.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-medium text-ink">
          Roadmap de Desenvolvimento
        </h2>

        <ul className="mt-4 space-y-4 border-l-2 border-sage pl-6">
          {ROADMAP.map((item) => (
            <li key={item.phase} className="leading-relaxed text-body">
              <strong className="font-semibold text-ink">{item.phase}</strong>{' '}
              {item.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
