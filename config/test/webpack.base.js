const path = require('path');

module.exports = function () {
    return {
        mode: "development",
        node: {
            __dirname: false
        },
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
                    loader: 'eslint-loader'
                }
            ]
        }
    }
};
