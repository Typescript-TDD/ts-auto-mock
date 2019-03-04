import { createMock, mockedMethod, On } from "ts-auto-mock";
import { Mock } from "ts-auto-mock";

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

        const mock: Mock<Interface> = createMock<Interface>();
        const spy = On.Mock(mock).get(mockedMethod(x => x.methodExpectJasmineExtension));
        spy.and.returnValue("");
        //mock.arrayExpectGenerateMethod.generateList(3); //TODO Implements functionality
        // mock.methodReturnMockedType().a.and.returnValue(2);
    });
});