import { createMock } from 'ts-auto-mock';

describe('bigint', () => {
  it('should be transformed correctly', () => {
    interface WithBigInt {
      a: bigint;
    }
    const mock: WithBigInt = createMock<WithBigInt>();

    expect(mock.a.toString()).toEqual('0');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(mock.a).not.toBe(0);
  });
});
