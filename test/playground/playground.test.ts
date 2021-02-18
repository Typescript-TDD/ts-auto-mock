import { createMock } from 'ts-auto-mock';

/*
 USE THIS FILE ONLY FOR TESTING NEW IMPLEMENTATION
 1) build the module you need
 2) run test:playground to see if it pass
 3) run build:playground to see the output generated

 */

// it('should work for default referencing previous generic arguments', () => {
//   interface A<P, S = P> {
//     prop: P;
//     prop2: S;
//   }
//
//   const mock: A<number> = createMock<A<number>>();
//
//   expect(mock.prop).toEqual(0);
//   expect(mock.prop2).toEqual(0);
// });

it('should set the value for one generic with Generics', () => {
  interface GenericOneValue<T1> {
    a: T1;
  }

  createMock<GenericOneValue<GenericOneValue<number>>>();
  const properties: GenericOneValue<GenericOneValue<string>> = createMock<
    GenericOneValue<GenericOneValue<string>>
  >();

  expect(properties.a.a).toBe('');
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
