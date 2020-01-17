import { createMock } from 'ts-auto-mock';
const computedProperty: 'C' = 'C';

describe('computed properties constant', () => {
  interface Computed {
    [computedProperty]: string;
  }

  it('should assign the correct value', () => {
    const mock: Computed = createMock<Computed>();

    expect(mock.C).toBe('');
  });
});

describe('computed property enum', () => {
  enum Enum {
    A,
    B = 'test',
    C = '%test',
  }
  interface ComputedEnum {
    [Enum.A]: boolean;
    [Enum.B]: number;
    [Enum.C]: string;
  }

  it('should assign the correct value', () => {
    const mock: ComputedEnum = createMock<ComputedEnum>();

    expect(mock[0]).toBe(false);
    expect(mock.test).toBe(0);
    expect(mock['%test']).toBe('');
  });
});
