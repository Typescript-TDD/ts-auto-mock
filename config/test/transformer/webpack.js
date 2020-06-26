const transformer = require('../../../dist/transformer');
const merge = require('webpack-merge');
const base = require('../webpack.base.js');
const DetermineCacheBetweenTestsFromDebugEnvironment = require('./../../utils/cache');
const DetermineFeaturesFromEnvironment = require('./../../utils/features');

module.exports = function () {
    return merge.smart(base(), {
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
    });
};
