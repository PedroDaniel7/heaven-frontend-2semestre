import type { StatusAcao } from '../types/api'

const dataHora = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const numero = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })

export function formatarDataHora(iso: string): string {
  const data = new Date(iso)
  return Number.isNaN(data.getTime()) ? '—' : dataHora.format(data)
}

export function formatarNumero(valor: number): string {
  return numero.format(valor)
}

/** Nome de exibição de cada status de ação. */
export const ROTULO_STATUS: Record<StatusAcao, string> = {
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REJEITADA: 'Rejeitada',
  CANCELADA: 'Cancelada',
}

const ROTULO_CATEGORIA: Record<string, string> = {
  TRANSPORTE: 'Transporte',
  ENERGIA: 'Energia',
  AGUA: 'Água',
  RECICLAGEM: 'Reciclagem',
  PLANTIO: 'Plantio',
  CONSUMO_CONSCIENTE: 'Consumo consciente',
  OUTRO: 'Outro',
}

const ROTULO_DIFICULDADE: Record<string, string> = {
  FACIL: 'Fácil',
  MEDIA: 'Média',
  DIFICIL: 'Difícil',
}

/** Valores desconhecidos aparecem como vieram, em vez de sumir. */
export function rotuloCategoria(categoria: string): string {
  return ROTULO_CATEGORIA[categoria] ?? categoria
}

export function rotuloDificuldade(dificuldade: string): string {
  return ROTULO_DIFICULDADE[dificuldade] ?? dificuldade
}
