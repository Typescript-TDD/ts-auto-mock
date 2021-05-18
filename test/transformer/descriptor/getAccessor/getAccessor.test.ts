import { createMock } from 'ts-auto-mock';

describe('getAccessor', () => {
  class AClass {
    public get prop1(): number {
      return 4;
    }

    public get prop2(): string {
      return '42';
    }

    public get prop3(): AClass {
      return new AClass();
    }
  }

  it('should mock the correct type', () => {
    const mock: AClass = createMock<AClass>();
    expect(mock.prop1).toBe(0);
    expect(mock.prop2).toBe('');
    expect(mock.prop3.prop3.prop3.prop1).toBe(0);
  });
});
