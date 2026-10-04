# Módulo 30 - Testes Mobile em CI

Exercício de integração dos testes mobile do módulo anterior com GitHub Actions e BrowserStack.

## Fluxo executado no CI

- upload do app iOS para o BrowserStack;
- criação da sessão em dispositivo iOS;
- login no app Loja EBAC;
- acesso à área Browse;
- validação da tela de busca.

O fluxo completo de checkout desenvolvido no módulo 29 continua disponível no projeto em `test/specs/checkout.test.js`.

## Tecnologias

- Appium
- WebdriverIO
- XCUITest
- BrowserStack
- GitHub Actions

## Execução no GitHub Actions

O workflow está em:

`.github/workflows/ci.yml`

Ele é executado em pushes para a branch `ci` e também pode ser iniciado manualmente pela aba **Actions** do GitHub.

As credenciais necessárias são armazenadas em GitHub Secrets.

## Observação

O app Loja EBAC apresentou instabilidade no carregamento de produtos e no carrinho durante a automação completa do checkout. Por isso, o fluxo do CI do módulo 30 utiliza uma validação estável de autenticação e acesso à área Browse para comprovar a execução dos testes no Device Farm.

O BrowserStack grava o vídeo da sessão executada, que pode ser utilizado como evidência da atividade.
