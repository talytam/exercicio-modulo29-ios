import { $, $$ } from '@wdio/globals';

class ShopPage {
  get browseTab() {
    return $('id:tab-Browse');
  }

  get products() {
    return $$('-ios predicate string:name == "productDetails"');
  }

  get addToCartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "Add To Cart" OR label CONTAINS[c] "Add To Cart")');
  }

  get cartButton() {
    return $('-ios predicate string:(name CONTAINS[c] "cart" OR label CONTAINS[c] "cart")');
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
    return $('-ios predicate string:(name == "' + text + '" OR value == "' + text + '" OR label == "' + text + '")');
  }

  async openBrowse() {
    await this.browseTab.click();
  }

  async openFirstProduct() {
    const items = await this.products;
    await items[0].click();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
    await this.cartButton.click();
  }

  async addAddressIfNeeded() {
    if (await this.addNewAddressButton.isExisting()) {
      await this.addNewAddressButton.click();

      await this.fieldByText('Enter your name').setValue('Talyta');
      await this.fieldByText('Enter your mobile number').setValue('11999999999');
      await this.fieldByText('Enter your address').setValue('Rua Teste, 100');
      await this.fieldByText('City').setValue('Sao Paulo');
      await this.fieldByText('State').setValue('SP');
      await this.fieldByText('ZipCode').setValue('01001000');

      await $('-ios predicate string:(name == "Save" OR label == "Save")').click();
    }
  }

  async finishCheckout() {
    await this.continueToPaymentButton.click();

    if (await this.cashOnDeliveryOption.isExisting()) {
      await this.cashOnDeliveryOption.click();
    }

    await this.checkoutButton.click();
  }
}

export default new ShopPage();
