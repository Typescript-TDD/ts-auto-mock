import { createMock } from 'ts-auto-mock';
import { ImportType } from '../utils/types/type';

describe('union undefined', () => {
  describe('type reference', () => {
    type Type = void;

    class MyClass {
      public test: string | Type;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type import', () => {
    class MyClass {
      public test: string | ImportType;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type object declared', () => {
    class MyClass {
      public test: string | { a: string } | undefined;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type declared value', () => {
    class MyClass {
      public test: '2' | undefined;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type reference optional', () => {
    type TypeOptional = string | void;

    class MyClass {
      public test: TypeOptional | number;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type reference void as second type', () => {
    type TypeOptional = string | void;

    class MyClass {
      public test: number | TypeOptional;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });

  describe('type reference void and extends', () => {
    type TypeOptional = ({ a: string } & { b: number }) | void;

    class MyClass {
      public test: number | TypeOptional;
    }

    it('should set undefined', () => {
      const properties: MyClass = createMock<MyClass>();
      expect(properties.test).toBeUndefined();
    });
  });
});
