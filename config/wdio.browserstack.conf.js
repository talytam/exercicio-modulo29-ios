import 'dotenv/config';

export const config = {
  runner: 'local',

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  protocol: 'https',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  path: '/wd/hub',

  specs: ['../test/specs/**/*.js'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'iOS',

    'appium:automationName': 'XCUITest',
    'appium:deviceName': 'iPhone.*',
    'appium:platformVersion': '17.*',
    'appium:app': process.env.BROWSERSTACK_APP_ID,

    'bstack:options': {
      projectName: 'EBAC - Modulo 30',
      buildName: 'M30 - GitHub Actions',
      sessionName: 'Checkout iOS',
      debug: true,
      networkLogs: true,
      video: true
    }
  }],

  logLevel: 'info',

  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 300000
  }
};