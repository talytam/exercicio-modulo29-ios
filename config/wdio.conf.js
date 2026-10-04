import 'dotenv/config';

export const config = {
  runner: 'local',
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  protocol: 'https',
  hostname: 'ondemand.us-west-1.saucelabs.com',
  port: 443,
  path: '/wd/hub',

  specs: ['./test/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': 'iPhone.*',
    'appium:platformVersion': '17',
    'appium:app': process.env.SAUCE_APP_ID || 'storage:filename=LojaEBAC.ipa',
    'sauce:options': {
      build: 'modulo-29-ios',
      name: 'Fluxo de checkout - Loja EBAC',
      deviceOrientation: 'PORTRAIT',
      appiumVersion: '2.0.0'
    }
  }],

  logLevel: 'info',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  }
};
