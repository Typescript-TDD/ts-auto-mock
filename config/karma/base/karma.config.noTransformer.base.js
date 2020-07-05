const webpackConfig = require('../../test/noTransformer/webpack.js');
const karmaBase = require('./karma.config.base');

module.exports = function(config, url) {
    return karmaBase(config, url, webpackConfig);
};
