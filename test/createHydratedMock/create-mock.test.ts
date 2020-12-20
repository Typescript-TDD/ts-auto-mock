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
});
