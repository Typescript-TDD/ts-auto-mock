/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* globals module, require */
const path = require('path');
const NoEmitPlugin = require('no-emit-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const DetermineDevToolFromEnvironmentDebugMode = require('../../config/utils/devtool');

module.exports = (() => ({
  mode: 'production',
  target: 'node',
  node: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __dirname: false,
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'test/build/tsconfig.test.json',
          onlyCompileBundledFiles: true,
          transpileOnly: true,
        },
      },
    ],
  },
  devtool: DetermineDevToolFromEnvironmentDebugMode(),
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [new NoEmitPlugin()],
  entry: {
    index: './src/transformer/index.ts',
  },
}))();
