import type {
  CampoErro,
  ErroApi,
  ErroCodigo,
  ErroLocalCodigo,
} from '../types/api'

/** Na primeira chamada o servidor gratuito pode levar até 1 minuto para acordar. */
const TEMPO_LIMITE_MS = 60_000

/** Erro de qualquer chamada à API, já no formato do contrato (ou com código local). */
export class ApiError extends Error {
  readonly status: number
  readonly codigo: ErroCodigo | ErroLocalCodigo
  readonly campos: CampoErro[]

  constructor(
    status: number,
    codigo: ErroCodigo | ErroLocalCodigo,
    mensagem: string,
    campos: CampoErro[] = [],
  ) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
    this.codigo = codigo
    this.campos = campos
  }
}

let tokenAtual: string | null = null
let aoSessaoExpirar: () => void = () => {}

/** Token em memória, definido de forma síncrona no login e ao restaurar a sessão. */
export function definirToken(token: string | null): void {
  tokenAtual = token
}

/** O AuthContext informa o que fazer quando a API recusar a sessão (401). */
export function definirAoSessaoExpirar(acao: () => void): void {
  aoSessaoExpirar = acao
}

function baseUrl(): string {
  const url = import.meta.env.VITE_API_URL
  if (!url) {
    throw new ApiError(0, 'REDE', 'A URL da API não está configurada (VITE_API_URL).')
  }
  return url.replace(/\/+$/, '')
}

interface Opcoes {
  corpo?: unknown
  query?: Record<string, string | number>
}

function ehErroApi(valor: unknown): valor is ErroApi {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    typeof (valor as ErroApi).codigo === 'string' &&
    typeof (valor as ErroApi).mensagem === 'string'
  )
}

/** Faz a requisição e devolve o corpo JSON tipado; 204 devolve `undefined`. */
export async function requisitar<T>(
  metodo: 'GET' | 'POST' | 'PUT' | 'DELETE',
  caminho: string,
  { corpo, query }: Opcoes = {},
): Promise<T> {
  let url = `${baseUrl()}${caminho}`
  if (query) {
    const params = new URLSearchParams(
      Object.entries(query).map(([k, v]) => [k, String(v)]),
    )
    url += `?${params.toString()}`
  }

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (corpo !== undefined) headers['Content-Type'] = 'application/json'
  const token = tokenAtual
  if (token) headers.Authorization = `Bearer ${token}`

  const controle = new AbortController()
  const temporizador = window.setTimeout(() => controle.abort(), TEMPO_LIMITE_MS)

  let resposta: Response
  try {
    resposta = await fetch(url, {
      method: metodo,
      headers,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    })
  } catch (e) {
    const esgotou = e instanceof DOMException && e.name === 'AbortError'
    throw new ApiError(
      0,
      'REDE',
      esgotou
        ? 'O servidor demorou demais para responder. Tente novamente.'
        : 'Não foi possível conectar ao servidor. Verifique sua conexão.',
    )
  } finally {
    window.clearTimeout(temporizador)
  }

  if (resposta.status === 204) return undefined as T

  const texto = await resposta.text()
  let json: unknown = null
  if (texto) {
    try {
      json = JSON.parse(texto)
    } catch {
      json = null
    }
  }

  if (!resposta.ok) {
    if (ehErroApi(json)) {
      if (json.codigo === 'NAO_AUTENTICADO' && token) aoSessaoExpirar()
      throw new ApiError(
        resposta.status,
        json.codigo,
        json.mensagem,
        Array.isArray(json.campos) ? json.campos : [],
      )
    }
    throw new ApiError(
      resposta.status,
      'RESPOSTA_INVALIDA',
      'O servidor devolveu uma resposta inesperada.',
    )
  }

  if (json === null) {
    throw new ApiError(
      resposta.status,
      'RESPOSTA_INVALIDA',
      'O servidor devolveu uma resposta inesperada.',
    )
  }
  return json as T
}
