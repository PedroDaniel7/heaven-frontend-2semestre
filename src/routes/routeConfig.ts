/**
 * Mapa de rotas do Heaven.
 *
 * Os caminhos são os definidos em 03-architecture.md §14 e no mapa de
 * navegação de 04-screen-specs.md §26. Nenhuma rota deve ser criada
 * aqui sem especificação aprovada.
 */

/** Páginas públicas obrigatórias herdadas da Sprint 2. */
export const PUBLIC_ROUTES = {
  home: '/',
  sobre: '/sobre',
  integrantes: '/integrantes',
  faq: '/faq',
  contato: '/contato',
  solucao: '/solucao',
} as const

/** Telas de autenticação da nova experiência Heaven. */
export const AUTH_ROUTES = {
  login: '/login',
  register: '/cadastro',
} as const

/** Rotas autenticadas — renderizadas dentro de AppLayout. */
export const APP_ROUTES = {
  root: '/app',
  newAction: '/app/acoes/nova',
  actionDetail: '/app/acoes/:id',
  myActions: '/app/minhas-acoes',
  validation: '/app/validar',
  ranking: '/app/ranking',
  profile: '/app/perfil',
} as const

/** URL de detalhe de um tipo de ação (rota dinâmica `APP_ROUTES.actionDetail`). */
export function actionDetailPath(id: number) {
  return `/app/acoes/${id}`
}

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...AUTH_ROUTES,
  ...APP_ROUTES,
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/** Itens da navegação da área logada (as demais telas entram no T7b). */
export const APP_NAV_ITEMS = [
  { label: 'Painel', to: APP_ROUTES.root, end: true },
  { label: 'Nova ação', to: APP_ROUTES.newAction, end: true },
  { label: 'Minhas ações', to: APP_ROUTES.myActions, end: true },
] as const

/** Itens da navegação pública (08 da tarefa de migração). */
export const PUBLIC_NAV_ITEMS = [
  { label: 'Home', to: PUBLIC_ROUTES.home },
  { label: 'Solução', to: PUBLIC_ROUTES.solucao },
  { label: 'Sobre', to: PUBLIC_ROUTES.sobre },
  { label: 'Integrantes', to: PUBLIC_ROUTES.integrantes },
  { label: 'FAQ', to: PUBLIC_ROUTES.faq },
  { label: 'Contato', to: PUBLIC_ROUTES.contato },
] as const
