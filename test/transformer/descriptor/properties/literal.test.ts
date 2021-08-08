import { createMock } from 'ts-auto-mock';
import { WithStringLiteralProperties } from '../../utilities/withStringLiteralPropertis';

describe('properties with literal', () => {
  interface Literal {
    test: number;
  }

  it('should assign the correct values', () => {
    const mock: Literal = createMock<Literal>();

    expect(mock.test).toBe(0);
  });
});

describe('properties with imported interface literal', () => {
  it('should assign the correct values', () => {
    const mock: WithStringLiteralProperties =
      createMock<WithStringLiteralProperties>();

    expect(mock['!']).toBe(0);
    expect(mock['literal-special-characters-property']).toBeUndefined();
    expect(mock['&methodSpecialCharacters']()).toBe(0);
  });
});
