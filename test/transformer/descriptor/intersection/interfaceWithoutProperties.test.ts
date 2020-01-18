import { createMock } from 'ts-auto-mock';

describe('interface without properties and with methods', () => {
  it('should assign the first method', () => {
    interface A {
      // eslint-disable-next-line @typescript-eslint/prefer-function-type
      (): string;
    }

    interface B {
      // eslint-disable-next-line @typescript-eslint/prefer-function-type
      (): number;
    }

    interface C {
      prop: A & B;
    }

    const mock: C = createMock<C>();

    expect(mock.prop()).toBe('');
  });
});
