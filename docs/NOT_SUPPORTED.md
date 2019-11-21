# Not supported types 

## IndexedAccessType

[bug](https://github.com/uittorio/ts-auto-mock/issues/3)
```ts
class Class {
 a: string
}

type KeyOf = {[key in keyof Class]: Class[key]};
const mock = createMock<KeyOf>();
mock.a will be null
```

## ConditionalType

```ts
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

interface Test {
  conditional: TypeName<string>;
}

const mock = createMock<Test>();

mock.conditional // should be string. It will be null
```

## ConstructorType

This scenario needs to be investigated

```ts
interface Test {
    toConstructor(): new (): Test
}
const mock = createMock<Test>();
mock.toConstructor() // will be null
```

## TypeQuery
[bug](https://github.com/uittorio/ts-auto-mock/issues/91)

This scenario needs to be investigated
```ts
enum AnEnum {
    a,
    b,
}
interface Test {
    type: typeof AnEnum
}

const mock = createMock<Test>();
mock.type // will be null
```


