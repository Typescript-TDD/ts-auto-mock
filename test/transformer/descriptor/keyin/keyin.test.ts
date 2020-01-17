import { createMock } from 'ts-auto-mock';

describe('for keyin', () => {
  describe('with an union', () => {
    type Keys = 'z' | 'f';
    type myType = {[key in Keys]: string};

    it('should set all the keys as properties', () => {
      const properties: myType = createMock<myType>();
      expect(properties.z).toBe('');
      expect(properties.f).toBe('');
    });
  });

  describe('with an extend', () => {
    type Keys = 'a' & 'b';
    type myType = {[key in Keys]: string};

    it('should set an empty object', () => {
      const properties: myType = createMock<myType>();
      expect(properties).toEqual({});
    });
  });

  describe('with a specific string', () => {
    it('should set all the keys as properties', () => {
      type myTypeDeclarative = {[key in 's']: string};
      const properties: myTypeDeclarative = createMock<myTypeDeclarative>();
      expect(properties.s).toBe('');
    });
  });
});
