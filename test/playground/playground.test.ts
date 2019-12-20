import { createMock } from 'ts-auto-mock';
import { MyEnum } from './enums';

/*
 USE THIS FILE ONLY FOR TESTING NEW IMPLEMENTATION
 1) build the module you need
 2) run test:playground to see if it pass
 3) run build:playground to see the output generated

 */

it('should work', () => {
  interface A {

  }
  const enumm2: typeof MyEnum = createMock<typeof MyEnum>();
  createMock<A>();

  expect(enumm2.A).toEqual(0);
});
