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
