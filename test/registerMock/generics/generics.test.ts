import { createMock, registerMock } from 'ts-auto-mock';

describe('registerMock of type with generics', () => {
  it('should provide mocked version of generics as parameters', () => {
    type GenericsType<T> = {
      internalProp: T;
    };

    type GenericsInterface<T, K> = {
      internalProp: T;
      internalProp2: K;
    };

    type GenericsInterface2<T, K> = {
      internalProp: T;
      internalProp2: K;
    };

    interface AParentInterface {
      prop: GenericsType<string>;
      prop2: GenericsInterface<number, 'Test'>;
      prop3: GenericsInterface2<string, GenericsType<string>>;
    }

    registerMock<GenericsType<unknown>>((generic: unknown) => ({
      internalProp: (generic as object).toString() + '-mocked',
    }));

    registerMock<GenericsInterface<unknown, unknown>>(
      (genericNumber: unknown, genericString: unknown) => ({
        internalProp: (genericNumber as number) + 5,
        internalProp2: (genericString as object).toString() + '-mocked',
      })
    );

    registerMock<GenericsInterface2<unknown, unknown>>(
      (genericString: unknown, genericObject: unknown) => {
        (genericObject as GenericsType<string>).internalProp += '-mocked';
        return {
          internalProp: (genericString as object).toString() + '-mocked',
          internalProp2: genericObject,
        };
      }
    );
    const mock: AParentInterface = createMock<AParentInterface>();

    expect(mock.prop.internalProp).toBe('-mocked');
    expect(mock.prop2.internalProp).toBe(5);
    expect(mock.prop2.internalProp2).toBe('Test-mocked');
    expect(mock.prop3.internalProp).toBe('-mocked');
    expect(mock.prop3.internalProp2).toEqual({
      internalProp: '-mocked-mocked',
    });
  });
});
