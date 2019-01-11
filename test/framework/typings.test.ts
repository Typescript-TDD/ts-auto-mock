import { createMock } from "ts-auto-mock";
import { Mock } from "ts-auto-mock";

describe('when creating a mock', () => {
    it('should compile when accessing to extended typings', () => {
        interface Interface {
            methodExpectJasmineExtension(): string;
            arrayExpectGenerateMethod: Array<number>;
            methodReturnMockedType(): Array<string>;
        }

        const mock: Mock<Interface> = createMock<Interface>();
        mock.methodExpectJasmineExtension.and.returnValue('');
        //mock.arrayExpectGenerateMethod.generateList(3); //TODO Implements functionality
        //mock.methodReturnMockedType().generateList(2);
    });
});