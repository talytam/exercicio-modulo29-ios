import { $ } from '@wdio/globals';

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
    await this.password.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
