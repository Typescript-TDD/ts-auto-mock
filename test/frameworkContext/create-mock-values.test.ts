import { createMock } from 'ts-auto-mock';

describe('create-mock-values', () => {
  interface Interface {
    property: {
      a: number;
      c: () => void;
    };
    method(): void;
  }

  it('should have different mocks for each item', () => {
    const properties: Interface = createMock<Interface>({
      property: {
        a: 2,
      },
    });
    properties.method();
    properties.property.c();
    expect(properties.method).toHaveBeenCalled();
    expect(properties.property.a).toBe(2);
    expect(properties.property.c).toHaveBeenCalled();
  });

  it('should not clash with object prototype properties', () => {
    interface OverridePrototype {
      valueOf(): number;
      props: Interface;
    }

    createMock<OverridePrototype>({
      props: {
        property: {
          a: 2,
        },
      },
    });

    expect().nothing();
  });

  it('should replace values when providing undefined', () => {
    interface InterfaceWithValues {
      property: {
        a: 123;
        c: () => void;
      };
      method(): void;
    }

    const properties: InterfaceWithValues = createMock<InterfaceWithValues>({
      property: {
        a: undefined,
      },
    });

    properties.method();
    properties.property.c();
    expect(properties.method).toHaveBeenCalled();
    expect(properties.property.a).toBeUndefined();
    expect(properties.property.c).toHaveBeenCalled();
  });
});
