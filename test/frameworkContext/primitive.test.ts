import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('primitives', () => {
  type A = string;
  let mock: A;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mock = createMock<A>();
  });

  it('should not be able to get the mock', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      On(mock).get(method((x: string) => x.apply));
    }).toThrow();
  });
});
