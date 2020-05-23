/*globals module, require */
const path = require("path");
const merge = require("webpack-merge");
const base = require("./base/webpack.base");
const DetermineDevToolFromDebugEnvironment = require("../utils/devtool");

module.exports = merge(base({
    tsConfigFile: 'config/modules/tsconfig.json'
}), {
    devTool: DetermineDevToolFromDebugEnvironment(),
    entry: {
        index: './src/index.ts',
        'extension/index': './src/extension/index.ts',
        'merge/index': './src/merge/index.ts',
        'repository/index': './src/repository/index.ts'
    },
    output: {
        path: path.resolve(__dirname, "../../dist")
    }
});
