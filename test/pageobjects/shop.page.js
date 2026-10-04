import { $, $$, browser, driver } from '@wdio/globals';

class ShopPage {
  get browseTab() {
    return $('id:tab-Browse');
  }

  get browseTitle() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "Browse"');
  }

  get searchInput() {
    return $('~searchInput');
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

  get cartTitle() {
    return $('-ios predicate string:type == "XCUIElementTypeStaticText" AND name == "My Cart"');
  }

  get emptyCartMessage() {
    return $('-ios predicate string:(name CONTAINS[c] "Your cart is empty" OR label CONTAINS[c] "Your cart is empty")');
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

    await this.searchInput.waitForDisplayed({
      timeout: 30000
    });
  }

  async openCartFromBrowse() {
    await this.browseTitle.waitForDisplayed({
      timeout: 20000
    });

    await this.tap(360, 87);

    await this.cartTitle.waitForDisplayed({
      timeout: 20000
    });
  }

  async backToBrowse() {
    await this.tap(30, 88);

    await this.browseTitle.waitForDisplayed({
      timeout: 20000
    });
  }

  async addAvailableProductToCart() {
    const searchTerms = [
      'Fish',
      'PlayStation 5',
      'Produto Contrato QA',
      'Camiseta EBAC',
      'bag pandora',
      'Table'
    ];

    for (const term of searchTerms) {
      await this.searchInput.waitForDisplayed({
        timeout: 20000
      });

      await this.searchInput.clearValue();
      await this.searchInput.setValue(term);

      try {
        await this.firstProduct.waitForDisplayed({
          timeout: 20000
        });
      } catch {
        continue;
      }

      const items = await this.products;

      if (!items[0]) {
        continue;
      }

      await items[0].click();

      try {
        await this.addToCartButton.waitForDisplayed({
          timeout: 20000
        });
      } catch {
        await this.tap(30, 88);
        await this.browseTitle.waitForDisplayed({ timeout: 20000 });
        continue;
      }

      await this.addToCartButton.click();
      await browser.pause(2000);

      // Volta do detalhe para Browse e usa o carrinho real como validação.
      await this.tap(30, 88);
      await this.browseTitle.waitForDisplayed({ timeout: 20000 });

      await this.openCartFromBrowse();

      if (await this.emptyCartMessage.isExisting()) {
        await this.backToBrowse();
        continue;
      }

      // Sucesso: permanece no carrinho com o produto adicionado.
      return;
    }

    throw new Error(
      'Nenhum dos produtos testados foi efetivamente adicionado ao carrinho.'
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
