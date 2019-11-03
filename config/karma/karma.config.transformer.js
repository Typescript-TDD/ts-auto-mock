const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/transformer/descriptor/generic/extends.test.ts');

    config.set(karmaConfig);
};
