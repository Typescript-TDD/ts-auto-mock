import { createHydratedMock, createMock, registerMock } from 'ts-auto-mock';

describe('create-hydrated-mock', () => {
  describe('for not optional properties', () => {
    it('should treat them as non optional', () => {
      interface Interface {
        notRequired?: string;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.notRequired).toBe('');
    });
  });

  describe('for union types', () => {
    it('should ignore not defined types', () => {
      interface Interface {
        method(): string | undefined;
        method2(): undefined | string;
        method3(): string | void;
        method4(): void | string;
        property: string | undefined;
        property2: undefined | string;
        property3: string | void;
        property4: void | string;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.method()).toBe('');
      expect(mock.method2()).toBe('');
      expect(mock.method3()).toBe('');
      expect(mock.method4()).toBe('');
      expect(mock.property).toBe('');
      expect(mock.property2).toBe('');
      expect(mock.property3).toBe('');
      expect(mock.property4).toBe('');
    });

    it('should still return undefined for union types with only undefined types', () => {
      interface Interface {
        method(): void | undefined;
        method2(): undefined | void;
        property: void | undefined;
        property2: undefined | void;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.method()).toBeUndefined();
      expect(mock.method()).toBeUndefined();
      expect(mock.property).toBeUndefined();
      expect(mock.property2).toBeUndefined();
    });
  });

  describe('when an interface has already been mocked by createMock', () => {
    it('should create a different mock with optional properties defined', () => {
      interface Interface {
        notRequired?: string;
      }

      createMock<Interface>();
      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.notRequired).toBe('');
    });
  });

  describe('when an interface has already been mocked by createHydratedMock', () => {
    it('should create a different mock for createMock with optional properties undefined', () => {
      interface Interface {
        notRequired?: string;
      }

      createHydratedMock<Interface>();
      const mock: Interface = createMock<Interface>();
      expect(mock.notRequired).toBeUndefined();
    });
  });

  describe('for generics', () => {
    it('should use the correct declaration to find the correct generic value', () => {
      interface Interface<T> {
        notRequired?: T;
      }

      const mock: Interface<string> = createHydratedMock<Interface<string>>();
      expect(mock.notRequired).toBe('');
    });

    it('should duplicate the mocks', () => {
      interface AnotherInterface {
        prop: boolean;
      }
      interface Interface<T> {
        notRequired?: T;
      }

      createMock<AnotherInterface>();
      const mock: Interface<AnotherInterface> = createHydratedMock<
        Interface<AnotherInterface>
      >();
      expect(mock.notRequired?.prop).toBe(false);
    });

    it('should find the correct generic with extensions', () => {
      interface A<T> {
        a: T;
      }

      interface B<T> extends A<T> {
        b?: number;
      }

      const mock: B<string> = createHydratedMock<B<string>>();
      expect(mock.b).toBe(0);
      expect(mock.a).toBe('');
    });

    it('should avoid infinite extension', () => {
      class ClassWithGenerics<T> {
        public a: T;
      }

      interface A extends ClassWithGenerics<A> {
        b: number;
      }
      const properties: A = createHydratedMock<A>();
      expect(properties.a).toBeDefined();
      expect(properties.b).toBe(0);
    });
  });

  describe('for registerMock', () => {
    it('should return the registered mock when using createMock or createHydratedMock', () => {
      interface Interface {
        notRequired?: string;
      }

      registerMock<Interface>(() => ({
        notRequired: 'hello-world',
      }));
      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.notRequired).toBe('hello-world');
      expect(createMock<Interface>().notRequired).toBe('hello-world');
    });
  });
});
