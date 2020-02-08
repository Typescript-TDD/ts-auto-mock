const merge = require("webpack-merge");
const transformer = require("./webpack");

module.exports = merge(transformer, {
    devtool: "cheap-module-eval-source-map",
});
