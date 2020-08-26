const transformer = require('../../../dist/transformer');
const DetermineCacheBetweenTestsFromDebugEnvironment = require('./../../utils/cache');
const DetermineFeaturesFromEnvironment = require('./../../utils/features');
const { merge } = require('webpack-merge');
const base = require('../webpack.base');

module.exports = function() {
  return merge(base(), {
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          options: {
            getCustomTransformers: (program) => ({
              before: [transformer.default(program, {
                debug: false,
                cacheBetweenTests: DetermineCacheBetweenTestsFromDebugEnvironment(),
                features: DetermineFeaturesFromEnvironment(),
              })]
            })
          }
        }
      ]
    }
  })
}
