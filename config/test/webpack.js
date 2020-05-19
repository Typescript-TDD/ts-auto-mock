const transformer = require('../../dist/transformer');
const path = require('path');
const webpack = require('webpack');

module.exports = function (debug, disableCache, feature = '') {
    return {
        mode: "development",
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                ['ts-auto-mock']: path.join(__dirname, '../../dist'),
                ['ts-auto-mock/repository']: path.join(__dirname, '../../dist/repository'),
                ['ts-auto-mock/extension']: path.join(__dirname, '../../dist/extension'),
            }
        },
        plugins: [
          new webpack.DefinePlugin({
            'process.env.FEATURE': `"${feature}"`,
          }),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    loader: 'eslint-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        getCustomTransformers: (program) => ({
                            before: [transformer.default(program, {
                                debug: debug ? debug : false,
                                cacheBetweenTests: disableCache !== 'true',
                                features: [feature],
                            })]
                        })
                    }
                }
            ]
        }
    }
};
