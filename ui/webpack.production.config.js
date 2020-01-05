const webpackMerge = require('webpack-merge'),
  commonConfig = require('./webpack.config.js');
const Dotenv = require('dotenv-webpack');

module.exports = webpackMerge(commonConfig(), {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new Dotenv()
    ]
});
