import { createMock } from 'ts-auto-mock';

describe('intersection', () => {
  describe('one generics', () => {
    interface Interface<T> {
      a: Interface<T> & { s: T };
    }

    it('should assign the correct values', () => {
      const properties: Interface<string> = createMock<Interface<string>>();
      expect(properties.a.s).toBe('');
    });
  });

  describe('generics to different interfaces', () => {
    interface Test<T> {
      test: T;
    }

    interface Interface<T> {
      a: Interface<T> & Test<T>;
    }

    it('should assign the correct values', () => {
      const properties: Interface<string> = createMock<Interface<string>>();
      expect(properties.a.test).toBe('');
    });
  });

  describe('generics to different interfaces reused by other mocks', () => {
    interface Test<T> {
      test: T;
    }

    interface Interface<T> {
      a: Interface<T> & Test<T>;
    }

    it('should assign the correct values', () => {
      createMock<Test<boolean>>();
      const properties: Interface<string> = createMock<Interface<string>>();
      expect(properties.a.test).toBe('');
    });
  });

  describe('different generics to different interfaces', () => {
    interface Test<T> {
      test: T;
    }

    interface Interface<T, T2> {
      a: Interface<T, T2> & Test<T2>;
      c: T;
    }

    it('should assign the correct values', () => {
      const properties: Interface<string, number> =
        createMock<Interface<string, number>>();
      expect(properties.a.test).toBe(0);
      expect(properties.a.c).toBe('');
    });
  });

  describe('different generics to different interfaces with extends', () => {
    interface ToExtend<T> {
      property: T;
    }
    interface Test<T> extends ToExtend<T> {
      test: T;
    }

    interface Interface<T, T2> {
      a: Interface<T, T2> & Test<T2>;
      c: T;
    }

    it('should assign the correct values', () => {
      const properties: Interface<string, number> =
        createMock<Interface<string, number>>();
      expect(properties.a.property).toBe(0);
      expect(properties.a.c).toBe('');
    });
  });

  describe('interface generics', () => {
    interface ToExtend<T> {
      property: T;
    }
    interface Test<T> extends ToExtend<T> {
      test: T;
    }

    interface Interface<T, T2> {
      a: Interface<T, T2> & Test<T2>;
      c: T;
    }

    it('should assign the correct values', () => {
      const properties: Interface<ToExtend<string>, number> = createMock<
        Interface<ToExtend<string>, number>
      >();
      expect(properties.a.property).toBe(0);
      expect(properties.a.c.property).toBe('');
    });
  });
});
