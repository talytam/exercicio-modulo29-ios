import { $, $$, browser, driver } from '@wdio/globals';

class ShopPage {
  get products() {
    return $$('-ios predicate string:name == "productDetails"');
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
    await browser.pause(5000);

    // A consulta de elementos na Home apresentou instabilidade
    // no WebDriverAgent durante as execuções no Sauce Labs.
    await driver.touchAction({
      action: 'tap',
      x: 195,
      y: 125
    });

    await browser.pause(5000);
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

      await browser.pause(2000);

      if (await this.stockError.isExisting()) {
        await driver.back();
        await browser.pause(3000);
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

    await browser.pause(3000);
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