# QA de responsividade

Data: 01/11/2026. Site verificado: https://heaven-frontend-2semestre.vercel.app. Navegador: Chrome, DevTools em modo responsivo. Responsável: Arthur de Souza Lopes.

Legenda: OK = sem problema; CORRIGIDO = problema achado e corrigido neste PR; REGISTRADO = problema achado e não corrigido (fora dos arquivos permitidos); N/T = não testado (explique).

Conta de teste usada nas telas de `/app`: `arthur-teste0111@example.test`. A tela de Login foi verificada depois, sem sessão ativa (conta desativada e `localStorage`/`sessionStorage` confirmados vazios antes do teste).

## 480 px

| Tela | Rota | Resultado | Observação | Como foi verificado |
| --- | --- | --- | --- | --- |
| Home | / | OK | Textos legíveis, botões empilhados, sem rolagem horizontal. | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth` comparado ao `clientWidth` via console (iguais, sem overflow); layout conferido por screenshot. |
| Solução | /solucao | OK | Cards de "Painel", "Registrar ação" etc. empilham corretamente. | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Sobre | /sobre | OK | Texto corrido legível, sem overflow. | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Integrantes | /integrantes | OK | 5 cards em coluna única, fotos e links OK (fotos carregam com leve atraso por `loading="lazy"`, comportamento esperado). | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por 2 screenshots (1ª com foto ainda carregando, 2ª já carregada). |
| FAQ | /faq | OK | Acordeões em coluna única, sem corte de texto. | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (acordeões vistos fechados, não cliquei para abrir/fechar). |
| Contato | /contato | OK | Cards com e-mail/telefone clicáveis, sem overflow. | Largura fixada em 480 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Cadastro | /cadastro | OK | Formulário legível; usado de verdade para criar a conta de teste. | Largura fixada em 480 px no DevTools; formulário preenchido e enviado de fato (nome, e-mail, senha, confirmação, aceite dos termos); conta de teste criada com sucesso (API acordou após 2 tentativas); `scrollWidth`/`clientWidth` checados antes do envio (sem overflow). |
| Login | /login | OK | Sem sessão ativa, mostra o formulário normalmente: campos E-mail/Senha, botão "Entrar" e link "Criar conta"; sem rolagem horizontal. | Sessão encerrada antes (conta de teste já estava desativada; confirmei `localStorage`/`sessionStorage` vazios via console); largura fixada em 480 px no DevTools; rota `/login` aberta sem autenticar; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em "Entrar" nem em "Criar conta". |
| Painel | /app | OK | Cartões de perfil e últimas ações empilham bem, sem rolagem horizontal da página. | Largura fixada em 480 px no DevTools; tela aberta automaticamente logo após o cadastro da conta de teste (redirecionamento para /app); `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Nova ação | /app/acoes/nova | OK | Formulário (tipo de impacto, quantidade, evidência) legível e utilizável. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa (navegação direta); `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não submeti o formulário. |
| Minhas ações | /app/minhas-acoes | OK | Estado vazio ("Nenhuma ação registrada ainda") exibido corretamente. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Validar | /app/validar | OK | Card de ação pendente legível; botões Aprovar/Reprovar com bom tamanho de toque. Ação pendente ID #36 nesta tela — não foi votada, conforme instrução. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em Aprovar nem em Reprovar. |
| Ranking | /app/ranking | OK | Lista de usuários em coluna única, sem corte de texto nem overflow. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Perfil | /app/perfil | OK | Dados do perfil e formulário "Seus dados" legíveis. Menu/cabeçalho de /app rola na horizontal dentro da barra nesta largura — comportamento intencional (nota do enunciado), registrado como OK. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` do documento checados (sem overflow da página); a rolagem interna do menu foi percebida visualmente no screenshot (barra de scroll lateral na faixa de navegação), não medida via JS. |
| Detalhe de ação | /app/acoes/1 | OK | Página de detalhe do tipo de ação ("Uso de transporte público") legível, sem overflow. | Largura fixada em 480 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |

