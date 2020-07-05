const karmaBaseConfig = require('./base/karma.config.transformer.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/registerMock/context.ts');

    config.set(karmaConfig);
};
