import { createMock } from 'ts-auto-mock';

describe('Test included in filter', () => {
  interface Test {
    a: string;
  }

  it('should not throw on createMock', () => {
    expect(() => createMock<Test>()).not.toThrow();
  });

  it('should create a mock', () => {
    expect(createMock<Test>().a).toBe('');
  });
});
