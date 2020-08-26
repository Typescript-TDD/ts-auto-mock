import { createMock } from 'ts-auto-mock';

describe('parenthesized intersection ', () => {
  it('should return undefined for primitive and object ', () => {
    interface B {}

    type A = string & B;

    expect(createMock<A>()).toBeUndefined();
  });

  it('should intersect correctly for function and object ', () => {
    interface B {
      prop: number;
    }

    type A = (() => string) & B;

    const mock: A = createMock<A>();
    expect(mock()).toBe('');
    expect(mock.prop).toBe(0);
  });

  it('should return the correct type for objects intersections', () => {
    type A = { a: string } & { b: number };

    const mock: A = createMock<A>();

    expect(mock.a).toBe('');
    expect(mock.b).toBe(0);
  });
});
