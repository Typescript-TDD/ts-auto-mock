const webpackConfig = require('./../webpack.test.js');

module.exports = function(config, url) {
    return {
        basePath: '',
        frameworks: ['jasmine'],
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        files: [
            {
                pattern: url,
                watched: false
            }
        ],
        preprocessors: {
            [url]: ['webpack']
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true
    }

};