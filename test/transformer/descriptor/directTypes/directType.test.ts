import { createMock } from 'ts-auto-mock';

describe('for direct assignment', () => {
  it('should work for function', () => {
    const properties: () => string = createMock<() => string>();
    expect(properties()).toBe('');
  });

  it('should work for objects', () => {
    const properties: {a: string} = createMock<{
      a: string;
    }>();
    expect(properties.a).toBe('');
  });
});
