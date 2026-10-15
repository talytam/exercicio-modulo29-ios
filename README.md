> **Projeto concluído.** Este repositório preserva as entregas de automação iOS da formação em Engenharia de Qualidade de Software da EBAC, incluindo o histórico utilizado posteriormente na atividade de CI. O conteúdo também está consolidado no repositório [exercicios-ebac](https://github.com/talytam/exercicios-ebac).

# Módulo 29 - Testes iOS

Exercício de automação do fluxo de compra no app Loja EBAC para iOS.

Fluxo automatizado:
- login;
- acesso à área Browse;
- seleção de produto disponível;
- adição ao carrinho;
- cadastro de endereço, quando necessário;
- pagamento;
- checkout;
- validação da compra concluída.

## Tecnologias

- Appium
- WebdriverIO
- XCUITest
- Sauce Labs

## Execução

Crie um arquivo `.env` a partir do `.env.example`, preencha as credenciais e execute:

```bash
npm install
npm test
```

## Observação

Durante os testes no Sauce Labs, foi possível validar a instalação do app, inicialização da sessão e login automatizado. O fluxo completo de compra também foi validado manualmente até a confirmação da transação.

A validação automatizada ponta a ponta não pôde ser concluída devido à indisponibilidade de concorrência para dispositivos iOS na conta utilizada no Sauce Labs (`rds = 0` e `mac_vms = 0` no nível da organização).
