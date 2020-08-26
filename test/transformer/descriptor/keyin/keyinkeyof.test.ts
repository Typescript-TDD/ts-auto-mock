import { createMock } from 'ts-auto-mock';

describe('for keyin keyof', () => {
  describe('of interface', () => {
    interface Keys {
      a: number;
    }

    type KeyInKeyof = { [key in keyof Keys]: string };

    it('should set all the keys as properties', () => {
      const properties: KeyInKeyof = createMock<KeyInKeyof>();
      expect(properties.a).toBe('');
    });
  });

  describe('of a class', () => {
    class Test {
      public a: number;
    }

    type KeyInKeyof = { [key in keyof Test]: Test[key] };

    it('should set all the keys as properties', () => {
      const properties: KeyInKeyof = createMock<KeyInKeyof>();
      expect(properties.a).toBe(0);
    });
  });
});
