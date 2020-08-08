import { createMock } from 'ts-auto-mock';

describe('for call signature', () => {
  interface InterfaceWithCallSignatureReturn {
    (a: number): InterfaceWithCallSignatureReturn;
    b: string;
  }

  it('should not work', () => {
    expect(() => {
      const properties: InterfaceWithCallSignatureReturn = createMock<
        InterfaceWithCallSignatureReturn
      >();
      properties(0);
      expect(properties).toHaveBeenCalledTimes(1);
    }).toThrow();
  });
});
