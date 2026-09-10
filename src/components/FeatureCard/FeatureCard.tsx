export type FeatureCardProps = {
  title: string
  description: string
}

/** Card das três etapas do ecossistema, na Home. */
export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-8 transition-transform hover:-translate-y-1">
      <h3 className="font-serif text-xl text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-body">{description}</p>
    </article>
  )
}
