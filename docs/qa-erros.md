# QA de estados de erro

Data: 01/11/2026. Site verificado: `npm run dev` (http://localhost:5173) apontando para a API https://heaven-java-api.onrender.com. Navegador: navegador embutido do app Claude (baseado em Chromium; não foi o Google Chrome). Responsável: Eduardo Oliveira Conde.

Legenda: OK = a tela mostra mensagem clara em português e não quebra; PROBLEMA = comportamento ruim (descreva); N/T = não testado (explique o motivo).

Cada seção tem a tabela: Cenário | Passos | Mensagem exibida (copie o texto) | Resultado | Como foi verificado.

Contas de teste: `eduardo-teste-DDMM@example.test` (ou variação com sufixo), senha com 8+ caracteres, desativada no fim pelo botão "Desativar conta" do perfil. Nenhuma ação foi aprovada ou reprovada.

## Cadastro (`/cadastro`)

| Cenário | Passos | Mensagem exibida | Resultado | Como foi verificado |
|---|---|---|---|---|
| 1. E-mail já cadastrado | Cadastrar `eduardo-teste-0111-2@example.test` (conta criada e logada em `/app`), clicar em Sair, voltar a `/cadastro` e enviar o mesmo e-mail com os termos aceitos | "E-mail já cadastrado." (no campo E-mail; a página continua em `/cadastro`) | OK | Testado no navegador |
| 2. Senha com menos de 8 caracteres | Preencher nome, e-mail válido, senha e confirmação de 7 caracteres iguais, aceitar os termos e enviar | "A senha deve ter pelo menos 8 caracteres." (no campo Senha) | OK | Testado no navegador |
| 3. Todos os campos vazios | Abrir `/cadastro` e clicar em "Criar minha conta" sem preencher nada | "Informe seu nome." / "Informe seu e-mail." / "Informe sua senha." / "Confirme sua senha." / "É necessário aceitar os termos para criar sua conta." (cada uma no seu campo) | OK | Testado no navegador |
| 4. Senha e confirmação diferentes | Preencher tudo válido, mas com uma confirmação diferente da senha, aceitar os termos e enviar | "As senhas não coincidem." (no campo Confirmar senha) | OK | Testado no navegador |
| 5. E-mail em formato inválido | Preencher tudo válido, mas com o e-mail `eduardo-teste-sem-arroba`, aceitar os termos e enviar | "Digite um e-mail válido." (no campo E-mail) | OK | Testado no navegador |
| 6. Cadastro sem aceitar os termos | Preencher tudo válido e enviar sem marcar a caixa de termos | "É necessário aceitar os termos para criar sua conta." (abaixo da caixa de termos) | OK | Testado no navegador |

Observações:

- Em todos os cenários a página continuou em `/cadastro` e nenhuma conta nova foi criada, com exceção da conta usada no cenário 1.
- Nos cenários 2, 3 e 4 as mensagens são validações do próprio formulário (aparecem antes de qualquer chamada à API). Só o cenário 1 depende da resposta do servidor.
- A conta criada no cenário 1 foi desativada no fim pelo botão "Desativar conta" do perfil. O app voltou para `/` depois da confirmação. O login com essa conta bloqueada não foi retestado nesta rodada.

## Login (`/login`)

| Cenário | Passos | Mensagem exibida | Resultado | Como foi verificado |
|---|---|---|---|---|
| 1. Senha errada | Criar `eduardo-teste-0111-3@example.test`, sair, abrir `/login` e entrar com esse e-mail e uma senha incorreta | "E-mail ou senha incorretos." (acima do botão Entrar; a página continua em `/login`) | OK | Testado no navegador |
| 2. E-mail que não existe | Entrar com `eduardo-teste-inexistente-0111@example.test` e uma senha qualquer | "E-mail ou senha incorretos." (a mesma mensagem da senha errada, então a tela não revela se o e-mail existe) | OK | Testado no navegador |
| 3. Campos vazios | Abrir `/login` e clicar em "Entrar" sem preencher nada | "Informe seu e-mail." / "Informe sua senha." (cada uma no seu campo) | OK | Testado no navegador |
| 4. Conta desativada | Entrar com a conta de teste, abrir o Perfil, clicar em "Desativar conta" e confirmar (o app volta para `/`). Depois abrir `/login` e entrar com o mesmo e-mail e a senha correta | "Esta conta foi desativada e não pode entrar." (a página continua em `/login`) | OK | Testado no navegador |
| 5. Acessar `/app` sem login | Sem sessão (nenhum dado salvo no navegador), abrir `http://localhost:5173/app` direto | Nenhuma mensagem; o app redireciona para `/login` (tela "Bem-vindo de volta.") | OK | Testado no navegador |

Observações:

- A conta do cenário 1 foi a mesma usada no cenário 4 e foi desativada no fim pelo botão "Desativar conta" do perfil.
- O cenário 4 também confirma o que a seção Cadastro deixou em aberto: o login com uma conta desativada é bloqueado.
- Nenhuma ação foi criada, aprovada ou reprovada.

## Nova ação (`/app/acoes/nova`)

| Cenário | Passos | Mensagem exibida | Resultado | Como foi verificado |
|---|---|---|---|---|
| 1. Enviar sem escolher o tipo | Abrir a tela e inspecionar o seletor "Tipo de Impacto" | Nenhuma mensagem: o seletor não tem opção vazia e já vem com o primeiro tipo marcado ("Uso de transporte publico"), então não dá para enviar sem tipo pela tela | N/T | Não testado como envio: o seletor não tem opção vazia, então a tela não permite enviar sem tipo, e enviar com o tipo padrão e dados válidos criaria uma ação de verdade. Conteúdo do seletor visto no navegador e valor inicial verificado por leitura de código (`NewActionForm.tsx`: `tipos[0].id`) |
| 2. Quantidade vazia | Preencher a evidência, deixar a quantidade em branco e enviar | "Informe a quantidade." (no campo Quantidade) | OK | Testado no navegador |
| 3. Quantidade zero | Preencher a evidência, digitar `0` na quantidade e enviar | "A quantidade deve ser maior que zero." (no campo Quantidade) | OK | Testado no navegador |
| 4. Quantidade negativa | Preencher a evidência, digitar `-5` na quantidade e enviar | "Use um número com até duas casas decimais." (no campo Quantidade; o texto fala em casas decimais, mas o motivo real é o sinal de menos) | PROBLEMA (leve): a mensagem para `-5` fala em "casas decimais" e não diz que o valor não pode ser negativo; o envio é bloqueado corretamente, mas o texto não explica o motivo. Não corrigido (fora do escopo desta tarefa, sem alteração de código) | Testado no navegador |
| 5. Quantidade com letras | Preencher a evidência, digitar `abc` na quantidade e enviar | "Use um número com até duas casas decimais." (no campo Quantidade) | OK | Testado no navegador |

Resumo da seção: 5 cenários, 4 testados no navegador (3 OK, 1 PROBLEMA leve) e 1 N/T.

Observações:

- Nos cenários 2 a 5 a página continuou em `/app/acoes/nova` e a validação do formulário bloqueou o envio antes de qualquer chamada à API.
- Nenhum cenário criou uma ação de verdade. Conferido em Minhas ações da conta de teste (`eduardo-teste-0111-4@example.test`), que mostrou "Nenhuma ação registrada ainda". Por isso não foi preciso cancelar nada.
- Para não criar ação real, o cenário 1 não foi enviado com tipo padrão e dados válidos, porque isso registraria uma ação do primeiro tipo.
- A conta de teste foi desativada no fim pelo botão "Desativar conta" do perfil, e o app voltou para `/`.
- Nenhuma ação foi aprovada ou reprovada.

## Carregando (Validar, Ranking e Perfil)

Como foi provocado: o DevTools (Rede > Slow 3G) não estava disponível, então a lentidão foi simulada dentro da página, interceptando o `fetch` para atrasar cada requisição em 6 segundos, e as telas foram abertas pelo menu (sem recarregar). Não é a mesma coisa que o Slow 3G do DevTools.

| Tela | O que aparece em 1 s | O que aparece depois de 3 s | Resultado | Como foi verificado |
|---|---|---|---|---|
| Validar (`/app/validar`) | O título "Central de Auditoria de Pares", o texto de apoio e "Sorteando uma ação para você…" | Os mesmos textos mais "Acordando o servidor, pode levar até 1 minuto." | OK | Testado no navegador (lentidão simulada) |
| Ranking (`/app/ranking`) | O título "Ranking", o texto de apoio e "Carregando o ranking…" | Os mesmos textos mais "Acordando o servidor, pode levar até 1 minuto." | OK | Testado no navegador (lentidão simulada) |
| Perfil (`/app/perfil`) | O título "Perfil" e "Carregando seu perfil…" | Os mesmos textos mais "Acordando o servidor, pode levar até 1 minuto." | OK | Testado no navegador (lentidão simulada) |

Observações:

- Em todas as telas o menu continua visível e usável durante o carregamento, e depois da resposta a tela mostra o conteúdo normal.
- Abrir a tela Validar já sorteia uma ação real para a conta ("Oferta válida por mais 9:59"). A ação apareceu com os botões Aprovar e Reprovar, e nenhum deles foi clicado. Nenhum voto foi dado.

## Erro de rede (Validar, Ranking e Perfil)

Como foi provocado: o DevTools (Rede > Offline) não estava disponível, então a falta de conexão foi simulada dentro da página, fazendo o `fetch` falhar do mesmo jeito que o navegador falha sem rede (erro "Failed to fetch"), e as telas foram abertas pelo menu. Não é a mesma coisa que o modo Offline do DevTools.

| Tela | Mensagem exibida | Resultado | Como foi verificado |
|---|---|---|---|
| Validar (`/app/validar`) | "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente." com o botão "Tentar novamente" | OK | Testado no navegador (rede simulada) |
| Ranking (`/app/ranking`) | "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente." com o botão "Tentar novamente" | OK | Testado no navegador (rede simulada) |
| Perfil (`/app/perfil`) | "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente." com o botão "Tentar novamente" | OK | Testado no navegador (rede simulada) |

Observações:

- A mensagem é a mesma nas três telas, em português, e a tela não quebra: o menu continua visível.
- Com a rede de volta, o botão "Tentar novamente" do Perfil carregou o formulário normalmente. O botão não foi testado no Validar nem no Ranking.

## Perfil (`/app/perfil`)

| Cenário | Passos | Mensagem exibida | Resultado | Como foi verificado |
|---|---|---|---|---|
| 1. Nome vazio | Apagar o nome e clicar em "Salvar alterações" | "Informe seu nome." (no campo Nome) | OK | Testado no navegador |
| 2. E-mail repetido | Trocar o e-mail por `eduardo-teste-0111-6@example.test`, que já pertencia a outra conta de teste ativa, e salvar | "E-mail já cadastrado." (no campo E-mail) | OK | Testado no navegador |
| 3. Senha curta | Digitar uma nova senha de 7 caracteres e salvar | "A senha deve ter pelo menos 8 caracteres." (no campo Nova senha) | OK | Testado no navegador |

Observações:

- Nos três cenários a página continuou em `/app/perfil`, nada foi salvo e a tela não quebrou.
- Foram usadas duas contas de teste: `eduardo-teste-0111-5@example.test` (a que editou o perfil) e `eduardo-teste-0111-6@example.test` (a que forneceu o e-mail repetido). As duas foram desativadas no fim pelo botão "Desativar conta" do perfil.

## Não testado (N/T)

| Cenário | Resultado | Motivo |
|---|---|---|
| Limite diário de ações | N/T | Exigiria registrar ações de verdade até bater o limite, e cada uma entraria na fila de validação da comunidade. O valor do limite também não está no front-end |
| Bloqueio por penalização | N/T | Exige uma conta com penalização ativa, que só se cria mexendo no banco |
| Sorteio sem ação disponível | N/T | Depende de não haver nenhuma ação pendente para validar, o que só se provoca mexendo no banco. Na rodada de testes a tela Validar sempre achou uma ação para sortear |
| Ranking vazio | N/T | O ranking já tem usuários, então só apareceria com o banco vazio |

## Conclusão

- **Cenários listados:** 29 (Cadastro 6, Login 5, Nova ação 5, Carregando 3, Erro de rede 3, Perfil 3, e os 4 N/T desta seção).
- **Testados no navegador:** 24.
- **OK:** 23.
- **PROBLEMA:** 1 (leve).
- **N/T:** 5 (1 de Nova ação, o envio sem escolher o tipo, e os 4 da seção anterior).

Problemas encontrados:

1. Nova ação, quantidade negativa (`-5`): a mensagem diz "Use um número com até duas casas decimais." e não explica que o valor não pode ser negativo. É um texto confuso, não um erro grave: o envio é bloqueado corretamente. Não foi corrigido nesta tarefa, porque ela não altera esse arquivo.

Pontos de atenção (não são erros):

- Os cenários "Carregando" e "Erro de rede" foram simulados na própria página, e não pelo Slow 3G e pelo Offline do DevTools. O comportamento de tela está confirmado, mas o tempo real em uma rede lenta de verdade não foi medido.
- Abrir a tela Validar já sorteia uma ação real para o usuário, com prazo de 10 minutos. Nenhuma ação foi aprovada ou reprovada nesta QA.

Contas de teste usadas e desativadas no fim: `eduardo-teste-0111@example.test`, `-0111-2`, `-0111-3`, `-0111-4`, `-0111-5` e `-0111-6` (todas em `@example.test`). Nenhuma senha foi registrada neste documento.
