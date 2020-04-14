import { createMock } from 'ts-auto-mock';

describe('mocking properties', () => {
  describe('when property is a mock', () => {
    interface SubInterface {
      aProp: string;
    }

    interface AnInterface {
      bProp: SubInterface | null;
    }

    it('should correctly assign null', () => {
      const anInterface: AnInterface = createMock<AnInterface>();

      anInterface.bProp = null;

      expect(anInterface.bProp).toBeNull();
    });
  });

  describe('when property is a value type', () => {
    interface AnInterface {
      aProp: string | null;
    }

    it('should correctly assign null', () => {
      const anInterface: AnInterface = createMock<AnInterface>();

      anInterface.aProp = null;

      expect(anInterface.aProp).toBeNull();
    });
  });

  describe('when property is a function', () => {
    interface AnInterface {
      aProp: (() => string) | null;
    }

    it('should correctly assign null', () => {
      const anInterface: AnInterface = createMock<AnInterface>();

      anInterface.aProp = null;

      expect(anInterface.aProp).toBeNull();
    });
  });
});
