/*globals module, require */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (options) => {
    const module = options.module;
    const dist = "../../../dist/";

    let output = path.resolve(__dirname, dist + module);

    const entry = `./src/${module}/index.ts`;
    const tsConfigFile = `config/modules/${module}/tsconfig.json`;

    return {
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
                    loader: 'ts-loader',
                    options: {
                        configFile: tsConfigFile,
                        onlyCompileBundledFiles: true
                    }
                }
            ]
        },
        entry: {
            index: [entry],
        },
        output: {
            libraryTarget: "commonjs",
            filename: "[name].js",
            path: output
        },
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }
};
