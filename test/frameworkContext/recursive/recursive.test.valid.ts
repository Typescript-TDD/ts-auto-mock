import { createMock } from 'ts-auto-mock';

describe('for call signature', () => {
  interface InterfaceWithCallSignatureReturn {
    (a: number): InterfaceWithCallSignatureReturn;
    b: string;
  }

  it('should register that the spy was called', () => {
    const properties: InterfaceWithCallSignatureReturn = createMock<
      InterfaceWithCallSignatureReturn
    >();
    properties(0);
    expect(properties).toHaveBeenCalledTimes(1);
  });

  it('should register that different spies was called ', () => {
    const properties: InterfaceWithCallSignatureReturn = createMock<
      InterfaceWithCallSignatureReturn
    >();
    const firstCall: InterfaceWithCallSignatureReturn = properties(0);
    const secondCall: InterfaceWithCallSignatureReturn = firstCall(0);
    secondCall(0);
    expect(properties).toHaveBeenCalledTimes(1);
    expect(firstCall).toHaveBeenCalledTimes(1);
    expect(secondCall).toHaveBeenCalledTimes(1);
    expect(secondCall).toHaveBeenCalledWith(0);
  });
});
