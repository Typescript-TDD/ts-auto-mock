import { createMock } from 'ts-auto-mock';

describe('for generic reuse', () => {
  interface Interface<T, T2> {
    generic: Interface<T, T2> & { generic2: T };
    property: T2;
  }

  it('should assign the correct value', () => {
    const mockString: Interface<string, number> = createMock<
      Interface<string, number>
    >();
    const mockNumber: Interface<number, string> = createMock<
      Interface<number, string>
    >();
    const mockStringAgain: Interface<string, number> = createMock<
      Interface<string, number>
    >();
    expect(mockString.generic.generic2).toBe('');
    expect(mockString.generic.property).toBe(0);
    expect(mockNumber.generic.generic2).toBe(0);
    expect(mockNumber.generic.property).toBe('');
    expect(mockStringAgain.generic.generic2).toBe('');
    expect(mockStringAgain.generic.property).toBe(0);
  });
});
