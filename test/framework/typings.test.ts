import { createMock } from "../../src/transformer/create-mock";
import { UittorioMock } from "../../typings/mock-definition";

describe('when creating a mock', () => {
    it('should compile when accessing to extended typings', () => {
        interface Interface {
            methodExpectJasmineExtension(): string;
            arrayExpectGenerateMethod: Array<number>;
            methodReturnMockedType(): Array<string>;
        }

        const mock: UittorioMock<Interface> = createMock<Interface>();
        mock.methodExpectJasmineExtension.and.returnValue('');
        //mock.arrayExpectGenerateMethod.generateList(3); //TODO Implements functionality
        //mock.methodReturnMockedType().generateList(2);
    });
});