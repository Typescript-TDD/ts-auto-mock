/*globals module, require */
const webpackNodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const base = require("../base/webpack.base");

module.exports = merge(base({
    module: "transformer"
}), {
    target: "node",
    node: {
        __dirname: false
    },
    externals: [
        webpackNodeExternals()
    ],
    entry: {
        index: './src/transformer/transformer.ts',
    },
    output: {
        filename: "index.js"
    }
});
