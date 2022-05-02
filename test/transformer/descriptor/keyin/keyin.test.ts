import { createMock } from 'ts-auto-mock';
import { getObjectKeyValues } from '../../utilities/getObjectKeyValues';

describe('for keyin', () => {
  describe('with an union', () => {
    type Keys = 'z' | 'f';
    type MyType = { [key in Keys]: string };

    it('should set all the keys as properties', () => {
      const properties: MyType = createMock<MyType>();
      expect(properties.z).toBe('');
      expect(properties.f).toBe('');
    });
  });

  describe('with an extend', () => {
    type Keys = 'a' & 'b';
    type MyType = { [key in Keys]: string };

    it('should set an empty object', () => {
      const properties: MyType = createMock<MyType>();
      expect(getObjectKeyValues(properties)).toEqual({});
    });
  });

  describe('with a specific string', () => {
    it('should set all the keys as properties', () => {
      type MyTypeDeclarative = { [key in 's']: string };
      const properties: MyTypeDeclarative = createMock<MyTypeDeclarative>();
      expect(properties.s).toBe('');
    });
  });
});
