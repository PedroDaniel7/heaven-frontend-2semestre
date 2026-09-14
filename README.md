# Heaven

Plataforma de gamificação de ações sustentáveis. Este repositório contém o front-end do Heaven desenvolvido na Sprint 03 da disciplina Front-End Design Engineering (FIAP, turma 1TDSPW).

## Descrição

**Problema.** Iniciativas de créditos de carbono e de recompensas ecológicas costumam depender de auditorias centralizadas, caras e lentas. Por isso, pequenas ações do dia a dia, como usar transporte público, reciclar ou economizar energia, dificilmente são validadas e recompensadas em larga escala.

**Proposta.** No Heaven, o usuário registra ações sustentáveis e outros membros da comunidade as validam, de forma distribuída e anônima. Ações aprovadas geram pontos e mantêm ativa a sequência de dias (streak), e quem valida corretamente ganha reputação e mais peso de voto.

### O que esta entrega implementa

Nesta sprint, as páginas HTML da Sprint 2 foram migradas para uma aplicação React de página única (SPA), e foram criadas as telas de Cadastro e de detalhe da ação. Não há backend, API, banco de dados nem autenticação: os dados são estáticos e as interações são simuladas no navegador. Envio de evidências, validação real pela comunidade e ranking fazem parte da proposta do produto, mas não desta entrega.

- **Páginas públicas:** Home, Solução, Sobre, Integrantes, FAQ e Contato, com menu adaptado ao mobile.
- **Solução, aba Dashboard:** indicadores de perfil de exemplo e formulário de registro de ação validado com React Hook Form, com confirmação simulada.
- **Solução, aba Validar Ações:** uma ação pendente de exemplo, com os botões Aprovar e Rejeitar e a resposta de cada voto.
- **Detalhe da ação:** rota dinâmica `/app/acoes/:id`, que mostra a ação correspondente ao `id` da URL ou avisa quando ela não existe.
- **Cadastro:** formulário com validação de nome, e-mail, senha com no mínimo 8 caracteres, confirmação de senha e aceite dos termos. Nenhuma conta é criada.
- **Responsividade:** layouts para mobile, tablet e desktop.
- **Acessibilidade:** link para pular ao conteúdo principal, menu mobile que fecha com Esc, mensagens de confirmação anunciadas por leitores de tela e aviso nos links que abrem em nova aba.

## Tecnologias utilizadas

Versões principais declaradas no `package.json`:

| Tecnologia | Versão | Uso no projeto |
| --- | --- | --- |
| React | 19 | Interface e componentização |
| TypeScript | 6 | Linguagem do projeto (TSX), com tipagem de componentes, props e dados |
| Vite | 8 | Servidor de desenvolvimento e build |
| Tailwind CSS | 4 | Estilização da interface, via plugin `@tailwindcss/vite` |
| React Router DOM | 7 | Rotas e navegação SPA |
| React Hook Form | 7 | Validação de formulários |
| oxlint | 1 | Análise estática do código |
| Git e GitHub | — | Versionamento |

O projeto também usa as fontes Cormorant Garamond e Inter, carregadas do Google Fonts, e o Node.js com npm para instalar as dependências e executar os scripts.

## Estrutura de pastas

Visão resumida das pastas principais:

```text
heaven-frontend-2semestre/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/images/     # logo, composição de marca e fotos dos integrantes
│   ├── components/        # componentes reutilizáveis: Button, Navbar, Footer, FaqItem, campos de formulário, ícones etc.
│   ├── data/              # dados estáticos: ações, perguntas do FAQ e integrantes
│   ├── features/auth/     # formulário de cadastro e seus tipos
│   ├── layouts/           # PublicLayout, AuthLayout e AppLayout
│   ├── pages/
│   │   ├── public/        # Home, Sobre, Integrantes, FAQ, Contato e Solucao (Dashboard e Validar)
│   │   ├── auth/Register/ # Cadastro
│   │   └── app/Actions/   # detalhe da ação (rota dinâmica)
│   ├── routes/            # árvore de rotas (AppRoutes.tsx) e caminhos (routeConfig.ts)
│   ├── styles/            # globals.css: Tailwind e tokens do design system
│   ├── types/             # tipos compartilhados
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json          # e tsconfig.app.json, tsconfig.node.json
├── vite.config.ts
└── .oxlintrc.json
```

