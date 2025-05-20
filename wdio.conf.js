exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.test.js'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3001',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: async function () {
        await browser.setWindowSize(1920, 1080);
    }
}; 