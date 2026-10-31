# Heaven — Front-end

Front-end do **Heaven**, plataforma de gamificação de ações sustentáveis. O usuário se cadastra, registra ações do dia a dia (transporte público, reciclagem, economia de energia), valida ações de outras pessoas de forma anônima e acompanha pontos, sequência de dias (streak), reputação e ranking. Ações aprovadas pela comunidade geram pontos.

Projeto de Front-End Design Engineering (FIAP, turma 1TDSPW), 2º semestre, Challenge. A aplicação é uma SPA em React que consome a API Java do projeto.

## Links

| O quê | Endereço |
| --- | --- |
| Aplicação (Vercel) | https://heaven-frontend-2semestre.vercel.app |
| API (Render) | https://heaven-java-api.onrender.com |
| Swagger da API | https://heaven-java-api.onrender.com/swagger-ui/index.html |
| Repositório do front | https://github.com/PedroDaniel7/heaven-frontend-2semestre |
| Repositório da API (Java) | https://github.com/PedroDaniel7/heaven-java-api |
| Contrato da API | [docs/contrato-api.md](docs/contrato-api.md) |

Vídeo: (a preencher)

> **Cold start:** a API roda no plano gratuito do Render e dorme quando fica sem uso. Na primeira visita depois de um tempo, o login ou o cadastro podem levar cerca de um minuto para responder. Tente de novo se a tela mostrar erro de rede.

## Stack

React 19, TypeScript 6, Vite 8, Tailwind CSS 4, React Router 7, React Hook Form 7 e oxlint.

## Estrutura de pastas

```text
src/
├── pages/        # telas: public (Home, Solução, Sobre...), auth (Login, Cadastro) e app (área logada)
├── components/   # componentes reutilizáveis: Button, Input, Navbar, RequireAuth, StatusAcao etc.
├── services/     # chamadas à API, um módulo por recurso, sobre o cliente http.ts
├── context/      # AuthContext: sessão do usuário logado
├── hooks/        # useAuth, useApi e outros hooks
├── types/        # tipos TypeScript, inclusive os do contrato da API
├── routes/       # mapa de rotas (routeConfig.ts) e árvore de rotas (AppRoutes.tsx)
├── layouts/      # PublicLayout, AuthLayout e AppLayout
├── features/ data/ utils/ styles/ assets/   # formulários, dados estáticos, utilitários, Tailwind e imagens
├── App.tsx
└── main.tsx
```

## Rotas

| Rota | Tela | Acesso |
| --- | --- | --- |
| `/` | Home | público |
| `/solucao` | Solução | público |
| `/sobre` | Sobre | público |
| `/integrantes` | Integrantes | público |
| `/faq` | FAQ | público |
| `/contato` | Contato | público |
| `/cadastro` | Cadastro | público |
| `/login` | Login | público |
| `/app` | Painel | logado |
| `/app/acoes/nova` | Registrar nova ação | logado |
| `/app/acoes/:id` | Detalhe de um tipo de ação | logado |
| `/app/minhas-acoes` | Minhas ações | logado |
| `/app/validar` | Validar ações de outros usuários | logado |
| `/app/ranking` | Ranking | logado |
| `/app/perfil` | Perfil (edição e desativação da conta) | logado |

Quem não está logado e abre uma rota `/app` é redirecionado para o login.

## Como rodar

Pré-requisitos: Node.js 20.19+ ou 22.12+ e npm.

```bash
npm i
```

Crie o arquivo `.env.local` a partir do exemplo e preencha `VITE_API_URL` com a URL base da API, sem barra no final (a API local sobe em `http://localhost:8080`):

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

O front abre em `http://localhost:5173`. O `.env.local` não é versionado.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | verifica os tipos e gera `dist/` |
| `npm run preview` | serve localmente o build |
| `npm run lint` | análise estática com oxlint |
| `npm run typecheck` | verificação de tipos |

## Deploy na Vercel

O front é publicado na Vercel. Em **Settings > Environment Variables** do projeto, defina `VITE_API_URL` com a URL pública da API; o valor é embutido no build, então é preciso publicar de novo depois de alterá-lo. O `vercel.json` redireciona todas as rotas para `index.html`, o que permite abrir `/app/ranking` e as demais direto pela URL.

A API precisa liberar a origem do front na variável `HEAVEN_CORS_ORIGINS` (CORS).

## Integração com a API

Toda comunicação passa por `src/services/` (um módulo por recurso), sobre o cliente `http.ts`. O contrato completo — endpoints, corpos, códigos de erro e regras — está em [docs/contrato-api.md](docs/contrato-api.md), a mesma cópia mantida no repositório da API. O front decide pelo campo `codigo` dos erros, nunca pelo texto da mensagem. Depois do login, o token e os dados do usuário ficam salvos no navegador e vão no header `Authorization: Bearer` das rotas protegidas.

## Integrantes

| Nome | RM |
| --- | --- |
| Arthur de Souza | 573023 |
| Eduardo Oliveira | 573163 |
| Lucas Bossi | 572876 |
| Pedro Moraes | 569786 |
| Rick Nascimento | 571828 |
