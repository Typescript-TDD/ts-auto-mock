import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';

describe('property literal test', () => {
  it('should give the correct name to the spy', () => {
    interface WithStringLiteralProperties {
      '&methodSpecialCharacters': () => number;
    }

    const mock: WithStringLiteralProperties = createMock<
      WithStringLiteralProperties
    >();
    const spyA: jasmine.Spy = On(mock).get(method('&methodSpecialCharacters'));

    expect(spyA.and.identity).toBe('&methodSpecialCharacters');
  });
});
