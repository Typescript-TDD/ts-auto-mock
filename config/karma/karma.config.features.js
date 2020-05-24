const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/features/context.ts');

    config.set(karmaConfig);
};
