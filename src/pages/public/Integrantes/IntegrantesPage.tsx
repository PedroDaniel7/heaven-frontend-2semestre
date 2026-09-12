import { PersonCard } from '../../../components/PersonCard'
import { CLASS_NAME, MEMBERS } from '../../../data/members'

/** Página Integrantes — `paginas/integrantes.html` da Sprint 2. */
export function IntegrantesPage() {
  return (
    <div className="px-6 py-16 lg:px-8 lg:py-20">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl text-ink">
          Integrantes do Projeto
        </h1>
        <p className="mt-3 text-body">
          Conheça os integrantes que desenvolveram o Heaven da turma{' '}
          <strong className="font-semibold text-ink">{CLASS_NAME}</strong>
        </p>
      </header>

      <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-6">
        {MEMBERS.map((member) => (
          <li
            key={member.id}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <PersonCard
              name={member.name}
              photo={member.photo}
              subtitle={`RM ${member.rm}`}
            >
              <div className="flex items-center gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
                >
                  GitHub
                  <span className="sr-only"> de {member.name} (abre em nova aba)</span>
                </a>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
                >
                  LinkedIn
                  <span className="sr-only"> de {member.name} (abre em nova aba)</span>
                </a>
              </div>
            </PersonCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
