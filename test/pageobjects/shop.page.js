import { $, $$, browser, driver } from '@wdio/globals';

class ShopPage {
  get searchInput() {
    return $('-ios predicate string:name == "searchInput"');
  }

  get products() {
    return $$('-ios predicate string:name == "productDetails"');
  }

  get addToCartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add To Cart" OR label CONTAINS[c] "Add To Cart")');
  }

  get stockError() {
    return $('-ios predicate string:(name CONTAINS[c] "quantities available" OR label CONTAINS[c] "quantities available")');
  }

  get cartTab() {
    return $('id:tab-Cart');
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
    await browser.pause(2500);

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: {
          pointerType: 'touch'
        },
        actions: [
          {
            type: 'pointerMove',
            duration: 0,
            x: 195,
            y: 125
          },
          {
            type: 'pointerDown',
            button: 0
          },
          {
            type: 'pause',
            duration: 100
          },
          {
            type: 'pointerUp',
            button: 0
          }
        ]
      }
    ]);

    await this.searchInput.waitForDisplayed({
      timeout: 20000
    });

    await this.searchInput.setValue('a');

    await browser.waitUntil(
      async () => (await this.products).length > 0,
      {
        timeout: 30000,
        interval: 1000,
        timeoutMsg: 'Nenhum produto foi carregado após a busca.'
      }
    );
  }

  async addAvailableProductToCart() {
    const initialItems = await this.products;
    const attempts = Math.min(initialItems.length, 8);

    for (let index = 0; index < attempts; index++) {
      const items = await this.products;

      if (!items[index]) {
        break;
      }

      await items[index].click();

      try {
        await this.addToCartButton.waitForDisplayed({
          timeout: 15000
        });
      } catch {
        await driver.back();
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        continue;
      }

      await this.addToCartButton.click();
      await browser.pause(2500);

      if (await this.stockError.isExisting()) {
        await driver.back();
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        continue;
      }

      return;
    }

    throw new Error(
      'Não foi possível adicionar um produto disponível ao carrinho.'
    );
  }

  async openCart() {
    if (await this.cartTab.isExisting()) {
      await this.cartTab.click();
      await browser.pause(3000);
      return;
    }

    if (await this.cartButton.isExisting()) {
      await this.cartButton.click();
      await browser.pause(3000);
      return;
    }

    const buttons = await $('XCUIElementTypeButton');
    const buttonNames = [];

    for (const button of buttons) {
      try {
        const name = await button.getAttribute('name');
        const label = await button.getAttribute('label');

        buttonNames.push(`name=${name}; label=${label}`);
      } catch {
        // Ignora elementos que desaparecerem enquanto a tela atualiza.
      }
    }

    throw new Error(
      'Carrinho não localizado. Botões disponíveis: ' +
        buttonNames.join(' | ')
    );
  }

  async addAddressIfNeeded() {
    await browser.pause(2000);

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

    await browser.pause(2000);
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
