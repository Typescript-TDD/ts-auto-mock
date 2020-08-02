import { createMock } from 'ts-auto-mock';

describe('for generic', () => {
  describe('interface', () => {
    interface GenericOneValue<T1> {
      a: T1;
    }

    interface GenericTwoValues<T3, T4> {
      a: T3;
      b: T4;
    }

    interface GenericTwoValuesAndChildren<T> {
      generic1: T;
      generic2: GenericTwoValuesAndChildren<T>;
    }

    interface GenericDefault<T1 = string> {
      a: T1;
    }

    interface GenericDefaultSecond<T2, T1 = number> {
      a: GenericDefault<T2>;
      b: T1;
    }

    interface WithSubGeneric<T1> {
      a: T1;
      b: GenericTwoValues<number, T1>;
    }

    interface WithSubGenericInverted<T1> {
      a: T1;
      b: GenericTwoValues<T1, string>;
    }

    it('should set the value for one generic', () => {
      const properties: GenericOneValue<number> = createMock<
        GenericOneValue<number>
      >();

      expect(properties.a).toBe(0);
    });

    it('should set the value for one generic reusing', () => {
      const properties: GenericOneValue<number> = createMock<
        GenericOneValue<number>
      >();
      const properties2: GenericOneValue<string> = createMock<
        GenericOneValue<string>
      >();

      expect(properties.a).toBe(0);
      expect(properties2.a).toBe('');
    });

    it('should set the value for multiple generics', () => {
      const properties: GenericTwoValues<number, string> = createMock<
        GenericTwoValues<number, string>
      >();

      expect(properties.a).toBe(0);
      expect(properties.b).toBe('');
    });

    it('should set the value for default generics when provided', () => {
      const propertiesWithGeneric: GenericDefault<number> = createMock<
        GenericDefault<number>
      >();

      expect(propertiesWithGeneric.a).toBe(0);
    });

    it('should set the value for default generics when not provided', () => {
      const propertiesWithGeneric: GenericDefault = createMock<
        GenericDefault
      >();

      expect(propertiesWithGeneric.a).toBe('');
    });

    it('should set the value for default generics when not provided as second', () => {
      const propertiesWithoutGeneric: GenericDefaultSecond<number> = createMock<
        GenericDefaultSecond<number>
      >();
      const propertiesWithGeneric: GenericDefaultSecond<
        string,
        string
      > = createMock<GenericDefaultSecond<string, string>>();

      expect(propertiesWithoutGeneric.a.a).toBe(0);
      expect(propertiesWithoutGeneric.b).toBe(0);
      expect(propertiesWithGeneric.a.a).toBe('');
      expect(propertiesWithGeneric.b).toBe('');
    });

    it('should set the value only default generics when not provided', () => {
      interface Generic<T1, T2 = string, T3 = boolean> {
        a: T1;
        b: T2;
        c: T3;
      }

      const propertiesWithGeneric: Generic<number> = createMock<
        Generic<number>
      >();

      expect(propertiesWithGeneric.a).toBe(0);
      expect(propertiesWithGeneric.b).toBe('');
      expect(propertiesWithGeneric.c).toBe(false);
    });

    it('should set the value for interfaces', () => {
      interface StandardInterface {
        a: string;
      }

      interface Generic<T1> {
        a: T1;
      }

      const propertiesWithGeneric: Generic<StandardInterface> = createMock<
        Generic<StandardInterface>
      >();

      expect(propertiesWithGeneric.a.a).toBe('');
    });

    it('should set the value for interface with generic', () => {
      interface StandardInterface<T> {
        a: T;
      }

      interface Generic<T1> {
        a: StandardInterface<T1>;
      }

      const propertiesWithGeneric: Generic<number> = createMock<
        Generic<number>
      >();

      expect(propertiesWithGeneric.a.a).toBe(0);
    });

    it('should set the value for same interface with generic', () => {
      interface Generic<T1> {
        a: Generic<T1>;
        b: T1;
      }

      const propertiesWithGeneric: Generic<number> = createMock<
        Generic<number>
      >();

      expect(propertiesWithGeneric.a.b).toBe(0);
      expect(propertiesWithGeneric.a.a.a.b).toBe(0);
    });

    it('should set the value of the generic without affecting others', () => {
      createMock<GenericTwoValuesAndChildren<string>>();
      const properties: GenericTwoValuesAndChildren<{
        a: string;
      }> = createMock<GenericTwoValuesAndChildren<{ a: string }>>();
      expect(properties.generic1).toEqual({
        a: '',
      });
      properties.generic1.a = 'change it';
      expect(properties.generic1.a).toBe('change it');
      expect(properties.generic2.generic1).toEqual({
        a: '',
      });
    });

    it('should set the value of the sub generics', () => {
      const properties: WithSubGeneric<string> = createMock<
        WithSubGeneric<string>
      >();
      expect(properties.a).toEqual('');
      expect(properties.b.a).toEqual(0);
      expect(properties.b.b).toEqual('');
    });

    it('should set the value of the sub generics', () => {
      const properties: WithSubGenericInverted<number> = createMock<
        WithSubGenericInverted<number>
      >();
      expect(properties.a).toEqual(0);
      expect(properties.b.a).toEqual(0);
      expect(properties.b.b).toEqual('');
    });

    it('should set the value for child generics', () => {
      interface Generic<T, T2> {
        property: T;
        property2: T2;
      }

      interface UseGeneric<T, T2> {
        generic: Generic<T, T2>;
        property: T2;
      }
      const properties: UseGeneric<number, string> = createMock<
        UseGeneric<number, string>
      >();
      const properties2: UseGeneric<string, number> = createMock<
        UseGeneric<string, number>
      >();
      expect(properties.generic.property).toEqual(0);
      expect(properties.generic.property2).toEqual('');
      expect(properties.property).toEqual('');
      expect(properties2.generic.property).toEqual('');
      expect(properties2.generic.property2).toEqual(0);
      expect(properties2.property).toEqual(0);
    });

    it('should set the value for one generic with Generics', () => {
      createMock<GenericOneValue<GenericOneValue<number>>>();
      const properties: GenericOneValue<GenericOneValue<string>> = createMock<
        GenericOneValue<GenericOneValue<string>>
      >();

      expect(properties.a.a).toBe('');
    });

    it('should set the value for one generic with Generics default', () => {
      createMock<GenericOneValue<GenericDefault<number>>>();
      const properties: GenericOneValue<GenericDefault> = createMock<
        GenericOneValue<GenericDefault>
      >();

      expect(properties.a.a).toBe('');
    });

    it('should set the value for one generic with Generics sub generic', () => {
      createMock<GenericOneValue<WithSubGeneric<number>>>();
      const properties: GenericOneValue<WithSubGeneric<string>> = createMock<
        GenericOneValue<WithSubGeneric<string>>
      >();

      expect(properties.a.a).toBe('');
      expect(properties.a.b.a).toBe(0);
    });

    it('should set the value in sub interfaces', () => {
      interface InterfaceWithThis<T> {
        property: this;
        propertyGeneric: T;
      }

      const properties: InterfaceWithThis<string> = createMock<
        InterfaceWithThis<string>
      >();

      expect(properties.propertyGeneric).toBe('');
      expect(properties.property.propertyGeneric).toBe('');
    });

    it('should set the value for type generic', () => {
      interface Generic<T2> {
        e: T2;
      }

      type Test<T4> = T4;
      interface InterfaceWithCallSignature<T, T3, T2 = boolean> {
        a: T;
        b: Generic<T3>;
        c: Test<T2>;
      }

      const propertiesWithGeneric: InterfaceWithCallSignature<
        number,
        string
      > = createMock<InterfaceWithCallSignature<number, string>>();
      expect(propertiesWithGeneric.a).toBe(0);
      expect(propertiesWithGeneric.b.e).toBe('');
      expect(propertiesWithGeneric.c).toBe(false);
    });
  });

  describe('classes', () => {
    class WithGeneric<T> {
      public iAmAString: T;
    }

    class WithGenerics<T, S> {
      public iAmAString: T;
      public iAmANumber: S;
    }

    class WithGenericsSub<T> {
      public sub: WithGeneric<string>;
      public iAmAString: T;
    }

    class WithGenericsSubInterface<T> {
      public sub: WithGeneric<T>;
    }

    it('should set the value of the generic', () => {
      const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the generics', () => {
      const properties: WithGenerics<string, number> = createMock<
        WithGenerics<string, number>
      >();
      expect(properties.iAmANumber).toBe(0);
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the sub generics', () => {
      const properties: WithGenericsSub<string> = createMock<
        WithGenericsSub<string>
      >();
      expect(properties.sub.iAmAString).toBe('');
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the generics with sub interfaces', () => {
      const properties: WithGenericsSubInterface<string> = createMock<
        WithGenericsSubInterface<string>
      >();
      expect(properties.sub.iAmAString).toBe('');
    });
  });

  describe('types', () => {
    interface WithGeneric<T> {
      iAmAString: T;
    }

    interface WithGenerics<T, S> {
      iAmAString: T;
      iAmANumber: S;
    }

    interface WithGenericsSub<T> {
      sub: WithGeneric<string>;
      iAmAString: T;
    }

    interface WithGenericsSubInterface<T> {
      sub: WithGeneric<T>;
    }

    it('should set the value of the generic', () => {
      const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the generics', () => {
      const properties: WithGenerics<string, number> = createMock<
        WithGenerics<string, number>
      >();
      expect(properties.iAmANumber).toBe(0);
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the sub generics', () => {
      const properties: WithGenericsSub<string> = createMock<
        WithGenericsSub<string>
      >();
      expect(properties.sub.iAmAString).toBe('');
      expect(properties.iAmAString).toBe('');
    });

    it('should set all the generics with sub interfaces', () => {
      const properties: WithGenericsSubInterface<string> = createMock<
        WithGenericsSubInterface<string>
      >();
      expect(properties.sub.iAmAString).toBe('');
    });

    it('should set the value for types functions', () => {
      type Test<T = number> = () => T;

      const properties: Test<string> = createMock<Test<string>>();
      const propertiesDefault: Test = createMock<Test>();
      expect(properties()).toBe('');
      expect(propertiesDefault()).toBe(0);
    });
  });
});
