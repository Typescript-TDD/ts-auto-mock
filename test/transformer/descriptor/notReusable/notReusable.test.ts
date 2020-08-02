import { createMock } from 'ts-auto-mock';

describe('not reusable', () => {
  it('should give the default value ', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mock: string = createMock<string>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mock2: number = createMock<number>();
    expect(mock).toBe('');
    expect(mock2).toBe(0);
  });

  it('should give the default value', () => {
    type Type = string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const mock: Type = createMock<Type>();
    expect(mock).toBe('');
  });
});
