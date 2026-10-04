import { $, driver } from '@wdio/globals';

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
    await this.email.setValue(email);

    const passwordField = await this.password;
    await passwordField.click();

    await driver.setValueImmediate(
      passwordField.elementId,
      password
    );

    await this.loginButton.click();
  }
}

export default new LoginPage();