# Extension
To make sure typings are correct we use an extension strategy.
For this reason if you need your custom spies you need to use our framework to specify and identify them

### Custom Method
(this example is taken from jasmine-ts-auto-mock)

To extend a method you need to: 
1) set your spy function (jasmine.createSpy(name))

```ts
import { MockFactory } from "ts-auto-mock";

MockFactory.instance.registerFactory((name: string, value: any) => {
    return jasmine.createSpy(name).and.returnValue(value);
});
```
2) override the type of the return value 
```ts
type ReturnType = jasmine.Spy;

declare module 'ts-auto-mock' {
  interface MockMethod<TR> extends ReturnType {}
}
```
### Method Usage
1) create an interface
```ts
interface Interface {
    methodToSpy: () => string
}
```
1) create a mock
```ts
const mock: Interface = createMock<Interface>();
```
2) get the method spy 
```ts
const spy: jasmine.Spy = On.Mock(mock).get(mockedMethod(mock => mock.methodToSpy));
```
3) trigger the method
```ts
someMethodThatWillTriggerInterfaceA();
expect(spy).toHaveBeenCalled();
```
