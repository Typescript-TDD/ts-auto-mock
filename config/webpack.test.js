const tsAutoMock = require('../dist/src/transformer/transformer');
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
                    getCustomTransformers: program => ({
                        before: [
                            tsAutoMock.transformer(program)
                        ]
                    })
                }
            }
        ]
    }
};