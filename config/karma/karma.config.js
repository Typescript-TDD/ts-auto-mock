const webpackConfig = require('./../webpack.test.js');

module.exports = function(config) {
    const _config = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {
                pattern: '**/*.test.ts',
                watched: false
            }
        ],
        preprocessors: {
            '**/*.test.ts': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true
    };

    config.set(_config);
};