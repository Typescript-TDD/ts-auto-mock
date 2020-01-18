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
});
