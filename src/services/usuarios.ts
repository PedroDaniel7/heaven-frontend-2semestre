import type {
  AtualizacaoUsuario,
  NovoUsuario,
  Usuario,
} from '../types/api'
import { requisitar } from './http'

export function cadastrarUsuario(dados: NovoUsuario): Promise<Usuario> {
  return requisitar<Usuario>('POST', '/api/usuarios', { corpo: dados })
}

export function obterMeuUsuario(): Promise<Usuario> {
  return requisitar<Usuario>('GET', '/api/usuarios/me')
}

export function atualizarMeuUsuario(
  dados: AtualizacaoUsuario,
): Promise<Usuario> {
  return requisitar<Usuario>('PUT', '/api/usuarios/me', { corpo: dados })
}

/** Desativa a conta (status INATIVO). */
export function desativarMinhaConta(): Promise<void> {
  return requisitar<void>('DELETE', '/api/usuarios/me')
}
