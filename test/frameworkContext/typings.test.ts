import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('when creating a mock', () => {
  it('should compile when accessing to extended typings', () => {
    interface A<T> {
      a: T;
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      b: () => {};
    }

    interface Interface {
      arrayExpectGenerateMethod: number[];

      methodExpectJasmineExtension(): string;

      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      methodReturnMockedType(): A<() => {}>;
    }

    const mock: Interface = createMock<Interface>();
    const spy: jasmine.Spy = On(mock).get(
      method((x: Interface) => x.methodExpectJasmineExtension),
    );
    spy.and.returnValue('');
    // mock.arrayExpectGenerateMethod.generateList(3); //TODO Implements functionality
    // mock.methodReturnMockedType().a.and.returnValue(2);
  });
});
