/*globals module, require */
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    mode: "production",
    resolve: {
        extensions: ['.ts', '.js']
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
        index: ['./index.ts'],
    },
    output: {
        filename: "[name].js"
    }
};
