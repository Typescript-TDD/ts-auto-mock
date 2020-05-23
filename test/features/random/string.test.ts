import { createMock } from 'ts-auto-mock';

describe('Random string', () => {
  it('it should return a random string', () => {
    interface WithString {
      prop: string;
    }

    const mock: WithString = createMock<WithString>();

    expect(mock.prop).not.toBe('');
  });
});
