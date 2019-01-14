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
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    entry: {
        index: ['./index.ts'],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "../"),
        filename: "[name].js"
    }
};
