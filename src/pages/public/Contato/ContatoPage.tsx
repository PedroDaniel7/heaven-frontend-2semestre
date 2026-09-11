import { PersonCard } from '../../../components/PersonCard'
import { MailIcon, PhoneIcon } from '../../../components/icons'
import { MEMBERS } from '../../../data/members'

/** Remove a formatação do telefone para montar o link `tel:`. */
function toTelHref(phone: string) {
  return `tel:+55${phone.replace(/\D/g, '')}`
}

/** Página Contato — `paginas/contato.html` da Sprint 2. */
export function ContatoPage() {
  return (
    <div className="px-6 py-16 lg:px-8 lg:py-20">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl text-ink">Fale Conosco</h1>
        <p className="mt-3 text-body">
          Entre em contato diretamente com qualquer integrante da equipe.
        </p>
      </header>

      <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-6">
        {MEMBERS.map((member) => (
          <li
            key={member.id}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <PersonCard name={member.name} photo={member.photo}>
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm break-all text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {member.email}
                </a>
              ) : null}

              <a
                href={toTelHref(member.phone)}
                className="flex items-center gap-2 text-sm text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {member.phone}
              </a>
            </PersonCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
