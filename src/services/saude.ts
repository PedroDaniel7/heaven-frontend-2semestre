import type { Saude } from '../types/api'
import { requisitar } from './http'

/** Não usa o banco; serve também para acordar o servidor. */
export function saude(): Promise<Saude> {
  return requisitar<Saude>('GET', '/api/saude')
}

export function saudeBanco(): Promise<Saude> {
  return requisitar<Saude>('GET', '/api/saude/banco')
}
