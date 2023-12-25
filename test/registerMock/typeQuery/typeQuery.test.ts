import { createMock, registerMock } from 'ts-auto-mock';
import { ImportNamespace } from '../../transformer/descriptor/utils/interfaces/importNameSpace';
import Interface2 = ImportNamespace.Interface2;

describe('registerMock of typeQuery', () => {
  it('should not work for enum', () => {
    enum MyEnum {
      A,
      B = 'B',
    }

    registerMock<typeof MyEnum>(() => ({
      A: 0,
      B: MyEnum.B,
      C: 'Something',
    }));

    const mock1: typeof MyEnum = createMock<typeof MyEnum>();
    const mock2: { sub: typeof MyEnum } = createMock<{
      sub: typeof MyEnum;
    }>();

    interface Interface {
      sub: typeof MyEnum;
    }
    const mock3: Interface = createMock<Interface>();

    type Literal = typeof MyEnum;
    const mock4: Literal = createMock<Literal>();

    type Intersection = typeof MyEnum & { some: number };
    const mock5: Intersection = createMock<Intersection>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock1 as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock2.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock3.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock4 as any).C).toBeUndefined();
    expect(mock5).toBeUndefined();
  });

  it('should not work for class', () => {
    class MyClass {
      public prop: string;
    }

    registerMock<typeof MyClass>(() =>
      Object.assign(
        class Some {
          public prop: string;
        },
        { C: 'something' },
      ),
    );

    const mock1: typeof MyClass = createMock<typeof MyClass>();
    const mock2: { sub: typeof MyClass } = createMock<{
      sub: typeof MyClass;
    }>();

    interface Interface {
      sub: typeof MyClass;
    }
    const mock3: Interface = createMock<Interface>();

    type Literal = typeof MyClass;
    const mock4: Literal = createMock<Literal>();

    type Intersection = typeof MyClass & { some: number };
    const mock5: Intersection = createMock<Intersection>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock1 as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock2.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock3.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock4 as any).C).toBeUndefined();
    expect(mock5).toBeUndefined();
  });

  it('should not work for variable', () => {
    const a: Interface2 = { b: 23 };

    registerMock<typeof a>(() => ({ b: 45, C: 'something' }));

    const mock1: typeof a = createMock<typeof a>();
    const mock2: { sub: typeof a } = createMock<{ sub: typeof a }>();

    interface Interface {
      sub: typeof a;
    }
    const mock3: Interface = createMock<Interface>();

    type Literal = typeof a;
    const mock4: Literal = createMock<Literal>();

    type Intersection = typeof a & { some: number };
    const mock5: Intersection = createMock<Intersection>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock1 as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock2.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock3.sub as any).C).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((mock4 as any).C).toBeUndefined();
    expect(mock5).toBeUndefined();
  });
});
