import { createMock } from 'ts-auto-mock';

describe('setAccessor', () => {
  class AClass {
    public _prop1: number;

    public set prop1(value: number) {
      this._prop1 = value;
    }
  }

  it('should always be undefined for only setter', () => {
    const mock: AClass = createMock<AClass>();
    expect(mock.prop1).toBeUndefined();
  });
});
