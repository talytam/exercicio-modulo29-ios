import { $ } from '@wdio/globals';

class HomePage {
  async openMenu(menu) {
    const tab = $(`id:tab-${menu}`);

    try {
      await tab.click();
    } catch (error) {
      if (menu === 'Account') {
        const emailField = $('id:email');

        if (await emailField.isExisting()) {
          return;
        }
      }

      throw error;
    }
  }
}

export default new HomePage();