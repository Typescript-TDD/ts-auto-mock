const karmaBaseConfig = require('./base/karma.config.transformer.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/playground/**/*.test.ts');

    config.set(karmaConfig);
};
