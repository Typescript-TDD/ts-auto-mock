---
name: Config
route: /config
---

# Config
```ts
interface TsAutoMockOptions {
    debug: boolean | 'file' | 'console';
    cacheBetweenTests: boolean;
    features: TsAutoMockFeaturesOption[];
}

export type TsAutoMockFeaturesOption = 'random';

```
options:

| Name                | Value                | Description                                  | Default |
|---------------------|----------------------|----------------------------------------------|---------|
| `debug`             | `false`              | it will NOT log to the console               | false   |
|                     | `true`               | it will log to the console                   |         |
|                     | `file`               | it will log to a file (tsAutoMock.log)       |         |
|                     | `console`            | alias for `true`                             |         |
| `cacheBetweenTests` | `true`               | it will reuse mocks between different tests  | true    |
|                     | `false`              | it create new mocks for each different tests |         |
| `features`          | `feature[]`          | it will enable a specific feature            | []      |
| `files`             | `string or string[]` | it will include only the files matched       | "**/*"  | 

---

There are different ways to pass options to a transformer, every installation type has its own way, to know how to do it
find your configuration in the [Installation page](./installation).

## Debug
We currently support:
- Logs for [not supported types](./types-not-supported)

It will log any not supported type automatically converted to null.
This is useful to report an issue or to investigate a potential bug.

---

## CacheBetweenTests
One of the main functionality of ts auto mock is to generate mocks and cache them.

Mocks are currently created in the test file making tests to depend to each other.

Example:
- test1.test.ts has a createMock of Interface.
- test2.test.ts has a createMock of Interface.
- test1.test.ts will have the registration of Interface mock
- test2.test.ts will have a registration import.

If test2 run in a different context than test1 it will not be able to access to the same mock.

Set this property to false when your test run in different context.

We are working on an [issue](https://github.com/Typescript-TDD/ts-auto-mock/issues/101) to make sure tests do not depend to each other but they will still take advance of a cache system

---
## Features
We currently support the following features
### Random ('random')

When adding random to the feature list any string, boolean and number will be transformed to a random values

#### String
Example
```ts
interface WithString {
    prop: string;
}

createMock<WithString>() // { prop: 'propQsdeos'}
```

The name of the property will be prepended following 6 random character

### Number
Example
```ts
interface WithNumber {
    prop: number;
}

createMock<WithNumber>() // { prop: 5000.213123}
```

A random number will be generated between -10000 and 10000


### Boolean
Example
```ts
interface WithBoolean {
    prop: boolean;
}

createMock<WithBoolean>() // { prop: true|false}
```

true|false will be random

---

## Files
To reduce the compilation time you can tell to the transformer the files that contain `createMock`, `createMockValue` and `registerMock`,
all the other files are going to be ignored by the transformer.

The value of this configuration is a `glob` or array of `glob`, the same type of matcher present in `tsconfig` when
defining `include`, `exclude` and `files` properties.

Examples of usage:

```
files: "**/*.spec.ts"                       

| Structure                                    | Included?
| -------------------------------------------- | ---------
| root                                         |
| └── Projects                                 |
|     └── SuperProject                         |
|         ├── tests                            |
|         │   └── feature1                     |
|         │       ├── supporting.mock.ts       | No
|         │       ├── supportingInterface.ts   | No
|         │       ├── feature1.spec.ts         | Yes
|         │       └── feature1.spec.ts         | Yes
|         └── src                              |
|             └── feature1                     |
|                 ├── myClass.model.ts         | No
|                 ├── myClass.api.mock.ts      | No
|                 ├── model.interface.ts       | No
|                 └── feature1.component.ts    | No
```

```
files: ["**/tests/**/*.spec.ts", "**/tests/**/*.mock.ts"]

| Structure                                    | Included?
| -------------------------------------------- | ---------
| root                                         |
| └── Projects                                 |
|     └── SuperProject                         |
|         ├── tests                            |
|         │   └── feature1                     |
|         │       ├── supporting.mock.ts       | Yes
|         │       ├── supportingInterface.ts   | No
|         │       ├── feature1.spec.ts         | Yes
|         │       └── feature1.spec.ts         | Yes
|         └── src                              |
|             └── feature1                     |
|                 ├── myClass.model.ts         | No
|                 ├── myClass.api.mock.ts      | No
|                 ├── model.interface.ts       | No
|                 └── feature1.component.ts    | No
```
