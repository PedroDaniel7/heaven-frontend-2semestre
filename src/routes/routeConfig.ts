/**
 * Mapa de rotas do Heaven.
 *
 * Os caminhos abaixo são os definidos em 03-architecture.md §14
 * (e coerentes com o mapa de navegação de 04-screen-specs.md §23).
 * Nenhuma rota deve ser criada aqui sem especificação aprovada.
 */

/** Rotas públicas — renderizadas dentro de AuthLayout. */
export const PUBLIC_ROUTES = {
  login: '/login',
  register: '/cadastro',
} as const

/** Rotas autenticadas — renderizadas dentro de AppLayout. */
export const APP_ROUTES = {
  root: '/app',
  newAction: '/app/acoes/nova',
  validation: '/app/validar',
  ranking: '/app/ranking',
  profile: '/app/perfil',
} as const

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...APP_ROUTES,
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
