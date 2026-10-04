import { $, $$, browser, driver } from '@wdio/globals';

class ShopPage {
  get browseTab() {
    return $('id:tab-Browse');
  }

  get browseTitle() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Browse"');
  }

  get firstProduct() {
    return $('~productDetails');
  }

  get products() {
    return $$('~productDetails');
  }

  get addToCartButton() {
    return $('~addToCart');
  }

  get stockError() {
    return $('-ios predicate string:(name CONTAINS[c] "quantities available" OR label CONTAINS[c] "quantities available")');
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

  async tap(x, y) {
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
            x,
            y
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
  }

  async openBrowse() {
    await this.browseTab.waitForDisplayed({
      timeout: 20000
    });

    await this.browseTab.click();

    try {
      await this.firstProduct.waitForDisplayed({
        timeout: 60000
      });
    } catch {
      // A lista é instável. Retorna à Home e tenta carregar a aba novamente.
      await driver.back();
      await browser.pause(2500);

      await this.browseTab.waitForDisplayed({
        timeout: 20000
      });

      await this.browseTab.click();

      await this.firstProduct.waitForDisplayed({
        timeout: 60000
      });
    }
  }

  async addAvailableProductToCart() {
    const attempts = 6;

    for (let index = 0; index < attempts; index++) {
      const items = await this.products;

      if (!items[index]) {
        await browser.pause(3000);
        continue;
      }

      await items[index].click();

      try {
        await this.addToCartButton.waitForDisplayed({
          timeout: 20000
        });
      } catch {
        await driver.back();
        await this.firstProduct.waitForDisplayed({ timeout: 20000 });
        continue;
      }

      await this.addToCartButton.click();
      await browser.pause(2500);

      if (await this.stockError.isExisting()) {
        await driver.back();
        await this.firstProduct.waitForDisplayed({ timeout: 20000 });
        continue;
      }

      return;
    }

    throw new Error(
      'Não foi possível adicionar um produto disponível ao carrinho.'
    );
  }

  async openCart() {
    // Produto -> Browse pelo botão de voltar do próprio app.
    await this.tap(30, 88);
    await browser.pause(2000);

    await this.browseTitle.waitForDisplayed({
      timeout: 20000
    });

    // O ícone do carrinho também fica disponível no topo da tela Browse.
    await this.tap(360, 87);

    await browser.pause(4000);
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
