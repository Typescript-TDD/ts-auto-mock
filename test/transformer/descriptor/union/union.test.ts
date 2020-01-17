import { createMock } from 'ts-auto-mock';

describe('for union', () => {
  interface Interface {
    a: string | number;
  }

  it('should set the first type', () => {
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe('');
  });

  describe('union optional', () => {
    class MyClass {
      public test: string | void;
      public test2: string | null;
      public test3: string | unknown;
      public test4: string | undefined;
      public test5: undefined | string | number;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
      expect(properties.test2).toBeUndefined();
      expect(properties.test3).toBeUndefined();
      expect(properties.test4).toBeUndefined();
      expect(properties.test5).toBeUndefined();
    });
  });

  describe('union literal type string', () => {
    it('should assign the first value', () => {
      interface Type {
        test: '1' | '2';
      }
      const properties: Type = createMock<Type>();
      expect(properties.test).toBe('1');
    });
  });

  describe('union literal type boolean', () => {
    it('should assign the first value', () => {
      interface Type {
        test: false | true;
      }
      const properties: Type = createMock<Type>();
      expect(properties.test).toBe(false);
    });
  });

  describe('union literal type numbers', () => {
    it('should assign the first value', () => {
      interface Type {
        test: 2 | 1;
      }
      const properties: Type = createMock<Type>();
      expect(properties.test).toBe(2);
    });
  });

  describe('union literal type typescript lib', () => {
    it('should assign the first value', () => {
      interface Type {
        test: Array<number> | Array<string>;
      }
      const properties: Type = createMock<Type>();

      expect(properties.test).toEqual([]);
    });
  });
});
