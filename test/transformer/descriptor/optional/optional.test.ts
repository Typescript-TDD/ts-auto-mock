import { createMock } from 'ts-auto-mock';

describe('optional', () => {
  class MyClass {
    public test?: string;
  }

  it('should not set the value', () => {
    const properties: MyClass = createMock<MyClass>();
    expect(properties.test).toBeUndefined();
  });
});
