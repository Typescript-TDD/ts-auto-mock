import { createMock } from 'ts-auto-mock';

describe('Test not included in filter', () => {
  interface Test {
    a: string;
  }

  it('should throw on createMock', () => {
    expect(() => createMock<Test>()).toThrow();
  });
});
