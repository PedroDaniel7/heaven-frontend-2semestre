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
