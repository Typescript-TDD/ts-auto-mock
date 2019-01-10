const transformers = require('../src/transformer/transformer');
const path = require('path');

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            ['ts-auto-mock']: path.join(__dirname, '../src/publicApi')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    getCustomTransformers: program => ({
                        before: [
                            transformers.transformer(program)
                        ]
                    })
                }
            }
        ]
    }
};