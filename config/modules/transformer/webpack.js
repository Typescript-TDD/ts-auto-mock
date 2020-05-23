/*globals module, require */
const webpackNodeExternals = require("webpack-node-externals");
const path = require("path");
const merge = require("webpack-merge");
const base = require("../base/webpack.base");
const DetermineDevToolFromEnvironmentDebugMode = require("../../utils/devtool");

module.exports = merge(base({
    tsConfigFile: 'config/modules/transformer/tsconfig.json'
}), {
    devtool: DetermineDevToolFromEnvironmentDebugMode(),
    target: "node",
    node: {
        __dirname: false
    },
    externals: [
        webpackNodeExternals()
    ],
    entry: {
        index: './src/transformer/index.ts',
    },
    output: {
        path: path.resolve(__dirname, "../../../dist/transformer"),
    }
});
