import type { ReactNode } from 'react'

export type PersonCardProps = {
  name: string
  photo: string
  /** Linha auxiliar sob o nome, como o RM na página de Integrantes. */
  subtitle?: string
  /** Links ou informações de contato exibidos no rodapé do card. */
  children: ReactNode
}

/**
 * Card de pessoa, usado em Integrantes e Contato.
 *
 * Na Sprint 2 as duas páginas repetiam o mesmo bloco de CSS e markup;
 * aqui o padrão existe uma única vez.
 */
export function PersonCard({
  name,
  photo,
  subtitle,
  children,
}: PersonCardProps) {
  return (
    <article className="flex h-full flex-col items-center rounded-lg border border-border bg-surface p-8 text-center transition-shadow hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
      <img
        src={photo}
        alt={`Foto de ${name}`}
        loading="lazy"
        decoding="async"
        width={130}
        height={130}
        className="mb-6 h-[130px] w-[130px] rounded-full border-2 border-sage object-cover"
      />

      <h2 className="font-serif text-xl font-medium text-ink">{name}</h2>

      {subtitle ? (
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      ) : null}

      <div className="mt-4 flex flex-col items-center gap-2">{children}</div>
    </article>
  )
}
