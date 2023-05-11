import { createMock } from 'ts-auto-mock';
import { WithStringLiteralProperties } from '../../utilities/withStringLiteralProperties';

describe('properties with literal', () => {
  interface Literal {
    test: 3;
  }

  it('should assign the correct values', () => {
    const mock: Literal = createMock<Literal>();

    expect(mock.test).toBe(3);
  });
});

describe('properties with imported interface literal', () => {
  it('should assign the correct values', () => {
    const mock: WithStringLiteralProperties =
      createMock<WithStringLiteralProperties>();

    expect(mock['!']).toBe(12);
    expect(mock['literal-special-characters-property']).toBeUndefined();
    expect(mock['&methodSpecialCharacters']()).toBe(13);
  });
});
