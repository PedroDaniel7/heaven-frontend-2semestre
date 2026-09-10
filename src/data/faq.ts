import type { FaqEntry } from '../types'

/** Perguntas migradas de `paginas/faq.html` da Sprint 2. */
export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 'fraudes',
    question: 'Como a plataforma evita fraudes?',
    answer:
      'Nenhuma validação é feita por um único usuário. Cada ação passa por um comitê aleatório e anônimo. Além disso, usuários que tentam aprovar fraudes perdem pontuação de reputação, diminuindo o peso dos seus votos futuros.',
  },
  {
    id: 'streaks',
    question: 'O que são as Streaks (Sequências)?',
    answer:
      'As Streaks contam quantos dias seguidos você registrou pelo menos uma ação sustentável na plataforma. Manter sequências altas multiplica os pontos recebidos pelas suas atividades cotidianas.',
  },
  {
    id: 'pontos',
    question: 'Para que servem os pontos acumulados?',
    answer:
      'Os pontos representam o seu impacto ecológico gerado e, futuramente, poderão ser trocados por descontos em passagens de transporte público, serviços parceiros e produtos ecorresponsáveis.',
  },
]
