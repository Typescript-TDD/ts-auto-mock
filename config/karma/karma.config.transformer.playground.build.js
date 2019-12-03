const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
    const karmaConfig = karmaBaseConfig(config, '../../test/playground/**/*.test.js');

    config.set(karmaConfig);
};
