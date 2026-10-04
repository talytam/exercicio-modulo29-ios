import { $, $$, browser, driver } from '@wdio/globals';

class LoginPage {
  get email() {
    return $('id:email');
  }

  get password() {
    return $('-ios predicate string:name == "Password"');
  }

  get loginButton() {
    return $('~btnLogin');
  }

  async login(email, password) {
    await this.email.waitForDisplayed({ timeout: 20000 });
    await this.email.setValue(email);

    const passwordField = await this.password;
    await passwordField.waitForDisplayed({ timeout: 20000 });
    await passwordField.click();

    await driver.setValueImmediate(
      passwordField.elementId,
      password
    );

    await this.loginButton.click();

    try {
      await browser.waitUntil(
        async () => !(await this.email.isExisting()),
        {
          timeout: 20000,
          interval: 1000,
          timeoutMsg: 'A tela de login permaneceu aberta após a autenticação.'
        }
      );
    } catch (error) {
      const labels = await $$('XCUIElementTypeStaticText');
      const visibleTexts = [];

      for (const label of labels) {
        try {
          const text = await label.getText();

          if (text) {
            visibleTexts.push(text);
          }
        } catch {
          // Ignora elementos que desaparecerem enquanto a tela atualiza.
        }
      }

      throw new Error(
        'Login não concluído. Textos visíveis na tela: ' +
          visibleTexts.join(' | ')
      );
    }

    await browser.pause(3000);
  }
}

export default new LoginPage();
