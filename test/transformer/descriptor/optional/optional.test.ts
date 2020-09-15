import { createMock } from 'ts-auto-mock';

describe('optional', () => {
  class MyClass {
    public testOptional?: string;
    public testUndefined: undefined;
  }

  it('should not set the value of the optional property', () => {
    const properties: MyClass = createMock<MyClass>();
    expect(properties.hasOwnProperty('testOptional')).toBe(false);
    expect(properties.hasOwnProperty('testUndefined')).toBe(true);
  });
});
