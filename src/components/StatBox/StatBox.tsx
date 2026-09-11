export type StatBoxProps = {
  label: string
  value: string
}

/** Indicador do painel público da solução. */
export function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="rounded-md border-l-2 border-primary bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl font-medium text-primary">{value}</p>
    </div>
  )
}
