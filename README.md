# Ts Auto Mock
[![CircleCI](https://circleci.com/gh/uittorio/ts-auto-mock/tree/master.svg?style=svg)](https://circleci.com/gh/uittorio/ts-auto-mock/tree/master) 
[![Greenkeeper badge](https://badges.greenkeeper.io/uittorio/ts-auto-mock.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ts-auto-mock.svg)](https://badge.fury.io/js/ts-auto-mock)
[![Downloads](https://img.shields.io/npm/dt/ts-auto-mock.svg)](https://www.npmjs.com/package/ts-auto-mock)


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

## Extension
The library allows you to extends some functionality to work nicely with framework like jasmine or jest
[Open this link to see more examples](docs/EXTENSION.md)

## Options 
```ts
tsAutoMockTransformer(program: ts.Program, options: TsAutoMockOptions)

interface TsAutoMockOptions {
    debug: boolean | 'file' | 'console'
}
```
options:

| Name          | Default                     |  Description    |
| ------------- | --------------------------- | --------------- |
| `debug`       | `false`                     | When set to `true` or `console` it will log to the console
|               |                             | When set to `file` it will log to a file (tsAutoMock.log)

## [Changelog](CHANGELOG.md)

## Authors

* [**Vittorio Guerriero**](https://github.com/uittorio)
* [**Giulio Caprino**](https://github.com/pmyl)

## License

This project is licensed under the MIT License


// TODO before this branch is ready 
    // a generic that extends another class
    // clean the code
    // test the mongoose library missing features
