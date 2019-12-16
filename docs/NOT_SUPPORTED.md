# Not supported types 

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
