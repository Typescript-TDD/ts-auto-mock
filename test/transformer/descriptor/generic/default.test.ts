import { createMock } from 'ts-auto-mock';

describe('generic default', () => {
  it('should assign the default value when not provided', () => {
    interface B<P> {
      prop: P;
    }

    interface A<P = { a: string }> extends B<P> {
    }

    const mock: A = createMock<A>();

    expect(mock.prop.a).toEqual('');
  });

  it('should assign the default value of the second argument when not provided', () => {
    interface B<P, S> {
      prop: P;
      prop2: S;
    }

    interface A<P = { a: string }, S = number> extends B<P, S> {
    }

    const mock: A<{ a: number }> = createMock<A<{ a: number }>>();

    expect(mock.prop.a).toEqual(0);
    expect(mock.prop2).toEqual(0);
  });

  it('should assign the default value for extension with default value', () => {
    interface C<T> {
      cProp: T;
    }

    interface B<P = { a: string }> extends C<P> {
      bProp: P;
    }

    interface A extends B {
    }

    const mock: A = createMock<A>();

    expect(mock.cProp.a).toEqual('');
    expect(mock.bProp.a).toEqual('');
  });
});
