const karmaBaseConfig = require('./base/karma.config.noTransformer.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, "../../test/noTransformer/**/*.test.ts");

    config.set(karmaConfig);
};
