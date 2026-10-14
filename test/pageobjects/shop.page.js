import { $, browser, driver } from '@wdio/globals';

class ShopPage {
  get browseTab() {
    return $('id:tab-Browse');
  }

  get products() {
    return browser['

  get addToCartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add To Cart" OR label CONTAINS[c] "Add To Cart")');
  }

  get stockError() {
    return $('-ios predicate string:(name CONTAINS[c] "quantities available" OR label CONTAINS[c] "quantities available")');
  }

  get cartButton() {
    return $('-ios predicate string:(name == "cart" OR name == "Cart" OR label == "cart" OR label == "Cart")');
  }

  get addNewAddressButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add New Address" OR label CONTAINS[c] "Add New Address")');
  }

  get continueToPaymentButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Continue to payment" OR label CONTAINS[c] "Continue to payment")');
  }

  get cashOnDeliveryOption() {
    return $('-ios predicate string:(name CONTAINS[c] "Cash on Delivery" OR label CONTAINS[c] "Cash on Delivery")');
  }

  get checkoutButton() {
    return $('-ios predicate string:(name == "Checkout" OR label == "Checkout")');
  }

  get successMessage() {
    return $('-ios predicate string:(name CONTAINS[c] "Transaction successful" OR label CONTAINS[c] "Transaction successful")');
  }

  fieldByText(text) {
    return $(
      '-ios predicate string:(name == "' +
        text +
        '" OR value == "' +
        text +
        '" OR label == "' +
        text +
        '")'
    );
  }

  async openBrowse() {
    await this.browseTab.waitForDisplayed({
      timeout: 20000
    });

    await this.browseTab.click();

    await browser.waitUntil(
      async () => (await this.products).length > 0,
      {
        timeout: 20000,
        timeoutMsg: 'Os produtos não foram exibidos na tela Browse.'
      }
    );
  }

  async addAvailableProductToCart() {
    for (let index = 0; index < 5; index++) {
      const items = await this.products;

      if (!items[index]) {
        break;
      }

      await items[index].click();

      await this.addToCartButton.waitForDisplayed({
        timeout: 20000
      });

      await this.addToCartButton.click();

      let semEstoque = false;

      try {
        await this.stockError.waitForDisplayed({
          timeout: 3000
        });
        semEstoque = true;
      } catch (error) {
        semEstoque = false;
      }

      if (semEstoque) {
        await driver.back();

        await browser.waitUntil(
          async () => (await this.products).length > 0,
          {
            timeout: 20000,
            timeoutMsg: 'A lista de produtos não foi exibida após retornar.'
          }
        );

        continue;
      }

      return;
    }

    throw new Error(
      'Não foi possível localizar um produto com estoque disponível.'
    );
  }

  async openCart() {
    await this.cartButton.waitForDisplayed({
      timeout: 20000
    });

    await this.cartButton.click();

    await browser.waitUntil(
      async () =>
        (await this.addNewAddressButton.isExisting()) ||
        (await this.continueToPaymentButton.isExisting()),
      {
        timeout: 20000,
        timeoutMsg: 'A tela do carrinho não ficou pronta para continuar.'
      }
    );
  }

  async addAddressIfNeeded() {
    if (!(await this.addNewAddressButton.isExisting())) {
      return;
    }

    await this.addNewAddressButton.click();

    await this.fieldByText('Enter your name').setValue('Talyta');
    await this.fieldByText('Enter your mobile number').setValue('11999999999');
    await this.fieldByText('Enter your address').setValue('Rua Teste, 100');
    await this.fieldByText('City').setValue('Sao Paulo');
    await this.fieldByText('State').setValue('SP');
    await this.fieldByText('ZipCode').setValue('01001000');

    await $(
      '-ios predicate string:(name == "Save" OR label == "Save")'
    ).click();
  }

  async finishCheckout() {
    await this.continueToPaymentButton.waitForDisplayed({
      timeout: 30000
    });

    await this.continueToPaymentButton.click();

    await this.cashOnDeliveryOption.waitForDisplayed({
      timeout: 30000
    });

    await this.cashOnDeliveryOption.click();

    await this.checkoutButton.waitForDisplayed({
      timeout: 30000
    });

    await this.checkoutButton.click();
  }
}

