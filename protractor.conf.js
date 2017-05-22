exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    //seleniumAddress: 'http://0.0.0.0:4444',
    specs: ['test/e2e/dist/**/*.js'],
    allScriptsTimeout: 20000,

    plugins: [{
        path: 'aurelia.protractor.js'
    }],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000,
        isVerbose: true,
        includeStackTrace: true
    }
};
