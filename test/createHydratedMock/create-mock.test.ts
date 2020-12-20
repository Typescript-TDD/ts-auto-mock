import { createHydratedMock } from 'ts-auto-mock';

describe('create-hydrated-mock', () => {
  describe('when creating an hydrated mock', () => {
    it('should treat not required properties as required', () => {
      interface Interface {
        notRequired?: string;
        required: number;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.required).toBe(0);
      expect(mock.notRequired).toBe('');
    });
  });

  describe('for union types', () => {
    it('should ignore not defined types from the signature', () => {
      interface Interface {
        test(): string | undefined;
        test2(): undefined | string;
        test3(): string | void;
        test4(): void | string;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.test()).toBe('');
      expect(mock.test2()).toBe('');
      expect(mock.test3()).toBe('');
      expect(mock.test4()).toBe('');
    });

    it('should ignore not defined property types', () => {
      interface Interface {
        test: string | undefined;
        test2: undefined | string;
        test3: string | void;
        test4: void | string;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.test).toBe('');
      expect(mock.test2).toBe('');
      expect(mock.test3).toBe('');
      expect(mock.test4).toBe('');
    });

    it('should still return undefined for union types with only undefined types', () => {
      interface Interface {
        test: void | undefined;
        test2: undefined | void;
      }

      const mock: Interface = createHydratedMock<Interface>();
      expect(mock.test).toBeUndefined();
      expect(mock.test2).toBeUndefined();
    });
  });
});
