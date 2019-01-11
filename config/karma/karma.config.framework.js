const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, "../../test/framework/context.ts");

    config.set(karmaConfig);
};