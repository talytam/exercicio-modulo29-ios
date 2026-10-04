import { expect } from '@wdio/globals';
import homePage from '../pageobjects/home.page.js';
import loginPage from '../pageobjects/login.page.js';

describe('Módulo 30 - CI Mobile no BrowserStack', () => {
  it('deve autenticar no app iOS pelo Device Farm', async () => {
    await homePage.openMenu('Account');

    await loginPage.login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    await expect(loginPage.homeTitle).toBeDisplayed();
  });
});
