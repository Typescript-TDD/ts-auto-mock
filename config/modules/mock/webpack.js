/*globals module, require */
const path = require("path");
const merge = require("webpack-merge");
const base = require("../base/webpack.base");

module.exports = merge(base({
    module: "mock"
}), {
    output: {
        path: path.resolve(__dirname, "../../../dist")
    }
});
