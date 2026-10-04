import { expect } from '@wdio/globals';
import homePage from '../pageobjects/home.page.js';
import loginPage from '../pageobjects/login.page.js';
import shopPage from '../pageobjects/shop.page.js';

describe('Módulo 30 - CI Mobile no BrowserStack', () => {
  it('deve autenticar e acessar a área Browse no iOS', async () => {
    await homePage.openMenu('Account');

    await loginPage.login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    await shopPage.openBrowse();

    await expect(shopPage.searchInput).toBeDisplayed();
  });
});
