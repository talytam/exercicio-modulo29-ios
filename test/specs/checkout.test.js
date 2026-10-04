import fs from 'node:fs';
import { expect, driver } from '@wdio/globals';
import homePage from '../pageobjects/home.page.js';
import loginPage from '../pageobjects/login.page.js';
import shopPage from '../pageobjects/shop.page.js';

async function evidence(name) {
  fs.mkdirSync('artifacts', { recursive: true });

  try {
    await driver.saveScreenshot(`artifacts/${name}.png`);
  } catch {
    // A evidência visual não deve interromper o teste.
  }

  try {
    const source = await driver.getPageSource();
    fs.writeFileSync(`artifacts/${name}.xml`, source, 'utf8');
  } catch {
    // A árvore de elementos também é apenas diagnóstica.
  }
}

describe('Módulo 29 - Checkout iOS', () => {
  it('deve concluir uma compra com sucesso', async () => {
    try {
      await homePage.openMenu('Account');

      await loginPage.login(
        process.env.USER_EMAIL,
        process.env.USER_PASSWORD
      );

      await evidence('01-apos-login');

      await shopPage.openBrowse();
      await evidence('02-busca-produtos');

      await shopPage.addAvailableProductToCart();
      await evidence('03-carrinho-com-item');

      await shopPage.addAddressIfNeeded();
      await evidence('04-endereco');

      await shopPage.finishCheckout();
      await evidence('05-apos-checkout');

      await shopPage.successMessage.waitForDisplayed({
        timeout: 30000
      });

      await expect(shopPage.successMessage).toBeDisplayed();
    } catch (error) {
      await evidence('99-falha');
      throw error;
    }
  });
});
