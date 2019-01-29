# Ts Auto Mock

A Typescript transformer that will allow you to create mock for any types (Interfaces, Classes, ...) without need to create manual fakes/mocks.

Let's have a look.

* If you are interested to use it with jasmine please go to jasmine-ts-auto-mock
* If you are interested to use it with jest please go to jest-ts-auto-mock

## Requirements
`
typescript@^3.2.2
`

## Installation
A Transormer needs to be provided at compile time. There are different ways to do it.
[Please read the following guide to find your configuration](docs/TRANSFORMER.md)`

## Usage
```ts
import { Mock, createMock } from 'ts-auto-mock';

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

## Type Examples
The library try to convert the type given to createMock so you dont need to create concrete mock manually.
[Open this link to see more examples](docs/DETAILS.md)

## Authors

* **Vittorio Guerriero**
* **Giulio Caprino** 

## License

This project is licensed under the MIT License
