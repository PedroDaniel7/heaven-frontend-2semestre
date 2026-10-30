/**
 * Tipos da API Heaven, conforme docs/contrato-api.md (fonte única do contrato).
 * Datas chegam como string ISO-8601 e ids são numéricos.
 */

export type StatusAcao = 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'CANCELADA'

export type Voto = 'APROVAR' | 'REJEITAR'

/** Códigos de erro enviados pela API. O front decide por `codigo`, nunca pelo texto de `mensagem`. */
export type ErroCodigo =
  | 'VALIDACAO'
  | 'NAO_AUTENTICADO'
  | 'PROIBIDO'
  | 'NAO_ENCONTRADO'
  | 'CONFLITO'
  | 'REGRA'
  | 'OFERTA_EXPIRADA'
  | 'BANCO_INDISPONIVEL'
  | 'ERRO_INTERNO'

/** Códigos gerados no próprio front, quando não há resposta válida da API. */
export type ErroLocalCodigo = 'REDE' | 'RESPOSTA_INVALIDA'

export interface CampoErro {
  campo: string
  mensagem: string
}

/** Corpo de todo erro da API. `campos` só vem preenchido em erro de validação (400). */
export interface ErroApi {
  status: number
  codigo: ErroCodigo
  mensagem: string
  campos: CampoErro[]
  dataHora: string
}

/** Nunca traz senhaHash, peso do voto nem nível interno. `reputacao` vai de 0 a 100. */
export interface Usuario {
  id: number
  nome: string
  email: string
  pontos: number
  reputacao: number
  nivel: string
  streak: number
  maiorStreak: number
  dataCadastro: string
}

export interface TipoAcao {
  id: number
  nome: string
  desafio: string | null
  categoria: string
  unidade: string
  dificuldade: string
}

export interface TipoAcaoResumo {
  id: number
  nome: string
  unidade: string
}

/** A lista de votos nunca aparece. */
export interface Acao {
  id: number
  tipo: TipoAcaoResumo
  quantidade: number
  evidencia: string
  status: StatusAcao
  pontosPrevistos: number
  dataHora: string
  dataConclusao: string | null
}

/** Sem autor, para preservar o anonimato do validador. */
export interface AcaoParaValidar {
  id: number
  tipo: { nome: string; unidade: string; desafio: string | null }
  quantidade: number
  evidencia: string
  dataHora: string
}

/* ---- Entradas e respostas dos endpoints ---- */

export interface NovoUsuario {
  nome: string
  email: string
  /** No mínimo 8 caracteres. */
  senha: string
}

export interface Credenciais {
  email: string
  senha: string
}

export interface RespostaLogin {
  token: string
  expiraEm: string
  usuario: Usuario
}

export interface AtualizacaoUsuario {
  nome: string
  email: string
  novaSenha?: string
}

export interface NovaAcao {
  idTipoAcao: number
  quantidade: number
  evidencia: string
}

export interface Sorteio {
  acao: AcaoParaValidar
  expiraEm: string
}

export interface NovoVoto {
  idAcao: number
  voto: Voto
  justificativa?: string
}

export interface ResultadoVoto {
  idAcao: number
  voto: Voto
  acaoConcluida: boolean
}

export interface ItemRanking {
  posicao: number
  nome: string
  pontos: number
  nivel: string
  streak: number
}

export interface Saude {
  status: string
  dataHora: string
}
