import {createMock, method, On} from "ts-auto-mock";

describe('when creating a mock', () => {
    it('should compile when accessing to extended typings', () => {
        interface A<T> {
            a: T;
            b: () => {}
        }

        interface Interface {
            methodExpectJasmineExtension(): string;
            arrayExpectGenerateMethod: Array<number>;
            methodReturnMockedType(): A<() => {}>;
        }

        const mock: Interface = createMock<Interface>();
        const spy = On(mock).get(method(x => x.methodExpectJasmineExtension));
        spy.and.returnValue("");
        //mock.arrayExpectGenerateMethod.generateList(3); //TODO Implements functionality
        //mock.methodReturnMockedType().a.and.returnValue(2);
    });
});