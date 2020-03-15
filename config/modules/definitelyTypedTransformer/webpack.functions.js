const path = require("path");
const merge = require("webpack-merge");
const base = require("../base/webpack.base");

module.exports = merge(base({
    tsConfigFile: 'config/modules/definitelyTypedTransformer/tsconfig.json'
}), {
    entry: {
        index: './definitelyTypedTests/src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, "../../../definitelyTypedTests/dist")
    }
});