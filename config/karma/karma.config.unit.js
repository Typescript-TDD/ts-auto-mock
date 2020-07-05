const karmaBaseConfig = require('./base/karma.config.transformer.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/unit/**/*.test.ts');

    config.set(karmaConfig);
};
