const webpackConfig = require('../../test/transformer/webpack.js');
const karmaBase = require('./karma.config.base');

module.exports = function(config, url) {
    return karmaBase(config, url, webpackConfig);
};
