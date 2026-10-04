import 'dotenv/config';

export const config = {
  runner: 'local',

  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,

  protocol: 'https',
  hostname: 'ondemand.us-west-1.saucelabs.com',
  port: 443,
  path: '/wd/hub',

  specs: ['../test/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'iOS',

    'appium:automationName': 'XCUITest',
    'appium:deviceName': '^iPhone.*',
    'appium:app': process.env.SAUCE_APP_ID || 'storage:filename=LojaEBAC.ipa',

    'appium:newCommandTimeout': 90,
    'appium:wdaConnectionTimeout': 60000,

    'sauce:options': {
      build: 'modulo-29-ios',
      name: 'Fluxo de checkout - Loja EBAC',
      deviceOrientation: 'PORTRAIT',
      appiumVersion: 'appium2-2025-09'
    }
  }],

  logLevel: 'info',

  waitforTimeout: 15000,
  connectionRetryTimeout: 80000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 300000
  }
};