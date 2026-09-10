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

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MEMBERS.map((member) => (
          <PersonCard key={member.id} name={member.name} photo={member.photo}>
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-sm break-all text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
            >
              <MailIcon className="h-4 w-4 shrink-0" />
              {member.email}
            </a>

            <a
              href={toTelHref(member.phone)}
              className="flex items-center gap-2 text-sm text-link underline-offset-2 outline-none hover:underline focus-visible:underline"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {member.phone}
            </a>
          </PersonCard>
        ))}
      </div>
    </div>
  )
}
