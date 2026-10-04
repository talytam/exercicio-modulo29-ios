import { $, browser, driver } from '@wdio/globals';

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

  get invalidPasswordMessage() {
    return $('-ios predicate string:(name == "Password is incorrect" OR label == "Password is incorrect")');
  }

  get homeSearch() {
    return $('-ios predicate string:(name ENDSWITH "Search Products" OR label ENDSWITH "Search Products")');
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

    await browser.waitUntil(
      async () =>
        (await this.homeSearch.isExisting()) ||
        (await this.invalidPasswordMessage.isExisting()),
      {
        timeout: 30000,
        interval: 1000,
        timeoutMsg: 'A autenticação não apresentou a Home nem mensagem de senha inválida.'
      }
    );

    if (await this.invalidPasswordMessage.isExisting()) {
      throw new Error('Login não concluído: Password is incorrect.');
    }

    await this.homeSearch.waitForDisplayed({ timeout: 10000 });
  }
}

export default new LoginPage();
