const typescriptConfig = require('../../tsconfig.playground.json');
const karmaBaseConfig = require('./karma.config.base');

module.exports = function(config) {
  const karmaConfig = karmaBaseConfig(config, '../../test/playground/**/*.test.js', typescriptConfig);

  config.set(karmaConfig);
};
