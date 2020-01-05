const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.config.js');
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
        new Dotenv({
            path: './.env.development'
        })
    ]
});
