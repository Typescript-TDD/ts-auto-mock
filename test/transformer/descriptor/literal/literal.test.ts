import { createMock } from 'ts-auto-mock';
import {
  TypeUnion,
  TypeUnionEmptyObject,
  TypeUnionFunction,
  TypeUnionObject,
  TypeUnionToken,
  TypeUnionTokenAllBoolean,
  TypeUnionTokenNumber,
  TypeUnionTokenSameBoolean,
  TypeUnionWithNegatives,
} from '../utils/types/typeUnion';
import { getObjectKeyValues } from '../../utilities/getObjectKeyValues';

describe('for literal', () => {
  describe('with a specific string', () => {
    interface Interface {
      a: 'string2';
    }

    it('should set null', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a).toBe('string2');
    });
  });

  describe('with a specific number', () => {
    interface Interface {
      a: 2;
      b: -3;
    }

    it('should set the number', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.a).toBe(2);
      expect(properties.b).toBe(-3);
    });
  });

  describe('with import', () => {
    interface Interface {
      literal: TypeUnion;
      literalWithNegatives: TypeUnionWithNegatives;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal).toBe('1');
      expect(properties.literalWithNegatives).toBe(-1);
    });
  });

  describe('with import token string', () => {
    interface Interface {
      literal: TypeUnionToken;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal).toBe('a');
    });
  });

  describe('with import token number', () => {
    interface Interface {
      literal: TypeUnionTokenNumber;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal).toBe(1);
    });
  });

  describe('with import token with same boolean', () => {
    interface Interface {
      literal: TypeUnionTokenSameBoolean;
    }

    it('should set value', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal).toBe(true);
    });
  });

  describe('with import token with all kind of boolean values', () => {
    interface Interface {
      literal: TypeUnionTokenAllBoolean;
    }

    it('should set the first boolean value', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal).toBe(true);
    });
  });

  describe('with import object', () => {
    interface Interface {
      literal: TypeUnionObject;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(getObjectKeyValues(properties.literal)).toEqual({
        a: '',
      });
    });
  });

  describe('with import function', () => {
    interface Interface {
      literal: TypeUnionFunction;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(properties.literal()).toBeUndefined();
    });
  });

  describe('with import empty object', () => {
    interface Interface {
      literal: TypeUnionEmptyObject;
    }

    it('should set the first one', () => {
      const properties: Interface = createMock<Interface>();
      expect(getObjectKeyValues(properties.literal)).toEqual({});
    });
  });
});
