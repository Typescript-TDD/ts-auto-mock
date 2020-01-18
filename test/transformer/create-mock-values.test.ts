import { createMock } from 'ts-auto-mock';

describe('create-mock-values', () => {
  interface Interface {
    property: string;
    method(): void;
  }

  it('should create the mock merging the values provided', () => {
    const properties: Interface = createMock<Interface>({
      property: 'sss',
    });

    expect(properties.property).toBe('sss');
    properties.method();
  });
});
