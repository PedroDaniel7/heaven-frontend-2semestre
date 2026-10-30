import { ApiError } from '../services/http'

/**
 * Texto genérico para um erro da API, escolhido pelo `codigo` (nunca pelo
 * texto de `mensagem`). Telas com um significado próprio para o código
 * (como 422 em "Nova ação") tratam esses casos antes de chamar esta função.
 */
export function mensagemPadrao(erro: ApiError): string {
  switch (erro.codigo) {
    case 'REDE':
      return 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
    case 'NAO_AUTENTICADO':
      return 'Sua sessão expirou. Entre novamente.'
    case 'PROIBIDO':
      return 'Você não tem permissão para fazer isso agora.'
    case 'NAO_ENCONTRADO':
      return 'Não encontramos o que você procurava.'
    case 'CONFLITO':
      return 'Essa operação conflita com o estado atual. Atualize a página e tente de novo.'
    case 'VALIDACAO':
      return 'Há dados inválidos. Confira os campos e tente novamente.'
    case 'REGRA':
      return 'Essa operação não é permitida no momento.'
    case 'BANCO_INDISPONIVEL':
      return 'O servidor está sem acesso ao banco de dados. Tente novamente em instantes.'
    default:
      return 'Algo deu errado do nosso lado. Tente novamente em instantes.'
  }
}

/** Qualquer exceção vira ApiError; o que não for da API é tratado como falha genérica. */
export function comoApiError(e: unknown): ApiError {
  return e instanceof ApiError
    ? e
    : new ApiError(0, 'ERRO_INTERNO', 'Não foi possível concluir a operação.')
}
