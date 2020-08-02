import { createMock } from 'ts-auto-mock';

describe('for dictionary', () => {
  interface Test {
    hello: string;
  }
  interface Dictionary<T> {
    [key: string]: T;
  }

  it('should set an empty object', () => {
    const properties: Dictionary<Test> = createMock<Dictionary<Test>>();
    expect(properties).toEqual({});
  });

  describe('in a deep interface', () => {
    interface InterfaceWithDictionary<T> {
      a: string;
      dictionary: Dictionary<T>;
    }

    it('should set an empty object', () => {
      const properties: InterfaceWithDictionary<Test> = createMock<
        InterfaceWithDictionary<Test>
      >();
      expect(properties.a).toBe('');
      expect(properties.dictionary).toEqual({});
    });
  });
});
