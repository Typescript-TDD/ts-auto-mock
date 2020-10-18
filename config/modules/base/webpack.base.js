const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DetermineDevToolFromEnvironmentDebugMode = require("../../utils/devtool");

module.exports = (options) => {
  const tsConfigFile = options.tsConfigFile;

  return {
    mode: "production",
    node: {
      __dirname: false
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'eslint-loader'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            configFile: tsConfigFile,
            onlyCompileBundledFiles: true
          }
        }
      ]
    },
    devtool: DetermineDevToolFromEnvironmentDebugMode(),
    output: {
      libraryTarget: "commonjs2",
      filename: "[name].js"
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
};
