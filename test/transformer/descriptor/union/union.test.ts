import { createMock } from 'ts-auto-mock';
import { ImportInterface } from '../utils/interfaces/importInterface';

describe('for union', () => {
  interface Interface {
    a: string | number;
  }

  it('should set the first type', () => {
    const properties: Interface = createMock<Interface>();
    expect(properties.a).toBe('');
  });

  describe('type interface import', () => {
    class MyClass {
      public test: string | ImportInterface;
    }

    it('should set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBe('');
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

  describe('union type null', () => {
    interface Interface {
      a: string | null;
    }

    it('should set the first type', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a).toBe('');
    });
  });

  describe('union type unknown', () => {
    interface Interface {
      a: string | unknown;
    }

    it('should set the first type', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a).toBe('');
    });
  });
});
