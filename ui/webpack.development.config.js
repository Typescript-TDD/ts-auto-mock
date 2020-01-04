const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.config.js');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = webpackMerge(commonConfig(), {
    mode: "development",
    output: {
        filename: '[name].[hash].js',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new WebpackCopyPlugin([
            {
                from: '../performance/data',
                to: 'resources/performance'
            }
        ]),
        new Dotenv({
            path: './.env.development'
        })
    ]
});
