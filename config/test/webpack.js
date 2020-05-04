const transformer = require('../../dist/transformer');
const path = require('path');

module.exports = function ({ typescriptConfig, debug, disableCache }) {
  const defaultOptions = {
    debug: false,
    cacheBetweenTests: true,
  };

  const {
    compilerOptions: {
      plugins = [],
    }
  } = typescriptConfig || { compilerOptions: {} };
  const [{ transform, ...transformOptions } = defaultOptions] = plugins;

  return {
    mode: "development",
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        ['ts-auto-mock']: path.join(__dirname, '../../dist'),
        ['ts-auto-mock/repository']: path.join(__dirname, '../../dist/repository'),
        ['ts-auto-mock/extension']: path.join(__dirname, '../../dist/extension'),
      }
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
          loader: 'awesome-typescript-loader',
          options: {
            getCustomTransformers: (program) => ({
              before: [transformer.default(program, {
                ...transformOptions,
                debug: debug || transformOptions.debug,
                cacheBetweenTests: disableCache ? disableCache !== 'true' : transformOptions.cacheBetweenTests,
              })],
            })
          }
        }
      ]
    }
  };
};