## 768 px

| Tela | Rota | Resultado | Observação | Como foi verificado |
| --- | --- | --- | --- | --- |
| Home | / | OK | Título em uma só linha do hero, botões lado a lado, sem rolagem horizontal. | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Solução | /solucao | OK | Cards em grid 2 colunas, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Sobre | /sobre | OK | Texto corrido legível, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Integrantes | /integrantes | OK | 5 cards em grid 2 colunas, sem quebra de layout (foto de 1 integrante ainda carregando no momento da captura, comportamento esperado do `loading="lazy"`). | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (1 foto ainda em carregamento no instante da captura). |
| FAQ | /faq | OK | Acordeões ocupam a largura central, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (acordeões vistos fechados). |
| Contato | /contato | OK | Cards em grid 2 colunas, e-mail/telefone legíveis. | Largura fixada em 768 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Cadastro | /cadastro | OK | Formulário centralizado, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta diretamente, sem preencher o formulário; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Login | /login | OK | Sem sessão ativa, formulário centralizado, sem rolagem horizontal. | Sessão já estava encerrada (conta de teste desativada); largura fixada em 768 px no DevTools; rota `/login` aberta sem autenticar; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em "Entrar" nem em "Criar conta". |
| Painel | /app | OK | Menu de /app (Painel, Nova ação, Minhas ações, Validar, Ranking, Perfil) cabe inteiro na barra, sem rolagem horizontal nesta largura. | Largura fixada em 768 px no DevTools; tela alcançada ao navegar para /login com a sessão de teste ainda ativa (redirecionamento automático para /app); `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Nova ação | /app/acoes/nova | OK | Formulário legível, campos com largura confortável. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não submeti o formulário. |
| Minhas ações | /app/minhas-acoes | OK | Estado vazio exibido corretamente, botão "Registrar nova ação" alinhado à direita do título. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Validar | /app/validar | OK | Botões Aprovar/Reprovar lado a lado. Ação pendente ID #36 nesta tela novamente — não foi votada. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em Aprovar nem em Reprovar. |
| Ranking | /app/ranking | OK | Lista em formato de tabela (posição, nome, pontos, nível, streak), colunas alinhadas, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Perfil | /app/perfil | OK | Cartões de estatísticas em grid 2x2; "Seus dados" legível. Menu de /app não precisa rolar nesta largura. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (menu sem indício de rolagem interna nesta largura). |
| Detalhe de ação | /app/acoes/1 | OK | Página de detalhe legível, sem overflow. | Largura fixada em 768 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |

## 992 px

| Tela | Rota | Resultado | Observação | Como foi verificado |
| --- | --- | --- | --- | --- |
| Home | / | OK | Menu público completo (Home, Solução, Sobre, Integrantes, FAQ, Contato) horizontal no cabeçalho, sem rolagem. | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Solução | /solucao | OK | Cards em grid 3 colunas. | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Sobre | /sobre | OK | Texto corrido com boa largura de leitura. | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Integrantes | /integrantes | OK | 5 cards em grid 3 colunas (3+2), sem overflow. | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (1 foto ainda em carregamento no instante da captura). |
| FAQ | /faq | OK | Acordeões centralizados, sem overflow. | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot (acordeões vistos fechados). |
| Contato | /contato | OK | Cards em grid 3 colunas; e-mails longos quebram em 2 linhas dentro do card (sem estourar o container). | Largura fixada em 992 px no DevTools; rota aberta diretamente; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Cadastro | /cadastro | OK | Formulário passa a dividir a tela com imagem/ilustração decorativa ao lado, sem overflow. | Largura fixada em 992 px no DevTools; rota aberta diretamente, sem preencher o formulário; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Login | /login | OK | Sem sessão ativa, mesma divisão com painel decorativo verde já vista em Cadastro, sem rolagem horizontal. | Sessão já estava encerrada (conta de teste desativada); largura fixada em 992 px no DevTools; rota `/login` aberta sem autenticar; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em "Entrar" nem em "Criar conta". |
| Painel | /app | OK | "Seu Perfil" e "Últimas ações" lado a lado em grid 2 colunas. | Largura fixada em 992 px no DevTools; tela alcançada ao navegar para /login com a sessão de teste ainda ativa (redirecionamento automático para /app); `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Nova ação | /app/acoes/nova | OK | Formulário centralizado, largura confortável. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não submeti o formulário. |
| Minhas ações | /app/minhas-acoes | OK | Estado vazio exibido corretamente. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Validar | /app/validar | OK | Card de auditoria legível. Ação pendente ID #36 nesta tela novamente — não foi votada. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. Não cliquei em Aprovar nem em Reprovar. |
| Ranking | /app/ranking | OK | Tabela com todas as colunas visíveis, sem overflow. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |
| Perfil | /app/perfil | OK | Cartões de estatísticas em grid 4 colunas; seção "Desativar conta" visível. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot; ao final do QA, cliquei de fato em "Desativar conta" e confirmei em "Sim, desativar minha conta" nesta largura, encerrando a conta de teste (redirecionou para a Home). |
| Detalhe de ação | /app/acoes/1 | OK | Página de detalhe legível, sem overflow. | Largura fixada em 992 px no DevTools; rota aberta com sessão ativa; `scrollWidth`/`clientWidth` checados (sem overflow); layout conferido por screenshot. |

