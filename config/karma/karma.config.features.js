const karmaBaseConfig = require('./base/karma.config.transformer.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/features/context.ts');

    config.set(karmaConfig);
};
