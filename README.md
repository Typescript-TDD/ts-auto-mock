# Ts Auto Mock

Typescript transformer that will allow you to create mock for any types (Interfaces, Classes, ...) without need to create manual fakes/mocks.

Let's have a look.

* If you are interested to use it with jasmine please go to jasmine-ts-auto-mock
* If you are interested to use it with jest please go to jest-ts-auto-mock

## Requirements
`
typescript@^3.2.2
`

## Installation
`* A Transormer needs to be provided at compile time to your application. There are different ways to do it.` 
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
mock.getName() // "{ name: "", surname: "" }"
mock.detail // "{phone: 0} "

```

## Explanation
The library try to convert the type  given to createMock so you dont need to create concrete mock manually.
* For primitives types:
```ts
number // 0
string // ""
boolean // false
boolean[] // []
void // undefined
null // null
undefined // undefined
```

* For interfaces and classes types:
```ts

interface Person {
    id: string
    name: string 
}
/* {
    id: "",
    name: ""
} */
```

* For methods
``` ts
interface InterfaceWithMethod {
    method(): string
} 
/* {
    method: () => {
        return ""
    }
} */
```

* For literal types
```ts
type Data = {
    id: "I am a specific string"
}

/*
{
    id: "I am a specific string"
}
/*
```

* For Enume types it will select the first value
```ts
enum Direction {
    LEFT,
    RIGHT
}

interface WithEnum {
    direction: Direction
}

/*
{
    direction: DIRECTION.LEFT
}
/*
```

## Authors

* **Vittorio Guerriero**
* **Giulio Caprino** 

## License

This project is licensed under the MIT License
