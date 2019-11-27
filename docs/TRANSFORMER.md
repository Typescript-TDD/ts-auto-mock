# Transformer 

## How to use the custom transformer

Unfortunately, TypeScript itself does not currently provide any easy way to use custom transformers 
(See https://github.com/Microsoft/TypeScript/issues/14419).
The followings are the example usage of the custom transformer.

### webpack (with ts-loader or awesome-typescript-loader)

```js
// webpack.config.js
const tsAutoMockTransformer = require('ts-auto-mock/transformer').default;

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader', // or 'awesome-typescript-loader'
        options: {
          getCustomTransformers: program => ({
              before: [
                  tsAutoMockTransformer(program)
              ]
          })
        }
      }
    ]
  }
};
```

### ttypescript
See [ttypescript's README](https://github.com/cevek/ttypescript/blob/master/README.md) for how to use this with module bundlers such as webpack or Rollup.

tsconfig.json
```json
{
  "compilerOptions": {
    ...,
    "plugins": [
      { "transform": "ts-auto-mock/transformer" }
    ]
  },
  ...
}
```

### ts-patch
See [ts-patch's README](https://github.com/nonara/ts-patch/blob/master/README.md) 

```js 
npm i -g ts-patch
ts-patch install
```

tsconfig.json

```json
{
  "compilerOptions": {
    ...,
    "plugins": [
      { "transform": "ts-auto-mock/transformer" }
    ]
  },
  ...
}
```
