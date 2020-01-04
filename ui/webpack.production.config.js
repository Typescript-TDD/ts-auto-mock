const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.config.js');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = webpackMerge(commonConfig(), {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv()
    ]
});
