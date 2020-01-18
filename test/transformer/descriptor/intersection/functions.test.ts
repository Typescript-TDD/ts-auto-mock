import { createMock } from 'ts-auto-mock';

describe('functions', () => {
  it('should assign the first function', () => {
    type A = () => number;

    type B = () => string;

    interface C {
      prop: A & B;
    }

    const mock: C = createMock<C>();

    expect(mock.prop()).toBe(0);
  });
});
