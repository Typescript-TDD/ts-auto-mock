const transformer = require('../../dist/transformer');
const path = require('path');

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            ['ts-auto-mock']: path.join(__dirname, '../../dist'),
            ['ts-auto-mock/repository']: path.join(__dirname, '../../dist/repository'),
            ['ts-auto-mock/extension']: path.join(__dirname, '../../dist/extension'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: "test/tsconfig.json",
                    getCustomTransformers: (program) => ({
                        before: [ transformer.default(program) ]
                    })
                }
            }
        ]
    }
};
