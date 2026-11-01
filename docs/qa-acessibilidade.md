# QA de acessibilidade

Data: 01/11/2026. Site verificado: `npm run dev` (http://localhost:5173) apontando para a API gratuita do projeto. Navegador: navegador embutido do app Claude (Chromium), não o Chrome instalado. Responsável: Lucas Bossi Cruz.

Legenda: OK = sem problema; REGISTRADO = problema achado e não corrigido (com gravidade leve, média ou grave e arquivo provável); N/T = não testado (explique).

Observação geral: este documento só registra problemas; não corrija nada fora dos arquivos permitidos.

Telas: públicas (Home `/`, Solução `/solucao`, Sobre `/sobre`, Integrantes `/integrantes`, FAQ `/faq`, Contato `/contato`, Cadastro `/cadastro`, Login `/login`), 404 (`/xyz`) e de `/app` (exigem conta de teste logada: Painel `/app`, Nova ação `/app/acoes/nova`, Minhas ações `/app/minhas-acoes`, Validar `/app/validar`, Ranking `/app/ranking`, Perfil `/app/perfil`, detalhe `/app/acoes/1`).

Conta de teste usada nas telas de `/app`: `lucas-teste0111@example.test`, criada só para este QA e desativada no fim pelo botão "Desativar conta" do perfil (depois disso o login com ela é recusado com "Esta conta foi desativada e não pode entrar."). Nenhuma ação foi votada na tela Validar.

## Teclado e foco

Teste feito no navegador com as teclas Tab, Shift+Tab, Enter, Espaço e Esc, sem mouse. A coluna "Foco visível" foi medida por script no navegador: a cada Tab, o script compara o estilo computado do elemento (contorno, sombra, sublinhado, cores) antes e depois de receber o foco. Isso confirma que **existe** um indicador de foco, mas não avalia o contraste dele nem foi conferido olhando cada tela.

| Tela | Rota | Chega em tudo com Tab | Foco visível | Ordem lógica | Esc fecha menus | Observação | Como foi verificado |
|---|---|---|---|---|---|---|---|
| Home | `/` | OK (10 paradas) | OK | OK | Ver "Menu mobile" abaixo | Primeira parada é o link "Pular para o conteúdo principal". | Tab no navegador; foco medido por script. |
| Solução | `/solucao` | OK (14 paradas) | OK | OK | N/A (sem menu aberto em desktop) | Os 6 cartões da página são links e entram na ordem. | Tab no navegador; foco medido por script. |
| Sobre | `/sobre` | OK (8 paradas) | OK | OK | N/A | Só o cabeçalho tem itens focáveis. | Tab no navegador; foco medido por script. |
| Integrantes | `/integrantes` | OK (18 paradas) | OK | OK | N/A | 10 links de GitHub e LinkedIn, com rótulo por pessoa. | Tab no navegador; foco medido por script. |
| FAQ | `/faq` | OK (11 paradas) | OK | OK | N/A | 3 botões de pergunta com `aria-expanded` e `aria-controls`. Abrir e fechar com Enter e Espaço: N/T (só foquei os botões, não os acionei). | Tab no navegador; foco medido por script; atributos lidos no DOM. |
| Contato | `/contato` | OK (18 paradas) | OK | OK | N/A | E-mail e telefone de cada integrante, em ordem. | Tab no navegador; foco medido por script. |
| Cadastro | `/cadastro` | OK (9 paradas) | OK | OK | N/A | Nome, e-mail, senha, "Mostrar senha", confirmar senha, "Mostrar senha", termos, "Criar minha conta", "Entrar". REGISTRADO (leve): não há "Pular para o conteúdo" nem link no logo (layout de autenticação, tela curta). | Tab no navegador; foco medido por script. |
| Login | `/login` | OK (5 paradas) | OK | OK | N/A | E-mail, senha, "Mostrar senha", "Entrar", "Criar conta". Mesmo registro leve do Cadastro. | Tab no navegador; foco medido por script. |
| 404 | `/xyz` | OK (9 paradas) | OK | OK | N/A | Termina no botão "Voltar para a página inicial". | Tab no navegador; foco medido por script. |
| Painel | `/app` | OK (9 paradas) | OK | OK | N/A | REGISTRADO (leve): sem "Pular para o conteúdo"; 8 paradas de menu antes do conteúdo. Arquivo provável: `src/layouts/AppLayout/`. | Tab no navegador logado; foco medido por script. |
| Nova ação | `/app/acoes/nova` | OK (13 paradas) | OK | OK | N/A | Select, link "Ver detalhes", quantidade, evidência, enviar. Mesmo registro leve do Painel. | Tab no navegador logado; foco medido por script. |
| Minhas ações | `/app/minhas-acoes` | OK (9 paradas) | OK | OK | N/A | Conta nova sem ações: só o link "Registrar nova ação" no conteúdo. Lista com itens: N/T. | Tab no navegador logado; foco medido por script. |
| Validar | `/app/validar` | OK (11 paradas) | OK | OK | N/A | Justificativa, "Aprovar", "Reprovar" chegam por Tab. Os botões de voto foram só focados, nunca acionados. | Tab no navegador logado; foco medido por script. |
| Ranking | `/app/ranking` | OK (8 paradas) | OK | OK | N/A | Tabela sem itens focáveis (só leitura). | Tab no navegador logado; foco medido por script. |
| Perfil | `/app/perfil` | OK (14 paradas) | OK | OK | N/A | Nome, e-mail, nova senha, "Mostrar senha", "Salvar alterações", "Desativar conta". | Tab no navegador logado; foco medido por script. |
| Detalhe | `/app/acoes/1` | OK (9 paradas) | OK | OK | N/A | Só o link "Voltar para Nova ação" no conteúdo. | Tab no navegador logado; foco medido por script. |

### Menu mobile (480 px)

| Item | Resultado | Como foi verificado |
|---|---|---|
| Home em 480 px: botão do menu | OK. Botão "Abrir menu" com `aria-expanded="false"` e `aria-controls="menu-mobile"`. | Janela emulada em 480x800; Tab até o botão; atributos lidos no DOM. |
| Abrir com Enter | OK. O rótulo muda para "Fechar menu" e `aria-expanded` vira `true`. | Enter no navegador. |
| Navegar dentro do menu | OK. Tab leva aos itens do menu (chegou em "Solução"). | Tab no navegador. |
| Esc fecha o menu | OK. `aria-expanded` volta a `false` e o foco volta para o botão "Abrir menu". | Esc no navegador; foco e atributo lidos no DOM. |
| Área logada em 480 px | N/A. Não existe menu retrátil: os 6 links e o botão "Sair" ficam sempre visíveis, sem rolagem horizontal. | Largura 480 px medida por script. |

Fora do escopo desta seção: as telas `/cadastro` e `/login` não têm menu retrátil.

## Formulários

Verificado no navegador, lendo o DOM (rótulo associado, `aria-describedby`, `aria-invalid`, `autocomplete`) e provocando um erro de validação em cada formulário: envio com campos vazios em Cadastro, Login e Nova ação; nome vazio, e-mail sem "@" e senha curta no Perfil. Nenhum envio chegou à API nesses testes (a validação do formulário barrou antes). Os erros ligados ao campo usam `aria-describedby` apontando para a mensagem e `aria-invalid="true"`.

Sobre "Erro anunciado": ao enviar com erro, o foco vai para o primeiro campo inválido e o leitor de tela lê a mensagem ligada a ele. As mensagens dos outros campos só seriam lidas quando o foco chegar neles, porque as mensagens não têm `role="alert"` nem `aria-live`. A região `role="status"` da página existe, mas estava vazia. Isso foi deduzido dos atributos do DOM; **não testei com leitor de tela**.

| Formulário | Campo | Rótulo associado | Erro ligado ao campo (aria) | Erro anunciado | autocomplete | Resultado |
|---|---|---|---|---|---|---|
| Cadastro | Nome | OK ("Nome") | OK, "Informe seu nome." | Parcial (lido ao focar; foco foi para este campo) | `name` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Cadastro | E-mail | OK ("E-mail") | OK, "Informe seu e-mail." | Parcial (só ao focar o campo) | `email` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Cadastro | Senha | OK ("Senha") | OK, "Informe sua senha." | Parcial (só ao focar o campo) | `new-password` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Cadastro | Confirmar senha | OK ("Confirmar senha") | OK, "Confirme sua senha." | Parcial (só ao focar o campo) | `new-password` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Cadastro | Termos (caixa de seleção) | OK (texto "Concordo com os termos de uso e a política de privacidade.") | OK, "É necessário aceitar os termos para criar sua conta." | Parcial (só ao focar o campo) | N/A (não é dado pessoal) | OK; REGISTRADO (leve) pelo anúncio parcial |
| Login | E-mail | OK ("E-mail") | OK, "Informe seu e-mail." | Parcial (lido ao focar; foco foi para este campo) | `email` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Login | Senha | OK ("Senha") | OK, "Informe sua senha." | Parcial (só ao focar o campo) | `current-password` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Nova ação | Tipo de Impacto (lista) | OK ("Tipo de Impacto") | N/A: já vem com um tipo selecionado, não deu para provocar erro | N/A | N/A | OK (rótulo); erro N/T |
| Nova ação | Quantidade | OK ("Quantidade"); texto de apoio ligado por `aria-describedby` | OK, "Informe a quantidade." (a mensagem de erro substitui o texto de apoio no `aria-describedby`) | Parcial (lido ao focar; foco foi para este campo) | N/A (não é dado pessoal) | OK; REGISTRADO (leve) pelo anúncio parcial |
| Nova ação | Evidência | OK ("Evidência") | OK, "Descreva a evidência da ação (o que você fez e como comprova)." | Parcial (só ao focar o campo) | N/A | OK; REGISTRADO (leve) pelo anúncio parcial |
| Perfil | Nome | OK ("Nome") | OK, "Informe seu nome." | Parcial (lido ao focar; foco foi para este campo) | `name` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Perfil | E-mail | OK ("E-mail") | OK, "Digite um e-mail válido." (testado com texto sem "@") | Parcial (só ao focar o campo) | `email` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Perfil | Nova senha | OK ("Nova senha (opcional)"); texto de apoio ligado por `aria-describedby` | OK, "A senha deve ter pelo menos 8 caracteres." (testado com 3 caracteres) | Parcial (só ao focar o campo) | `new-password` | OK; REGISTRADO (leve) pelo anúncio parcial |
| Validar | Justificativa | OK ("Justificativa (opcional)") | N/T: o campo é opcional, então não existe erro de validação; provocar o envio exigiria votar numa ação, o que não foi feito | N/T | N/A | OK (rótulo); erro N/T |

Observações dos formulários:

- Os botões "Mostrar senha" (Cadastro, Login e Perfil) têm `aria-label="Mostrar senha"` e `aria-pressed="false"`. Troca do rótulo e do estado ao acionar: N/T (só foram focados).
- Erros que vêm da API (por exemplo senha errada no Login): N/T; só vi a mensagem de conta desativada na tela, sem verificar se ela é anunciada por leitor de tela.
- REGISTRADO (leve), anúncio parcial dos erros: `role="alert"` ou `aria-live` com o texto do erro faria o leitor de tela falar o resumo dos erros ao enviar. Arquivo provável: `src/components/Input/Input.tsx`, `src/components/Textarea/Textarea.tsx`, `src/components/Select/Select.tsx`, `src/components/PasswordInput/PasswordInput.tsx` e `src/components/Checkbox/Checkbox.tsx`.
