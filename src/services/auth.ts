import type { Credenciais, RespostaLogin } from '../types/api'
import { requisitar } from './http'

export function login(credenciais: Credenciais): Promise<RespostaLogin> {
  return requisitar<RespostaLogin>('POST', '/api/auth/login', {
    corpo: credenciais,
  })
}
