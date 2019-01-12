/*globals module, require */
const transformers = require('../src/transformer/transformer');
const path = require('path');

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            ['ts-auto-mock']: path.join(__dirname, '../index')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: './tsconfig.json',
                    getCustomTransformers: program => ({
                        before: [
                            transformers.transformer(program)
                        ]
                    })
                }
            }
        ]
    },
    entry: {
        app: ['./test/transformer/descriptor/classes.test.ts', './src/transformer/repository/repository.ts', './src/transformer/repository/index.ts']
    },
    output: {
        filename: "test.js",
        libraryTarget: "umd"
    },
    plugins: []
};
