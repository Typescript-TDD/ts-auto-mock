# Ts Auto Mock
[![Actions Status](https://github.com/Typescript-TDD/ts-auto-mock/workflows/Develop/badge.svg)](https://github.com/Typescript-TDD/ts-auto-mock/actions)
[![CircleCI](https://circleci.com/gh/Typescript-TDD/ts-auto-mock.svg?style=svg)](https://circleci.com/gh/Typescript-TDD/ts-auto-mock)
[![npm version](https://badge.fury.io/js/ts-auto-mock.svg)](https://badge.fury.io/js/ts-auto-mock)
[![Downloads](https://img.shields.io/npm/dt/ts-auto-mock.svg)](https://www.npmjs.com/package/ts-auto-mock) [![Greenkeeper badge](https://badges.greenkeeper.io/Typescript-TDD/ts-auto-mock.svg)](https://greenkeeper.io/)

![slack](docs/slack_small.png) Need help? Join us on Slack [link](https://join.slack.com/t/typescripttdd/shared_invite/enQtODM3MzExODE0NTk2LTNmYzRhM2M1ZDc5ODVkMmVlZWFjMTM4ZDFhNWU2NDdiYWY1MGMxZjE2ZDE0ZDZlYjY1MTkyYjRhYTQ1NjA1MWQ)


A Typescript transformer that will allow you to create mock for any types (Interfaces, Classes, ...) without need to create manual fakes/mocks.

Let's have a look.

* If you are interested to use it with jasmine please go to [jasmine-ts-auto-mock](https://github.com/uittorio/jasmine-ts-auto-mock)
* If you are interested to use it with jest please go to [jest-ts-auto-mock](https://github.com/uittorio/jest-ts-auto-mock)

## Requirements
`
typescript@^3.2.2
`

## Installation
A Transformer needs to be provided at compile time. There are different ways to do it.
[Please read the following guide to find your configuration](docs/TRANSFORMER.md)

## Usage
#### Create mock
```ts
import { createMock } from 'ts-auto-mock';

interface Person {
  id: string;
  getName(): string;
  details: {
      phone: number
  }
}
const mock = createMock<Person>();
mock.id // ""
mock.getName() // ""
mock.details // "{phone: 0} "
```

##### Default values

You can also define default values to overrides specific fields
You dont have to provide the entire interface, just a partial of the one to mock
```ts
import { createMock } from 'ts-auto-mock';

interface Person {
  id: string;
  getName(): string;
  details: {
      phone: number
  }
}
const mock = createMock<Person>({
details: {
    phone: 07423232323
}
});
mock.id // ""
mock.getName() // ""
mock.details // "{phone: 07423232323} "
```

#### Create mock list
createMock list it will create a list of mocks automatically

```ts
import { createMockList } from 'ts-auto-mock';

interface Person {
  id: string;
}
const mockList = createMockList<Person>(2);
mockList.length // 2
```

##### Default values
You can define a function to overrides specific fields
The function will have access to the current index
```ts
import { createMockList } from 'ts-auto-mock';

interface Person {
  id: string;
}
const mockList = createMockList<Person>(2, (index: number) => {
    return {
        id: "id" + index
    }
});
mockList[0].id // id0
mockList[1].id // id1
```

## Type Examples
The library try to convert the type given to createMock so you dont need to create concrete mock manually.
[Open this link to see more examples](docs/DETAILS.md)

## Type Not Supported
The library will convert to null when the type is not supported.
[Open this link to see what is not supported](docs/NOT_SUPPORTED.md)

## Extension
The library allows you to extends some functionality to work nicely with framework like jasmine or jest
[Open this link to see more examples](docs/EXTENSION.md)

## Options 
```ts
tsAutoMockTransformer(program: ts.Program, options: TsAutoMockOptions)

interface TsAutoMockOptions {
    debug: boolean | 'file' | 'console';
    cacheBetweenTests: boolean;
}
```
options:

| Name                  | Default                     |  Description    |
| -------------         | --------------------------- | --------------- |
| `debug`               | `false`                     | When set to `true` or `console` it will log to the console
|                       |                             | When set to `file` it will log to a file (tsAutoMock.log)
| `cacheBetweenTests`   | `true`                      | When set to `true` it will reuse mocks between different tests
|                       |                             | When set to `false` it create new mocks for each different tests

#### Debug
We currently support
- Logs for [not supported types](docs/NOT_SUPPORTED.md)
It will log any not supported type automatically converted to null.
This is useful to report an issue or to investigate a potential bug

#### cacheBetweenTests
One of the main functionality of ts auto mock is to generate mocks and cache them.

Mocks are currently created in the test file making tests to depend to each other

Example:
- test1.test.ts has a createMock of Interface.
- test2.test.ts has a createMock of Interface.
- test1.test.ts will have the registration of Interface mock
- test2.test.ts will have a registration import.

If test2 run in a different context than test1 it will not be able to access to the same mock. 

Set this property to false when your test run in different context.

We are working on an [issue](https://github.com/Typescript-TDD/ts-auto-mock/issues/101) to make sure tests do not depend to each other but they will still take advance of a cache system 
 
## [Changelog](CHANGELOG.md)

## Authors

* [**Vittorio Guerriero**](https://github.com/uittorio)
* [**Giulio Caprino**](https://github.com/pmyl)

## License

This project is licensed under the MIT License
