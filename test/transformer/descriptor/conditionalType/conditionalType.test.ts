import { createMock } from 'ts-auto-mock';

describe('conditional typing', () => {
  it('should branch properly based on passed generic parameter', () => {

    type TypeName<T> =
      T extends string ? 'string' :
        T extends number ? 'number' :
          T extends boolean ? 'boolean' :
            T extends undefined ? 'undefined' :
              T extends Function ? 'function' :
                T extends () => number ? 'function' :
                  T extends (a: number) => number ? 'function' :
                    'object';

    interface Test {
      a: TypeName<string>;
      b: TypeName<number>;
      c: TypeName<boolean>;
      d: TypeName<undefined>;
      e: TypeName<Function>;
      f: TypeName<() => number>;
      g: TypeName<(a: number) => number>;
      // TODO: This one (unknown) is not possible for now. It's mocked as
      // undefined and will result in the same outcome as `d`.
      // h: TypeName<unknown>;
      i: TypeName<[]>;
    }

    const mock: Test = createMock<Test>();
    expect(mock.a).toBe('string');
    expect(mock.b).toBe('number');
    expect(mock.c).toBe('boolean');
    expect(mock.d).toBe('undefined');
    expect(mock.e).toBe('function');
    expect(mock.f).toBe('function');
    expect(mock.g).toBe('function');
    // expect(mock.h).toBe('object');
    expect(mock.i).toBe('object');
  });
});
