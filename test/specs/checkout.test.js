import { expect } from '@wdio/globals';
import homePage from '../pageobjects/home.page.js';
import loginPage from '../pageobjects/login.page.js';
import shopPage from '../pageobjects/shop.page.js';

describe('Módulo 29 - Checkout iOS', () => {
  it('deve concluir uma compra com sucesso', async () => {
    await homePage.openMenu('Account');

    await loginPage.login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    await shopPage.openBrowse();
    await shopPage.addAvailableProductToCart();
    await shopPage.openCart();
    await shopPage.addAddressIfNeeded();
    await shopPage.finishCheckout();

    await shopPage.successMessage.waitForDisplayed({
      timeout: 30000
    });

    await expect(shopPage.successMessage).toBeDisplayed();
  });
});