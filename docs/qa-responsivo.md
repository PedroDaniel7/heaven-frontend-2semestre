# QA de responsividade

Data: 01/11/2026. Site verificado: https://heaven-frontend-2semestre.vercel.app. Navegador: Chrome, DevTools em modo responsivo. Responsável: Arthur de Souza Lopes.

Legenda: OK = sem problema; CORRIGIDO = problema achado e corrigido neste PR; REGISTRADO = problema achado e não corrigido (fora dos arquivos permitidos); N/T = não testado (explique).

Conta de teste usada nas telas de `/app`: `arthur-teste0111@example.test`.

## 480 px

| Tela | Rota | Resultado | Observação | Como foi verificado |
| --- | --- | --- | --- | --- |
| Home | / | OK | Textos legíveis, botões empilhados, sem rolagem horizontal. | Testado no navegador |
| Solução | /solucao | OK | Cards de "Painel", "Registrar ação" etc. empilham corretamente. | Testado no navegador |
| Sobre | /sobre | OK | Texto corrido legível, sem overflow. | Testado no navegador |
| Integrantes | /integrantes | OK | 5 cards em coluna única, fotos e links OK (fotos carregam com leve atraso por `loading="lazy"`, comportamento esperado). | Testado no navegador |
| FAQ | /faq | OK | Acordeões em coluna única, sem corte de texto. | Testado no navegador |
| Contato | /contato | OK | Cards com e-mail/telefone clicáveis, sem overflow. | Testado no navegador |
| Cadastro | /cadastro | OK | Formulário legível, campos de senha com toggle de visibilidade funcionando; usado para criar a conta de teste. | Testado no navegador |
| Login | /login | OK | Com sessão ativa, redireciona automaticamente para /app (comportamento esperado de rota protegida/pública exclusiva). | Testado no navegador |
| Painel | /app | OK | Cartões de perfil e últimas ações empilham bem, sem rolagem horizontal da página. | Testado no navegador |
| Nova ação | /app/acoes/nova | OK | Formulário (tipo de impacto, quantidade, evidência) legível e utilizável. | Testado no navegador |
| Minhas ações | /app/minhas-acoes | OK | Estado vazio ("Nenhuma ação registrada ainda") exibido corretamente. | Testado no navegador |
| Validar | /app/validar | OK | Card de ação pendente legível; botões Aprovar/Reprovar com bom tamanho de toque. Ação pendente ID #36 nesta tela — não foi votada, conforme instrução. | Testado no navegador |
| Ranking | /app/ranking | OK | Lista de usuários em coluna única, sem corte de texto nem overflow. | Testado no navegador |
| Perfil | /app/perfil | OK | Dados do perfil e formulário "Seus dados" legíveis. Menu/cabeçalho de /app rola na horizontal dentro da barra nesta largura — comportamento intencional (nota do enunciado), registrado como OK. | Testado no navegador |
| Detalhe de ação | /app/acoes/1 | OK | Página de detalhe do tipo de ação ("Uso de transporte público") legível, sem overflow. | Testado no navegador |

## 768 px

| Tela | Rota | Resultado | Observação | Como foi verificado |
| --- | --- | --- | --- | --- |
| Home | / | OK | Título em uma só linha do hero, botões lado a lado, sem rolagem horizontal. | Testado no navegador |
| Solução | /solucao | OK | Cards em grid 2 colunas, sem overflow. | Testado no navegador |
| Sobre | /sobre | OK | Texto corrido legível, sem overflow. | Testado no navegador |
| Integrantes | /integrantes | OK | 5 cards em grid 2 colunas, sem quebra de layout (foto de 1 integrante ainda carregando no momento da captura, comportamento esperado do `loading="lazy"`). | Testado no navegador |
| FAQ | /faq | OK | Acordeões ocupam a largura central, sem overflow. | Testado no navegador |
| Contato | /contato | OK | Cards em grid 2 colunas, e-mail/telefone legíveis. | Testado no navegador |
| Cadastro | /cadastro | OK | Formulário centralizado, sem overflow. | Testado no navegador |
| Login | /login | OK | Com sessão ativa, redireciona automaticamente para /app. | Testado no navegador |
| Painel | /app | OK | Menu de /app (Painel, Nova ação, Minhas ações, Validar, Ranking, Perfil) cabe inteiro na barra, sem rolagem horizontal nesta largura. | Testado no navegador |
| Nova ação | /app/acoes/nova | OK | Formulário legível, campos com largura confortável. | Testado no navegador |
| Minhas ações | /app/minhas-acoes | OK | Estado vazio exibido corretamente, botão "Registrar nova ação" alinhado à direita do título. | Testado no navegador |
| Validar | /app/validar | OK | Botões Aprovar/Reprovar lado a lado. Ação pendente ID #36 nesta tela novamente — não foi votada. | Testado no navegador |
| Ranking | /app/ranking | OK | Lista em formato de tabela (posição, nome, pontos, nível, streak), colunas alinhadas, sem overflow. | Testado no navegador |
| Perfil | /app/perfil | OK | Cartões de estatísticas em grid 2x2; "Seus dados" legível. Menu de /app não precisa rolar nesta largura. | Testado no navegador |
| Detalhe de ação | /app/acoes/1 | OK | Página de detalhe legível, sem overflow. | Testado no navegador |
