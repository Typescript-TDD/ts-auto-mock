import { createMock } from 'ts-auto-mock';
import { ImportInterface } from '../utils/interfaces/importInterface';
import { ImportType } from '../utils/types/type';

describe('union optional', () => {
  describe('type reference', () => {
    type Type = null;
    class MyClass {
      public test: string | Type;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type import', () => {
    class MyClass {
      public test: string | ImportType;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type interface import', () => {
    class MyClass {
      public test: string | ImportInterface;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBe('');
    });
  });

  describe('type object declared', () => {
    class MyClass {
      public test: string | { a: string } | null;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type declared value', () => {
    class MyClass {
      public test: '2' | null;
    }

    it('should not set the value', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type reference optional', () => {
        type TypeOptional = string | null;

        class MyClass {
          public test: TypeOptional | number;
        }

        it('should not set the value', () => {
          const properties: MyClass = createMock<MyClass>();
          expect(properties.test).toBeUndefined();
        });
  });

  describe('type reference optional second', () => {
        type TypeOptional = string | null;

        class MyClass {
          public test: number | TypeOptional;
        }

        it('should not set the value', () => {
          const properties: MyClass = createMock<MyClass>();
          expect(properties.test).toBeUndefined();
        });
  });

  describe('type reference optional and extends', () => {
        type TypeOptional = { a: string} & { b: number} | null;

        class MyClass {
          public test: number | TypeOptional;
        }

        it('should not set the value', () => {
          const properties: MyClass = createMock<MyClass>();
          expect(properties.test).toBeUndefined();
        });
  });
});
