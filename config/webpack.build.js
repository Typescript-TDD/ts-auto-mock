/*globals module, require */
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
                loader: 'ts-loader'
            }
        ]
    },
    entry: {
        app: ['./index.ts']
    },
    output: {
        filename: "index.js",
        libraryTarget: "umd"
    },
    plugins: []
};
