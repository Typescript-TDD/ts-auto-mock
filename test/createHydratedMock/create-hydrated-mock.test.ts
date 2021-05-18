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

  describe('for type of enum', () => {
    it('should mock the properties as it was createMock', () => {
      enum Enum {
        A,
        B = 'some',
      }

      const enumMock: typeof Enum = createHydratedMock<typeof Enum>();

      expect(enumMock.A).toEqual(0);
      expect(enumMock.B).toEqual('some');
    });
  });

  describe('when mocking different interfaces with same name', () => {
    // eslint-disable-next-line @typescript-eslint/typedef
    let mock0;
    // eslint-disable-next-line @typescript-eslint/typedef
    let mock1;
    // eslint-disable-next-line @typescript-eslint/typedef
    let mock2;
    // eslint-disable-next-line @typescript-eslint/typedef
    let mock3;
    it('should create unique mocks', () => {
      interface Interface {
        prop?: string;
      }

      mock0 = createHydratedMock<Interface>();
      mock1 = createMock<Interface>();

      expect(mock0.prop).toEqual('');
      expect(mock1.prop).toBeUndefined('');
    });

    it('should create unique mocks', () => {
      interface Interface {
        prop?: string;
      }

      mock2 = createHydratedMock<Interface>();
      mock3 = createMock<Interface>();

      expect(mock2.prop).toEqual('');
      expect(mock3.prop).toBeUndefined('');
    });

    afterAll(() => {
      expect(mock0).not.toBe(mock1);
      expect(mock0).not.toBe(mock2);
      expect(mock0).not.toBe(mock3);
      expect(mock1).not.toBe(mock2);
      expect(mock1).not.toBe(mock3);
      expect(mock2).not.toBe(mock3);
    });
  });

  describe('for intersections', () => {
    interface IntersectionA {
      a?: string;
    }

    interface IntersectionB {
      b?: number;
    }
    interface Interface {
      intersection: IntersectionA & IntersectionB;
      anotherIntersection: IntersectionA & {
        c?: boolean;
      };
    }

    it('should merge all the values', () => {
      const properties: Interface = createHydratedMock<Interface>();
      expect(properties.intersection).toEqual({
        a: '',
        b: 0,
      });

      expect(properties.anotherIntersection).toEqual({
        a: '',
        c: false,
      });
    });
  });

  describe('for recursive types', () => {
    describe('for interfaces', () => {
      type B = A;

      interface A {
        recursiveProp: B | null;
        aProp: string | null;
      }

      it('should use the define type', () => {
        const type: A = createHydratedMock<A>();
        expect(type.recursiveProp?.aProp).toBe('');
      });
    });

    describe('for classes', () => {
      type B = A;

      class A {
        public recursiveProp: B | null;
        public aProp: string | null;
      }

      it('should use the define type', () => {
        const type: A = createHydratedMock<A>();
        expect(type.recursiveProp?.aProp).toBe('');
      });
    });

    describe('for type literal', () => {
      type B = A;

      type A = {
        recursiveProp: B | null;
        aProp: string | null;
      };

      it('should use the define type', () => {
        const type: A = createHydratedMock<A>();
        expect(type.recursiveProp?.aProp).toBe('');
      });
    });
  });
});
