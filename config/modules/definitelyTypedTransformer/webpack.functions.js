const path = require("path");
const { merge } = require("webpack-merge");
const base = require("../base/webpack.base");
const DetermineDevToolFromEnvironmentDebugMode = require("../../utils/devtool");

module.exports = merge(base({
    tsConfigFile: 'config/modules/definitelyTypedTransformer/tsconfig.json'
}), {
    devtool: DetermineDevToolFromEnvironmentDebugMode(),
    entry: {
        index: './definitelyTypedTests/src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, "../../../definitelyTypedTests/dist")
    }
});
