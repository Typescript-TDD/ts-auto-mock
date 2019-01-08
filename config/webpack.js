/*globals module, require */
const transformers = require('../src/transformer/transformer');

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js']
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
    },
    entry: {
        app: ['./test/tranformer/descriptor/descriptorClasses.test.ts']
    },
    output: {
        filename: "test.js",
        libraryTarget: "umd"
    },
    plugins: []
};
