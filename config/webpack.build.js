/*globals module, require */
const path = require('path');

module.exports = {
    mode: "production",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loaders: [
                    'tslint-loader'
                ]
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    entry: {
        index: ['./index.ts'],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, ".."),
        filename: "[name].js"
    }
};
