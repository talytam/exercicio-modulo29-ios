import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';
import shopPage from '../pageobjects/shop.page.js';

describe('Módulo 29 - Checkout iOS', () => {
  it('deve concluir uma compra com sucesso', async () => {
    await loginPage.login(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD
    );

    await shopPage.openBrowse();
    await shopPage.openFirstProduct();
    await shopPage.addProductToCart();
    await shopPage.addAddressIfNeeded();
    await shopPage.finishCheckout();

    await expect(shopPage.successMessage).toBeDisplayed();
  });
});