## Conclusão

**Telas avaliadas por largura:** 15 telas em 480 px, 15 em 768 px e 15 em 992 px — total de 45 verificações, todas abertas de fato no navegador (Chrome, DevTools em modo responsivo, viewport emulado), no site de produção.

**Resultado geral:** 45 OK, 0 CORRIGIDO, 0 REGISTRADO, 0 N/T. Nenhuma rolagem horizontal da página (`scrollWidth` vs `clientWidth`) foi encontrada em nenhuma das 45 combinações tela × largura.

**Problemas CORRIGIDOS neste PR:** nenhum problema de responsividade foi encontrado nos arquivos alterados (`IntegrantesPage.tsx`, `members.ts` e `member.ts`); a única mudança de código do PR (exibir a turma no card de integrante) não alterou `PersonCard.tsx`. O layout de `/integrantes` foi conferido nas três larguras, sem overflow; a presença do texto 'Turma' em cada card não foi registrada neste QA.

**Problemas REGISTRADOS (não corrigidos, fora dos arquivos permitidos):** nenhum encontrado.

**Itens N/T (não testado):** nenhum. As 15 telas foram abertas de verdade nas três larguras — as públicas por navegação direta, as de `/app` com a conta de teste `arthur-teste0111@example.test` (desativada ao final pelo botão "Desativar conta" do perfil, em 992 px), e a tela de Login foi reaberta sem sessão ativa (localStorage/sessionStorage vazios confirmados) para mostrar o formulário real, não o redirecionamento.

**O que foi efetivamente verificado em cada tela:** fixação da largura no DevTools, checagem de `scrollWidth`/`clientWidth` via console (ausência de overflow horizontal) e inspeção visual do layout por screenshot. Interações além disso (preencher e enviar formulário, votar em ação, desativar conta) só são citadas nas linhas em que realmente ocorreram — nenhum acordeão da FAQ foi aberto/fechado durante o teste, e o menu de `/app` não foi clicado para abrir/fechar; a rolagem interna do menu em 480 px foi observada visualmente, não medida via JS.

**Observações conhecidas (registradas como OK, não como problema):**
- Em 480 px, o menu de `/app` (Painel, Nova ação, Minhas ações, Validar, Ranking, Perfil) rola horizontalmente dentro da própria barra — comportamento intencional.
- Durante os testes, a ação pendente de ID #36 apareceu repetidamente na tela Validar (nas três larguras); não foi aprovada nem reprovada, conforme instrução.