export default new ShopPage(); + '

  get addToCartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add To Cart" OR label CONTAINS[c] "Add To Cart")');
  }

  get stockError() {
    return $('-ios predicate string:(name CONTAINS[c] "quantities available" OR label CONTAINS[c] "quantities available")');
  }

  get cartButton() {
    return $('-ios predicate string:(name == "cart" OR name == "Cart" OR label == "cart" OR label == "Cart")');
  }

  get addNewAddressButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add New Address" OR label CONTAINS[c] "Add New Address")');
  }

  get continueToPaymentButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Continue to payment" OR label CONTAINS[c] "Continue to payment")');
  }

  get cashOnDeliveryOption() {
    return $('-ios predicate string:(name CONTAINS[c] "Cash on Delivery" OR label CONTAINS[c] "Cash on Delivery")');
  }

  get checkoutButton() {
    return $('-ios predicate string:(name == "Checkout" OR label == "Checkout")');
  }

  get successMessage() {
    return $('-ios predicate string:(name CONTAINS[c] "Transaction successful" OR label CONTAINS[c] "Transaction successful")');
  }

  fieldByText(text) {
    return $(
      '-ios predicate string:(name == "' +
        text +
        '" OR value == "' +
        text +
        '" OR label == "' +
        text +
        '")'
    );
  }

  async openBrowse() {
    await this.browseTab.waitForDisplayed({
      timeout: 20000
    });

    await this.browseTab.click();

    await browser.waitUntil(
      async () => (await this.products).length > 0,
      {
        timeout: 20000,
        timeoutMsg: 'Os produtos não foram exibidos na tela Browse.'
      }
    );
  }

  async addAvailableProductToCart() {
    for (let index = 0; index < 5; index++) {
      const items = await this.products;

      if (!items[index]) {
        break;
      }

      await items[index].click();

      await this.addToCartButton.waitForDisplayed({
        timeout: 20000
      });

      await this.addToCartButton.click();

      let semEstoque = false;

      try {
        await this.stockError.waitForDisplayed({
          timeout: 3000
        });
        semEstoque = true;
      } catch (error) {
        semEstoque = false;
      }

      if (semEstoque) {
        await driver.back();

        await browser.waitUntil(
          async () => (await this.products).length > 0,
          {
            timeout: 20000,
            timeoutMsg: 'A lista de produtos não foi exibida após retornar.'
          }
        );

        continue;
      }

      return;
    }

    throw new Error(
      'Não foi possível localizar um produto com estoque disponível.'
    );
  }

  async openCart() {
    await this.cartButton.waitForDisplayed({
      timeout: 20000
    });

    await this.cartButton.click();

    await browser.waitUntil(
      async () =>
        (await this.addNewAddressButton.isExisting()) ||
        (await this.continueToPaymentButton.isExisting()),
      {
        timeout: 20000,
        timeoutMsg: 'A tela do carrinho não ficou pronta para continuar.'
      }
    );
  }

  async addAddressIfNeeded() {
    if (!(await this.addNewAddressButton.isExisting())) {
      return;
    }

    await this.addNewAddressButton.click();

    await this.fieldByText('Enter your name').setValue('Talyta');
    await this.fieldByText('Enter your mobile number').setValue('11999999999');
    await this.fieldByText('Enter your address').setValue('Rua Teste, 100');
    await this.fieldByText('City').setValue('Sao Paulo');
    await this.fieldByText('State').setValue('SP');
    await this.fieldByText('ZipCode').setValue('01001000');

    await $(
      '-ios predicate string:(name == "Save" OR label == "Save")'
    ).click();
  }

  async finishCheckout() {
    await this.continueToPaymentButton.waitForDisplayed({
      timeout: 30000
    });

    await this.continueToPaymentButton.click();

    await this.cashOnDeliveryOption.waitForDisplayed({
      timeout: 30000
    });

    await this.cashOnDeliveryOption.click();

    await this.checkoutButton.waitForDisplayed({
      timeout: 30000
    });

    await this.checkoutButton.click();
  }
}

