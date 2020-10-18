import { createMock } from 'ts-auto-mock';

describe('array property with readonly', () => {
  interface ReadonlyArray {
    test: readonly number[];
  }

  it('should create an empty array', () => {
    const mock: ReadonlyArray = createMock<ReadonlyArray>();

    expect(mock.test).toEqual([]);
  });
});

describe('tuple property with readonly', () => {
  interface ReadonlyTuple {
    test: readonly [number, string];
  }

  it('should create a tuple', () => {
    const mock: ReadonlyTuple = createMock<ReadonlyTuple>();

    expect(Array.isArray(mock.test)).toBeTrue();
  });
});
