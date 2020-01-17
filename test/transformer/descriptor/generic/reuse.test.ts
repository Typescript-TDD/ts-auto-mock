import { createMock } from 'ts-auto-mock';

describe('for generic reuse', () => {
  interface Interface<T> {
    generic: T;
  }

  it('should assign the correct value', () => {
    const mockString: Interface<string> = createMock<Interface<string>>();
    const mockNumber: Interface<number> = createMock<Interface<number>>();
    const mockStringAgain: Interface<string> = createMock<Interface<string>>();
    expect(mockString.generic).toBe('');
    expect(mockNumber.generic).toBe(0);
    expect(mockStringAgain.generic).toBe('');
  });
});
