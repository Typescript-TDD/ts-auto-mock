import { createMock } from 'ts-auto-mock';

describe('for reserverd words', () => {
  interface WithReservedWord {
    catch(): void;
    class(): string;
    constant: boolean;
  }

  it('should work normally', () => {
    const mock: WithReservedWord = createMock<WithReservedWord>();
    expect(mock.catch()).toBeUndefined();
    expect(mock.class()).toBe('');
    expect(mock.constant).toBe(false);
  });
});
