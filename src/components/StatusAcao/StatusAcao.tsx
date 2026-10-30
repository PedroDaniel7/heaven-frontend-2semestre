import type { StatusAcao as Status } from '../../types/api'
import { ROTULO_STATUS } from '../../utils/formatar'

const ESTILO: Record<Status, string> = {
  PENDENTE: 'border-border bg-surface text-body',
  APROVADA: 'border-primary bg-primary text-canvas',
  REJEITADA: 'border-danger bg-surface text-danger',
  CANCELADA: 'border-border bg-canvas text-muted',
}

/** Selo com o status da ação, em destaque. */
export function StatusAcao({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${ESTILO[status]}`}
    >
      {ROTULO_STATUS[status]}
    </span>
  )
}