export default new ShopPage();](
      '-ios predicate string:name == "productDetails"'
    );
  }

  get addToCartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add To Cart" OR label CONTAINS[c] "Add To Cart")');
  }

  get stockError() {
    return $('-ios predicate string:(name CONTAINS[c] "quantities available" OR label CONTAINS[c] "quantities available")');
  }

  get cartButton() {
    return $('-ios predicate string:(name == "cart" OR name == "Cart" OR label == "cart" OR label == "Cart")');
  }

  get addNewAddressButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add New Address" OR label CONTAINS[c] "Add New Address")');
  }

  get continueToPaymentButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Continue to payment" OR label CONTAINS[c] "Continue to payment")');
  }

  get cashOnDeliveryOption() {
    return $('-ios predicate string:(name CONTAINS[c] "Cash on Delivery" OR label CONTAINS[c] "Cash on Delivery")');
  }

  get checkoutButton() {
    return $('-ios predicate string:(name == "Checkout" OR label == "Checkout")');
  }

  get successMessage() {
    return $('-ios predicate string:(name CONTAINS[c] "Transaction successful" OR label CONTAINS[c] "Transaction successful")');
  }

  fieldByText(text) {
    return $(
      '-ios predicate string:(name == "' +
        text +
        '" OR value == "' +
        text +
        '" OR label == "' +
        text +
        '")'
    );
  }

  async openBrowse() {
    await this.browseTab.waitForDisplayed({
      timeout: 20000
    });

    await this.browseTab.click();

    await browser.waitUntil(
      async () => (await this.products).length > 0,
      {
        timeout: 20000,
        timeoutMsg: 'Os produtos não foram exibidos na tela Browse.'
      }
    );
  }

  async addAvailableProductToCart() {
    for (let index = 0; index < 5; index++) {
      const items = await this.products;

      if (!items[index]) {
        break;
      }

      await items[index].click();

      await this.addToCartButton.waitForDisplayed({
        timeout: 20000
      });

      await this.addToCartButton.click();

      let semEstoque = false;

      try {
        await this.stockError.waitForDisplayed({
          timeout: 3000
        });
        semEstoque = true;
      } catch (error) {
        semEstoque = false;
      }

      if (semEstoque) {
        await driver.back();

        await browser.waitUntil(
          async () => (await this.products).length > 0,
          {
            timeout: 20000,
            timeoutMsg: 'A lista de produtos não foi exibida após retornar.'
          }
        );

        continue;
      }

      return;
    }

    throw new Error(
      'Não foi possível localizar um produto com estoque disponível.'
    );
  }

  async openCart() {
    await this.cartButton.waitForDisplayed({
      timeout: 20000
    });

    await this.cartButton.click();

    await browser.waitUntil(
      async () =>
        (await this.addNewAddressButton.isExisting()) ||
        (await this.continueToPaymentButton.isExisting()),
      {
        timeout: 20000,
        timeoutMsg: 'A tela do carrinho não ficou pronta para continuar.'
      }
    );
  }

  async addAddressIfNeeded() {
    if (!(await this.addNewAddressButton.isExisting())) {
      return;
    }

    await this.addNewAddressButton.click();

    await this.fieldByText('Enter your name').setValue('Talyta');
    await this.fieldByText('Enter your mobile number').setValue('11999999999');
    await this.fieldByText('Enter your address').setValue('Rua Teste, 100');
    await this.fieldByText('City').setValue('Sao Paulo');
    await this.fieldByText('State').setValue('SP');
    await this.fieldByText('ZipCode').setValue('01001000');

    await $(
      '-ios predicate string:(name == "Save" OR label == "Save")'
    ).click();
  }

  async finishCheckout() {
    await this.continueToPaymentButton.waitForDisplayed({
      timeout: 30000
    });

    await this.continueToPaymentButton.click();

    await this.cashOnDeliveryOption.waitForDisplayed({
      timeout: 30000
    });

    await this.cashOnDeliveryOption.click();

    await this.checkoutButton.waitForDisplayed({
      timeout: 30000
    });

    await this.checkoutButton.click();
  }
}

export default new ShopPage();