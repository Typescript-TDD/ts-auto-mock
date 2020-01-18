import { createMock } from 'ts-auto-mock';
import { AbstractClass } from './utils/classes/AbstractClass';
import { Class } from './utils/classes/class';
import { EmptyClass } from './utils/classes/EmptyClass';

describe('for classes', () => {
  class Test {
    private _a: string;
    public a: string;
  }

  it('should set the correct property for internal class', () => {
    const properties: Test = createMock<Test>();
    expect(properties.a).toBe('');
    // eslint-disable-next-line dot-notation
    expect(properties['_a']).toBeUndefined();
  });

  it('should set the correct property for imported class', () => {
    const properties: Class = createMock<Class>();
    expect(properties.a).toBe('');
    expect(properties.b).toBe('');
    // eslint-disable-next-line dot-notation
    expect(properties['_a']).toBeUndefined();
  });

  it('should set an empty object for empty class', () => {
    const properties: EmptyClass = createMock<EmptyClass>();
    expect(properties).toEqual({});
  });

  it('should set the correct properties for an abstract class', () => {
    const properties: AbstractClass = createMock<AbstractClass>();
    expect(properties.abstractProperty).toBe('');
    expect(properties.property).toBe('');
    expect(properties.publicProperty).toBe('');
    // eslint-disable-next-line dot-notation
    expect(properties['privateProperty']).toBeUndefined();
  });

  it('should be possible to change the value', () => {
    const properties: AbstractClass = createMock<AbstractClass>();

    properties.property = 'changedValue';
    expect(properties.property).toBe('changedValue');
  });
});
