const webpackNodeExternals = require("webpack-node-externals");
const path = require("path");
const { merge } = require("webpack-merge");
const base = require("../base/webpack.base");

module.exports = merge(base({
    tsConfigFile: 'config/modules/definitelyTypedTransformer/tsconfig.json'
}), {
    target: "node",
    externals: [
        webpackNodeExternals()
    ],
    entry: {
        index: './definitelyTypedTests/src/transformer/index.ts',
    },
    output: {
        path: path.resolve(__dirname, "../../../definitelyTypedTests/dist/transformer"),
    }
});
