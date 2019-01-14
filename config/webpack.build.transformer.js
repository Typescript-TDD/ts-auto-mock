/*globals module, require */
const webpackNodeExternals = require("webpack-node-externals");
const path = require('path');

module.exports = {
    mode: "production",
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: "node",
    node: {
        __dirname: false
    },
    externals: [
        webpackNodeExternals()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    entry: {
        index: ['./src/transformer/transformer.ts'],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.resolve("../"),
        filename: "transformer.js"
    }
};
