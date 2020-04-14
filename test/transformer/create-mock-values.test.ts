import { createMock } from 'ts-auto-mock';

describe('create-mock-values', () => {
  interface SubInterface {
    property: number;
  }

  interface Interface {
    property: string | null;
    method: (() => void) | null;
    subInterface: SubInterface | null;
  }

  it('should create the mock merging the values provided', () => {
    const properties: Interface = createMock<Interface>({
      property: 'sss',
    });

    expect(properties.property).toBe('sss');
    if (typeof properties.method === 'function') {
      properties.method();
    }
  });

  it('should create the mock merging the null values provided', () => {
    const properties: Interface = createMock<Interface>({
      property: null,
      method: null,
      subInterface: null,
    });

    expect(properties.property).toBeNull();
    expect(properties.method).toBeNull();
    expect(properties.subInterface).toBeNull();
  });
});
