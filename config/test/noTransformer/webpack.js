const { merge } = require('webpack-merge');
const base = require('../webpack.base');

module.exports = function() {
  return merge(base(), {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    }
  })
}