## Autores e créditos

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
| --- | --- | --- | --- | --- | --- |
| <img src="src/assets/images/members/arthur.jpg" alt="Foto de Arthur de Souza Lopes" width="90"> | Arthur de Souza Lopes | 573023 | 1TDSPW | [arthurlopes2007](https://github.com/arthurlopes2007) | [Perfil](https://www.linkedin.com/in/arthur-souza-lopes-037112346/) |
| <img src="src/assets/images/members/lucas.png" alt="Foto de Lucas Bossi Cruz" width="90"> | Lucas Bossi Cruz | 572876 | 1TDSPW | [bsscrz](https://github.com/bsscrz) | [Perfil](https://www.linkedin.com/in/lucas-bossi-1a54443a3/) |
| <img src="src/assets/images/members/pedro.webp" alt="Foto de Pedro Daniel Melo de Moraes" width="90"> | Pedro Daniel Melo de Moraes | 569786 | 1TDSPW | [PedroDaniel7](https://github.com/PedroDaniel7) | [Perfil](https://www.linkedin.com/in/pedrodanielmoraes/) |
| <img src="src/assets/images/members/rick.jpg" alt="Foto de Rick Nascimento da Costa" width="90"> | Rick Nascimento da Costa | 571828 | 1TDSPW | [rcostaa-dev](https://github.com/rcostaa-dev) | [Perfil](https://www.linkedin.com/in/rick-nascimento-b063733b6/) |
| <img src="src/assets/images/members/eduardo.png" alt="Foto de Eduardo Oliveira Conde" width="90"> | Eduardo Oliveira Conde | 573163 | 1TDSPW | [eduardo-oliveira-conde](https://github.com/eduardo-oliveira-conde) | [Perfil](https://www.linkedin.com/in/eduardo-conde-663213348/) |

## Imagens e ícones

### Identidade visual

<img src="src/assets/images/cadastro-heaven.png" alt="Composição da marca Heaven: arco de luz sobre fundo verde-escuro com a frase “Toda jornada começa com uma escolha.”" width="320">

Composição de marca exibida ao lado do formulário de Cadastro no desktop (`src/assets/images/cadastro-heaven.png`). A logo oficial fica em `src/assets/images/logo-heaven.png`; como o arquivo é branco, o componente `Logo` o usa como máscara para aplicar a cor do texto sobre fundos claros.

### Capturas de tela

<img width="1237" height="974" alt="image" src="https://github.com/user-attachments/assets/f9224922-e85f-4962-bbc5-151b20e322a0" />

### Ícones do sistema

Os ícones são SVGs inline definidos em `src/components/icons/index.tsx`, sem biblioteca de ícones.

| Ícone | Onde aparece |
| --- | --- |
| `MenuIcon` e `CloseIcon` | Botão de abrir e fechar o menu mobile |
| `ArrowRightIcon` | Botões e links de ação na Home, no Cadastro, no Dashboard e no detalhe da ação |
| `ChevronDownIcon` | Perguntas do FAQ e campo de seleção do Dashboard |
| `UserIcon`, `MailIcon` e `LockIcon` | Campos de nome, e-mail e senha do Cadastro |
| `EyeIcon` e `EyeOffIcon` | Mostrar e ocultar a senha |
| `MailIcon` e `PhoneIcon` | E-mails e telefones da página Contato |

## Como usar

### Pré-requisitos

- Node.js 20.19+ ou 22.12+ (requisito do Vite 8)
- npm
- Git

### Instalação e execução

```bash
git clone https://github.com/PedroDaniel7/heaven-frontend-2semestre.git
cd heaven-frontend-2semestre
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido no terminal (por padrão, `http://localhost:5173`).

### Outros scripts

| Comando | O que faz |
| --- | --- |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint` | Analisa o código com o oxlint |
| `npm run typecheck` | Verifica os tipos com o TypeScript |

### Navegação

| Rota | Conteúdo |
| --- | --- |
| `/` | Home |
| `/solucao` | Solução, com as abas Dashboard e Validar Ações |
| `/sobre` | Sobre |
| `/integrantes` | Integrantes |
| `/faq` | FAQ |
| `/contato` | Contato |
| `/cadastro` | Cadastro, acessado diretamente pela URL |
| `/app/acoes/:id` | Detalhe de uma ação: `transporte`, `energia` ou `reciclagem` |

Para chegar à rota dinâmica pela interface: na Home, clique em **Acessar Painel**; no Dashboard, escolha um tipo de impacto e clique em **Ver detalhes desta ação**.

### Repositório no GitHub

https://github.com/PedroDaniel7/heaven-frontend-2semestre

### Vídeo no YouTube

https://youtu.be/7ldWPzAt4_s

## Contato

Para falar com a equipe, escreva para qualquer integrante:

| Integrante | E-mail |
| --- | --- |
| Arthur de Souza Lopes | arthurdesouzalopes635@gmail.com |
| Lucas Bossi Cruz | lucabossicruz@gmail.com |
| Pedro Daniel Melo de Moraes | pedrodaniel.mmoraes@gmail.com |
| Rick Nascimento da Costa | rickgodinhotk7@gmail.com |
| Eduardo Oliveira Conde | edu.conde021@gmail.com |

Os telefones dos integrantes estão na página Contato da aplicação (`/contato`).
